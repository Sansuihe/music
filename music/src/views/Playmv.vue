<template>
<div id="playmv">
	<div class="nav">
		<div class="prev" @click="prev" >
			<van-icon name="arrow-left" size='0.5rem' />
		</div>
		<div class="title">
		<div>{{mv.name}}</div>
		</div>
	</div>
	<!--<video id='video' controls width="100%"  :src='mvUrl' autoplay>
		当前浏览器不支持 video直接播放，点击这里下载视频： <a href="myvideo.webm">下载视频</a>
	</video>-->
	<video-player  class="video-player vjs-custom-skin video"
	     ref="videoPlayer"
	     :playsinline="true"
	     :options="playerOptions"
	></video-player>
	
	<div class=" a inners" >
		<div class="list" >
			<div class="li-img"><img class="auto-img" :src="mv.cover" alt="重新刷新" /></div>
			<div class="li-title">
				<div class="title-top">
					{{mv.desc}} 
				</div>
				<div class="title-bottom">播放次数：<span>{{mv.playCount}}</span></div>
			</div>
		</div>
		<div class="inner-totlr">更多Mv推荐</div>
		<div class="a mv" >
			<div class="lists" v-for="(item,index) in addmv" :key='index' ref='vand' @click="music(item)" >
				<div class="li-imgs"><img class="auto-img" :src="item.cover" alt="重新刷新" /></div>
				<div class="li-titles">
					<p>{{item.briefDesc}}{{item.name}}</p>
					<p>{{item.artistName}}</p>
				</div>
			</div>
		</div>	
	</div>
	
	</div>
</template>

<script>
	import { Icon,Swipe, SwipeItem, NoticeBar  } from 'vant';
	
	
	export default{
		name:'playmv',
		data(){
			return{
				mv:{},
				mvUrl:'',
				mus:[],
				addmv:[],
				ids:'',
				playerOptions : {
		        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
		        autoplay: true, //如果true,浏览器准备好时开始回放。
		        muted: false, // 默认情况下将会消除任何音频。
		        loop: true, // 导致视频一结束就重新开始。
		        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
		        language: 'zh-CN',
		        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
		        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
		        sources: [{
		          type: "",
		          src:''//url地址
		        }],
		        poster: "../../static/images/test.jpg", //你的封面地址
		        // width: document.documentElement.clientWidth,
		        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
		        controlBar: {
		          timeDivider: true,
		          durationDisplay: true,
		          remainingTimeDisplay: false,
		          fullscreenToggle: true  //全屏按钮
		        }
		    }
				
			}
		},
		components:{
			[Icon.name]:Icon,
			[Swipe.name]:Swipe,
			[SwipeItem.name]:SwipeItem, 
			[NoticeBar.name]:NoticeBar,
		},
		methods:{
			prev(){
				this.$router.go(-1)
				var audio = document.getElementsByTagName('audio')[0];
				if(audio.pause){
					audio.play();//开启
				};
			},
			music(item){
				this.ids = item.id
				var a ='https://api.mlwei.com/music/api/mv/?key=523077333&mv=163&type=info&id='+this.ids;
				this.axios.get(a).then(response => { 
					this.mv = response.data.data
					var urls = response.data.data.brs
					this.mvUrl = urls[720]
					this.playerOptions.sources[0].src= urls[720]
					this.playerOptions.poster = response.data.data.cover
//					console.log('数据',response.data.data)
				});
				var src4 ='https://api.mlwei.com/music/api/mv/?key=523077333&mv=163&type=so&word=发现&page=1';
				this.axios.get(src4).then(response => {
					this.addmv = [];
					for(var i = 0; i < 20; i++){
						var random = Math.floor(Math.random()*100+1);
						this.addmv.push(response.data.result.mvs[random])
					}
				})
			}
		},
		mounted(){
			var audio = document.getElementsByTagName('audio')[0];
			if(audio.play){
				audio.pause();//关闭
			}
		},
		created(){
			if(this.$route.query.id == undefined){
				this.$router.go(-1)
			}
			this.$store.commit('getNavnone');
			this.$store.commit('getAudionone');
			this.$store.state.play = false;		
			this.ids = this.$route.query.id
			var src1 ='https://api.mlwei.com/music/api/mv/?key=523077333&mv=163&type=info&id='+this.ids;
				this.axios.get(src1).then(response => { 
					this.mv = response.data.data
//					console.log('数据',response.data.data)
					var url = response.data.data.brs
					this.mvUrl = url[720]
					this.playerOptions.sources[0].src = url[720]
					this.playerOptions.poster =response.data.data.cover				
				});
				
			var src3 ='https://api.mlwei.com/music/api/mv/?key=523077333&mv=163&type=so&word=发现&page=1';
			this.axios.get(src3).then(response => {
					
					for(var i = 0; i < 20; i++){
						var random = Math.floor(Math.random()*100);
						this.addmv.push(response.data.result.mvs[random])
					}
				})
		}
	}
</script>

<style lang="less" scoped>
#playmv{
	.video{
		margin-top: 1rem;
	}
	.nav{
			position: fixed;
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
				>div{
					width: 80%;
					height: 1rem;
					margin: 0 auto;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}
	.inners{
			display: block;
			width: 100%;
			height: 10rem;	
			overflow-y: auto;	
			.list{
				margin-top: 0.2rem;	
				width:100%;	
				max-height: 1.5rem;
				border-bottom:1px solid gray;
				.li-img{
					width: 1.5rem;
					max-height: 1rem;
					margin: 0.1rem 0rem;
					overflow: hidden;
					float: left;
				}
				.li-title{
					padding-left: 0.3rem;
					height: 1.5rem;
					overflow:hidden;
					.title-top{
						height: 1rem;
						overflow: hidden;
						line-height: 0.3rem;
						font-size: 16px;
						overflow-y: auto;
					}
					.title-bottom{
						float: right;
						height: 0.4rem;
						color:#887d50;
					}
				}
			}
		}
		.inner-totlr{
			font-size: 0.5rem;
			color: #E4303C;
		}
		.mv{
			width: 100%;
			height: 10rem;	
			overflow-y: auto;	
			.lists{
				margin-top: 0.2rem;
				float: left;	
				width:50%;	
				height:2rem;		
				.li-imgs{
					width: 2rem;
					max-height: 2rem;
					overflow: hidden;
					margin: 0 auto;
				}
				.li-titles{
					text-align: center;
					
					width: 80%;
					margin: 0 auto;
					p{
						margin-top: 0.1rem;
						line-height: 0.3rem;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
			}
		}
}
</style>