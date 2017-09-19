import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent implements OnInit {

  id:any;
  constructor(public routerInfo:ActivatedRoute) { }

  ngOnInit() {
    const _this = this;
    this.routerInfo.params.subscribe(
      data=>{
        _this.id = data;
      }
    )
  }

}
