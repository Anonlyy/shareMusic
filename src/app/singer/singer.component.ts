import { Component, OnInit } from '@angular/core';
import {Song} from "../content-index/content-index.component";
import {ActivatedRoute} from "@angular/router";
import {MusicService} from "../service/music.service";
import {Artists, Albums} from "../search-result/search-result.component";

@Component({
  selector: 'app-singer',
  templateUrl: './singer.component.html',
  styleUrls: ['./singer.component.scss']
})
export class SingerComponent implements OnInit {
  singerId:string = '0';
  defaultSrc:string ='/assets/image/loading.jpg';
  song:Song = new Song('0','null','null','0','/assets/image/loading.jpg','0',0);
  artist:Artists =new Artists('0','null','/assets/image/loading.jpg',0,0,0,'暂无描述','xxx');
  songList = [];
  isLoading:boolean = true;
  searchTypeList = [
    {
      name: '歌曲',
    },
    {
      name: '专辑',
    },
    {
      name: '详情',
    },
    {
      name: '相似歌手',
    }];
  currentNavIndex:number=0;
  albums: Albums = new Albums('0', '0', '/assets/image/loading.jpg', '0', 0,'0');
  albumsList = []; //存储所有专辑对象
  pageCount: number = 0; //结果条数
  introduction = []; //歌手经历
  constructor(public routerInfo:ActivatedRoute,public musicServer:MusicService) { }

  ngOnInit() {
    const _this = this;
    _this.routerInfo.params.subscribe(
      result=> {
        _this.isLoading = true;
        //noinspection TypeScriptUnresolvedVariable
        _this.singerId = result.id;
        _this.currentNavIndex = 0; //返回单曲选项卡
        _this.getSingerInfo( _this.singerId);
      }
    )
  }
  //获取歌手单曲和基本信息
  getSingerInfo(id:string){
    const _this = this;
    _this.musicServer.getSinger(id).subscribe(
        result=>{
          if(result.code==200){
            _this.songList = [];
            let singerInfo = result.artist;
            let arList;
            //noinspection TypeScriptUnresolvedVariable
            _this.artist = new Artists(singerInfo.id,singerInfo.name,singerInfo.picUrl,singerInfo.albumSize,0,0,(singerInfo.briefDesc==null||singerInfo.briefDesc=="")?'暂无描述':singerInfo.briefDesc,singerInfo.alias[0]);
            for(let item of result.hotSongs){
              arList = [];
              for (let j of item.ar) {
                arList.push(j.name)
              }
              _this.song = new Song(item.id,item.name,arList.join('/'),item.ar[0].id,item.al.picUrl,item.al.name,item.dt);
              _this.songList.push(_this.song);
            }
            _this.isLoading = false;
          }
          else{
            alert('获取歌手信息错误');
          }
        },
        error=>{
          alert('获取歌手信息错误:'+error);
        }
      )
  }
  //获取歌手专辑信息
  getSingerAlbum(id:string,limit:number=1000,offset:number=0){
    const _this = this;
    _this.musicServer.getSingerAlbum(id,limit,offset).subscribe(
      result=>{
        if(result.code==200){
          let arList;
          _this.albumsList = [];
          // _this.pageCount<=0? _this.pageCount = Math.ceil(result.hotAlbums.length/30):'';
          for(let item of result.hotAlbums){
            arList = [];
            for (let j of item.artists) {
              arList.push(j.name)
            }
            _this.albums = new Albums(item.id,item.name,item.blurPicUrl,arList.join('/'),item.size,item.publishTime);
            _this.albumsList.push(_this.albums);
          }
          _this.isLoading = false;
          console.log(_this.pageCount,_this.albumsList);
        }
      }
    )
  }
  //获取歌手详细描述
  getSingerIntroduction(id:string){
    const _this = this;
    _this.musicServer.getSingerIntroduction(id).subscribe(
      result=>{
        console.log(result);
        if(result.code==200){
          for(let item of result.introduction){
            _this.introduction.push(item)
          }
        }
        else{
          console.log(result.code);
        }
      }
    )
  }
  //翻页(因为接口问题,所以暂时无法实现翻页功能)
  // changePagination(pageIndex: number) {
  //   this.getSingerAlbum(this.singerId,30,pageIndex - 1);
  // }
  //切换选项卡
  changeNavbar(index: number) {
    const _this = this;
    _this.currentNavIndex = index;
    switch (index){
      case 0:
        _this.getSingerInfo(_this.singerId);
        break;
      case 1:
        _this.getSingerAlbum(_this.singerId);
        break;
      case 2:
        _this.getSingerIntroduction(_this.singerId);
    }
    // _this.isLoading = true;
  }
//图片加载完成
  imgLoad(img:any,url:string){
    if(url==null||url=='null'||url==''){img.src=this.defaultSrc;return;}
    img.src = url;
  }
  updateUrl(img){
    img.src = this.defaultSrc;
  }
}
