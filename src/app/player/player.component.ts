import { Component, OnInit } from '@angular/core';
import {Input} from "@angular/core/src/metadata/directives";
import {Http} from "@angular/http";
import {CookieService} from "angular2-cookie/services/cookies.service";
import {MusicService} from "../service/music.service";
import {Song} from "../content-index/content-index.component";

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  audio:HTMLAudioElement; //音乐对象
  constructor(public musicService:MusicService) {


  }

  ngOnInit() {
    // console.log(this.MediaObj);
    // this.http.get('/music/url?id=347230').subscribe(result=>{
    //   let data = result.json();
    //   this.songUrl = data.data[0].url;
    //   console.log(this.songUrl)
    // })
    // this.playMedia('347221');
      this.musicService.getSongId()
        .subscribe(result=>{
          console.log(result);
        })


  }

  playMedia(id:string){
    const _this = this;
    _this.musicService.getSongUrl(id)
      .subscribe(result=>{
        let data = result;
        if(data.code==200){
          _this.audio = new Audio();
          _this.audio.src = data.data[0].url;
          _this.audio.load();
          _this.audio.play();
        }
      })
  }
  mediaPlay(Media:any){
    // Media.play().then(result=>{
    //   console.log("======开始播放========")
    // }).catch(
    //   console.log("=======播放出错=======")
    // )
  }
}
