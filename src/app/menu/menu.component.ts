import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {telValidator} from "../valid/validator"
import {UserService} from "../service/user.service";
import {CookieService} from "angular2-cookie/services/cookies.service";
import {userInfo} from "os";
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
  userInfo:UserInfo;
  isLogin:boolean=false;//检测是否登录
  isOpen:boolean=false;
  userPlayList=[]; //歌单列表

  constructor(public fbind:FormBuilder,public userServer:UserService,public cookieService:CookieService) { }

  ngOnInit() {
    this.loginForm = this.fbind.group({
      tel:["",[Validators.required,telValidator]],
      password:["",[Validators.required,Validators.minLength(6)]]
    });
    if(this.cookieService.get('userInfo')){
      this.userData = this.cookieService.get('userInfo');
      this.dataToUserInfo(JSON.parse(this.userData));
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
    }
    else{
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
            _this.cookieService.putObject('userInfo',data.profile);
            _this.userServer.loginRefresh().subscribe(
              result=>{
                if(result.code==200){  //登录成功
                  console.log('=====刷新成功=====');
                  _this.dataToUserInfo(_this.userData);
                  _this.loginForm.reset();
                }
              }
            )
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
  }
  dataToUserInfo(userData:any){
    const _this = this;
    _this.isLogin = true;
    console.log('=====用户信息赋值成功===='+userData.userId);
    _this.userInfo = new UserInfo(userData.userId,userData.nickname,userData.avatarUrl);
    _this.userServer.getUserPlaylist(_this.userInfo.userId)
      .subscribe(result=>{
        let data = result;
        console.log(data);
        if(data.code==200){
          _this.userPlayList = data.playlist;
        }
        else{
          console.log("获取失败:"+data.code);
        }
      })
  }
  openList(){
    this.isOpen = !this.isOpen;
  }
}


export class UserInfo{
  constructor(public userId:string,public username:string,public avatarUrl:string){}
}
