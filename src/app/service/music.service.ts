import {Injectable, EventEmitter} from '@angular/core';
import {Observable} from "rxjs";
import {Http} from "@angular/http";
import {Song} from "../content-index/content-index.component";

@Injectable()
export class MusicService {
  song: EventEmitter<Song>;
  constructor(public http:Http) {
    this.song = new EventEmitter();
  }
  /**
   * 获取推荐歌单
   * @returns {Observable<R|T>}
   */
  public getPersonalized():Observable<any>{
    return this.http.get(`/personalized`)
      .map(this.handleSuccess)
      .catch(this.handleError);
  }

  /**
   * 获取最新音乐
   * @returns {Observable<R|T>}
   */
  public getNewSong():Observable<any>{
    return this.http.get(`personalized/newsong`)
      .map(this.handleSuccess)
      .catch(this.handleError);
  }

  /**
   * 获取banner
   * @returns {Observable<R|T>}
   */
  public getBannerImg():Observable<any>{
    return this.http.get(`banner`)
      .map(this.handleSuccess)
      .catch(this.handleError);
  }

  /**
   * 获取音乐URL
   * @param id
   * @returns {Observable<R|T>}
   */
  public getSongUrl(id:string):Observable<any>{
    return this.http.get(`/music/url?id=${id}`)
      .map(this.handleSuccess)
      .catch(this.handleError);
  }

  public getPlayListDetail(id:string):Observable<any>{
    return this.http.get(`/playlist/detail?id=${id}`)
      .map(this.handleSuccess)
      .catch(this.handleError);
  }

  public setCookie(time:number):Date{
    let date = new Date();
    date.setMinutes(date.getMinutes()+time);
    return date;
  }

  public handleSuccess(res){
    return res.json();
  }
  public handleError(error){
    return Observable.throw(`${error}`);
  }
}
