import { Component, OnInit } from '@angular/core';
import {UserService} from "../service/user.service";
import {CookieService} from "angular2-cookie/services/cookies.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isFullScreen:boolean = false;
  constructor(public userService:UserService,public cookieService:CookieService) { }

  ngOnInit() {
    const _this = this;
    if(_this.cookieService.getObject('userInfo')){ //读取用户信息缓存
      console.log(_this.cookieService.getObject('userInfo'));
    }
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
