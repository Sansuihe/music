<template>
<div id="mvsech">
	<div class="nav">
		<div class="prev" @click="prev" >
			<van-icon name="arrow-left" size='0.5rem' />
		</div>
		<div class="title">
		MV搜索
		</div>
	</div>
	
	<form class="from">
	  <van-search v-model="keyword" placeholder="请输入歌曲关键词" show-action >
	  <div slot="action" @click="search">搜索</div>
	  </van-search>
	</form>
	<p>历史Mv搜索:</p>
	<div class='vantag'>
		<van-tag class='spans' plain type="primary" style='margin-left: 0.2rem;' v-for='(item,index) in historykeyword' :key='index' @click='historymusic(item)'>{{item}}</van-tag>		
	</div>
	<div id="list">
		<div class="list-item" v-for="(item,index) in list" :key='index' @click="Mv(item)">
			<div class="list-img">
				<img class="auto-img" :src="item.cover" alt="" />
			</div>
			<div class="list-inner">
				{{item.artistName}}
				{{item.name}}				
			</div>
			<div class="hot">
				<van-icon name="fire" color='#e4393c' size='0.3rem'/>
				热度：{{item.playCount}}
			</div>
		</div>
	</div>
</div>
</template>

<script>
	import { Icon,Search,Tag,Popup,Notify } from 'vant';
	export default{
		name:'mvseach',
		data(){
			return{
				keyword:'',
				list:'',
				historykeyword:'',
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
			prev(){
		    		this.$router.go(-1)
		  	},
		  	search(){
				if(this.keyword ==''){//为空就拦截
					return;
				}
				var src = 'https://api.mlwei.com/music/api/mv/?key=523077333&mv=163&type=so&word='+this.keyword+'&page=1'
				this.axios.get(src).then(response => {
//					console.log(response.data.result.mvs)
					this.list = response.data.result.mvs;
				})
				var Mvkeywords = JSON.parse(localStorage.getItem('Mvkeywords'));
				if(!Mvkeywords){
					var Mvkeywords = [];
					Mvkeywords.push(this.keyword);
					localStorage.setItem('Mvkeywords',JSON.stringify(Mvkeywords));
				}else{
					var newkeywords =  JSON.parse(localStorage.getItem('Mvkeywords'));
					if(newkeywords.length >=7){
						newkeywords.splice(0,1)
					}
					newkeywords.push(this.keyword);
					localStorage.setItem('Mvkeywords',JSON.stringify(newkeywords));
					this.historykeyword = JSON.parse(localStorage.getItem('Mvkeywords'));
				}
			},
			Mv(item){
				this.$router.push({
						name:'playmv',
						query:{
							id:item.id
						}
					})
			},
			historymusic(item){
//				console.log(item)
				var src = 'https://api.mlwei.com/music/api/mv/?key=523077333&mv=163&type=so&word='+item+'&page=1'
				this.axios.get(src).then(response => {
//					console.log(response.data.result.mvs)
					this.list = response.data.result.mvs;
				})
			},
		},
		mounted(){
			this.historykeyword = JSON.parse(localStorage.getItem('Mvkeywords'));
		},
		created(){
			this.$store.commit('getNavnone');
		}
	}
</script>

<style lang="less" scoped>
#mvsech{
	p{
		margin: 0;
		padding: 0;
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
		.from{
			margin-top: 1rem;
		}
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
		#list{
			.list-item{
				width: 100%;
				height: 1.2rem;
				border-bottom: 1px solid gray;
				position: relative;
				.list-img{
					width: 1.5rem;
					height: 1rem;
					overflow: hidden;
					float: left;
					margin: 0.1rem;
				}
				.list-inner{
					float: left;
					padding-left: 0.3rem;
					max-width: 4rem;
					max-height: 1.2rem;
					line-height: 0.4rem;
					overflow: hidden;
				}
				.hot{
					position: absolute;
					color: #9f7777;
					bottom: 0;
					right: 0.3rem;
				}
			}
		}
}
</style>