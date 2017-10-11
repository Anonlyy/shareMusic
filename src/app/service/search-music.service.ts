import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Http} from "@angular/http";

@Injectable()
export class SearchMusicService {

  constructor(public http:Http) { }

  /**
   * 搜索音乐
   * @param keywords
   * @param type
   * @returns {Observable<R|T>}
   */
  searchMusic(keywords:string,offset:number,type:string|number):Observable<any>{
    return this.http.get(`/search?keywords=${keywords}&offset=${offset}&type=${type}`)
      .map(this.handleSuccess)
      .catch(this.handleError);
  }

  /**
   * 搜索建议
   * @param keywords
   * @returns {Observable<R|T>}
   */
  searchSuggest(keywords:string):Observable<any>{
    return this.http.get(`/search/suggest?keywords=${keywords}&limit=10`)
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
