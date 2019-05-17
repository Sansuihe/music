<template>
<div id='mv'>
	
	<div class="nav">
		<div class="prev" @click="prev" >
			<van-icon name="arrow-left" size='0.5rem' />
		</div>
		<div class="title">
		音乐MV
		</div>
	</div>
	<div id="search">
		<van-search @focus="seach({name:'mvseach'})" placeholder="        点此搜索你想看的歌曲Mv!"/>
	</div>
	<van-swipe :autoplay="2000" indicator-color="white" class='imgs'>
	  <van-swipe-item  v-for="(item,index) in swipes" :key='index'><img class="auto-img" v-lazy="item.cover" alt="没有" /></van-swipe-item>
	</van-swipe>
	<div class="history-nav" >		
		<div :class="{active: item.ischeck}" @click="toggleTab(item,index)" v-for="(item,index) in navs" :key='index'>{{item.title}}</div>
	</div>
	<van-notice-bar mode="closeable">
	  Vue个人制作的音乐App,本站功能还有待完善中 有愿意一起开发的也可以私聊我 微信：1436128642 ！
	</van-notice-bar>
	<div class=" a inners" >
		<div class="list" v-for="(item,index) in Mvlist" :key='index' @click="music(item)">
			<div class="li-img"><img class="auto-img" v-lazy="item.cover" alt="重新刷新" /></div>
			<div class="li-title">
				<div class="title-top">
					{{item.name}} {{item.artistName }}
					{{item.briefDesc}}
				</div>
				<div class="title-bottom">播放次数：<span>{{item.playCount}}</span></div>
			</div>
		</div>
	</div>	
	<div class="a author" >
		<div class="list" v-for="(item,index) in Mvlist" :key='index' ref='vanb'>
			<div class="list-title"><p>{{item.artistName}}</p></div>
		</div>
	</div>
	
	<div class="a historys" >
		<div class="list" v-for="(item,index) in historys" :key='index' ref='vanc' @click="randommusic(item, index)">
			<div class="list-title">
				<p>{{item.title}}--{{item.author}}</p>
			</div>
			<div class="list-img"><img class="auto-img" v-lazy='item.pic' alt="" /></div>
		</div>
	</div>
	
	<div class="a mv" >
		<div class="list" v-for="(item,index) in allMv" :key='index' ref='vand' @click="music(item)" >
			<div class="li-img"><img class="auto-img" v-lazy="item.cover" alt="重新刷新" /></div>
			<div class="li-title">
				<p>{{item.briefDesc}}</p>
				<p>{{item.artistName}}</p>
			</div>
		</div>
	</div>		
</div>
</template>

<script>
	import { Icon,Swipe, SwipeItem, NoticeBar,Search} from 'vant';
	export default{
		name:'mv',
		data(){
			return{
				Mvlist:'',
				idx:0,
				swipes:[],
				historys:'',
				allMv:'',
				navs:[
					{title:'热门推荐', ischeck: true},
					{title:'歌手', ischeck: false},
					{title:'历史', ischeck: false},
					{title:'更多MV', ischeck: false},
				],
				currents:'',
			}
		},
		components:{
			[Icon.name]:Icon,
			[Swipe.name]:Swipe,
			[SwipeItem.name]:SwipeItem, 
			[NoticeBar.name]:NoticeBar,
			[Search .name]:Search ,
		},
		methods:{
			prev(){
				this.$router.go(-1)
			},
			seach(path){
				this.$router.push(path)
			},
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
			music(item){
//				console.log(item.id)
				this.$router.push({
						name:'playmv',
						query:{
							id:item.id
						}
					})
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
					var a = this.$refs.vanc[this.currents];
					delete a.dataset.play; //删除currentVans.play属性	
//					console.log('进来了')
				}								
				var current = this.$refs.vanc[index];
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
			var history = localStorage.getItem('history');
				if(!history){
					this.historys =''
				}else{
					this.historys = JSON.parse(localStorage.getItem('history'))
				}
		},
		created(){
				var title = '热门'
				var src ='https://api.mlwei.com/music/api/mv/?key=523077333&mv=163&type=so&word='+title+'&page=1';
				this.axios.get(src).then(response => {
					this.Mvlist = response.data.result.mvs;
//					console.log('数据：',response.data.result.mvs)
					for(var i = 0; i < 5; i++){
						this.swipes.push(response.data.result.mvs[i])
					}
				})
				
				
				var src2 ='https://api.mlwei.com/music/api/mv/?key=523077333&mv=163&type=so&word='+'发现'+'&page=1';
				this.axios.get(src2).then(response => {
					this.allMv = response.data.result.mvs;
//					console.log('数据2：',response.data.result.mvs)
				})
				
				var src3 ='/api/music/api/mv/?key=523077333&mv=tai&type=so&word=热门&page=2'
				this.axios.get(src3).then(response => {
//					console.log('数据3：',response.data)
				})
				
				this.$store.commit('getNavnone');
		},
	}
</script>

<style lang="less" scoped>
	#mv{
	padding-bottom: 1.5rem;
	p{
		margin: 0;
		padding: 0;
	}
	.a{
			display: none;
			width: 100%;
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
			}
		}
		.imgs{
			max-height: 4rem;
			overflow: hidden;
		}
		#search{
			margin-top: 1rem;
		}
		.history-nav{
			position: sticky;
			top: 1rem;
			left: 0rem;
			height: 0.8rem;
			width: 100%;
			box-shadow:4px 0.13rem 0.15rem #af9292;	
			background-color: white;
			z-index: 10;
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
		.inners{
			display: block;
			width: 100%;
			height: 10rem;	
			overflow-y: auto;	
			.list{
				margin-top: 0.2rem;	
				width:100%;	
				max-height: 1.2rem;
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
					height: 1.2rem;
					overflow:hidden;
					.title-top{
						height: 0.8rem;
						overflow: hidden;
						line-height: 0.3rem;
						font-size: 16px;
						overflow: hidden;
					}
					.title-bottom{
						float: right;
						height: 0.4rem;
						color:#887d50;
					}
				}
			}
		}
		.mv{
			width: 100%;
			height: 10rem;	
			overflow-y: auto;	
			.list{
				margin-top: 0.2rem;
				float: left;	
				width:50%;			
				.li-img{
					width: 2rem;
					height: 2rem;
					overflow: hidden;
					margin: 0 auto;
				}
				.li-title{
					text-align: center;
					width: 100%;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}
		.author{
			width: 100%;
			height: 10rem;	
			overflow-y: auto;	
			.list{
				height:0.8rem;
				margin-top: 0.1rem;
				.list-title{				
					float: left;
					height:0.8rem;
					width: 80%;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					>p{
						line-height: 0.8rem;
						padding-left: 0.3rem;
					}
				}
				.list-img{
					float: left;
					width: 0.6rem;
					height: 0.6rem;
					background: red;
					margin-top: 0.1rem;
					overflow: hidden;
				}
			}
		}
		.historys{
			width: 100%;
			height: 10rem;	
			overflow-y: auto;
				
			.list{
				height:0.8rem;
				margin-top: 0.1rem;
				.list-title{				
					float: left;
					height:0.8rem;
					width: 80%;					
					>p{
						line-height: 0.8rem;
						padding-left: 0.3rem;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
				.list-img{
					float: right;
					width: 0.6rem;
					height: 0.6rem;
					background: red;
					margin-top: 0.1rem;
					margin-right: 0.3rem;
					overflow: hidden;
				}
			}
		}	
}
</style>