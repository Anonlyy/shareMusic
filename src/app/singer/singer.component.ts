import { Component, OnInit } from '@angular/core';
import {Song} from "../content-index/content-index.component";
import {ActivatedRoute} from "@angular/router";
import {MusicService} from "../service/music.service";
import {Artists} from "../search-result/search-result.component";

@Component({
  selector: 'app-singer',
  templateUrl: './singer.component.html',
  styleUrls: ['./singer.component.scss']
})
export class SingerComponent implements OnInit {
  defaultSrc:string ='/assets/image/loading.jpg';
  song:Song = new Song('0','null','null','0','/assets/image/loading.jpg','0',0);
  artist:Artists =new Artists('0','null','/assets/image/loading.jpg',0,0,0,'暂无描述','xxx');
  songList = [];
  isLoading:boolean = true;
  constructor(public routerInfo:ActivatedRoute,public musicServer:MusicService) { }

  ngOnInit() {
    const _this = this;
    _this.routerInfo.params.subscribe(
      result=> {
        //noinspection TypeScriptUnresolvedVariable
        _this.getSingerInfo(result.id);
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
            _this.artist = new Artists(singerInfo.id,singerInfo.name,singerInfo.picUrl,singerInfo.albumSize,0,0,singerInfo.briefDesc==null?'暂无描述':singerInfo.briefDesc,singerInfo.alias[0]);
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

  updateUrl(img){
    img.src = this.artist.picUrl;
  }
}
