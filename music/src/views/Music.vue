<template>
<div class="music">
	<div class="music-nav" v-show="navShow">
			<div class="left" v-show="show" @click='prev'>
				<i></i>
				<i></i>
				<i></i>
			</div>
			<!--<div class="left" v-show="false">
				<!--<van-icon name="arrow-left" />-->
			<!--</div>-->
			<div class="middle">
				<span :class="{span: item.ischeck}" :id="'span' + index" v-for="(item,index) in navs" :key='index'  @click="Navs(item,index)">{{item.title}}</span>
			</div>
			<div class="right">
				<van-icon class='plus' name="plus" size='0.55rem' color="white" />
			</div>
	</div>
	
	<audio  ref="player" :src="currentMusic.url" autoplay>你的浏览器不支持audio</audio>
	<!--标签-->
	<!--<div class="tab">
		<div class="fl" v-for="(item, index) in tabs" :key="index">
		<span :class="{active: item.ischeck}" @click="toggleTab(item,index)">{{item.title}}<i class="line" :class="{'active-bg': item.ischeck}"></i></span></div>
	</div>-->
	
	<!--路由-->
	<div class="router">
		<router-view></router-view>
	</div>
	
	<!--控制条-->
	<div class="control" v-show="audioShow">
			<div class="fl avatar clearfix" @click="sleep()" >
				<img class="auto-img" :src="currentMusic.pic"  />
			</div>
			
			<div ref="controlInfo" class="fl control-info">
				<div ref='progress' class="progress">
					<!-- 激活进度 -->
					<div ref="activeProgress" class="active-progress"></div>
					
					<!-- 滑块 -->
					<div ref="mask" class="mask">
						<i class="circle"></i>
					</div>
					
					<!-- 绑定触摸移动事件层 -->
					<!--<div ref="progressLayer"  id='progressLayer' class="layer" @touchstart="moveStart" @touchmove="move"></div>-->
					<div ref="progressLayer"  id='progressLayer' class="layer" @click="playMusic"></div>
					
				</div>
				<div class="music-control">
					<div class="fl text" @click="Details">
						<div class="one-text">{{currentMusic.title}}</div>
						<div class="one-text">{{currentMusic.author}}-{{currentMusic.title}}</div>
					</div>
					<div class="fr control-icon">
						<span class="fl play" @click="play">
							<img class="auto-img" v-show="!isplay"  id="img" src="../assets/pause.png" />
							<img class="auto-img" v-show="isplay"  id="img" src="../assets/play.png" />
						</span>
						<span class="fl next" @click="next">
							<img class="auto-img" src="../assets/next.png" />
						</span>
						<span class="fl menu" @click="history">
							<div>
								<img class="auto-img" src="../assets/menu.png" />
							</div>
						</span>
					</div>
				</div>
			</div>
			<van-actionsheet v-model="actionsheet" title="历史收听" class='actionsheet-g' >
			  <div id="actionsheet">
			  	<!--<div class="title">
			  		列表
			  	</div>-->
			  	<div class="list" >
			  		<div class="li" v-for="(item,index) in historykeyword" :key='index' ref='van' @click="music(item,index)" >
			  			<span>{{++index}}.{{item.title}}--{{item.author}}</span>
			  		</div>
			  	</div>
			  </div>
			</van-actionsheet>
			
			
		</div>
</div>
</template>

<script>
	 const urls = 'https://api.mlwei.com/music/api/wy/?key=523077333&cache=1&type=songlist&id=128509912'	
	 import play from '../assets/play.png'
	 import pause from '../assets/pause.png'
	 import { Icon , Notify,Actionsheet} from 'vant';
	 import { mapState} from 'vuex'
	export default{
		name:'Music',
			data() {
				
				return {
//					cTime: '00:00', // 已播放时间
//			        dTime: '00:00', // 总播放时间
//			        play: false, 
					show:true,
					idx:1,
					navs:[
						{title: '我的', ischeck: true, path:{name:'me'},flag:'me'},
						{title: '音乐馆', ischeck: false, path:{name:'page'},flag:'page'},
						{title: '发现', ischeck: false, path:{name:'hotShot'},flag:'hotShot'},
					],
					canplay:false,
					nowmusic:[],
					actionsheet:false,
					historykeyword:'',
					currents:'',
				}
			},
			
			components:{
				[Icon.name]:Icon,
				[Notify.name]:Notify,
				[Actionsheet.name]:Actionsheet,				
			},
			
			methods: {
				
				Navs(item,index){
					if(this.idx == index){
		  				return;
		  			}
					var before = document.getElementById('span'+this.idx);
					before.style.fontSize = 0.3+'rem'
		  			item.ischeck = true;
		  			this.navs[this.idx].ischeck= false;
		  			this.idx = index;
					this.$router.push(item.path);
					var i = document.getElementById('span'+index);
					i.style.fontSize = 0.4 +'rem'
				},
					
				toggleTab(item,index){
					if(this.idx == index){
		  				return;
		  			}
		  			item.ischeck = true;
		  			this.tabs[this.idx].ischeck= false;
		  			this.idx = index;
					this.$router.push(item.path);
				},
				 prev(){
//		    		this.$router.go(-1)
					return this.$router.push({name: 'urse'});
		  		},
		  		sleep(){
		  			
		  			if(this.currentMusic.pic == undefined){
		  				return
		  			}
		  			
//		  			console.log(this.currentMusic.pic);
		  			const url = this.currentMusic.pic;
		  			this.$store.commit('getSleep',url);
		  			this.$router.push({name:'sleep'});
		  			console.log("现在",this.$store.state.sleepUrl);
		  		},
	//			播放按钮
				play(){
					var audio = document.getElementsByTagName('audio')[0];
//					判断是否有src
					if(audio.src){
						if(this.$store.state.play != false){
							this.$store.state.play = false;
							audio.pause();
							console.log(this.$store.state.play)
						}else{
							this.$store.state.play = true;
							console.log(this.$store.state.play)
							audio.play();
						}
					}else{
						Notify({
						  message: '请先选择歌曲',
						  duration: 1000,
						  background: '#e4595c'
						});
						return;
					}				
				},
				//下一首
				next(){					
					var next = this.$store.state.next//获取当前项
					var audio = document.getElementsByTagName('audio')[0]; 	
					if(next !==''){
						var nextIem = ++next;//下一首
						this.$store.commit('nextindex', nextIem); //修改stae项的next
	//					console.log('return this.$store.state.next',this.$store.state.next)//当前歌曲
						var nextmusic = this.$store.state.songList[nextIem];//得到下一首个的item''
	//					console.log('nextItem',nextmusic)
						this.$store.commit('getCurrentMusic', nextmusic); //修改当前歌曲
						const url = this.$store.state.currentMusic.pic;//修改sleep的img
		  				this.$store.commit('getSleep',url);
						this.$store.state.play = true;
//						console.log('时间',audio.duration)
					}else{
//						next = 0;
//						var nextmusic = this.$store.state.songList[next];//得到下一首个的item''
//						this.$store.commit('getCurrentMusic', nextmusic); //修改当前歌曲
//						this.$store.commit('nextindex', next); //修改stae项的next					
//						console.log('时间',audio.duration);
//						this.$store.state.play = true;
						Notify({
							  message: '请先选择歌曲',
							  duration: 1000,
							  background: '#e4595c'
							});
			      	return
					}
					
					
					var arrs = JSON.parse(localStorage.getItem('history'))//取出缓存					
					for(var i = 0; i < arrs.length; i++){
							if(this.$store.state.currentMusic.url === arrs[i].url){//查看是否有重复
//								console.log('重复')
								arrs.splice(i,1)//取出已有的重复项		
							}
						}
					if(arrs.length >= 50){
						arrs.splice(1,1)//大于50删第一首
					}
					arrs.push(this.$store.state.currentMusic)//把当前item存入数组
					localStorage.setItem('history', JSON.stringify(arrs));//存入缓存
//					歌词
					this.axios.get(this.$store.state.currentMusic.lrc).then(response => {
	//	 			console.log(response.data)
		 			this.lrc = response.data;
		 			
		 			let lrc =  response.data;
		 			let time = lrc.match(/\[\d{2,}:\d{2,}\.\d{2,}\]/ig, '-')
			
					lrc = lrc.replace(/\[\d{2,}:\d{2,}\.\d{2,}\]/ig, '-')
					lrc = lrc.replace(/-{5,}/ig, '-')
					
//					for(let i = 0; i <= time.length; i++) {
//			
//						time[i] = time[i].replace(/\[/, '')
//						time[i] = time[i].replace(/\]/, '')
//						time[i] = time[i].split(':')
//			
//						time[i] = (parseFloat(time[i][0])) * 60 +
//						Number(parseFloat(time[i][1]))
//					}
//					console.log("歌词",lrc.split('-'))
					this.lrc = lrc.split('-');
//					console.log("时间",time)
					const a = lrc.split('-')
					this.$store.commit('Nowlrc',a)
//					console.log('this.$store.state',this.$store.state.nowlrc)
					
					})					
				},
				// 点击进度条事件
			    playMusic (e) {
			    	var audio = document.getElementsByTagName('audio')[0]; 	
//			    	判断是否有src
			    	if(audio.src){
			    		const music = this.$refs.player // 音频所在对象
			      	  	
			      	var pageX = e.pageX;//点击的x轴位置
	
					var offsetLeft = this.$refs.controlInfo.offsetLeft;
	
					var controlInfoWidth = parseFloat(getComputedStyle(this.$refs.controlInfo).width);
	
					var maskWidth = parseFloat(getComputedStyle(this.$refs.mask).width);
	
					//滑块移动的最大距离
					var maskMaxMoveLeft = controlInfoWidth - maskWidth;
	
					//滑块移动的最最小距离
					var maskMinMoveLeft = 0;
	
					var distance = pageX - offsetLeft;
	
					if (distance > controlInfoWidth) {
						return;
					}
	
					this.$refs.activeProgress.style.width = distance + 'px';
	
					distance = distance <= maskMinMoveLeft ? maskMinMoveLeft : distance >= maskMaxMoveLeft ? maskMaxMoveLeft : distance;
		
					this.$refs.mask.style.left = distance + 'px';
					
					const conWidth = parseFloat(getComputedStyle(this.$refs.controlInfo).width);//容器宽度
					
					var Timer = distance / conWidth
			      		
			      	music.currentTime = music.duration * Timer //播放到	
				    music.play()
			    		
			    	}else{
			    		return
			    	}
			     	
			    },
//			   	 歌词页
			    Details(){
			    	var audio = document.getElementsByTagName('audio')[0];
			    	if(audio.src){
			    		this.$router.push({name:'details'});
			    	}else{
			    		return
			    	}
			    },		
				moveStart(e) {
					var pageX = e.targetTouches[0].pageX;
	
					var offsetLeft = this.$refs.controlInfo.offsetLeft;
	
					var controlInfoWidth = parseFloat(getComputedStyle(this.$refs.controlInfo).width);
	
					var maskWidth = parseFloat(getComputedStyle(this.$refs.mask).width);
	
					//滑块移动的最大距离
					var maskMaxMoveLeft = controlInfoWidth - maskWidth;
	
					//滑块移动的最最小距离
					var maskMinMoveLeft = 0;
	
					var distance = pageX - offsetLeft;
	
					if (distance > controlInfoWidth) {
						return;
					}
						
					this.$refs.activeProgress.style.width = distance + 'px';
	
					distance = distance <= maskMinMoveLeft ? maskMinMoveLeft : distance >= maskMaxMoveLeft ? maskMaxMoveLeft : distance;
		
					this.$refs.mask.style.left = distance + 'px';
					
				},
				move(e) {
					this.moveStart(e);
				},
				history(){
					this.actionsheet = true
					var historykeyword =JSON.parse(localStorage.getItem('history'));
					this.historykeyword = historykeyword
//					console.log('this.history',this.historykeyword)
				},
				music(item, index){
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
				this.$store.commit('getCurrentMusic', item);
				//	获得本项的下标
				this.$store.commit('nextindex', index);
				if(this.currents!=="" && this.currents !== index){
					var a = this.$refs.van[this.currents];
					delete a.dataset.play; //删除currentVans.play属性	
//					console.log('进来了')
				}								
				var current = this.$refs.van[index];
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
		},
		computed: {
//			当前的歌曲
			currentMusic() {
				return this.$store.state.currentMusic;				
			},
//			是否在播放
			isplay(){
				return this.$store.state.play;
			},
//			导航是否显示
			navShow(){
				return this.$store.state.navShow;
			},
//			audio不显示
			audioShow(){
				return this.$store.state.audioShow;
			},			
		},
		created(){				
	  		var hash = location.hash;
	  		for(var i = 0; i < this.navs.length; i++){
	  			if(hash.indexOf(this.navs[i].flag) > -1){
	  				this.navs[i].ischeck = true;
	  				/**划重点***/
	  				this.idx = i;
	  			}else{
	  				this.navs[i].ischeck = false;
	  			}
	  		}
	  		
	  		var songList = localStorage.getItem('songList');			
			if (!songList) {
//				console.log('没有缓存');
					this.axios.get(urls).then(response => {
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
	  		
  		},
		mounted(){
				var audio0 = document.getElementsByTagName('audio')[0]; 						
			   	
				const music = this.$refs.player  // 音频所在对象
				const musicBar = this.$refs.activeProgress  // 颜色进度条所在对象
				const musicWidth = this.$refs.progressLayer.offsetWidth // 底部进度条总宽
				const mask = this.$refs.mask  // 颜色进度条所在对象
				const progressLayer = this.$refs.progressLayer
				music.addEventListener('canplay', () => {
					 const musicTime = music.duration // 获得音频时长
					 const branch = Math.floor(musicTime / 60) // 计算音频分钟
					 const second = Math.ceil(musicTime % 60) // 计算音频秒
					if (branch < 10 && second < 10) { // 四种情况判断音频总时间
					        this.dTime = `0${branch}:0${second}`
					      } else if (branch < 10) {
					        this.dTime = `0${branch}:${second}`
					      } else if (second < 10) {
					        this.dTime = `${branch}:0${second}`
					      } else {
					        this.dTime = `${branch}:${second}`
					      }
//					      console.log('时长：',musicTime);
				})
				 // 获得音频正在播放时的处理
				music.addEventListener('timeupdate', () => {
					const musicTime = music.duration // 获得音频时长
					 const stopTime = music.currentTime // 获得已播放的音频时长
					 
					 musicBar.style.width = `${(stopTime / musicTime) * 100}%`// 计算进度条所在比例宽度
					 const lefts = `${(stopTime / musicTime) * 100}%` // 计算进度条所在比例宽度
					 mask.style.left = lefts >= `98%` ? `98%` : lefts;
					 const branch = Math.floor(stopTime / 60) // 计算已播放的音频分钟
					 const second = Math.floor(stopTime % 60) // 计算已播放的音频秒
					if (branch < 10 && second < 10) { // 四种情况判断显示音频以播放时间
				        this.cTime = `0${branch}:0${second}`
				      } else if (branch < 10) {
				        this.cTime = `0${branch}:${second}`
				      } else if (second < 10) {
				        this.cTime = `${branch}:0${second}`
				      } else {
				        this.cTime = `${branch}:${second}`
				      }
//					      console.log('时长：',stopTime);
//					      console.log('总时长：',musicTime);
					      if(stopTime==musicTime){//下一首
					      	this.next()					      	
//					      	历史收听
							var nowurl = this.$store.state.currentMusic								
							var arr = JSON.parse(localStorage.getItem('history'))//取出缓存	
							if(!arr){//如果没有
								var a = [];
								a.push(nowurl)
								localStorage.setItem('history', JSON.stringify(a));
							}
								for(var i = 0; i < arr.length; i++){
										if(nowurl.url === arr[i].url){//查看是否有重复
			//								console.log('重复')
											arr.splice(i,1)//取出已有的重复项		
										}
									}
								if(arr.length >= 50){
									arr.splice(1,1)//大于50删第一首
								}															
								arr.push(nowurl)//把当前item存入数组
								this.$store.commit('getHistorys',arr);//存到state.historys刷新历史记录
								console.log('历史',this.$store.state.historys)
								localStorage.setItem('history', JSON.stringify(arr));//存入缓存		
					      }
				    })
				// 监听颜色进度条是否触摸拖动
				progressLayer.addEventListener('touchmove', (event) => {
				  const maskWidth = parseFloat(getComputedStyle(this.$refs.mask).width);//滑块的宽度
				  const controlInfoWidth = parseFloat(getComputedStyle(this.$refs.controlInfo).width);//整个容器的宽度
			      const events = event.targetTouches[0].pageX // 获得触摸拖动的距离
			      const offsetLeft = this.$refs.controlInfo.offsetLeft;//左偏移的量			      
			      const maskLeft = events - offsetLeft;			      
			      const a = `${(maskLeft / musicWidth) * 100}%`
			      //滑块移动的最大距离			      
				  const maskMaxMoveLeft = controlInfoWidth - maskWidth;
				  const max = maskMaxMoveLeft
				  const lefts = maskLeft <= 0 ? 0 : maskLeft >= maskMaxMoveLeft ? maskMaxMoveLeft : maskLeft
			      musicBar.style.width = a;		//进度条的移动量		  
			      mask.style.left = lefts + 'px'; //滑块的移动量
			      music.pause()
			      this.$store.state.play = false;// 触摸拖动时停止播放
			    })
//				 // 监听颜色进度条是否触摸拖动结束
				 progressLayer.addEventListener('touchend', () => {
				  console.log('时长：',music.duration);
				  
				  const controlInfoWidth = parseFloat(getComputedStyle(this.$refs.controlInfo).width);//整个容器的宽度
				  
			      const offsetLeft = this.$refs.controlInfo.offsetLeft;//左偏移的量	
			  		      
			      var b = musicBar.offsetWidth
			      const mintimer = 0;
			      const maxtimer = controlInfoWidth;
			      
			      const touwidth = b <= mintimer ? mintimer : b >= maxtimer ? maxtimer :b;
			      const timer = ( touwidth / controlInfoWidth) // 计算进度条所在比例
//			     	 判断拖动时audio是否有src
			      if(audio0.src){
				      music.currentTime = music.duration * timer // 通过所在比例赋值给音频应在的播放时间
				      music.play()
				      this.$store.state.play = true;
			      }else{
			      	Notify({
					  message: '请先选择歌曲',
					  duration: 1000,
					  background: '#e4595c'
					});
			      	return
			      }
			      
			     // 根据播放时间开始播放
			    })
				
		}
	}
	
</script>

<style lang="less" scoped>

	.music{
		.active{
			color: #D33A31;
		}
		.active-bg{
			background-color: #D33A31;
		}
		font-size: .24rem;
		.music-nav{
			position: sticky;
			top: 0;
			height: 0.8rem;
			width: 100%;
			background-color: #E4393C;
			z-index: 100;
			>div{
				float: left;
				/*border: 1px solid lightcyan;*/
			}
			>div:nth-child(1){
				width: 20%;
				padding-top: 0.2rem;
				i{
					display: block;
					height: 0.07rem;
					width: 0.5rem;
					margin-bottom: 0.1rem;
					margin-left: 0.2rem;
					background-color: #FFFFFF;
				}
			}
			>div:nth-child(2){
				width: 60%;
				height: 100%;
				span{
					display: block;
					text-align: center;
					float: left;
					width: 33.3333%;
					height: 100%;
					line-height: 0.8rem;
					font-size: 0.3rem;
					color: #FFFFFF;
				}
				.span{
					font-size: 0.4rem;
				}
			}
			
			>div:nth-child(3){
				width: 20%;
				height: 100%;
				.plus{
					display: block;
					text-align: center;
					line-height: 0.8rem;
				}
			}
		}
		
		.tab{
			position: sticky;
			top: 0.8rem;
			left: 0;
			border-bottom: 2px solid #EBEBEB;
			height: .8rem;
			background-color: #fff;
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
		.control{
			height: 1rem;
			background-color: #D43C33;
			position: fixed;
			width: calc(~"100% - .2rem");
			bottom: 0;
			left: 0;
			padding: .1rem;
			.avatar{
				width: .9rem;
				height: .9rem;
				border-radius: 50%;
				margin-top: .05rem;
				background-color: #f5f5f5;
				animation: r 10s linear 0s infinite;
			}

			.control-info{
				width: calc(~"100% - 1rem");
				height: 100%;
				margin-left: .1rem;
				.progress{
					margin-top: .12rem;
					margin-bottom: .12rem;
					background-color: #f2f2f2;
					position: relative;
					.active-progress{
						/*滑块进度*/
						width: 0%;
						height: .08rem;
						background-image: linear-gradient(to right, #F27C76 0%, #F74D48 100%);
					}
					.mask{
						position: absolute;
						left: 0;
						top: -.06rem;
						width: .2rem;
						height: .2rem;
						border-radius: 50%;
						background-color: #980805;
						box-shadow: 0 0 8px 1px rgba(255, 255, 255, .3);
						animation: light 2s linear 0s infinite alternate;
						z-index: 5;
						.circle{
							position: absolute;
							left: 0;
							top: 0;
							right: 0;
							bottom: 0;
							margin: auto;
							width: 2px;
							height: 2px;
							border-radius: 50%;
							background-color: #eee;
						}
					}
					.layer{
						position: absolute;
						left: 0;
						top: 0;
						width: 100%;
						height: .2rem;
						top: -.06rem;
						z-index: 6;
					}
				}
				.music-control{
					height: .68rem;
					.text{
					
						height: .68rem;
						color: #f2f2f2;
						>div{
							overflow: hidden;
							white-space :nowrap;
							text-overflow: ellipsis;
							max-width: 150px;
							height: .34rem;
							line-height: .34rem;
						}
						div:nth-child(1){
							font-size: 17px;
						}
						div:nth-child(2){
							font-size: 12px;
							/*color: red*/
						}
					}
					.control-icon{
						margin-top: 0.14rem;
						>span{
							width: .4rem;
							height: .4rem;
							margin-right: .3rem;
							position: relative;
							&:last-child{
								margin-right: 0;
							}
							&.menu>div{
								position: absolute;
								width: 90%;
								left: 50%;
								top: 50%;
								transform: translate(-50%, -50%);
							}
						}
					}
				}
			}
		}
		.actionsheet-g{
			background: rgba(0,0,0,.7);
			color:white;
		}
		.van-overlay{
			height: 0;
		}
		#actionsheet{
			.title{
				width: 100%;
				text-align: center;
			}
			.list{
				width: 100%;
				height: 4rem;
				overflow-y: auto;
				.li{
					height: 0.5rem;
					width: 100%;
					
					line-height: 0.5rem;
					font-size: 0.3rem;	
					color: #b5d8b3;		
					border-bottom: 1px solid gold;
					padding-left: 0.2rem;
					overflow: hidden;
					white-space :nowrap;
					text-overflow: ellipsis;
				}
			}
		}
	}
	@keyframes r{
		from{
			transform: rotate(0deg);
		}

		to{
			transform: rotate(360deg);
		}
	}
	@keyframes light {
		from{
			box-shadow: 0 0 8px 1px rgba(255, 255, 255, .3);
		}

		to{
			box-shadow: 0 0 8px 4px rgba(255, 255, 255, 1);
		}
	}
</style>