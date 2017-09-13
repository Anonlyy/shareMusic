import { Injectable } from '@angular/core';

@Injectable()
export class SearchMusicService {

  constructor() { }

  /**
   * 搜索音乐
   * @param res
   * @returns {Promise<any>}
   */

  public handleSuccess(res:Response){
     return res.json();
  }
  public handleError(error:any){
    return error.json();
  }
}
