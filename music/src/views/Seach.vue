<template>
<div id="seach">
	<form>
	  <van-search v-model="keyword" placeholder="请输入歌曲关键词" show-action >
	  <div slot="action" @click="search">搜索</div>
	  </van-search>
	</form>
	<p>历史搜索:</p>
	<div class='vantag'>
		<van-tag class='spans' plain type="primary" style='margin-left: 0.2rem;' v-for='(item,index) in historykeyword' :key='index' @click='historymusic(item)'>{{item}}</van-tag>		
	</div>
	<div class="prev" @click="prev">
		<img class="auto-img" src="../assets/music.jpg"/>
	</div>
	<div class="list">
		<div ref="van" class="li"  v-for="(item,index) in list" :key='index'>
			<div class="imgs">
				<img class="auto-img" v-lazy="item.pic"/>
			</div>
			<div class="title" @click="music(item,index)">
				<p>{{item.title}}--{{item.author}}</p>
				<p>
					<van-tag type="success">原声</van-tag>
					<van-tag plain  style='margin-left: 0.2rem;' type="danger">MV</van-tag>
					<van-tag color="#7232dd" style='margin-left: 0.2rem;' plain>HQ</van-tag>
				</p>
				
			</div>
			<div class="long" @click="addSong(item)">
				<i></i>
				<i></i>
				<i></i>
			</div>
		</div>
	</div>
	<!--弹出层-->
		<van-popup class="popupInner" v-model="popup" position="right" :overlay="true" lazy-render>
				<div class="popupInner-nav">
					<div @click="close">返回</div>
					<div>
						歌单列表
					</div>
				</div>
				<div class="popupInner-list">
					<div class="popupInner-list-title">
						<p>加入歌单</p>
						<van-icon name="plus" size="0.4rem" class="van" @click='addSonglist' />
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
	import { Icon,Search,Tag,Popup,Notify } from 'vant';
	export default{
		name:'seach',
		data(){
			return{
				keyword:'',
				historykeyword:'',
				list:'',
				start:0,
				end:20,
				popup:false,
				addSongitem:'',
				classify:[
					{title: '我的收藏',path:{name:'like'}},
				],
				add:false,
				show:true,
			}
		},
		components:{
				[Icon.name]:Icon,
				[Search.name]:Search,
				[Tag.name]:Tag,
				[Popup.name]:Popup,			
				[Notify.name]:Notify,			
		},
		computed:{
			historys(){
				var historys = JSON.parse(localStorage.getItem('keyword'));
				return historys
			} 
		},
		methods:{
//			搜索功能
			search(){
				if(this.keyword==''){//为空就拦截
					return;
				}
				var src = 'https://api.mlwei.com/music/api/wy/?key=523077333&id='+this.keyword+'&type=so&cache=0&nu=20'
				this.axios.get(src).then(response => {
//					console.log(response.data)
					this.list = response.data.Body
					this.$store.commit('getSongList', response.data.Body);
					this.$store.commit('getCurrentSong', response.data.Body);
				})
				var keywords = JSON.parse(localStorage.getItem('keyword'));
				if(!keywords){
					var keywords = [];
					keywords.push(this.keyword);
					localStorage.setItem('keyword',JSON.stringify(keywords));
				}else{
					var newkeyword =  JSON.parse(localStorage.getItem('keyword'));
					if(newkeyword.length >=7){
						newkeyword.splice(0,1)
					}
					newkeyword.push(this.keyword);
					localStorage.setItem('keyword',JSON.stringify(newkeyword));
					this.historykeyword = JSON.parse(localStorage.getItem('keyword'));
				}
			},
			historymusic(item){
//				console.log(item)
				var src = 'https://api.mlwei.com/music/api/wy/?key=523077333&id='+ item +'&type=so&cache=0&nu=20'
				this.axios.get(src).then(response => {
//					console.log(response.data)
					this.list = response.data.Body
					this.$store.commit('getSongList', response.data.Body);
					this.$store.commit('getCurrentSong', response.data.Body);
				})
			},
			prev(){
		    		this.$router.go(-1)
		  	},
		  	close(){
					if(this.popup !=true){
						this.popup = true;
					}else{
						this.popup = false;
					}
				},
			addSonglist(){
				if(this.add != true){
					this.add = true;	
				}else{
					this.add = false;
				}
				this.show = true;
			},
			addSong(item){					
					if(this.popup !=true){
						this.popup = true;
					}else{
						this.popup = false;
					}
//					
					this.addSongitem = item;
//					console.log('this.addSongitem2',this.addSongitem)
					
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
			},
//			播放功能
			music(item, index) {			
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
				
//				修改state的当前歌曲项
				this.$store.commit('getCurrentMusic', item);
//				获得本项的下标
				this.$store.commit('nextindex', index);
				//play = 1 正在播放, 0: 停止
				var currentVan = this.$refs.van[index];

				var isPlay = currentVan.dataset.play;
				
				if (isPlay == 1) {
					//停止
					audio.pause();
					currentVan.dataset.play = 0;

					var pause1 = require('../assets/pause1.png');
					
					item.iconUrl = pause1;
					
					this.$store.state.play = false;
//					console.log('改变state：',this.$store.state.play)

				} else if (isPlay == undefined || isPlay == 0) {

					audio.play();
					currentVan.dataset.play = 1;

					var play1 = require('../assets/play1.png');

					item.iconUrl = play1;
					
					this.$store.state.play = true;
//					console.log('改变state：',this.$store.state.play)				
				}				
				//可以播放歌曲
				audio.oncanplay = function () {
					this.play();
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
				
			}
		},
		mounted(){
			this.historykeyword = JSON.parse(localStorage.getItem('keyword'));
		},
		created(){
			this.$store.commit('getNavShow');
			this.$store.commit('getAudioshow');
			var newAddsong = localStorage.getItem('newAddsong');//获取本地存储的歌单
			if(!newAddsong){
				localStorage.setItem('newAddsong', JSON.stringify(this.classify));
			}else{
				this.classify =JSON.parse(localStorage.getItem('newAddsong'));
			}
		}
		
	}
</script>

<style lang="less" scoped>
	p{
		margin: 0;
		padding: 0;
	}
	#seach{
		.vantag{
			display: inline;
			width: 100%;
			.spans{
				margin-top: 0.1rem;
				max-width: 1rem;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			
		}
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
			margin-top:0.2rem;
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
						display: block;
						height: 50%;
						width: 4rem;
						padding-left: 0.3rem;
						font-size: 0.25rem;
						
						overflow: hidden;
						white-space :nowrap;
						text-overflow: ellipsis;
						
						
					}
					p:nth-child(1){
						font-size: 0.3rem;
						height: 0.6rem;
						line-height:0.6rem;
						
					}
					:nth-child(2){
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
		
</style>