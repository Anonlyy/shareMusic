import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Http} from "@angular/http";

@Injectable()
export class RadioServiceService {

  constructor(public http:Http) { }

  /**
   * 获取电台分类
   * @returns {Observable<R|T>}
   */
  public getRadioCatelis():Observable<any> {
    return this.http.get(`/dj/catelist`)
      .map(this.handleSuccess)
      .catch(this.handleError);
  }

  /**
   * 获取推荐节目
   * @returns {Observable<R|T>}
   */
  public getRecommend():Observable<any> {
    return this.http.get(`/program/recommend`)
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
