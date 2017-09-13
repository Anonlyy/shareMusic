import { Component, OnInit } from '@angular/core';
import {Input} from "@angular/core/src/metadata/directives";
import {Http} from "@angular/http";

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  songUrl:string;
  constructor(public http:Http) { }

  ngOnInit() {
    // this.http.get('/music/url?id=347230').subscribe(result=>{
    //   let data = result.json();
    //   this.songUrl = data.data[0].url;
    //   console.log(this.songUrl)
    // })
  }
}
