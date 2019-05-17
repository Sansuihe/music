<template>
<div id="hotlist">
	<div class="nav">
		<div class="prev" @click="prev" >
			<van-icon name="arrow-left" size='0.5rem' />
		</div>
		<div class="title">
			分类歌单
		</div>
	</div>
	<!--<div class="prev" @click="prev">
		<img class="auto-img" src="../assets/music.jpg"/>
	</div>-->
	<div class="navs">	
		<p><span>曲目类别：</span>{{HotListTitle}}</p>
	</div>
	<div class="hotlist">
		<div ref="van" class="li" @click="li(item,index)" v-for="(item,index) in HotList" :key = 'index'>
			<div class="li-img">
				<img class="auto-img" v-lazy="item.pic"/>
			</div>
			<div class="li-title">
				<p>{{item.title}}</p>
				<p>{{item.author}}---{{item.title}}</p>
			</div>
		</div>
	</div>
</div>
</template>

<script>
	import { Icon } from 'vant';
	export default{
		name:'hotlist',
		data(){
			return{
				title:'',
				
			}		
		},
		components:{
			[Icon.name]:Icon,
		},
		computed:{
			HotList(){
				return this.$store.state.HotListsong;
			},
			HotListTitle(){
				return this.$store.state.HotListTitle;
			},
		},
		mounted(){
				
			},
		methods:{
//			回上一级
			prev(){
		    		this.$router.go(-1)
		  	},
		  	li(item,index){
//		  		console.log('打',item,index)	  		
		  		var audio = document.getElementsByTagName('audio')[0];
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
		created(){
//			初始化 如果为空回上一级
			this.title = this.$store.state.HotListTitle;
			this.$store.commit('getNavnone');
//			console.log('this.title',this.title)
			if(this.title == ''){
//				console.log('回主页');
				this.$router.go(-1)
			}
		}
	}
</script>

<style lang="less" scoped>
	#hotlist{
		p{
			padding: 0;
			margin: 0;
		}
		.nav{
			position: sticky;
			top: 0;
			height: 1rem;
			width: 100%;
			background-color: #E4393C;
			z-index:1;
			.prev{
				/*margin-left: 0.3rem;*/
				height: 1rem;
				width: 1rem;
				line-height: 1rem;
				position: absolute;
				z-index: 10;
				>i{
					color: #F1F1F1;
					margin-top: 0.3rem;
				}
			}
			.title{
				position: absolute;
				height: 1rem;
				width: 100%;
				line-height: 1rem;
				text-align: center;
				font-size: 0.4rem;
				color: white;
				z-index: 0;
			}
		}
		/*.prev{
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
		}*/
		.navs{
			height: 1rem;
			/*background-color: #ede1e1;*/
			>p{
				/*text-align: center;*/
				padding-left:0.5rem ;
				font-size: 0.4rem;
				height: 0.8rem;
				line-height: 0.8rem;
				box-shadow:4px 0.13rem 0.15rem #af9292;		
				color: #e01617;
				font-style: italic;
				font-weight:bold;
			}
			span{
				color: black;
				font-style: normal 
			}
		}
		.hotlist{
			padding-bottom: 1.2rem;
			.li{				
				height: 1.5rem;
				/*border: 1px solid red;*/
				margin-bottom: 0.2rem;
				background-color:rgba(0,0,0,.1);
				.li-img{
					width: 1rem;
					height: 1rem;
					float: left;
					overflow: hidden;
					margin: 0.25rem 0rem 0.1rem 0.2rem;
				}
				.li-title{
					height: 100%;
					width: 90%;
						
					>p{
						padding-left: 0.5rem;
						overflow: hidden;
						white-space :nowrap;
						text-overflow: ellipsis;
						
					}
					:nth-child(1){
						padding-top: 0.3rem;
						font-size: 0.35rem;
						color: #ff1a1a;
						
					}
					:nth-child(2){
						color: #31322c;
					}
				}
			}
		}
		
	}
</style>