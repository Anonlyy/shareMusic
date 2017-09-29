import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {telValidator} from "../valid/validator"
import {UserService} from "../service/user.service";
import {CookieService} from "angular2-cookie/services/cookies.service";
import {Router, NavigationEnd} from "@angular/router";
import {MusicService} from "../service/music.service";
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  delayMessages=[];
  messageTheme:string="error"; //消息通知主题
  leftSidenav:boolean = false; //控制侧边栏
  loginForm:FormGroup;
  userData:any;
  userInfo:UserInfo = new UserInfo('0','Xposean','/assets/image/loading.jpg','null');
  isLogin:boolean=false;//检测是否登录
  isOpen:boolean=false;
  userPlayList=[]; //歌单列表
  menuNavbar = [
    {
      name:'音乐广场',
      icon:"music",
      url:'/index'
    },
    {
      name:'MV',
      icon:"film",
      url:'/mv'
    },
    {
      name:'电台',
      icon:"heartbeat",
      url:'/radio'
    },
    {
      name:'播放历史',
      icon:"clock-o",
      url:'/history'
    }
  ]

  constructor(public fbind:FormBuilder,public userServer:UserService,public cookieService:CookieService,public router:Router,public musicServer:MusicService) { }

  ngOnInit() {
    this.loginForm = this.fbind.group({
      tel:["",[Validators.required,telValidator]],
      password:["",[Validators.required,Validators.minLength(6)]]
    });
    if(this.cookieService.getObject('userInfo')){ //读取用户信息缓存
      this.userData = this.cookieService.getObject('userInfo');
      this.dataToUserInfo(this.userData);
    }
  }
  switchSlideNav(){
    this.leftSidenav = !this.leftSidenav;
  }
  formSubmit(){
    const _this = this;
    if(_this.loginForm.get('tel').value==""||_this.loginForm.get('password').value==""){
      _this.delayMessages.push({
        title: '通知',
        content: '账号或密码为空！'
      });
      return;
    }
    _this.getUserInfo();
  }

  //获取用户信息
  getUserInfo(){
    const _this = this;
    _this.userServer.login(_this.loginForm.get('tel').value,_this.loginForm.get('password').value)
      .subscribe(result=>{
        let data = result;
        if(data.code==200){
          _this.messageTheme = 'success';
          _this.delayMessages.push({
            title: '通知',
            content: '登录成功！'
          });
          _this.switchSlideNav();
          _this.userServer.loginRefresh().subscribe(
            result=>{
              if(result.code==200){  //登录成功
                console.log('=====刷新成功=====',data);
                _this.isLogin = true;
                _this.userInfo = new UserInfo(data.profile.userId,data.profile.nickname,data.profile.avatarUrl,'null');
                _this.dataToUserInfo(_this.userInfo); //获取歌单
                _this.loginForm.reset();
              }
              else{
                _this.loginForm.reset();
                console.log('=====刷新失败=====')
              }
            });

        }
        else if(data.code==415){
          _this.messageTheme = 'warning';
          _this.delayMessages.push({
            title: '通知',
            content: '登陆次数过多,请稍后再试！'
          });
        }
        else{
          _this.messageTheme = 'error';
          _this.delayMessages.push({
            title: '通知',
            content: '账户密码错误！'
          });
        }
      })
  }
  //获取用户歌单
  dataToUserInfo(userData:UserInfo){
    const _this = this;
    _this.isLogin = true;
    console.log('=====用户信息赋值成功===='+userData.userId);
    _this.userInfo = new UserInfo(userData.userId,userData.username,userData.avatarUrl);
    _this.userServer.getUserPlaylist(_this.userInfo.userId)
      .subscribe(result=>{
        let data = result;
        if(data.code==200){
          _this.userPlayList = data.playlist;
          _this.userInfo.headrtSongListId = _this.userPlayList[0].id; //获取用户喜爱的歌单
          //用户信息存入缓存
          let option = {
            expires:_this.musicServer.setCookie(30) //设置缓存时长
          }
          _this.cookieService.putObject('userInfo',_this.userInfo,option);
          _this.userServer.emitUser.emit(_this.userInfo); //传递给服务,广播给其他组件用户已经登录
        }
        else{
          console.log("获取失败:"+data.code);
        }
      });

  }
  openList(){
    this.isOpen = !this.isOpen;
  }
}

//用户信息对象
export class UserInfo{
  constructor(
    public userId:string,
    public username:string,
    public avatarUrl:string,
    public headrtSongListId?:string,//用户喜欢的音乐歌单的id
  ){}
}
