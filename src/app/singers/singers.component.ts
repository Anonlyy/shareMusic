import { Component, OnInit } from '@angular/core';
import {MusicService} from "../service/music.service";
import {Artists} from "../search-result/search-result.component";

@Component({
  selector: 'app-singers',
  templateUrl: './singers.component.html',
  styleUrls: ['./singers.component.scss']
})
export class SingersComponent implements OnInit {
  defaultSrc:string ='/assets/image/loading.jpg';
  artists:Artists;
  hotSingerList = [];
  isLoading:boolean = true;
  pageLoading:boolean = false;
  showIndex:number = 30; //默认显示范围
  pageIndex:number =1;
  maxPageIndex:number = 4;
  constructor(private musicService:MusicService) { }

  ngOnInit() {
    this.getSingers();
    // this.scrollBottom();
  }
  public getSingers(offset:number=0,limit:number=200):void{
    const _this = this;
    _this.musicService.getSingerList(offset,limit).subscribe(
      result=>{
        if(result.code==200){
          for(let item of result.artists){
            _this.artists = new Artists(item.id,item.name,item.img1v1Url,item.albumSize,0,item.musicSize,'null',(item.alias==null||item.alias.length==0)?"":(item.alias[0]));
            _this.hotSingerList.push(_this.artists);
            // _this.hotSingerList.push()
          }
          _this.isLoading = false;
        }
        else{
          console.log('错误代码',result.code);
        }
        console.log(_this.hotSingerList);
      },
      error=>{
        console.log('热门歌手请求错误',error);
      }
    )
  }
  //图片加载完成
  imgLoad(img:any,url:string){
    if(url==null||url=='null'||url==''){img.src=this.defaultSrc;return;}
    img.src = url;
  }
  //触底事件
  scrollBottom(e){
    const _this = this;
    //scrollHeight - offsetHeight = 滚动条总高度
    let scrollHeight = e.target.scrollHeight - e.target.offsetHeight;
    //定时器节流
    if(e.target.scrollTop==scrollHeight&&_this.pageIndex<_this.maxPageIndex){
          let timer = null;
          clearTimeout(timer);
          _this.pageLoading = true;
          timer = setTimeout(function() {
            _this.pageIndex +=1;
            _this.pageLoading = false;
            _this.showIndex = (30*_this.pageIndex);
            console.log('到底了',_this.showIndex);
          }, 300);
    }
  }
}
