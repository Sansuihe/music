<template>
<div id="like">
	<div class="nav">
		<div class="prev" @click="prev" >
			<van-icon name="arrow-left" size='0.5rem' />
		</div>
		<div class="title">
			
		</div>
	</div>
	<div class="top">
		<div class="left">
			<img class="auto-img" v-lazy='imgs'/>
		</div>
		<div class="right">
			<div class="right-top">自定义歌单列表：</div>
			<div class="right-middle">
				<div class="right-left">
					<!--<img class="auto-img" v-lazy=''/>-->
				</div>
				<div class="right-right">
					{{title}}
				</div>
			</div>
				
			<div class="right-bttom">
				简介：这里是添加的自定义的列表
			</div>
		</div>
		<div class="bottom">
			<div>
				<van-icon name="thumb-circle-o" size='0.6rem' color='#e4393c' />
			</div>
			<div>
				<van-icon name="chat-o" size='0.6rem' color='#e4393c' />
			</div>
			<div>
				<van-icon name="records" size='0.6rem' color='#e4393c' />
			</div>
		</div>
	</div>
	<!--列表-->
	<div class="inner-middle">
		<div><span>全部播放：<span style="color: #E4393C;">{{randomSongli.length}}</span></span></div>
		<div class="icn">
			<van-icon name="edit" size='0.5rem' @click='deleteShow'/>
			<van-icon name="bars" size='0.5rem' />
		</div>
	</div>
	<div class="random-music">
			<div ref="van" class="clearfix" v-for="(item, index) in randomSongli" :key="index" > <!--播放事件与热门歌单冲突-->
				<div class="fl singer">
					<img class="auto-img" v-lazy="item.pic"/>
				</div>
				<div class="fl song-info" @click="music(item,index)">
					<div class="fl">
						<div class="song-name one-text">{{item.title}}</div>
						<div class="singer-name one-text">{{item.author}}-{{item.title}}</div>					
					</div>
					<div ref='delete' class="right" v-show="deletes" @click="deleteSong(index)">
						<van-icon name="delete" color='#E4393C' size='0.4rem' />
					</div>
				</div>
			</div>
	</div>
	<div class="none" v-show="!this.randomSongli.length">
		<p>您的歌单还未添加歌曲</p>
	</div>
</div>
</template>

<script>
	import { Icon,Notify} from 'vant';
	export default{
		name:'like',
		data(){
			return{
				randomSongli:'',
				deletes:false,
				title:'',
				imgs:'',
				currents:'',
			}
		},
		components:{
			[Icon.name]:Icon,
			[Notify.name]:Notify,
		},
		methods:{
			prev(){
		    		this.$router.go(-1)
		  	},
			deleteShow(){
				if(this.deletes != true){
					this.deletes=true;
				}else{
					this.deletes = false;
				}
				if(this.randomSongli.length == 0 ){
					Notify({
							  message: "请先添加您的歌单",
							  duration: 1500,
							  background: '#dc8096'
					});
					return;
				}
			},
			deleteSong(index){
				var arr = this.$route.query.index
				var newSong = JSON.parse(localStorage.getItem("newSonglist" + arr));//取除缓存的歌单
				newSong.splice(index,1)//删除第index项			
				this.randomSongli = newSong//刷新页面数据
				localStorage.setItem("newSonglist" + arr, JSON.stringify(newSong));//更新缓存
				if(this.randomSongli.length == 0 ){
					Notify({
							  message: "没有歌曲啦",
							  duration: 1500,
							  background: '#dc8096'
					});
					return;
				}
				
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
		mounted(){
		},
		created(){
			this.$store.commit('getNavnone');
			var index = this.$route.query.index
			var indexs = ++this.$route.query.index
//			console.log('this.$route.query.index',index)
			this.randomSongli = JSON.parse(localStorage.getItem("newSonglist" + indexs));//拿到歌单缓存
			if(indexs ==0){
				this.title = '我的收藏'
			}else{
				this.title = JSON.parse(localStorage.getItem('newAddsong'))[index].title;
			}
//			console.log('this.$route.query.index',index)
			if(this.randomSongli.length>1){
				this.imgs = this.randomSongli[0].pic
			}{
				return;
			}
		}
	}
</script>

<style lang="less" scoped>
	#like{
		padding-bottom: 1.5rem;
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
	}
	.top{
		background-color: rgba(189,174,174,.3);
		.left{
			width: 2rem;
			height: 2rem;
			margin: 0.2rem;
			border: 1px solid gray;
			background-color: rgba(189,174,174,.3);
			overflow: hidden;
			float: left;
		}
		.right{	
			float: left;
			width: 2.5rem;
			margin-top: 0.2rem;	
			margin-left: 0.2rem;
			overflow: hidden;	
			.right-top{
				width: 2.5rem;
				font-size: 0.3rem;
			}
			.right-middle{
				width: 100%;
				height: 1rem;
				.right-left{
					margin-top: 0.5rem;
					width: 0.8rem;
					border-radius: 50%;
					overflow: hidden;
					float: left;
				}
				.right-right{
					/*margin-top: 0.7rem;*/
					width: 100%;
					float: left;
					font-size: 0.4rem;
					 overflow: hidden;/*内容超出后隐藏*/
					text-overflow: ellipsis;/* 超出内容显示为省略号*/			
					white-space: nowrap;/*文本不进行换行*/
				}
			}
			
			.right-bttom{
				margin-top: 0rem;
				
			}
		}
		.bottom{
			overflow: hidden;
			width: 100%;
			height: 1rem;
			box-sizing: border-box;
			/*box-shadow:4px 0.13rem 0.15rem #af9292;*/	
			div{
				margin-top: 0.3rem;
				height: 1rem;
				width: 33.33%;
				float: left;
				box-sizing: border-box;
				text-align: center;
			}
		}
	}
	.inner-middle{
		box-shadow:4px 0.13rem 0.15rem #af9292;	
		width: 100%;
		height: 0.8rem;
		>div{
			float: left;
			height: 0.8rem;
			line-height: 0.8rem;
			}
		:nth-child(1){
			width: 70%;
			>span{
				padding-left: 0.3rem;
				font-size: 0.4rem;
				}
			}
		.icn{
			width: 30%;
			padding-top:0.2rem; 
			 
			:nth-child(1){
				margin-left:0.5rem;
				width: 0.6rem;
				float: left;
				}
			:nth-child(2){
				width: 0.6rem;
				margin-left:0.2rem;
				float: left;
				}
			}
		}
		.random-music{
		/*display: block;*/
			/*position: absolute;*/
			>div{
				border-bottom: 1px solid #ececec;
				padding-top: .15rem;
				padding-bottom: .15rem;
				padding-left: 0.5rem;
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
				.right{
					float: right;
					margin-top: 0.4rem;
					width: 0.4rem;
				}
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
					right: 1rem;
					color: #E4393C;
					:nth-child(1){
						position: absolute;
						top: 0.05rem;
						color: black;
					}
				}
			}
		}
		.none{
			height: 1rem;
			width: 100%;
			line-height: 1rem;
			font-size: 0.3rem;
			text-align: center;
		}
</style>