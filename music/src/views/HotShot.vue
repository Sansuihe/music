<template>
	<div id="hotshot">
		<form>
			  <van-search v-model="keyword" placeholder="请输入歌曲关键词" show-action @focus="seach({name:'seach'})" >
			  <div slot="action" @click="search">搜索</div>
			  </van-search>
		</form>
		<!--<div class="list">-->
		<div class="list" v-for="(item,index) in lists" :key='index'>
			<div class="title">
				<p>{{item.title}}</p>
			</div>	
			<div class="inner" ref='van' v-for="(item,index) in inner[index]" :key='index' @click="music(item,index)" >
				<img class="auto-img" v-lazy="item.pic" alt="报错" />
				<div class="user">
					<img  class="auto-img"  v-lazy="item.pic" alt="头像" />
				</div>
				<div class="hot" >
					<van-icon name="fire-o" color='#e4393c' /><span>{{item.hot}}</span>
				</div>
			</div>
			<div class="innerb" @click="about({name:'about',query:{title:item.title}})">
				<van-icon name="weapp-nav" size='1rem' color='gray' />
			</div>
										
		</div>
	</div>
</template>

<script>
	import { Icon , Notify,NoticeBar,Search } from 'vant';
	export default{
		name:'hotshot',
		data() {
			return{
				keyword:'请输入歌曲关键词',
				lists:[
					{title:'跑步电台'},
					{title:'睡前'},
					{title:'快手'},
					{title:'抖音'},
					{title:'韩语'},
					{title:'KTV'},
					{title:'安静'},
				],
				inner:[],
				currents:'',
			}
		},
		components:{
				[Icon.name]:Icon,
				[Notify.name]:Notify,
				[NoticeBar.name]:NoticeBar,
				[Search.name]:Search,
		},
		methods:{
			search(){
				var src = 'https://api.mlwei.com/music/api/wy/?key=523077333&id='+this.keyword+'&type=so&cache=0&nu=20'
				this.axios.get(src).then(response => {
					this.list = response.data.Body					
//					console.log(this.$store.state.currentSongList)
					})
				},
				seach(path){
					this.$router.push(path)
				},
				about(path){
//					console.log('path',path)
					this.$router.push(path);
				},
				music(item,index){
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
//						console.log('进来了')
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
			this.$store.commit('getNavShow');
			this.$store.commit('getAudioshow');
			var titles = this.lists
//			console.log(titles[i].title)
			for(var i = 0; i < this.lists.length; i++){				
				const obj = []
				const src = '/api/music/api/wy/?key=523077333&id='+titles[i].title +'&type=so&cache=0&nu=100'
				this.axios.get(src).then(response => {
//					console.log(response.data.Body)
					var Body = response.data.Body
					Body.forEach(v => {
							v.hot = Math.floor(Math.random()*10000);//生成随机热度值
						})
						for(var j = 0; j < 5; j++){
							var Index = Math.floor(Math.random()*50);//随机数循环四次 push进数组
							obj.push(Body[Index])					
						}
						
						this.inner.push(obj)
//						console.log("this.inner",this.inner)
				})
				
			}
		},
	}
</script>

<style lang="less" scoped>
#hotshot{
	padding-bottom: 1rem;
}
.list{
	width: 100%;
	height: 11rem;
	box-sizing: border-box;
		.title{	
			width: 100%;
			height: 0.8rem;
			box-shadow:4px 0.13rem 0.15rem #af9292;
			margin-bottom: 0.2rem;
			margin-top: -0.4rem;
			box-sizing: border-box;
			>p{
				margin: 0;
				padding-left: 0.5rem;
				font-size: 0.4rem;
				line-height: 1rem;	
				color: #E4393C;
				font-style: italic;
				font-weight:bold;
				text-decoration:underline			
			}	
		}	
		.inner{
			box-sizing: border-box;
			border: 1px solid black;
			float: left;
			width: 40%;
			height: 3rem;
			margin-left: 0.4rem;
			position: relative;
			z-index: 0;
			margin-bottom: 0.1rem;
			>img{
				overflow: hidden;
				height: 2.5rem;
			}
			.user{
				margin-top: -0.25rem;
				height: 0.5rem;
				width: 0.5rem;
				border-radius: 50%;
				border: 1px solid black;
				overflow: hidden;
				float: left;
				position: relative;
				z-index: 1;
			}	
			.hot{
				float: right;
				padding-right: 0.2rem;
			}
		}
		.innerb{
			box-sizing: border-box;
			float: left;
			width: 40%;
			height: 3rem;
			margin-left: 0.4rem;
			position: relative;
			z-index: 0;
			:nth-child(1){
				padding-top: 1rem;
				padding-left: 0.8rem;
				/*margin: 1rem 1rem;*/
			}
		}
}
</style>