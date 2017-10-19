import { Component, OnInit } from '@angular/core';
import {RadioServiceService} from "../service/radio-service.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-radio-index',
  templateUrl: './radio-index.component.html',
  styleUrls: ['./radio-index.component.scss']
})
export class RadioIndexComponent implements OnInit {

  radioCategoryList = []; //分类列表
  recommend:Recommend = new Recommend(0,'null','/assets/image/loading.jpg','0','xx','xx','default'); //节目对象
  recommendList = []; //节目列表
  constructor(public radioService:RadioServiceService,private sanitizer: DomSanitizer) { }
  ngOnInit() {
    this.getRadioCategory();
    this.getRecommendList();
  }
  //获取电台分类
  getRadioCategory(){
    const _this = this;
    _this.radioService.getRadioCatelis().subscribe(
      result=>{
        if(result.code==200){
          for(let item of result.categories){
            _this.radioCategoryList.push({
              iconSrc:item.picWebUrl,
              name:item.name,
              id:item.id
            })
          }
        }
        else{
          console.log('错误代码',result.code);
        }
      },
      error=>{
        console.log(error)
      }

    )
  }

  //获取推荐节目
  getRecommendList(){
    const _this = this;
    _this.radioService.getRecommend().subscribe(
      result=>{
        if(result.code==200){
          for(let item of result.programs){
            _this.recommend = new Recommend(item.mainSong.id,item.name,item.mainSong.album.blurPicUrl,item.mainSong.artists.name,item.radio.name,item.radio.id,item.radio.category);
            _this.recommendList.push(_this.recommend);
          }
          console.log(_this.recommendList);
        }
        else{
          console.log('错误代码',result.code);
        }
      },
      error=>{
        console.log('获取节目出错',error);
      }
    )
  }



  //返回安全的图片src
  getImage(src){
    return this.sanitizer.bypassSecurityTrustStyle(`url(${src})`);
  }
}


// 节目对象
export class Recommend{
  constructor(
    public id:number,      //节目id
    public name:string,     //节目名字
    public picUrl:string,  //封面
    public artistsName:string, //作者
    public radioName:string,  //专辑(电台)名字
    public radioId:string,    //所属电台ID
    public category:string, //分类
  ){}
}

// 电台对象
export class Djprogram{
  constructor(
    public id:number,      //节目id
    public name:string,     //节目名字
    public picUrl:string,  //封面
    public artistsName:string, //作者
    public radioName:string,  //专辑(电台)名字
    public radioId:string,    //所属电台ID
    public category:string, //分类
  ){}
}
