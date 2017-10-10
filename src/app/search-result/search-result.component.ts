import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import {Song} from "../content-index/content-index.component";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  song:Song = new Song('0','null','null','0','/assets/image/loading.jpg','0',0);
  songList=[];//存储所有歌曲对象
  constructor(public http:Http,public router:Router) { }

  ngOnInit() {

  }

}
