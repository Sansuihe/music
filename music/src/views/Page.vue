<template>
	<div class="Page">
		<!--二级路由的导航-->
		<div class="tab">
			<div class="fl" v-for="(item, index) in tabs" :key="index">
			<span :class="{active: item.ischeck}" @click="toggleTab(item,index)">{{item.title}}<i class="line" :class="{'active-bg': item.ischeck}"></i></span></div>
		</div>
		
		<!--实时推荐-->
		<div class="random-music a">
			<!--<div ref="van" class="clearfix" v-for="(item, index) in randomSongli" :key="index" @click="music(item, index)">-->
			<div ref="vans" class="clearfix" v-for="(item, index) in randomSongli" :key="index" @click="randommusic(item, index)"> <!--播放事件与热门歌单冲突-->
				<div class="fl singer">
					<img class="auto-img" v-lazy="item.pic"/>
				</div>
				<div class="fl song-info">
					<div class="fl">
						<div class="song-name one-text">{{item.title}}</div>
						<div class="singer-name one-text">{{item.author}}-{{item.title}}</div>					
					</div>
					<span class="song-span" @click.stop="addSong(item)">加入歌单<van-icon name="arrow-down" /></span>
				</div>
			</div>
		</div>
		
		<!--分类-->
		<div class="hot-list a">
			<div @click="hotlist(item)" class="li clearfix" v-for="(item ,index) in hotList" :key='index'>
				<div class="li-img">
					<img class='auto-img' v-lazy="item.img"/>
				</div>
				<div class="li-title">
					<p>{{item.title}}</p>
					<p>{{item.details}}</p>
				</div>
			</div>
		</div>
		
		<!--热歌榜-->	
		<div class="hot-music a">
			<div ref="van" class="clearfix" v-for="(item, index) in currentList" :key="index" @click="music(item, index)">
				<div class="fl singer">
					<img class="auto-img" v-lazy="item.pic"/>
				</div>
				<div class="fl song-info">
					<div class="fl">
						<div class="song-name one-text">{{item.title}}</div>
						<div class="singer-name one-text">{{item.author}}-{{item.title}}</div>
					</div>
					<span class="song-span" @click.stop="addSong(item)">加入歌单<van-icon name="arrow-down" /></span>
						
			
					
					<div class="fr icon">
						<!--<img ref="playicn":id="'icon' + index" v-show="true" class="auto-img" :src="item.iconUrl" />-->
						<img ref="playicn"  class="auto-img" style="display: block;" src="../assets/pause1.png" />
						<img ref="playicn2" class="auto-img" style="display: none;" src="../assets/play1.png" />
						
					</div>
				</div>
			</div>
		</div>
		
		<!--搜索-->
		<div class="seach a">
			<!--搜索框-->
			<form>
			  <van-search v-model="keyword" placeholder="请输入歌曲关键词" show-action >
			  <div slot="action" @click="search">搜索</div>
			  </van-search>
			</form>
			<!--列表-->
			<div class="list">
				<div ref="van" class="li" @click="music(item,index)" v-for="(item,index) in list" :key='index'>
					<div class="imgs">
						<img class="auto-img" v-lazy="item.pic"/>
					</div>
					<div class="title">
						<p>{{item.title}}</p>
						<p>{{item.author}}-{{item.title}}</p>
					</div>
					<div class="long" @click="addSong(item)">
						<i></i>
						<i></i>
						<i></i>
					</div>
				</div>
			</div>
		</div>
		<!--弹出层-->
		<van-popup class="popupInner" v-model="popup" position="right" :overlay="true" lazy-render>
				<div class="popupInner-nav"  @click.stop="popupInnerNav">
					<div @click="close">返回</div>
					<div>
						歌单列表
					</div>
				</div>
				<div class="popupInner-list">
					<div class="popupInner-list-title">
						<p>加入歌单</p>
						<van-icon name="plus" size="0.4rem" class="van"  @click='addSonglist'  />
					</div>
					
					<div class="popupInner-list-inner" v-show='add'>		
						<div class="popupInner-list-img">
							<img class="auto-img"/>
						</div>
						<div class="span">
							<input type="text" placeholder="输入歌单名称" id='addInputvalue' />
						</div>
						<div class="classify-li-right" @click="addInput">
							<van-icon name="success" color='#e4393c' size="0.4rem" />							
						</div>
					</div>
					
					<div class="popupInner-list-inner" @click.stop="popupInnerLi(-1)">
						<div class="popupInner-list-img">
							<img class="auto-img" v-lazy=""/>
						</div>
						<p>我的收藏</p>
					</div>
					<div class="popupInner-list-inner" @click.stop="popupInnerLi(index)" v-for="(item,index) in classify" :key='index'>
						<div class="popupInner-list-img">
							<img class="auto-img" v-lazy=""/>
						</div>
						<p>{{item.title}}</p>
					</div>																				
				</div>
	</van-popup>
		
	</div>
</template>

<script>
	const url = 'https://api.mlwei.com/music/api/wy/?key=523077333&cache=1&type=songlist&id=128509912'
	import { Icon , Notify,NoticeBar,Search,Popup} from 'vant';
	export default{
		name:'page',
		data() {
			return {
				//是否显示没有更多歌曲
				isNone: false,
				isShow:false,
				popup: false,
				idx:0,
				ranmusic:"",
				currents:'',
				addSongitem:'',
				keyword:'请输入歌曲关键词',
				list:'',
				tabs: [
						{title: '实时推荐', ischeck: true, path:{name:'page'},flag:'page'},
						{title: '曲风分类', ischeck: false, path:{name:'me'},flag:'me'},
						{title: '热歌榜', ischeck: false, path:{name:'like'}, flag:'like'},
						{title: '搜索歌曲', ischeck: false, path:{name:'seach'},flag:'seach'}
					],
				hotList:[
					{title:'民谣',details:'本站推荐',img:require('../assets/list/minyao.jpg')},
					{title:'古风',details:'本站推荐',img:require('../assets/list/gufeng.jpg')},
					{title:'摇滚',details:'本站推荐',img:require('../assets/list/yaogun.jpg')},
					{title:'爵士',details:'本站推荐',img:require('../assets/list/jueshi.jpg')},
					{title:'英文',details:'本站推荐',img:require('../assets/list/yingwen.jpg')},
					{title:'轻音乐',details:'本站推荐',img:require('../assets/list/qingyinyue.jpg')},
					{title:'抖音',details:'本站推荐',img:require('../assets/list/douyin.jpg')},
					{title:'快手',details:'本站推荐',img:require('../assets/list/kuaishou.jpg')},
					{title:'歌手',details:'本站推荐',img:require('../assets/list/geshou.jpg')},
					{title:'跑步场',details:'本站推荐',img:require('../assets/list/paobu.jpg')},
					{title:'安静',details:'本站推荐',img:require('../assets/list/anjin.jpg')},
					{title:'热搜',details:'本站推荐',img:require('../assets/list/resou.jpg')},
				],
				classify:[
					{title: '我的收藏',path:{name:'like'}},
				],

				start: 0,
				end: 13,
//				上一项
				upindex1:'',
				upindex2:'',
				isPlay:'',
				isPalying:'fasle',
				add:false,
			}
		},
		components:{
				[Icon.name]:Icon,
				[Notify.name]:Notify,
				[NoticeBar.name]:NoticeBar,
				[Search.name]:Search,
				[Popup.name]:Popup,
		},		
		computed: {
			//当前歌单
			currentList() {
				return this.$store.state.currentSongList;
			},
			randomSongli() {
				return this.$store.state.randomSongli;
			},
//			播放状态
			palying(){
				return this.$store.state.play;
			},
			
		},
		
		methods: {
			
			toggleTab(item,index) {
				if(this.idx == index){
	  				return;
	  			}
	  			item.ischeck = true;
	  			this.tabs[this.idx].ischeck= false;
	  			  		
  				var a = document.getElementsByClassName('a');
//				上一项隐藏
  				a[this.idx].style.display = 'none'
//				当前项显示
  				a[index].style.display = 'block'
  				
  				if(index !== 2){
  					this.isShow = false;
  				}else{
  					this.isShow = true;
  				}
	  				
	  			this.idx = index;
//				this.$router.push(item.path);
			},
//			实时推荐的歌单
			randommusic(item, index){
				var audio = document.getElementsByTagName('audio')[0];
				var history = localStorage.getItem('history');
				if(!history){
					var arr = [];
					arr.push(item)
					localStorage.setItem('history', JSON.stringify(arr));
				}else{
					var arr = JSON.parse(localStorage.getItem('history'))//取出缓存					
					for(var i = 0; i < arr.length; i++){
							if(item.url === arr[i].url){//查看是否有重复
//								console.log('重复')
								arr.splice(i,1)//取出已有的重复项		
							}
						}
					if(arr.length >= 50){
						arr.splice(1,1)//大于50删第一首
					}
					arr.push(item)//把当前item存入数组
					localStorage.setItem('history', JSON.stringify(arr));//存入缓存
				}
				this.$store.commit('getCurrentMusic', item);//当前项
				this.$store.commit('nextindex', index);
				if(this.currents!=="" && this.currents !== index){
					var a = this.$refs.vans[this.currents];
					delete a.dataset.play; //删除currentVans.play属性	
//					console.log('进来了')
				}								
				var current = this.$refs.vans[index];
				var Plays = current.dataset.play;
				if(Plays == 1){
					audio.pause();
					current.dataset.play = 0;	
					this.$store.state.play = false;
//					delete current.dataset.play;
				}else if (Plays == undefined || Plays == 0) {					
					audio.play();
					current.dataset.play = 1;
					this.$store.state.play = true;
					this.currents = index;
				}
				audio.oncanplay = function () {
					this.play();
				}
			},

			music(item, index) {
//				console.log('item',item)
//											
//				如果切歌更改上一项的data-play
				if(this.isPlay!=="" && this.isPlay !== index){
					var currentVans = this.$refs.van[this.isPlay];
					delete currentVans.dataset.play; //删除currentVans.play属性				
				}
				
				if(this.upindex1 !==""  && this.upindex1 != this.$refs.playicn[index]){
					this.upindex1.style.display = 'block';
					this.upindex2.style.display = 'none'
					
				}
				var audio = document.getElementsByTagName('audio')[0];
//				修改state的当前歌曲项
				this.$store.commit('getCurrentMusic', item);
//				获得本项的下标
				this.$store.commit('nextindex', index);
				//play = 1 正在播放, 0: 停止
				var currentVan = this.$refs.van[index];
				var isPlay = currentVan.dataset.play;			
				if (isPlay == 1) {
//					console.log('item.iconUrl停止',item.iconUrl)
					//停止
					audio.pause();
					currentVan.dataset.play = 0;
					delete currentVan.dataset.play;
					
					this.$refs.playicn2[index].style.display  = 'none' 
					this.$refs.playicn[index].style.display  = 'block' 

					var pause1 = require('../assets/pause1.png');
					
					item.iconUrl = pause1;
					
					this.$store.state.play = false;
					
				} else if (isPlay == undefined || isPlay == 0) {
					audio.play();	
					this.$refs.playicn2[index].style.display  = 'block'
					this.$refs.playicn[index].style.display  = 'none'
					currentVan.dataset.play = 1;						
					this.$store.state.play = true; //改变state：的播放状态
					this.upindex1 = this.$refs.playicn[index]
					this.upindex2 = this.$refs.playicn2[index]
					
					this.isPlay =  index
//					console.log("this.isPlay",this.isPlay)				
				}				
				//可以播放歌曲
				audio.oncanplay = function () {
					this.play();
				}
				
//				历史收听
				var history = localStorage.getItem('history');
				if(!history){
					var arr = [];
					arr.push(item)
					localStorage.setItem('history', JSON.stringify(arr));
				}else{
					var arr = JSON.parse(localStorage.getItem('history'))//取出缓存					
					for(var i = 0; i < arr.length; i++){
							if(item.url === arr[i].url){//查看是否有重复
//								console.log('重复')
								arr.splice(i,1)//取出已有的重复项		
							}
						}
					if(arr.length >= 50){
						arr.splice(1,1)//大于50删第一首
					}
					arr.push(item)//把当前item存入数组
					localStorage.setItem('history', JSON.stringify(arr));//存入缓存
				}	
				
				//歌词
				this.axios.get(item.lrc).then(response => {
	//	 			console.log(response.data)
		 			this.lrc = response.data;
		 			
		 			let lrc =  response.data;
		 			let time = lrc.match(/\[\d{2,}:\d{2,}\.\d{2,}\]/ig, '-')
			
					lrc = lrc.replace(/\[\d{2,}:\d{2,}\.\d{2,}\]/ig, '-')
					lrc = lrc.replace(/-{5,}/ig, '-')
					
					for(let i = 0; i < time.length; i++) {
			
						time[i] = time[i].replace(/\[/, '')
						time[i] = time[i].replace(/\]/, '')
						time[i] = time[i].split(':')
			
						time[i] = (parseFloat(time[i][0])) * 60 +
						Number(parseFloat(time[i][1]))
					}
//					console.log("歌词",lrc.split('-'))
					this.lrc = lrc.split('-');
//					console.log("时间",time)
					const a = lrc.split('-')
					this.$store.commit('Nowlrc',a)
//					console.log('this.$store.state',this.$store.state.nowlrc)
					
					})	
				},
//				分类事件
				hotlist(item){
//					console.log(item.title)				
					var src = 'https://api.mlwei.com/music/api/wy/?key=523077333&id='+item.title+'&type=so&cache=0&nu='+'50';
					this.axios.get(src).then(response => {
//					console.log(response.data.Body);
					var items = response.data.Body;
//					存入分类歌单
					this.$store.commit('HotList', items);					
					this.$store.commit('HotListTitle', item.title);	
					this.$store.commit('getSongList', items);	
					
//					console.log(this.$store.state.HotListsong);
//					console.log(this.$store.state.HotListTitle);
					return this.$router.push({name: 'hotlist'});
					})
					Notify({
							  message: '正在为你加载：'+item.title +'类歌曲',
							  duration: 1500,
							  background: '#dc8096'
					});
				},
				//				阻止vant默认冒泡事件
				popupInnerNav(){
					console.log('1')
				},
				close(){
					if(this.popup !=true){
						this.popup = true;
					}else{
						this.popup = false;
					}
				},
				//添加歌单列表
				addSonglist(){
					if(this.add != true){
						this.add = true;	
					}else{
						this.add = false;
					}
					this.show = true;
				},
				addInput(){	
					var input = document.getElementById('addInputvalue').value;
					if(input==''){
						Notify({
								  message: "请新建歌单名称",
								  duration: 1500,
								  background: '#dc8096'
						});
						this.add = false;
						this.show = false;
						return;//没有输入则跳出
					}			
					var newSonglist ={
						title:input,
						path:{name:'like'}
					}//生成新对象				
											
					this.classify.push(newSonglist)				
					localStorage.setItem('newAddsong', JSON.stringify(this.classify));			
					var indexs = this.classify.length
					var arr = [];
					localStorage.setItem('newSonglist' + indexs, JSON.stringify(arr));
					document.getElementById('addInputvalue').value = "";
					this.add = false;
					this.show = true;
				},
//				添加歌单时拿到item
				addSong(item){					
					if(this.popup !=true){
						this.popup = true;
					}else{
						this.popup = false;
					}					
					this.addSongitem = item;
//					console.log('this.addSongitem2',this.addSongitem)					
				},
				
//				存入当前缓存歌单
				popupInnerLi(index){
					//模拟存入不同的歌单
					var arr = index + 1
					var list = JSON.parse(localStorage.getItem("newSonglist"+arr))
					if(list.length == 0){//新歌单添加第一张背景图
						var imgs = this.addSongitem.pic
						this.$store.commit('getAddimgs',imgs);//程序初始化存到state
						var abs = JSON.parse(localStorage.getItem('addimgs'))//定义一个保存图片的缓存
						if(!abs){
							var a = [];
							a.push(imgs)
							localStorage.setItem("addimgs",JSON.stringify(a))
						}else{
							var a = JSON.parse(localStorage.getItem("addimgs"));
							a.push(imgs)
							localStorage.setItem("addimgs",JSON.stringify(a))
						}					
					}					
					for(var i = 0; i < list.length; i++){
							if(this.addSongitem.url === list[i].url){//查看是否有重复
								console.log('重复')
								list.splice(i,1)//取出已有的重复项		
							}
						}
					list.push(this.addSongitem)//再加入
					localStorage.setItem("newSonglist"+arr, JSON.stringify(list))//最后存入缓存
					Notify({
							  message: '添加成功',
							  duration: 1000,
							  background: '#dc8096'
					});
					this.popup = false;
					//模拟存入一次
//					var likeItem = localStorage.getItem('likeItem');					
//					if(!likeItem){
//						likeItem =[]
////						如果没有缓存
//						likeItem.push(this.addSongitem);
//						localStorage.setItem('likeItem', JSON.stringify(likeItem));
////						console.log('没有',likeItem)
//					}else{		
////						console.log('有likeItem',likeItem)//	如果有缓存	
//						const arr = JSON.parse(localStorage.getItem("likeItem"));//先取出
//						for(var i = 0; i < arr.length; i++){
//							if(this.addSongitem.url === arr[i].url){//查看是否有重复
//								console.log('重复')
//								arr.splice(i,1)//取出已有的重复项
////								return;	//重复则跳出				
//							}
//						}
//						arr.push(this.addSongitem)//再加入
//						localStorage.setItem("likeItem", JSON.stringify(arr))//最后存入缓存							
//					}				
				},
//				搜索事件
				search(){
//					console.log(this.keyword)
					var src = 'https://api.mlwei.com/music/api/wy/?key=523077333&id='+this.keyword+'&type=so&cache=0&nu=20'
					this.axios.get(src).then(response => {
	//					console.log(response.data)
						this.list = response.data.Body
	//					this.$store.commit('getSongList', response.data.Body);
	//					this.$store.commit('getCurrentSong', response.data.Body);
						
//						console.log(this.$store.state.currentSongList)
						})
				},
				prev(){
			    		this.$router.go(-1)
			  	},
		},
		
		
		created(){
			this.$store.commit('getNavShow');
			this.$store.commit('getAudioshow');
			var songList = localStorage.getItem('songList');			
			if (!songList) {
//				console.log('没有缓存');
					this.axios.get(url).then(response => {
					var Body = response.data.Body;
					
					Body.forEach(v => {
							v.iconUrl = require('../assets/pause1.png');
						})
//					把歌单存进store
					this.$store.commit('getSongList',Body);
//					懒加载的条数
					this.$store.commit('getCurrentSongList', {start: this.start, end: this.end});
//					缓存
					localStorage.setItem('songList', JSON.stringify(Body));
					
					this.$store.commit('getRandom', Body);	
				})
			}else{
				//如果有缓存, 直接从缓存获取歌单
					this.$store.commit('getSongList', JSON.parse(songList));
					//获取当前歌单
					this.$store.commit('getCurrentSongList', {start: this.start, end: this.end});
									
				
			}
			this.$store.commit('getRandom',songList );
			
			var newAddsong = localStorage.getItem('newAddsong');//获取本地存储的歌单
			if(!newAddsong){
				localStorage.setItem('newAddsong', JSON.stringify(this.classify));
			}else{
				this.classify =JSON.parse(localStorage.getItem('newAddsong'));
			}
		
		},
		mounted(){
			
			var songList = localStorage.getItem('songList');
			this.$store.commit('getRandom', JSON.parse(songList));
			
			var timers = [];
			//歌曲懒加载
			window.onscroll = () => {
				if(this.isShow){
					//当前歌单和所有跟单数量一样时, 直接拦截
				if (this.$store.state.currentSongList.length >= this.$store.state.songList.length) {
					this.isNone = true;
					return;
				}

				//获取屏幕高度
				var screenHeight = screen.height;

				//获取页面距离
				var scrollTop = document.documentElement.scrollTop;


				//获取最后一个节点
				var lastRef = this.$refs['van'][this.$store.state.currentSongList.length - 1];

				
				//获取最后一个节点的offsetTop
				var offsetTop = lastRef.offsetTop;

				var h = offsetTop - scrollTop - 200;

				if (screenHeight >= h) {

					var timer = setTimeout(() => {

						console.log('come');
						
						this.start = this.end;
						this.end += 13;

						this.$store.commit('getCurrentSongList', {start: this.start, end: this.end})

						clearTimeout(timer);
						timer = null;
						timers = [];

					}, 1000)

					timers.push(timer);

					for (var i = 1; i < timers.length; i++) {
						clearTimeout(timers[i]);
					}

				}
				}else{
//					console.log('不动');
					return;
				}
				
			}
		}
	}
</script>

<style lang="less" scoped>

	.tab{
			position: sticky;
			top: 0.8rem;
			left: 0;
			border-bottom: 2px solid #EBEBEB;
			height: .8rem;
			background-color: #fff;
			z-index: 10;
			>div{
				width: 25%;
				text-align: center;
				line-height: .8rem;
				span{
					position: relative;
					height: .8rem;
					display: inline-block;
					i{
						position: absolute;
						width: 100%;
						left: 0;
						bottom: -2px;
						height: 2px;
						
					}
				}
			}
		}
	.active{
			color: #D33A31;
		}
		.active-bg{
			background-color: #D33A31;
		}
	/*每日推荐*/
	.random-music{
		display: block;
		>div{
			border-bottom: 1px solid #ececec;
			padding-top: .15rem;
			padding-bottom: .15rem;
		}
		.singer{
			width: .9rem;
			height: 0.9rem;
			overflow: hidden;
		}
		.song-info{
			width: calc(~"100% - 1.2rem");
			height: .9rem;
			padding-left: .15rem;
			padding-right: .15rem;
			position: relative;
			.song-name{
				font-size: 13px;
				color: #444;
				height: .45rem;
				line-height: .45rem;
				max-width: 160px;
				overflow: hidden;
				white-space :nowrap;
				text-overflow: ellipsis;
			}
			.singer-name{
				font-size: 12px;
				color: #999;
				height: .45rem;
				line-height: .45rem;
				max-width: 140px;
				overflow: hidden;
				white-space :nowrap;
				text-overflow: ellipsis;
			}
			.icon{
				width: .4rem;
				height: .4rem;
				margin-top: .25rem;
			}
			.song-span{
				display: inline-block;
				position: absolute;
				/*z-index: 1000;*/
				top: 0.25rem;
				right: 0.5rem;
				color: #E4393C;
				:nth-child(1){
					position: absolute;
					top: 0.05rem;
					color: black;
				}
			}
		}
	}
	/*热歌榜*/
	.hot-music{
		display: none;
		>div{
			border-bottom: 1px solid #ececec;
			padding-top: .15rem;
			padding-bottom: .15rem;
		}
		.singer{
			width: .9rem;
			height: 0.9rem;
			overflow: hidden;
		}
		.song-info{
			width: calc(~"100% - 1.2rem");
			height: .9rem;
			padding-left: .15rem;
			padding-right: .15rem;
			position: relative;
			.song-name{
				font-size: 13px;
				color: #444;
				height: .45rem;
				line-height: .45rem;
				max-width: 160px;
				overflow: hidden;
				white-space :nowrap;
				text-overflow: ellipsis;
			}
			.singer-name{
				font-size: 12px;
				color: #999;
				height: .45rem;
				line-height: .45rem;
				max-width: 140px;
				overflow: hidden;
				white-space :nowrap;
				text-overflow: ellipsis;
			}
			.song-span{
				display: inline-block;
				position: absolute;
				/*z-index: 1000;*/
				top: 0.25rem;
				right: 1rem;
				color: #E4393C;
				:nth-child(1){
					position: absolute;
					top: 0.05rem;
					color: black;
				}
			}
			.icon{
				width: .4rem;
				height: .4rem;
				margin-top: .25rem;
			}
		}

	}
	.hot-list{
		padding-bottom: 1.5rem;
		overflow: hidden;
		display: none;
		position: sticky;
		z-index: 0;
		p{
			margin: 0;
			padding: 0;
		}
		.li{
			width:40%;
			height: 2.2rem;
			float: left;
			margin-top: 0.3rem;	
			margin-left: 5%;
			
			.li-img{
				overflow: hidden;
				width: 60%;
				height: 90px;
				margin:auto;
			}
			.li-title{
				p{
					text-align: center;
					display: block;
					/*height: 0.5rem;*/
				}
				:nth-child(1){
					font-size: 0.3rem;
				}
				:nth-child(2){
					font-size: 0.2rem;
					color: #7c959;
				}
			}
		}
	}
	.seach{
		display: none;
		padding-bottom:1.5rem ;
		.prev{
			width: 1rem;
			height: 1rem;
			border-radius: 50%;
			overflow: hidden;
			background-color: #E4303C;
			position: fixed;
			right: 0.2rem;
			bottom: 1.5rem;
			animation: r 10s linear 0s infinite;
			>img{
				height: 100%;
			}
		}
		.list{
			.li{
				
				width: 100%;
				height:1rem;
				margin-bottom: 0.1rem;
				background-color: #fdeded;
				.imgs{
					overflow: hidden;
					width: 0.8rem;
					height: 0.8rem;
					margin: 0.1rem;
					float: left;
					
					/*background: red;*/
				}
				.title{
					height: 1rem;
					float: left;
					>p{
						padding: 0;
						margin: 0;
						display: block;
						height: 50%;
						width: 60%;
						padding-left: 0.3rem;
						font-size: 0.25rem;
						
						overflow: hidden;
						white-space :nowrap;
						text-overflow: ellipsis;
						
						
					}
					p:nth-child(1){
						font-size: 0.3rem;
						padding-top: 0.2rem;
						height: 0.4rem;
						line-height:0.4rem;
						
					}
					nth-child(2){
						height: 0.2rem;
						line-height:0.2rem;
					}
				}
				.long{
					float: right;
					padding-right: 0.2rem;
					width: 0.1rem;
					padding-top: 0.2rem;
					>i{
						
						display: block;
						margin-top: 0.1rem;
						width: 0.1rem;
						height: 0.1rem;
						background: gray;
						border-radius: 50%;
					}
				}
			}
		}	
	}
			/*添加自定义歌单*/
		.popupInner{
			width:100%;
			height:80%;
			/*background-color: rgba(0,0,0,0);*/
			.popupInner-nav{
				width:100%;
				height: 1rem;
				background-color: #E4393C;
				:nth-child(1){
					height: 1rem;
					line-height: 1rem;
					padding-left: 0.2rem;
					position: absolute;
					z-index: 10;
					color: white;
				}
				:nth-child(2){
					font-size: 20px;
					width: 100%;
					height: 0.8rem;
					line-height: 0.8rem;
					position: absolute;
					z-index: 0;
					text-align: center;
				}
			}
			.popupInner-list{
				.popupInner-list-title{
					height: 1rem;
					position: relative;
					>p{
						margin: 0;
						line-height: 1rem;
						padding-left: 0.5rem;
						font-size: 0.4rem;
					}
					.van{
						position: absolute;
						top:0.3rem;
						right: 0.2rem;
					}
				}
				.popupInner-list-inner{
					margin: 0;
					/*background-color: gray;*/
					height: 1rem;
					border-bottom: 1px solid gray;
					.span{
						height: 1rem;
						line-height: 1rem;
						float: left;
						padding-left: 0.5rem;
					}
					.classify-li-right{
						margin-top: 0.3rem;
						float: right;
					}
					.popupInner-list-img{
						background: #E4393C;
						height: 0.8rem;
						width: 0.8rem;
						margin: 0.1rem;
						overflow: hidden;
						float: left;
					}
					>p{
						margin: 0;
						/*display: block;*/
						margin-left:1.5rem;
						line-height: 1rem;
					}
				}
			}
		}
</style>