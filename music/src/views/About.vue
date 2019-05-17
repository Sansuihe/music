<template>
<div id="about">
	<div class="nav">
		<div class="prev" @click="prev" >
			<van-icon name="arrow-left" size='0.5rem' />
		</div>
		<div class="title">
			{{titles}}
		</div>
	</div>
	
	<van-swipe :autoplay="2000" indicator-color="white" class='imgs'>
	  <van-swipe-item  v-for="(item,index) in swipes" :key='index'><img class="auto-img" v-lazy="item.pic" alt="没有" /></van-swipe-item>
	</van-swipe>
	<div class="history-nav" >		
		<div :class="{active: item.ischeck}" @click="toggleTab(item,index)" v-for="(item,index) in navs" :key='index'>{{item.title}}</div>
	</div>
	<van-notice-bar mode="closeable">
	  Vue个人制作的音乐App,本站功能还有待完善中 有愿意一起开发的也可以私聊我 微信：1436128642！
	</van-notice-bar>
	<div class=" a inners" >
		<div class="list" v-for="(item,index) in list" :key='index' ref='vana' >
			<div class="li-img" @click="music(item, index)"><img class="auto-img" v-lazy="item.pic" alt="重新刷新" /></div>
			<div class="li-title">
				<p>{{item.title}}</p>
				<p>{{item.author}}</p>
			</div>
		</div>
	</div>	
	<div class="a author" >
		<div class="list" v-for="(item,index) in allList" :key='index' ref='vanb'>
			<div class="list-title"><p>{{item.author}}</p></div>
			<div class="list-img"><img class="auto-img" v-lazy='item.pic' alt="" /></div>
		</div>
	</div>
	
	<div class="a historys" >
		<div class="list" v-for="(item,index) in historys" :key='index' ref='vanc' @click="musicc(item, index)">
			<div class="list-title"><p>{{item.title}}--{{item.author}}</p></div>
			<div class="list-img"><img class="auto-img" v-lazy='item.pic' alt="" /></div>
		</div>
	</div>
	
	<div class="a mv" >
		<div class="list" v-for="(item,index) in mv" :key='index' ref='vand' @click="musicd(item, index)" >
			<div class="li-img"><img class="auto-img" v-lazy="item.pic" alt="重新刷新" /></div>
			<div class="li-title">
				<p>{{item.author}}</p>
				<p>{{item.title}}</p>
			</div>
		</div>
	</div>		
</div>
</template>

<script>
	import { Icon,Swipe, SwipeItem, NoticeBar  } from 'vant';
	export default{
		name:'about',
		data() {
			return {
				titles:'',
				allList:'',
				list:'',
				mv:'',
				swipes:[],
				historys:'',
				idx:0,
				navs:[
					{title:'单曲', ischeck: true},
					{title:'歌手', ischeck: false},
					{title:'历史', ischeck: false},
					{title:'专辑', ischeck: false},
				],
				currents:'',
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
					var a = this.$refs.vana[this.currents];
					delete a.dataset.play; //删除currentVans.play属性	
//					console.log('进来了')
				}								
				var current = this.$refs.vana[index];
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
			musicc(item, index){
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
			musicd(item, index){
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
					var a = this.$refs.vand[this.currents];
					delete a.dataset.play; //删除currentVans.play属性	
//					console.log('进来了')
				}								
				var current = this.$refs.vand[index];
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
			var src = '/api/music/api/wy/?key=523077333&id='+ this.$route.query.title +'&type=so&cache=0&nu=100'
			this.axios.get(src).then(response => {
				var dates = response.data.Body
					this.list = dates.splice(0,20);
					this.mv = dates.splice(20,20);
					this.allList = dates;
					for(var i = 0 ; i < 4; i++){
						var idnexs = Math.floor(Math.random()*20+1);
						this.swipes.push(this.list[idnexs])	;					
					}
//					console.log('歌单',this.swipes);
//					console.log('歌单',this.list);
			})
			
				var history = localStorage.getItem('history');
				if(!history){
					this.historys =''
				}else{
					this.historys = JSON.parse(localStorage.getItem('history'))
//					console.log('this.historys',this.historys)
				}
		},
		created(){
			this.$store.commit('getNavnone');
			var itemtitle = this.$route.query.title
			if(itemtitle == undefined || itemtitle == ''){
				this.$router.go(-1)
			}
//			var src = 'https://api.mlwei.com/music/api/wy/?key=523077333&id='+ itemtitle +'&type=so&cache=0&nu=100'
//			this.axios.get(src).then(response => {
//				var dates = response.data.Body
//					this.list = dates.splice(0,20);
//					this.mv = dates.splice(20,20);
//					this.allList = dates;
//					for(var i = 0 ; i < 4; i++){
//						var idnexs = Math.floor(Math.random()*20+1);
//						this.swipes.push(this.list[idnexs])	;					
//					}
//					console.log('歌单',this.swipes);
//					console.log('歌单',this.list);
//			})
			this.titles = itemtitle			
		}
	}
</script>

<style lang="less" scoped>
#about{
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
			height: 4rem;
			overflow: hidden;
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