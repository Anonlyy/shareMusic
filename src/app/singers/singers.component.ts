import { Component, OnInit } from '@angular/core';
import {MusicService} from "../service/music.service";
import {Artists} from "../search-result/search-result.component";

@Component({
  selector: 'app-singers',
  templateUrl: './singers.component.html',
  styleUrls: ['./singers.component.scss']
})
export class SingersComponent implements OnInit {
  defaultSrc:string ='/assets/image/loading.jpg';
  artists:Artists;
  hotSingerList = [];
  isLoading:boolean = true;
  constructor(private musicService:MusicService) { }

  ngOnInit() {
    this.getSingers();
  }
  public getSingers():void{
    const _this = this;
    _this.musicService.getSingerList().subscribe(
      result=>{
        if(result.code==200){
          for(let item of result.artists){
            _this.artists = new Artists(item.id,item.name,item.img1v1Url,item.albumSize,0,item.musicSize,'null',(item.alias==null||item.alias.length==0)?"":('/'+item.alias));
            _this.hotSingerList.push(_this.artists);
          }
          _this.isLoading = false;
        }
        else{
          console.log('错误代码',result.code);
        }
        console.log(_this.hotSingerList);
      },
      error=>{
        console.log('热门歌手请求错误',error);
      }
    )
  }
  //图片加载完成
  imgLoad(img:any,url:string){
    if(url==null||url=='null'||url==''){img.src=this.defaultSrc;return;}
    img.src = url;
  }
}
