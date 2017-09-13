import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class UserService {

  constructor(public http:Http) { }

  /**
   * 登录账号
   * @param phone
   * @param password
   * @returns {Observable<R|T>}
   */
  public login(phone:string,password:string): Observable<any>{
    return this.http.get(`/login/cellphone?phone=${phone}&password=${password}`)
      .map(this.handleSuccess)
      .catch(this.handleError);
  }

  /**
   * 刷新登录
   * @returns {Observable<R|T>}
   */
  public loginRefresh(): Observable<any>{
    return this.http.get(`/login/refresh`)
      .map(this.handleSuccess)
      .catch(this.handleError);
  }

  /**
   * 获取用户歌单
   * @param uid
   * @returns {Observable<R|T>}
   */
  public getUserPlaylist(uid:string):Observable<any>{
    return this.http.get(`/user/playlist?uid=${uid}`)
      .map(this.handleSuccess)
      .catch(this.handleError);
  }

  public handleSuccess(res){
    return res.json();
  }
  public handleError(error){
    return Observable.throw(`${error}`);
  }
}
