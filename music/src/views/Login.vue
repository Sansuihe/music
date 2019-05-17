<template>
	<div class="loging">
		<div class="nav">
			<span class="span" @click="page">去首页</span>		
		</div>
		<div class="logo1">
			<div class="logo1-img">
				<img class="auto-img" src="../assets/list/anjin.jpg" alt="" />
			</div>
		</div>
		<van-row >
			<van-col offset='3' span='18'>
				<van-cell-group class='row'>
			  		<van-field label='用户名：' v-model='userInfo.phone' left-icon = 'manager' placeholder="用户名或手机号" />
			  		<van-field label='密码：'  v-model='userInfo.pwd' left-icon = 'lock'  placeholder="密码" type='password' />
					
					<van-row>
					  <van-col offset='12' span="12"><van-cell value="忘记密码" is-link to="register" /></van-col>
					</van-row>
				</van-cell-group>	
				
				<van-row>
					<van-col offset='2' span='9'>
						<van-button class='login-btn' size ='large' type="info" @click = "register">注册</van-button>					</van-col>
					<van-col offset='2' span='9'>
						<van-button class='login-btn' size ='large' type="info" @click = 'login'>登录</van-button>
					</van-col>
				</van-row>
			</van-col>
		</van-row>
	</div>
</template>

<script>
import {Cell, CellGroup,Field,Button,Row,Col,Dialog} from 'vant'
import validForm from '../untils/validForm.js'
import tip from '../untils/tip.js'
	export default{	
		name:'login',
		data(){
			return{
				userInfo:{
					phone:'',
					pwd:''
				}
			};
		},
		components:{
			[Cell.name]: Cell,
			[CellGroup.name]: CellGroup,
			[Field.name]: Field,
			[Button.name]: Button,
			[Row.name]: Row,
			[Col.name]: Col,
			[Dialog.name]: Dialog
		},
		methods:{
			page(){
				this.$router.push({name:'me'});
			},
			
			register(){
					this.$router.push({name:'register'});
			},
			login(){
//				console.log(this.userInfo.phone);
				if (!validForm.validPwd(this.userInfo.pwd, 8, 16)){
					tip.dialogTip('密码或用户名错误,<br/>如果未注册 请先注册用户',true,this.userInfo,'pwd');
				}else{
					var uesrData = localStorage.getItem('users');
					if(uesrData){
						this.users = JSON.parse(uesrData);					
						for(var i = 0; i <this.users.length; i++){
//							手机号和密码同时匹配
							if(this.users[i].peoper == this.userInfo.phone || this.users[i].phone == this.userInfo.phone){
								if(this.users[i].pwd == this.userInfo.pwd){
									var Nowusers = this.users[i]
									
								this.$router.push({name:'me'});
//								存入state用户名
								var people = this.userInfo.phone;
								this.$store.commit('getPeople', people);
								this.$store.commit('getUsers', Nowusers);
									return;
								}else{
									tip.dialogTip('用户名或密码错误！');	
									return;
								}
							}
						}
						return tip.dialogTip('用户不存在！');	
						
					}
				}
			}
		},
		created(){
			this.$store.commit('getNavnone');
			this.$store.commit('getAudionone');
		}
	}
</script>

<style lang="less" scoped>
.loging{
	position: relative;
	width: 100%;
	height: 100%;
	background-image:linear-gradient(to right, #cdaeae 0%, #da4949 100%);	
	padding-bottom: 2.4rem;
	.nav{
		height: 1rem;
		background-image: linear-gradient(to right,  #f26060 0%, #db4747 100%);
	}
	.span{
		float: left;
		font-size: 14px;
		color: #FFFFFF;
		line-height: 1rem;
		margin-left:0.33333rem;
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
}
#load{
	position: absolute;	
	margin: auto;
	width: 100%;
	height: 100%;
	background-color: #FFFFFF;
	z-index: 100;
}
.login-btn{
	margin-top:1rem;
}
.logo{
	width: 2.5rem;
	margin: 0 auto;
	border-radius: 50%;
	overflow: hidden;
	margin-bottom: 1rem;	
	margin-top: 1rem;
}
.span{
	float: left;
	font-size: 14px;
	color: #FFFFFF;
	line-height: 1.4rem;
	margin-left:0.33333rem;
}
.row{
	box-shadow:4px 0.13rem 0.15rem #af9292;	
}
</style>