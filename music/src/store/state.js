export const state  = {
	//首页导航栏/下边栏是否显示
	navShow:true,
	audioShow:true,
	
	name:'分层出来',	
//	个人登录信息
	use:'',
	 //所有热歌列表
    songList: null,   
    //加载歌单
    currentSongList: [],    
    //当前播放/暂停的歌曲
    currentMusic: {},   
//  播放状态
	play:false,
//	当前第几首
	next:'',
//	历史歌曲
	history: [],
//	我的收藏
	like:[],
//	歌词
	nowlrc:'',
//	分类关键标题
	HotListTitle:'',
//	分类详情歌单
	HotListsong:[],
//	用户
	people:'',
//  随机歌单
	randomSongli:[],
//  sleep的img
	sleepUrl:'',
//	自建歌单的背景
	addimgs:[],
//	历史记录
	historys:'',
//  MVUrl地址
	mvUrl:'',
}
