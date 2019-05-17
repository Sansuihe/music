<template>
<div id="urse">
	<div class="nav">
		<div class="prev" @click="prev" >
			<van-icon name="arrow-left" size='0.5rem' />
		</div>
		<div class="title">
			个人信息
		</div>
	</div>
	
	<div class="logo1">
			<div class="logo1-img">
				<img class="auto-img" src="../assets/list/anjin.jpg" alt="" />
			</div>
	</div>
	<van-row class='inners'>
	  <van-col span="8"  offset="4" class='spam'>用户：</van-col>
	  <van-col span="12" class='spam'>{{Users.peoper}}</van-col>
	</van-row>
	<van-row class='inners'>
	  <van-col span="8"  offset="4" class='spam'>手机号：</van-col>
	  <van-col span="12" class='spam'>{{Users.phone}}</van-col>
	</van-row>
	<van-row class='inners'>
	  <van-col span="8"  offset="4" class='spam'>密码：</van-col>
	  <van-col span="12" class='spam'>{{Users.pwd}}</van-col>
	</van-row>
	<van-row class='inners'>
	  <van-col span="8"  offset="4" class='spam'>邮箱：</van-col>
	  <van-col span="12" class='spam'>{{Users.email}}</van-col>
	</van-row>
	<van-row class='inners'>
	  <van-col span="8"  offset="4" class='spam'>注册时间：</van-col>
	  <van-col span="12" class='spam'>{{Users.registerTime}}</van-col>
	</van-row>
</div>
</template>

<script>
	import { Icon, Row, Col, Dialog } from 'vant';
	export default{
		name:'urse',
		data(){
			return{
				Users:[],
			}
		},
		components:{
			[Icon.name]:Icon,
			[Row.name]:Row,
			[Col.name]:Col, 
			[Dialog.name]:Dialog, 
		},
		methods:{
			prev(){
				this.$router.go(-1)
			},
		},
		mounted(){
			this.Users = this.$store.state.use
//			console.log("用户信息",this.$store.state.use)
			
			if(this.Users =="" || this.Users == undefined){
				Dialog.alert({
				  message: '请先登录用户信息'
				}).then(() => {
					  this.$router.push({name:'login'});
					});
				
			}
		},
		created(){
			this.$store.commit('getNavnone');
//			this.Users = this.$store.state.Users
			
//			console.log("用户信息",this.$store.state.Users)
		},
	}
</script>

<style lang="less" scoped>
#urse{
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
		.logo1{		
			width:100%;
			height:4rem;
			position:relative;
		.logo1-img{
			width: 3rem;	
			height: 3rem;	
			border-radius: 50%;
			overflow: hidden;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			box-shadow:4px 0.13rem 20px #af9292;	
			}
		}
		.inners{
			.spam{
				line-height: 0.8rem;
			}
		}
}
</style>