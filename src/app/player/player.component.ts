import { Component, OnInit } from '@angular/core';
import {Input} from "@angular/core/src/metadata/directives";
import {Http} from "@angular/http";
import {CookieService} from "angular2-cookie/services/cookies.service";
import {MusicService} from "../service/music.service";
import {Song} from "../content-index/content-index.component";
import {Observable} from "rxjs";

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  audio:HTMLAudioElement = new Audio(); //音乐对象
  media:Song = new Song('00','NULL','NULL','NULL','NULL');
  MediaTime = {
    duration:'00:00',
    currentTime:'00:00'
  };
  progressWidth:number = 0;
  isPlay:boolean = false;
  currentId:string;
  constructor(public musicService:MusicService,public cookieService:CookieService) {}

  ngOnInit() {
    //得到当前歌曲的id
    this.musicService.emitSong.subscribe((result)=>{//获取歌曲详情
      //noinspection TypeScriptUnresolvedVariable
      this.currentId =result.currentSong.id.toString();
      this.media = result.currentSong;
      this.playMedia(result.ids);
    });

  }

  /**
   * 播放音乐事件
   * @param idList
   */

  playMedia(idList){
    const _this = this;
    _this.isPlay = true;
    let currentIndex = idList.findIndex(arr=>{
      return arr==_this.currentId;
    });
    console.log('currentIndex',currentIndex)
    _this.musicService.getSongUrl(idList.join(','))
      .subscribe(result=>{
        let data = result;
        if(data.code==200){
          console.log('_this.currentId',data.data[currentIndex].url);
          _this.audio.src = data.data[currentIndex].url;
          _this.audio.load();
          _this.audio.play();
          _this.getTime(_this.audio);
        }
      })
  }

  /**
   * 获取歌曲时长
   * @param Media
   */
  public getTime(Media:HTMLAudioElement) {
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
        let times = setInterval(()=>{
          _this.MediaTime.currentTime = _this.setTimes(Math.floor(Media.currentTime));
          // console.log('currentTime：',_this.setTimes(Math.floor(Media.currentTime)));
          _this.progressWidth +=(100/duration);

          if(_this.MediaTime.currentTime>=_this.MediaTime.duration||_this.audio.paused){
            //noinspection TypeScriptUnresolvedFunction
            clearInterval(times);
            _this.progressWidth=0;
            _this.isPlay = false;
            _this.MediaTime.currentTime = "00:00";
          }
        },1000);

      }
    }, 10);
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
   * 播放暂停点击事件
   * @param Media
   */

  handleMediaPlay(){
    const _this = this;
    _this.isPlay = !_this.isPlay;
    if(_this.audio.paused){ //暂停状态
      _this.getTime(_this.audio);
      _this.audio.play();
    }
    else {
      _this.audio.pause();
    }

    // Media.play().then(result=>{
    //   console.log("======开始播放========")
    // }).catch(
    //   console.log("=======播放出错=======")
    // )
  }
}
