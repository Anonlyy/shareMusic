import { Component, OnInit } from '@angular/core';
import {UserService} from "../service/user.service";
import {CookieService} from "angular2-cookie/services/cookies.service";
import {Router, Routes} from "@angular/router";
import {FormControl} from "@angular/forms";
import {SearchMusicService} from "../service/search-music.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isFullScreen:boolean = false;
  searchValue:FormControl = new FormControl();
  searchSuggestList = [
    {
      icon:'headphones',
      key:"albums",
      name:"专辑",
      list: [],  //专辑
    },
    {
      icon:'user-o',
      key:"artists",
      name:"歌手",
      list:[],
    },
    {
      icon:'list-ul',
      key:"playlists",
      name:"歌单",
      list:[], //歌单
    },
    {
      icon:'music',
      key:"songs",
      name:"歌曲",
      list:[], //歌曲
    },
  ];
  isFocus:boolean=false;
  constructor(public searchMusicService:SearchMusicService,public cookieService:CookieService,public router:Router) { }

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
  //退出登录
  clearUserCookie(){
    this.cookieService.remove('userInfo');
    window.location.reload();
    this.router.navigate(['/index']);
  }
  inputFocus(){
    const _this = this;
    _this.searchValue.valueChanges.subscribe(result=>{
      if(result==""||result==null){
        _this.isFocus = false;
        return;
      }
      _this.getSearchSuggest(result);
    })
  }
  //获取搜索建议
  getSearchSuggest(keywords:any){
    const _this = this;
    _this.isFocus = true;
    _this.searchMusicService.searchSuggest(keywords).subscribe(
        result=>{
          if(result.code===200){
            _this.searchSuggestList.forEach(arr=>{
              arr['list'].splice(0,arr['list'].length);
            }) //清空数组
            let data = result.result;
            for(let i=0;i<data.order.length;i++){
              let key = data.order[i];
              _this.searchSuggestList.forEach(arr=>{
                if(arr['key']==key){
                  arr['list'] = data[key];
                }
              })
            }
            // console.log('key',_this.searchSuggestList);
          }
        },
        error=>{
          alert('搜索有误:'+error);
        })
  }
  //跳转搜索结果页(限歌曲)
  toSearchResult(key:string,value:any){
    if(key=='songs'){
      this.router.navigate(['/searchResult',value]);
    }


  }
  //失去焦点事件
  inputBlur(){
    setTimeout(()=>{
      this.isFocus = false;
    },300)
  }
}

