export const mutations  = {
//登录信息
	getUsers(state,Nowusers){
		state.use = Nowusers;
	},
	getUsersNo(state){
		state.use = '';
	},
//	navNhow是否显示
	getNavnone(state){
			state.navShow = false;
	},
	getNavShow(state){
		state.navShow = true;
	},
//	音乐导航栏不显示
	getAudionone(state){
		state.audioShow = false;
	},
	getAudioshow(state){
		state.audioShow = true;
	},
//	加入用户
	getPeople(state, people){
		 state.people = people;
	},
//	退出用户
	getOver(state){
		 state.people ='';
	},
	//修改state的songList
	getSongList(state, list){
      state.songList = list;
    },
	  //添加当前歌单
	getCurrentSongList(state, o) {
      /*
        o = {
          start: 开始截取下标
          end: 结束截取下标
        }
      */
      state.currentSongList.push(...(state.songList.slice(o.start, o.end)));
    },
    //当前播放歌曲
    getCurrentMusic(state, item) {
      state.currentMusic = item;
    },
	//  当前项
    nextindex(state,index){
      state.next = index;   
    },
    getSleep(state,url){
    	state.sleepUrl = url;
    },
   	//歌词
   	Nowlrc(state,a){
   		state.nowlrc = a;
   	},
// 	历史项
	historyitem(state,item){
		state.history.push(item);
	},
//	我的收藏
	like(state,item){
		state.like.push(item);
	},
//	修改歌单
	getCurrentSong(state, items) {
		state.currentSongList = items
	},
//	分类歌单
	HotList(state,items){
		state.HotListsong = items
	},
//	分类标题
	HotListTitle(state,title){
		state.HotListTitle = title
	},
//随机数据进入歌单
	getRandom(state,items){
		state.randomSongli = [];
		for(var i = 0; i < 20; i++){
			var itemsIndex = Math.floor(Math.random()*100+1); 
			state.randomSongli.push(items[itemsIndex]);
		}
	},
//	修改自建歌单img
	getAddimgs(state,imgs){
		state.addimgs.push(imgs);
	},
//动态刷新历史记录栏
	getHistorys(state,history){
		state.historys = history;
	},
//	mv的地址
	getMvUrl(state,urls){
		state.mvUrl = urls;
	}
}
