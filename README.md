# ShareMusic
![](https://i.imgur.com/etuf38h.png)
---
**这是一款基于Anuglar4框架的音乐播放器,并使用[网易云音乐API][2],样式布局则参考QQ音乐客户端**
## UI框架 ##
使用的是[element-angular][3]和[Freeng][4]

## 功能开发 ##
- [ ] **功能开发现状**
    - [x] **用户登录**,可使用真实网易账号登录,如若考虑安全问题,可使用测试账号:**13711853543**,密码:**13902447113**
    - [x] **搜索功能**,目前可以搜索专辑、歌手、歌名和歌单
    - [x] **热门歌手**(已完成),目前热门歌手因为接口的限制,如果只能获取100位.
    - [x] **音乐广场**(已完成),初版目前只有热门歌单、最新音乐和排行榜数据,后续可能会陆续添加。
    - [x] **播放器**(已完成),目前播放器可以实现播放暂停、上下歌曲切换、收藏歌曲、音量控制等功能。
## 预览方式 ##
**PS：请在预览安装好npm和node环境。**

### 1.安装api服务器 ###
	
> git clone https://github.com/Binaryify/NeteaseCloudMusicApi.git

> npm install(推荐cnpm)

### 2.启动服务器 ###
> node app.js
   
### 3.安装前端项目 ###
	
> git clone https://github.com/Anonlyy/shareMusic.git

> npm install(推荐cnpm)

### 4.启动项目 ###
> npm start
  [1]: https://ws1.sinaimg.cn/large/a0b131e2gy1fkskdm1s1qj21fl0rhkfo.jpg
  [2]: https://github.com/Binaryify/NeteaseCloudMusicApi
  [3]: https://github.com/eleme/element-angular
  [4]: https://github.com/IronPans/freeng
