import { Component, OnInit } from '@angular/core';
import {MusicService} from "../service/music.service";
import {CookieService} from "angular2-cookie/services/cookies.service";

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
  bannerUrl:string;
  constructor(public musicServer:MusicService,public cookieServer:CookieService) { }
  ngOnInit() {
    this.getBannerImg();
    this.newSongList =[];
    let songListCookie = this.cookieServer.getObject('newSongList');
    let songCookie = this.cookieServer.getObject('songList');
    if(songListCookie){this.newSongList = this.cookieServer.getObject('newSongList');}
    else{this.getSongList();}
    if(songCookie){this.setSongList(songCookie);}
    else{this.getSong();}
  }
  public setSongList(data:any){
    this.songList = data;
  }
  public getBannerImg(){
    const _this = this;
    _this.musicServer.getBannerImg()
      .subscribe(result=>{
        _this.bannerUrl = result.banners[Math.ceil(Math.random()*5)].pic;
        console.log(_this.bannerUrl)
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
            // _this.cookieServer.putObject('songList',_this.songList);
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
  public getSong(){
    const _this = this;
    _this.musicServer.getNewSong()
      .subscribe(
        result=>{
          let data = result;
          if(data.code==200){
            // console.log(i);
            _this.newSongList =[];
            for(let item of data.result){
              _this.newSong = new Song(item.id,item.song.name,item.song.artists[0].name,item.song.artists[0].id,item.song.album.picUrl);
              _this.newSongList.push(_this.newSong);
              // _this.cookieServer.putObject('newSongList',_this.newSongList);
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
  playSong(index:number){
    // console.log(this.newSongList[index]);
    this.musicServer.setSongId(this.newSongList[index]);
    // let id = this.newSongList[]
    // this.musicServer.setSongId()
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
    public trackCount:number //歌单歌曲数目
  ){}
}

//单个·歌曲对象
export class Song{
  constructor(
    private id:string,
    public name:string,//歌曲名字
    public artistsName:string, //歌手名字
    private artistsId:string, //对应的歌曲ID
    public blurPicUrl:string, //歌曲封面图片
  ){}
}
