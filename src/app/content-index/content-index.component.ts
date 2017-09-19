import {Component, OnInit, AfterContentInit} from '@angular/core';
import {MusicService} from "../service/music.service";
import {CookieService} from "angular2-cookie/services/cookies.service";

@Component({
  selector: 'content-index',
  templateUrl: './content-index.component.html',
  styleUrls: ['./content-index.component.scss']
})
export class ContentIndexComponent implements OnInit,AfterContentInit {

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
  bannerUrls = [
    "http://p3.music.126.net/s25q2x5QyqsAzilCurD-2w==/7973658325212564.jpg",
    "http://p4.music.126.net/V9-MXz6b2MNhEKjutoDWIg==/7937374441542745.jpg",
    "http://p4.music.126.net/CTU5B9R9y3XyYBZXJUXzTg==/2897213141428023.jpg",
    "http://p4.music.126.net/tGPljf-IMOCyPvumoWLOTg==/7987951976374270.jpg",
    "http://p4.music.126.net/mp2Y2n4ueZzIj6JSnUOdtw==/7875801790676538.jpg",
    "http://p3.music.126.net/e0gGadEhjur2UuUpDF9hPg==/7788940372125389.jpg"];
  constructor(public musicServer:MusicService,public cookieServer:CookieService) { }
  ngOnInit() {
    let songListCookie = this.cookieServer.getObject('newSongList');
    let songCookie = this.cookieServer.getObject('songList');
    if(songListCookie){
      this.newSongList =[];
      this.newSongList = this.cookieServer.getObject('newSongList');
    }
    else{
      this.getSongList();
    }
    songCookie?this.setSongList(songCookie):this.getSong();
  }
  ngAfterContentInit(): void {
    // this.getBannerImg();
  }
  public setSongList(data:any){
    this.songList = data;
  }
  public getBannerImg(){
    const _this = this;
    _this.musicServer.getBannerImg()
      .subscribe(result=>{
        _this.bannerUrls = [];
        for(let item of result.banners){
          _this.bannerUrls.push(item.pic.toString());
        }
        console.log(_this.bannerUrls)
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
              let option = {
                expires:_this.musicServer.setCookie(30) //设置缓存时长
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
  playSong(index:number){
    // this.cookieServer.putObject('songId',this.newSongList[index]);
    this.musicServer.song.emit(this.newSongList[index]);
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
