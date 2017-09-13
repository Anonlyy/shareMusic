import { Component, OnInit } from '@angular/core';
import {MusicService} from "../service/music.service";
import {CookieService} from "angular2-cookie/services/cookies.service";

@Component({
  selector: 'content-index',
  templateUrl: './content-index.component.html',
  styleUrls: ['./content-index.component.scss']
})
export class ContentIndexComponent implements OnInit {
  songList:SongList;  //推荐歌单
  newSongList=[]; //最新音乐列表
  newSong:Song; //最新音乐
  constructor(public musicServer:MusicService,public cookieServer:CookieService) { }

  ngOnInit() {
    this.getSongList();
    // if(!this.cookieServer.getObject('newSongList')){
    //   console.log(this.cookieServer.getObject('newSongList'));
    // }
    this.getSong();
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
            for(let i of data.result){
              // console.log(i);
              _this.newSong = new Song(i.id,i.song.name,i.song.artists[0].name,i.song.artists[0].id,i.song.album.picUrl);
              _this.newSongList.push(_this.newSong);
              // _this.cookieServer.putObject('newSongList',_this.newSongList);
            }
            console.log('newSongList',_this.newSongList);
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
