import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {Song} from "../content-index/content-index.component";
import {SearchMusicService} from "../service/search-music.service";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  song:Song = new Song('0','null','null','0','/assets/image/loading.jpg','0',0);
  songList=[];//存储所有歌曲对象
  searchValue:string = ''; //搜索结果
  constructor(public searchMusicService:SearchMusicService,public routerInfo:ActivatedRoute) { }

  ngOnInit() {
    const _this = this;
    _this.routerInfo.params.subscribe(
      result=>{
        //noinspection TypeScriptUnresolvedVariable
        _this.searchValue = result.value;
        _this.getSearchValue();
      }
    )
  }
  getSearchValue(){
    const _this = this;
    _this.searchMusicService.searchMusic(_this.searchValue)
      .subscribe(
        result=>{
          if(result.code==200){
            let data = result.result.songs;
            _this.songList = [];
            for(let item of data){
              _this.song = new Song(item.id,item.name,item.artists[0].name,item.artists[0].id,item.artists[0].img1v1Url,item.album.name,item.duration);
              _this.songList.push(_this.song);
            }
            console.log(_this.songList);
          }
        }
      )
  }

}
