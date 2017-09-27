import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isFullScreen:boolean = false;
  constructor() { }

  ngOnInit() {

  }

  //全屏
  fullScreen(flag:boolean) {
    this.isFullScreen = !this.isFullScreen;
    if(flag){
      var docElm = document.documentElement;
      //W3C
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      }
      //Chrome等
      else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      }
    }
    else{
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }

  }
}
