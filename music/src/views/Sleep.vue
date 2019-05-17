<template>
<div id="sleep" @click="prev">
	<div class="all">
			<img class="auto-img imgs" :src = "sleepUrl" alt="背景" />
			<div class="inner">2</div>
	</div>
	<div class="sleep">
		<p>休眠中...</p>
	</div>
	
</div>
</template>

<script>
	export default{
		name:'sleep',
		data(){
			return{
				imgs:'',
			}
		},
//		sleepUrl
		computed: {
			//当前歌单
			sleepUrl() {
				return this.$store.state.sleepUrl;
			},
		},
		created(){
			this.$store.commit('getNavnone');
			this.$store.commit('getAudionone');
			this.imgs = this.$store.state.sleepUrl 
			if(this.imgs == ''){
				this.$router.go(-1)
			}
		},
//		mounted(){
//			this.imgs = this.$store.state.sleepUrl 
//		},
		methods:{
			prev(){
			    	this.$router.go(-1)
//			    	console.log("现在",this.$store.state.sleepUrl);
			  	},
		}
	}
</script>

<style lang="less" scoped>
#sleep{
	height: 100%;
	width: 100%;
	padding-top: 4.5rem;
	padding-bottom: 3rem;
	background-color: rgb(229, 53, 53,);
	.all{
		position: relative;	
		.imgs{
			width: 4rem;
			height: 4rem;
			overflow: hidden;
			border-radius: 50%;
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			margin: auto;
			animation: r 10s linear 0s infinite;
		}
		.inner{
			position: absolute;
			width: 2rem;
			height: 2rem;
			overflow: hidden;
			border-radius: 50%;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			margin: auto;
			background-color: white;
		}
	}
	.sleep{
		margin-top:50% ;
		margin-left:45% ;
		>p{
			font-size: 0.5rem;
		}
	}
	/*.all{
		.img{
			position: absolute;
			width: 4rem;
			height: 4rem;
			overflow: hidden;
			border-radius: 50%;
			margin-top: 3rem;
			margin-left: 1rem;
			z-index: 9;
		}
		.inner{
			position: absolute;
			width: 2rem;
			height: 2rem;
			overflow: hidden;
			border-radius: 50%;
			background-color: red;
			z-index: 100;
		}
	}*/
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