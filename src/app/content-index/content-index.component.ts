import {Component, OnInit, AfterContentInit} from '@angular/core';
import {MusicService, EmitSong} from "../service/music.service";
import {CookieService} from "angular2-cookie/services/cookies.service";
import {Router} from "@angular/router";

@Component({
  selector: 'content-index',
  templateUrl: './content-index.component.html',
  styleUrls: ['./content-index.component.scss']
})
export class ContentIndexComponent implements OnInit {

  topList = [
    {
      id:'0',
      name:'云音乐新歌榜',
      picUrl:'/assets/image/topList0.jpg'
    },
    {
      id:'1',
      name:'云音乐热歌榜',
      picUrl:'/assets/image/topList2.jpg'
    },
    {
      id:'2',
      name:'网易原创歌曲榜',
      picUrl:'/assets/image/topList3.jpg'
    },
    {
      id:'3',
      name:'云音乐飙升榜',
      picUrl:'/assets/image/topList1.jpg'
    },
    {
      id:'4',
      name:'云音乐电音榜',
      picUrl:'/assets/image/topList4.jpg'
    }];  //排行榜数据
  songList:SongList;  //推荐歌单
  newSongList:any; //最新音乐列表
  newSong:Song; //最新音乐
  banners = [];
  songIds = []; //存储播放列表的id列表
  default ='/assets/image/loading.jpg'
  constructor(public musicServer:MusicService,public cookieServer:CookieService,public router:Router) { }
  ngOnInit() {
    this.getBannerImg()
    let songListCookie = this.cookieServer.getObject('newSongList');
    let songCookie = this.cookieServer.getObject('songList');
    if(songListCookie){
      this.newSongList =[];
      this.songIds = [];
      this.newSongList = this.cookieServer.getObject('newSongList');
      for(let item of this.newSongList){
        this.songIds.push(item.id);
      }
    }
    else{
      this.getSongList();
    }
    //获取新音乐
    songCookie?this.setSongList(songCookie):this.getNewSong();
  }
  public setSongList(data:any){
    this.songList = data;
  }
  //获取banner
  public getBannerImg(){
    const _this = this;
    _this.musicServer.getBannerImg()
      .subscribe(result=>{
        _this.banners = [];
        for(let item of result.banners){
          _this.banners.push(item);
        }
      })
  }
  public getSongList(){
    const _this = this;
    _this.musicServer.getPersonalized()
      .subscribe(
        result=>{
          let data = result;
          if(data.code==200){
            _this.songList = data.result;
            let option = {
              expires:_this.musicServer.setCookie(30) //设置缓存时长
            }
            _this.cookieServer.putObject('songList',_this.songList,option);
          }
          else{
            console.log(data);
          }
        },
        error=>{
          alert(error);
        });
  }
  public getNewSong(){
    const _this = this;
    _this.musicServer.getNewSong()
      .subscribe(
        result=>{
          let data = result;
          if(data.code==200){
            // console.log(i);
            _this.newSongList =[];
            for(let item of data.result){
              _this.songIds.push(item.id);
              _this.newSong = new Song(item.id,item.song.name,item.song.artists[0].name,item.song.artists[0].id,item.song.album.picUrl);
              _this.newSongList.push(_this.newSong);
              let option = {
                expires:_this.musicServer.setCookie(30) //设置缓存有效期,分钟为单位
              }
              _this.cookieServer.putObject('newSongList',_this.newSongList,option);
            }
          }
          else{
            console.log(data);
          }
        },
        error=>{
          alert(error);
        }
      );
  }
  public playSong(index:number){
    this.musicServer.emitSong.emit(new EmitSong(this.newSongList[index],this.songIds));
  }
  public updateUrl(e){
    e.src = this.default;
  }
  public getTopListId(index:number){
    const _this = this;
    _this.musicServer.getTopList(index).subscribe(
      result=>{
        let data = result.result;
        // console.log('排行榜id:',data.id);
        _this.router.navigate(['/list',data.id]);
      },
      error=>{
        console.log('error',error);
      }
    )
  }
}

//单个·歌单对象
export class SongList{
  constructor(
    private id:string,
    public name:string,//歌单名字
    public picUrl:string, //歌单图片
    public playCount:number, //收藏指数
    public copywriter:string, //推荐理由
    public trackCount:number, //歌单歌曲数目
    public creator:string  //歌单创建者
  ){}
}

//单个·歌曲对象
export class Song{
  constructor(
    private id:string,
    public name:string,//歌曲名字
    public artistsName:string, //歌手名字
    private artistsId:string, //对应的歌手ID
    public blurPicUrl:string, //歌曲封面图片
    public alName?:string, //专辑名字
    public dt?:number,//歌曲时长
  ){}
}
