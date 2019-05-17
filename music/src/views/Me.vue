<template>
<div id="Me">
	<van-search @focus="seach({name:'seach'})" placeholder="        点此搜索你想听的歌曲!"/>
	<!--登录界面-->
	<div class="loging">
		<div class="loging-img">
			<img class="auto-img" v-lazy="" alt="登录" />
		</div>
	</div>
	
	<div class="loging-loging">
		<p class="people" v-show="people">{{people}}</p>
		<div v-show="people" class='register'>
			<span @click="login">更换账号</span>
			<span>|</span>
			<span @click="over">退出登录</span>
		</div>
		<div v-show="!people" class='register'>
			<span @click="register">注册</span>
			<span>|</span>
			<span @click="login">登录</span>
		</div>
	</div>
	<!--分类-->
	<div class="list">
		<div class="li" v-for='(item,index) in list' :key='index' @click="listPath(item,index)">
			<div class="icn">
				<van-icon class='list-icn' :name="item.name" size='0.6rem' color='#e4393c' />
			</div>
			<span>{{item.title}}</span>
		</div>
	</div>
	<!--告示栏-->
	<van-notice-bar mode="closeable" class="notice">
  	为庆祝本站正式完成，凡是看到这则公告的新用户 微信搜索 1436128642 即可领取限时会员特权，先到先得！！！
	</van-notice-bar>
	<!--我的歌单-->
	<ul class="classify">
		<div class="classify-span">
			<div class="left">
				<span>自建歌单</span><span>{{counts}}</span>
				<span>||</span>
				<span>收藏列表</span>
			</div>
			<div class="right">
				<div class="icn">
					<!--添加栏-->
					<van-icon name="plus" size='0.4rem'  @click="addSonglist" />
					<!--删除栏-->
					<van-icon name="bars" size='0.4rem' @click='Delste'/>
				</div>
			</div>
		</div>
		<div class="classify-li" v-show='add'  @click="">		
			<div class="classify-li-img">
				<img class="auto-img"/>
			</div>
			<div class="span">
				<input type="text" placeholder="添加歌单名称" id='addInputvalue' />
			</div>
			<div class="classify-li-right" @click="addInput">
				<van-icon name="success" color='#e4393c' size="0.4rem" />
				
			</div>
		</div>
	<li class="classify-li" key='index'>		
			<div class="classify-li-img">
				<img class="auto-img"  v-lazy=''/>
			</div>
			<div class="span"  @click="song({name:'like',query:{index:-1}})" >
				我的收藏
			</div>
			<div class="classify-li-right">
				<van-icon name="arrow" size="0.4rem"/>
			</div>
		</li>
		<li class="classify-li" v-for="(item,index) in classify" :key='index'>		
			<div class="classify-li-img">
				<img class="auto-img"  :src='addImgs[index]'/>
			</div>
			<div class="span"  @click="song({name:'like',query:{index:index}})">
				{{item.title}}
			</div>
			<div class="classify-li-right">
				<van-icon name="arrow" size="0.4rem" v-show='show'  />
				<van-icon name="delete" size="0.4rem" color='#e4393c' v-show='!show' @click='deleteSongList(index)' />
			</div>
		</li>
	</ul>
</div>
</template>

<script>
	import { Icon,NoticeBar,Search, Notify,Dialog} from 'vant';
	export default{
		name:'me',
		data() {				
				return {
				list:[
					{title: '我的',path:{name:'me'},name:'user-o'},
					{title: 'Mv',path:{name:'me'},name:'video'},
					{title: '收藏',path:{name:'me'},name:'service-o'},
					{title: '热门',path:{name:'me'},name:'fire-o'},
					{title: '历史',path:{name:'me'},name:'notes-o'},
					{title: '更多',path:{name:'me'},name:'gift-o'},
				],
				classify:[
//					{title: '我的收藏',path:{name:'like'},},
				],
				count:'',
				add:false,
				show:true,
				addImgs:'',
			}
		},
		components:{
				[Icon.name]:Icon,
				[NoticeBar .name]:NoticeBar ,
				[Search .name]:Search ,
				[Notify .name]:Notify ,
				[Dialog .name]:Notify ,
				 
			},
		methods:{
			seach(path){
				this.$router.push(path)
			},
//			注册
			register(){
				return this.$router.push({name: 'register'});
			},
//			登录
			login(){
//				
				return this.$router.push({name: 'login'});
			},
			over(){
				this.$store.commit('getOver');
				this.$store.commit('getUsersNo');
//				console.log(this.$store.state.use)
			},
//			分类跳转
			listPath(item,index){
//				我的
				if(index==0){
					return this.$router.push({name: 'urse'});
				};
//				MV
				if(index==1){
					return this.$router.push({name: 'mv'});
				};
//				收藏
				if(index==2){
//					console.log(index)
					this.$router.push({
					  name:'like',
					  query: {
					     index: -1
					  }
					})
				};
//				热歌
				if(index==3){
//					console.log(item.title)				
//					var src = 'https://api.mlwei.com/music/api/wy/?key=523077333&id='+item.title+'&type=so&cache=0&nu='+'50';
//					this.axios.get(src).then(response => {
////					console.log(response.data.Body);
//					var items = response.data.Body;
////					存入分类歌单
//					this.$store.commit('HotList', items);					
//					this.$store.commit('HotListTitle', item.title);	
//					this.$store.commit('getSongList', items);	
//					
//					console.log(this.$store.state.HotListsong);
//					console.log(this.$store.state.HotListTitle);
//					return this.$router.push({name: 'hotlist'});
//					})
					
					this.$router.push({
						name:'about',
						query:{
							title:'热门单曲'
						}
					})
			
					Notify({
							  message: '正在为你加载：'+item.title +'类歌曲',
							  duration: 1500,
							  background: '#dc8096'
					});		
				};
//				历史
				if(index==4){
					this.$store.commit('getnavShow');//隐藏一级路由导航
					return this.$router.push({name: 'history'});
				};
//				设置
				if(index==5){
					 Dialog.alert({
					  title: '更多...',
					  message: '更多功能尚在完善中，如果您也有兴趣<br/>也可以联系微信号：1436128642'
					})
				};				
			},
			like(){
				return this.$router.push({name: 'like'});
			},
			song(path){
//				console.log(index)
				this.$router.push(path);
			},
			addSonglist(){
				if(this.add != true){
					this.add = true;	
				}else{
					this.add = false;
				}
				this.show = true;
			},
			Delste(){
				if(this.show != true){
					this.show = true;	
				}else{
					this.show = false;
				}
			},
			deleteSongList(index){
				var newsong = JSON.parse(localStorage.getItem('newAddsong'))//取出歌单
				newsong.splice(index,1)//删除当前项
				this.classify = newsong//替换已有的歌单
				localStorage.setItem('newAddsong', JSON.stringify(newsong));//更新缓存
				index++
//				var a  = JSON.parse(localStorage.getItem('newSonglist' + index))//取出歌单列表
//				console.log(a)
				localStorage.removeItem('newSonglist' + index)
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
		},
		computed:{
			people(){
				return this.$store.state.people;
			},
			counts(){
				var span = this.classify.length
				return '('+span+')'
			},
//			addimgs(){
//				return this.$store.state.addimgs
//			}
		},
		mounted(){
		},
		created(){
			this.$store.commit('getNavShow');
			this.$store.commit('getAudioshow');
			
			var his = JSON.parse(localStorage.getItem('history'))
			if(!his){
				his=[];
				this.$store.commit('getHistorys',his);
//				console.log('没有')
			}else{
				this.$store.commit('getHistorys',his);
//				console.log('已有')
			}
			
			var newAddsong = localStorage.getItem('newAddsong');//获取本地存储的歌单
			if(!newAddsong){	
				localStorage.setItem('newAddsong', JSON.stringify(this.classify));//如果没有缓存则创建
				var indexs = this.classify.length
				var arr = [];
				localStorage.setItem('newSonglist' + indexs, JSON.stringify(arr));//初始化第一次进入的歌单
			}else{
				this.classify =JSON.parse(localStorage.getItem('newAddsong'));//有缓存则用缓存代替歌单	
			}
			var addimgs = JSON.parse(localStorage.getItem('addimgs'));
			if(addimgs){
				this.addImgs = addimgs
			}else{
				return;
			}
		},
	}
</script>

<style lang="less" scoped>
#Me{
	padding-bottom: 2rem;
}
	.loging{
		position: relative;
		height: 2rem;
		width: 100%;
		z-index: 0;
		.loging-img{
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			margin: auto;
			width: 1.5rem;
			height: 1.5rem;
			background: #e4393c;
			border-radius: 50%;
			overflow:hidden;
			
		}
	}
	.loging-loging{
		text-align: center;
		font-size: 0.3rem;
		.people{
			text-align: center;
			font-size: 0.4rem;
			padding: 0;
			margin: 0;
			font-weight:bold;
			color: #E4393C;
		}
		.register>span{
			text-decoration:underline;
			padding-right: 0.2rem;
		}
	}
	.list{
		height: 2.8rem;
		/*box-shadow:4px 0.13rem 0.15rem #af9292;*/
		/*background-color: #E4393C;*/
		margin-top: 0.3rem;
		/*border-bottom: 1px solid red;*/
		.li{
			padding-top: 0.2rem;
			/*padding-bottom: 0.2rem;*/
			width: 33.333%;
			height: 1.3rem;
			float: left;
			box-sizing: border-box;
			box-shadow:4px 0.13rem 0.15rem #af9292;				
			.icn{
				/*position: relative;*/
				.list-icn{
					display: block;
					text-align: center;
				}
			}
			span{
				padding-top: 0.1rem;
				display: inline-block;
				width: 100%;
				text-align: center;
			}
		}
		/*.li:nth-child(2){
				border-right: 1px solid red;
				border-bottom: 1px solid red;
				border-left: 1px solid red;
			}
		.li:nth-child(5){
				border-top: 1px solid red;
				border-left: 1px solid red;
				border-right: 1px solid red;
			}*/
	}
	.notice{
		margin-top: 0.2rem;
		margin-bottom: 0.2rem;
	}
	.classify{
		margin-top: 0.2rem;
		.classify-span{
			width: 100%;
			height: 0.5rem;
			.left{
				float: left;
				:nth-child(1){
				padding-left: 0.2rem;
				/*padding-right: 0.2rem;*/
				font-size: 0.3rem;
				}
				:nth-child(2){
					padding-right: 0.2rem;
				}
				:nth-child(3){
					padding-right: 0.2rem;
					ont-size: 0.3rem;
				}
				:nth-child(4){
					font-size: 0.3rem;
				}
			}
			.right{
				float: right;
				width: 1rem;
				.icn{
					:nth-child(1){
						width: 0.5rem;
					}
					:nth-child(2){
						width: 0.5rem;
					}
				}
			}		
		}
		.classify-li{
			width: 100%;
			height: 1rem;
			background-color:rgba(225,220,220,.55);
			margin-bottom:0.1rem;
			.classify-li-img{
				width: 0.8rem;
				height: 0.8rem;
				float: left;
				margin: 0.1rem;
				background: #b93939;
			}
			span{
				line-height: 1rem;
				padding: 0.5rem;
				font-size: 0.3rem;
			}
			.classify-li-right{
				float: right;
				/*right: 1rem;*/
				margin-right: 0.5rem;
				margin-top: 0.3rem;
			}
		}
	}
	.classify-li{
			width: 100%;
			height: 1rem;
			background-color:rgba(225,220,220,.55);
			margin-bottom:0.1rem;
			.classify-li-img{
				width: 0.8rem;
				height: 0.8rem;
				float: left;
				margin: 0.1rem;
				background: black;
			}
			.span{
				float: left;
				height: 1rem;
				line-height: 1rem;
				padding-left: 0.5rem;
				font-size: 0.3rem;
				width: 3rem;				
				overflow: hidden;
				white-space :nowrap;
				text-overflow: ellipsis;
			}
			.classify-li-right{
				float: right;
				/*right: 1rem;*/
				margin-right: 0.5rem;
				margin-top: 0.3rem;
			}
		}
</style>