import { Component, OnInit } from '@angular/core';
import {MusicService} from "../service/music.service";

@Component({
  selector: 'app-singers',
  templateUrl: './singers.component.html',
  styleUrls: ['./singers.component.scss']
})
export class SingersComponent implements OnInit {
  defaultSrc:string ='/assets/image/loading.jpg';
  hotSingerList = [];
  constructor(private musicService:MusicService) { }

  ngOnInit() {

  }

  getSingers(){
    const _this = this;
    _this.musicService.getSingerList().subscribe(
      result=>{
        if(result.code==200){
          for(let item of result)
          _this.hotSingerList.push({

          })
        }
        else{
          console.log('错误代码',result.code);
        }
      },
      error=>{
        console.log('热门歌手请求错误',error);
      }
    )
  }

}
