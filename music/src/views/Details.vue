<template>
<div id='Details'>
	<div class="nav">
		<div class="prev" @click="prev" >
			<van-icon name="arrow-left" size='0.5rem' />
		</div>
		<div class="title">
			{{this.$store.state.currentMusic.title}}
		</div>
	</div>
	<!--<div class="prev" @click="prev">
		<img class="auto-img" src="../assets/music.jpg"/>
	</div>-->
	
	<div class="lrc" >		
		<!--<p class="title">{{nowtitle}}</p>-->
		<!--<p v-for="(item,index) in nowThislrc" :key='index'> {{item}}</p>-->
		<!--<div class="con-p">1</div>-->
		<div class="position-lrc">
			<div class="thislrc"></div>
			<div ref='tops' class="con-p"></div>
		</div>		
	</div>
</div>
</template>

<script>
	import { Icon } from 'vant';
	import Lyric from 'lyric-parser'
//	import Scroll from './scroll'
	import lyrics from '../untils/lyrics'  
	 export default{
	 	name:'details',
	 	data(){
	 		return{
	 			lrc:'',
	 			nowMusic:'',
	 			lyrics:'',
	 			currentLyric: null,  // 设置一个歌词维护属性
     			currentLineNum:0,
     			playing:true,
	 		}
	 	},
	 	components: {
//		      Scroll
			[Icon.name]:Icon,
		 },
	 	methods:{
//	 		返回上一级
	 		 prev(){
		    		this.$router.go(-1)
		  	},
	 	},
	 	computed: {
//			当前的歌曲
			currentMusic() {
				return this.$store.state.currentMusic;				
			},
			nowtitle(){
				const a = this.$store.state.currentMusic.title;
		 		const b = this.$store.state.currentMusic.author;
		 		const c = a + "--" + b
		 		return c
			},
//			歌词
			nowThislrc(){
				return this.$store.state.nowlrc
			}
		},
	 	created(){
			console.log('进入');
			this.$store.commit('getNavnone'); 		
	 	},
	 	mounted(){
	 		var tops = this.$refs.tops
//			console.log("1",tops)
			tops.style.top = 30 +'px';
//			console.log("12",tops)
	 		var audio = document.getElementsByTagName('audio')[0];
//			console.log('现在是',audio.currentTime)
	 		
	 		var url =this.$store.state.currentMusic.lrc;
//	 		判断是否空值 是就回主页
	 		if(url == undefined){
//	 			console.log('1')
	 			this.$router.push({name:'/'});
	 			return
	 		}
	 		this.axios.get(this.$store.state.currentMusic.lrc).then(response => {
//	 			console.log(response.data)
	 			this.lrc = response.data;
	 			this.lyrics = response.data;
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
//					this.lrc = lrc.split('-');
//					console.log("时间",time) 	
					
					const conp = document.querySelector('.con-p')
				// 包裹歌词的元素容器
			        lyrics.lyticsEnd(conp) // 重置对象
			        lyrics.parse(response.data, conp) // 解析歌词  this.lyrics 代表歌词数据
			        lyrics.addcontent(conp) // 向元素容器中添加歌词内容
			        lyrics.gundong(conp) // 歌词滚动函数		
			 	})	
			 	
			 	
	 		
	 	},
	 	
	 }
</script>

<style lang="less" scoped>
	#Details{
		background-color: rgba(61,4,4,.8);
		padding-bottom: 2rem;
		overflow: hidden;
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
				margin: 0 auto;
				text-align: center;
				font-size: 0.4rem;
				color: white;
				z-index: 0;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
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
			z-index:100;
			>img{
				height: 100%;
			}
		}*/
		.lrc{
			margin-top: -0.4rem;
			/*background-color: rgba(245,82,82,.5);*/
			text-align: center;
			font-size: 0.3rem;
			padding-bottom: 0.5rem;
			.title{
				font-size: 0.4rem;
				overflow: hidden;
				white-space :nowrap;
				text-overflow: ellipsis;
			}
		}
		.position-lrc{
			box-sizing: border-box;
			position: relative;
			margin-top: 4rem;
			/*height: 10rem;*/
			width: 100%;
			padding-bottom: 4rem;
			.thislrc{
				position: absolute;
				/*top:-5px;*/
				width: 100%;
				height:30px;
				background-color: #c09090;
				line-height: 20px;
			}
			/*.cons{*/
			.con-p{
				font-size: 16px;
				margin: 0;
				position: absolute;
				top:30px ;
				text-align: center;
				height: 30px;
				width: 100%;
				line-height: 30px;
				/*background-color: #E4393C;*/
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
</style>