import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Http} from "@angular/http";

@Injectable()
export class MusicService {

  constructor(public http:Http) { }

  /**
   * 获取推荐歌单
   * @returns {Observable<R|T>}
   */
  public getPersonalized():Observable<any>{
    return this.http.get(`/personalized`)
      .map(this.handleSuccess)
      .catch(this.handleError);
  }

  public getNewSong():Observable<any>{
    return this.http.get(`personalized/newsong`)
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
