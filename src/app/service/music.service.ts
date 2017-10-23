import {Http} from "@angular/http";
import {Injectable, EventEmitter} from '@angular/core';
import {Observable} from "rxjs";
import 'rxjs/Rx';
import {Song} from "../content-index/content-index.component";

@Injectable()
export class MusicService {
  emitSong: EventEmitter<EmitSong>;

  constructor(public http:Http) {
    //如需播放歌曲,需传输当前歌曲对象和idList
    this.emitSong = new EventEmitter();
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

  /**
   * 获取歌单详情
   * @param id
   * @returns {Observable<R|T>}
   */
  public getPlayListDetail(id:string):Observable<any>{
    let timestamp = new Date().getTime()
    return this.http.get(`/playlist/detail?id=${id}&&timestamp=${timestamp}`)
      .map(this.handleSuccess)
      .catch(this.handleError);
  }
  /**
   * 获取歌曲详情
   * @param id
   * @returns {Observable<R|T>}
   */

  public getSongDetail(id:string):Observable<any>{
    return this.http.get(`/song/detail?ids=${id}`)
      .map(this.handleSuccess)
      .catch(this.handleError);
  }


  /**
   * 收藏单曲到歌曲
   * @param op(add/delete)
   * @param pid 歌单id
   * @param tracks 歌单id
   * @returns {Observable<R|T>}
   */
  public setSongToTracks(op:string,pid:string,tracks:string):Observable<any>{
    return this.http.get(`/playlist/tracks?op=${op}&pid=${pid}&tracks=${tracks}`)
      .map(this.handleSuccess)
      .catch(this.handleError);
  }

  /**
   * 获取排行榜
   * @param idx
   * @returns {Observable<R|T>}
   */
  public getTopList(idx:number):Observable<any>{
    return this.http.get(`/top/list?idx=${idx}`)
      .map(this.handleSuccess)
      .catch(this.handleError);
  }

  /**
   * 获取歌手单曲和信息
   * @param id
   * @returns {Observable<R|T>}
   */
  public getSinger(id:string):Observable<any>{
    return this.http.get(`/artists?id=${id}`)
      .map(this.handleSuccess)
      .catch(this.handleError);
  }

  /**
   * 获取歌手专辑
   * @param id
   * @param limit
   * @param offset
   * @returns {Observable<R|T>}
   */
  public getSingerAlbum(id:string,limit:number=30,offset:number=0):Observable<any>{
    return this.http.get(`/artist/album?id=${id}&limit=${limit}&offset=${offset}`)
      .map(this.handleSuccess)
      .catch(this.handleError);
  }

  /**
   * 获取歌手描述
   * @param id
   * @returns {Observable<R|T>}
   */
  public getSingerIntroduction(id:string):Observable<any> {
    return this.http.get(`/artist/desc?id=${id}`)
      .map(this.handleSuccess)
      .catch(this.handleError);
  }

  /**
   * 获取相似歌手
   * @param id
   * @returns {Observable<R|T>}
   */
  public getSimiSinger(id:string):Observable<any> {
    return this.http.get(`/simi/artist?id=${id}`)
      .map(this.handleSuccess)
      .catch(this.handleError);
  }

  /**
   * 获取热门歌手
   * @param offset
   * @param limit
   * @returns {Observable<R|T>}
   */
  public getSingerList(offset:number=0,limit:number=30):Observable<any> {
    return this.http.get(`/top/artists?offset=${offset}&limit=${limit}`)
      .map(this.handleSuccess)
      .catch(this.handleError);
  }

  public getAlbumList(id:string):Observable<any> {
    return this.http.get(`/album?id=${id}`)
      .map(this.handleSuccess)
      .catch(this.handleError);
  }


  /**
   * 设置cookie时长
   * @param time
   * @returns {Date}
   */
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

export class EmitSong{
  constructor(
    public currentSong:Song,
    public ids:any
  ){}
}
