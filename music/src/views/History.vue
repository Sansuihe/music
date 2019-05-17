<template>
<div id="history">
	<div class="nav">
		<div class="prev" @click="prev" >
			<van-icon name="arrow-left" size='0.5rem' />
		</div>
		<div class="title">
			历史记录
		</div>
	</div>
	<div class="history-nav" >
		<div :class="{active: item.ischeck}" @click="toggleTab(item,index)" v-for="(item,index) in navs" :key='index'>{{item.title}}</div>
	</div>
	<div class="inner">
		<div class="a">
			<div class="a-nav">
				<div><van-icon class='icn1' name="music-o" size='0.5rem' color='#e4393c' /></div>
				<div><span>全部播放：</span></div>
				<div><van-icon class='icn2' name="bars" size='0.5rem' color='#e4393c' /></div>
			</div>
			<div class="historyShow" v-show='!history.length'>
				还没有播放过的音乐
			</div>
			<div class="container">
				<div class="list" ref='vans' v-for="(item,index) in history" :key='index' @click='randommusic(item, index)'>
					<div class="list-span">
						{{index+1}}.{{item.title}}---
						{{item.author}}
					</div>
					<div class="list-img">
						<img class="auto-img" v-lazy="item.pic"/>
					</div>
				</div>
			</div>
			
		</div>
		<div class="a">
			<div class="list-span"  v-for="(item,index) in history" :key='index' @click='randommusic(item, index)'>
				{{item.author}}
			</div>
		</div>
		<div class="a">
			<p id="play">
				尚未添加播放的歌曲...
			</p>
		</div>
		<div class="a">
			<p>后端Api不再维护，mv暂不支持加载...</p>
		</div>
	</div>
</div>
</template>

<script>
	import { Icon } from 'vant';
	export default{
		name:'history',
		data(){
			return{
				history:'',
				navs:[
					{title:'单曲', ischeck: true},
					{title:'歌手', ischeck: false},
					{title:'播放', ischeck: false},
					{title:'MV', ischeck: false},
				],
				idx:0,
				currents:'',
			}
		},
		components:{
			[Icon.name]:Icon,
		},
		computed: {
		},
		methods:{
			toggleTab(item,index){
				if(this.idx == index){
	  				return;
	  			}
	  			item.ischeck = true;
	  			this.navs[this.idx].ischeck= false;
	  			var a = document.getElementsByClassName('a');
//				上一项隐藏
  				a[this.idx].style.display = 'none'
//				当前项显示
  				a[index].style.display = 'block'
	  			this.idx = index;
			},
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
				this.$store.commit('getCurrentMusic', item);
				//	获得本项的下标
				this.$store.commit('nextindex', index);
				if(this.currents!=="" && this.currents !== index){
					var a = this.$refs.vans[this.currents];
					delete a.dataset.play; //删除currentVans.play属性	
					console.log('进来了')
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
			prev(){
				this.$router.go(-1)
			},
		},
		mounted(){
			this.history = this.$store.state.historys
		},
		created(){
			this.$store.commit('getNavnone');
			var history = localStorage.getItem('history');
				if(!history){
					this.history =''
				}else{
					this.history = JSON.parse(localStorage.getItem('history'))
//					console.log('this.history',this.history)
				}
		}
	}
</script>

<style lang="less" scoped>
	#history{
		padding-bottom: 2rem;
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
		.history-nav{
			position: relative;
			height: 0.8rem;
			width: 100%;
			box-shadow:4px 0.13rem 0.15rem #af9292;	
			z-index: 0;
			>div{
				width: 25%;
				height: 0.8rem;
				line-height: 0.8rem;
				text-align: center;
				float: left;
				
			}
			.active{
				box-sizing: border-box;
				border-bottom: 3px solid red;
			}
			
		}
		.inner{
			/*overflow-y: auto;*/
			.a{
			width: 100%;
			display: none;
			overflow-y: auto;
			.a-nav{
				width: 100%;
				height: 0.8rem;				
				border-bottom:1px solid gray ;
				overflow:hidden;
				:nth-child(1){
					float: left;
					height: 0.8rem;
					width: 20%;
					position: relative;
					.icn1{
						position: absolute;
						right: 0.4rem;
						top: 0.1rem;
					}
				}
				:nth-child(2){
					float: left;
					height: 0.8rem;
					width: 60%;
					>span{
						display: inline-block;
						line-height: 0.8rem;
						width:1.5rem;
					}
				}
				:nth-child(3){
					float: left;
					height: 0.8rem;
					width: 20%;
					position: relative;
					.icn2{
						position: absolute;
						left: 0.3rem;
						top: 0.1rem;
					}
				}
				}
			}
			:nth-child(1){
				display: block;
			}
		}
		.container{
			width: 100%;
			height: 8rem;
			.list{
				height: 0.8rem;
				line-height: 0.8rem;
				padding-left: 0.5rem;
				border-bottom: 1px solid gray;
				.list-span{
					float:left ;
					color: #3f290a;
					width: 4rem;
					overflow: hidden;
					white-space :nowrap;
					text-overflow: ellipsis;				
				}
				.list-img{
					float: right;
					width: 0.6rem;
					height: 0.6rem;
					overflow: hidden;
					margin: 0.1rem;
				}
			}
		}	
	}
	.historyShow{
		width: 100%;
		height: 1rem;
		line-height: 1rem;
		text-align: center;
		font-size: 0.4rem;
	}
	.list-span{
		width: 100%;
		line-height: 0.8rem;
		font-size: 0.3rem;
		padding-left: 0.3rem;
	}
</style>