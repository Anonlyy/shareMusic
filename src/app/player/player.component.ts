import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {CookieService} from "angular2-cookie/services/cookies.service";
import {MusicService} from "../service/music.service";
import {Song} from "../content-index/content-index.component";
import {UserInfo} from "../menu/menu.component";
import {UserService} from "../service/user.service";
import { ElMessageService } from 'element-angular'

import * as formRoot from '../ngrx';
import {REFRESH} from '../ngrx/action/option'
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {

  audio:HTMLAudioElement = new Audio(); //音乐对象
   //错误信息提示
  default:string ='/assets/image/loading.jpg';
  media:Song = new Song('00','暂无正在播放的歌曲~','','NULL','/assets/image/loading.jpg');
  MediaTime = {
    duration:'00:00',
    currentTime:'00:00'
  };
  songUrlList = []; //歌单url列表
  progressWidth:number = 0;
  isPlay:boolean = false;
  currentMedia = {
    id:'0',
    index:0
  };
  isTracks:boolean = false;//是否收藏
  times:any; //定时器
  userInfo:UserInfo = new UserInfo('0','null','null','null');
  isLogin:boolean = false;
  userSongIdsList = []; //用户喜爱的歌单的ID列表
  isSongDetailCheck$:Observable<number>; //发送用户是否点击的收藏

  constructor(public musicService:MusicService,
              public cookieService:CookieService,
              private message: ElMessageService,
              public userService:UserService,
              private store:Store<formRoot.State>) {
    this.isSongDetailCheck$ = store.select(formRoot.getNumber);
  }
  ngOnInit() {
    const _this = this;
    //得到当前歌曲的id
    _this.musicService.emitSong.subscribe((result)=>{//获取歌曲详情
      //noinspection TypeScriptUnresolvedVariable
      _this.currentMedia.id = result.currentSong.id;
      _this.media = result.currentSong;
      _this.getMediaUrl(result.ids);
    });
    //读取用户信息 1.通过缓存 2.通过emit接收
    if(_this.cookieService.getObject('userInfo')){ //读取用户信息缓存
      let userData:any = _this.cookieService.getObject('userInfo');
      _this.userInfo = new UserInfo(userData.userId,userData.username,userData.avatarUrl,userData.headrtSongListId);
      _this.isLogin = true;
      _this.getPlayList(_this.userInfo.headrtSongListId);
    }
    else{
      _this.userService.emitUser.subscribe(
        result=>{
          _this.userInfo = result;
          _this.isLogin = true;
          console.log(_this.isLogin,result);
          _this.getPlayList(result.headrtSongListId);
        }
      );
    }
  }



  checkSongLove(){
    const _this = this;
    //通过当前歌曲的id去遍历用户喜爱歌单的id列表,若无则返回-1
    let isLove = _this.userSongIdsList.findIndex(arr=>arr==_this.currentMedia.id);
    if(isLove>=0){
      _this.isTracks = true;
    }
  }

  /**
   * 获取用户喜爱的歌单详情
   * @param id
   */
  public getPlayList(id:string){
    const _this = this;
    _this.musicService.getPlayListDetail(id).subscribe(
      result=>{
        if(result.code==200){
          _this.userSongIdsList = [];
          for(let item of result.playlist.trackIds){
            _this.userSongIdsList.push(item.id);
          }
        }
        // console.log('ids',_this.userSongIdsList);
      },
      error=>{
        console.log('error',error);
      }
    )
  }
  /**
   * 获取音乐url事件
   * @param idList
   */
  getMediaUrl(idList){
    const _this = this;
    _this.isPlay = true;
    // console.log('idList',idList);
    _this.musicService.getSongUrl(idList.join(','))
      .subscribe(result=>{
        let data = result;
        if(data.code==200){
          _this.currentMedia.index = data.data.findIndex(arr=>{
            return arr.id==_this.currentMedia.id;
          });
          console.log(_this.currentMedia.index);
          //PS:返回的data数据的数组不是根据请求的IdList顺序来的
          let current = data.data.find(arr=>{
            return arr.id == _this.currentMedia.id;
          });
          _this.playMedia(current.url);
          _this.songUrlList = [];
          for(let item of data.data){
            _this.songUrlList.push({
              id:item.id,
              url:item.url
            })
          }
          // console.log('songUrlList',_this.songUrlList);
        }
      })
  }
  /**
   * 播放音乐
   * @param url
   */
  playMedia(url:string){
    const _this = this;
    _this.audio.pause();
    // _this.audio.crossOrigin = "anonymous";
    _this.audio.src = url; //播放当前点击的歌曲
    _this.audio.load();
    _this.audio.play();
    _this.getTime(_this.audio);
    _this.isLogin?_this.checkSongLove():'';
  }
  /**
   * 获取歌曲时长
   * @param Media
   */
  public getTime(Media:HTMLAudioElement,pause?:string) {
    const _this = this;
    setTimeout(function () {
      let duration = Media.duration;
      if(isNaN(duration)){
        _this.getTime(Media);
      }
      else{
        duration = Math.round(Media.duration);
        _this.MediaTime.duration = _this.setTimes(duration);
        console.info("该歌曲的总时间为："+_this.setTimes(duration)+"秒");
        if(pause!=="pause"){
          _this.clearTimes();
        }

        _this.times = setInterval(()=>{
          _this.MediaTime.currentTime = _this.setTimes(Math.floor(Media.currentTime));
          // console.log('currentTime：',_this.setTimes(Math.floor(Media.currentTime)));
          _this.progressWidth +=(100/duration);

          if(_this.audio.paused){
            //noinspection TypeScriptUnresolvedFunction
            clearInterval(_this.times);
            _this.isPlay = false;
          }
          if(_this.MediaTime.currentTime>=_this.MediaTime.duration||_this.audio.ended){
            console.log('结束播放');
            _this.isPlay = false;
            _this.handleMediaNext();
            //noinspection TypeScriptUnresolvedFunction
            clearInterval(_this.times);
          }
        },1000);
      }
    }, 10);
  }
  /**
   * 获取歌曲详情
   * @param id
   */
  public getSongDetail(id:string){
    const _this = this;
    _this.musicService.getSongDetail(id).subscribe(
      result=>{
        if(result.code==200){
          let arList =[];
          let data = result.songs[0];
          for(let i of data.ar){arList.push(i.name)}
          _this.media= new Song(data.id,data.name,arList.join('/'),data.ar[0].id,data.al.picUrl)
        }
      },
      error=>{
        console.log('歌曲获取错误:'+error);
      }
    )
  }

  /**
   * 播放暂停点击事件
   * @param Media
   */
  handleMediaPlay(){
    const _this = this;
    _this.isPlay = !_this.isPlay;
    if(_this.audio.paused){ //暂停状态
      _this.getTime(_this.audio,"pause");
      _this.audio.play();
    }
    else {
      _this.audio.pause();
    }
  }
  /**
   * 点击播放下一首
   */
  handleMediaNext(){
    const _this = this;
    _this.isPlay = true;
    // console.log('currentMedia',_this.currentMedia);
    // console.log('currentMedia',_this.media);
    if(_this.currentMedia.index>=_this.songUrlList.length-1){
      console.log('最后一首');
      _this.currentMedia = {
        id:_this.songUrlList[0].id,
        index:0
      }
    }
    else{
      _this.currentMedia = {
        id:_this.songUrlList[_this.currentMedia.index+1].id,
        index:_this.currentMedia.index+1
      }
    }
    // console.log(_this.songUrlList);
    _this.getSongDetail(_this.songUrlList[_this.currentMedia.index].id);
    _this.playMedia(_this.songUrlList[_this.currentMedia.index].url);
  }
  /**
   * 点击播放上一首
   */
  handleMediaBack(){
    const _this = this;
    _this.isPlay = true;
    if(_this.currentMedia.index==0){
      console.log('第一首');
      _this.currentMedia = {
        id:_this.songUrlList[_this.songUrlList.length-1].id,
        index:_this.songUrlList.length-1
      }
    }
    else{
      console.log('不是第一首',_this.currentMedia)
      _this.currentMedia = {
        id:_this.songUrlList[_this.currentMedia.index-1].id,
        index:_this.currentMedia.index-1
      }
    }
    _this.getSongDetail(_this.songUrlList[_this.currentMedia.index].id);
    _this.playMedia(_this.songUrlList[_this.currentMedia.index].url);
  }

  /**
   * 添加或删除歌曲到用户喜爱的歌单
    */
  public setTracks(){
    const _this = this;
    if(_this.isLogin&&_this.userInfo){
      _this.musicService.setSongToTracks(_this.isTracks?'delete':'add',_this.userInfo.headrtSongListId,_this.currentMedia.id).subscribe(
        result=>{
          let data = result;
          if(result.code==200){
            if(_this.isTracks){
              //取消喜欢就切换下一首
              _this.handleMediaNext();
            }
            _this.isTracks = !_this.isTracks;
            // store调用dispatch可发起action
            _this.store.dispatch({
              type: REFRESH,
              payload: 1
            });

          }
        }
      );

    }
    else {
      this.message.setOptions({ duration:1200 })
      _this.message['error']("抱歉,您暂未登录");
    }
  }
  /**
   * 秒长转换分钟格式
   * @param duration
   * @returns {string}
   */
  private setTimes(duration){
    let min,sec;
    min =Math.floor(duration/60)<10?('0'+Math.floor(duration/60)):Math.floor(duration/60);
    sec =Math.floor(duration-min*60)<10?('0'+Math.floor(duration-min*60)):Math.floor(duration-min*60);
    return `${min}:${sec}`;
    // console.log(`${min}:${sec}`);
  }





  /**
   * 歌曲清除时长和定时器
   */
  private clearTimes(){
    this.progressWidth=0;
    clearInterval(this.times);
    this.MediaTime.currentTime = "00:00";
  }

  /**
   * 图片加载错误
   * @param e
   */
  public updateUrl(e){
    e.src = this.default;
  }
  public loadingImg(e){
    console.log('加载中');
    e.src = this.media.blurPicUrl;
  }

}
