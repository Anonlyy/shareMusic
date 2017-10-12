import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {Song, SongList} from "../content-index/content-index.component";
import {SearchMusicService} from "../service/search-music.service";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  isLoading: boolean = true;
  song: Song = new Song('0', 'null', 'null', '0', '/assets/image/loading.jpg', '0', 0);
  songList = [];//存储所有歌曲对象
  albums: Albums = new Albums('0', '0', '/assets/image/loading.jpg', '0', 0);
  albumsList = []; //存储所有专辑对象
  playlists: SongList; //单个歌单对象
  playlistsList = []; //存储所有歌单对象
  artists:Artists; //单个歌手对象
  artistsList = []; //存储所有歌手对象
  searchValue: string = ''; //搜索结果
  searchCount: number = 0; //搜索结果条数
  currentNavIndex: number = 0;
  searchTypeList = [
    {
      key: 'songs',
      type: 1,
      name: '歌曲',
      countName: 'songCount'
    },
    {
      key: 'albums',
      type: 10,
      name: '专辑',
      countName: 'albumCount'
    },
    {
      key: 'playlists',
      type: 1000,
      name: '歌单',
      countName: 'playlistCount'
    },
    {
      key: 'artists',
      type: 100,
      name: '歌手',
      countName: 'artistCount'
    }]

  constructor(public searchMusicService: SearchMusicService, public routerInfo: ActivatedRoute) {
  }

  ngOnInit() {
    const _this = this;
    _this.routerInfo.params.subscribe(
      result=> {
        //noinspection TypeScriptUnresolvedVariable
        _this.searchValue = result.value;
        _this.getSearchValue();
      }
    )
  }

  //获取搜索内容
  getSearchValue(pageIndex: number = 0, type: number = 1, index: number = 0) {
    const _this = this;
    _this.searchMusicService.searchMusic(_this.searchValue, pageIndex, type)
      .subscribe(
        result=> {
          if (result.code == 200) {
            _this.searchCount = 0;
            _this.searchCount = parseInt(result.result[_this.searchTypeList[index].countName]);
            console.log('type', type);
            switch (type) {
              case 1: //搜索歌曲
                let songsResult = result.result.songs;
                _this.songList = [];
                let arList;
                for (let item of songsResult) {
                  arList = [];
                  for (let j of item.artists) {
                    arList.push(j.name)
                  }
                  //noinspection TypeScriptUnresolvedVariable
                  _this.song = new Song(item.id, item.name, arList.join('/'), item.artists[0].id, item.artists[0].img1v1Url, item.album.name, item.duration);
                  _this.songList.push(_this.song);
                }
                break;
              case 10: //搜索专辑
                let albumsResult = result.result.albums;
                _this.albumsList = [];
                let artistList;
                for (let item of albumsResult) {
                  artistList = [];
                  for (let j of item.artists) {
                    artistList.push(j.name)
                  }
                  _this.albums = new Albums(item.id, item.name, item.blurPicUrl, artistList.join('/'), item.size);
                  _this.albumsList.push(_this.albums);
                }
                break;
              case 1000://搜索歌单
                let playlistsResult = result.result.playlists;
                _this.playlistsList = [];
                for (let item of playlistsResult) {
                  _this.playlists = new SongList(item.id, item.name, item.coverImgUrl,item.bookCount,'',item.trackCount,item.creator.nickname );
                  _this.playlistsList.push(_this.playlists);
                }
                break;
              case 100://搜索歌手
                let artistsReault = result.result.artists;
                _this.artistsList = [];
                for (let item of artistsReault) {
                  _this.artists = new Artists(item.id, item.name, item.picUrl,item.albumSize,item.mvSize);
                  _this.artistsList.push(_this.artists);
                }
                console.log(_this.artistsList)
            }
            _this.isLoading = false;
          }
        }
      )
  }
  //翻页
  changePagination(pageIndex: number) {
    this.getSearchValue(pageIndex - 1);
  }

  //切换选项卡
  changeNavbar(index: number) {
    const _this = this;
    _this.currentNavIndex = index;
    _this.getSearchValue(0, _this.searchTypeList[index].type, index);
    _this.isLoading = true;
  }
}


// 专辑对象
export class Albums {
  constructor(public id: string,
              public name: string, //专辑名字
              public picUrl: string,
              public artists: string, //专辑作者
              public songsNum: number, //专辑歌曲数
  ) {}
}


//歌手对象
export class Artists{
  constructor(
    private id:string,
    public name:string,
    public picUrl:string,
    public albumSize:number, //专辑数量
    public mvSize?:number, //mv数量
    public songSize?:number, //单曲数量

  ){}
}
