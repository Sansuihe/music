<template>
	<div class="register">
		<div class="nav">
			<span class="span" @click="page">返回</span>		
		</div>
		<div class="logo1">
			<div class="logo1-img">
				<img class="auto-img" src="../assets/list/anjin.jpg" alt="" />
			</div>
		</div>
		<van-row>
			<van-col offset='1' span='22'>
				<van-cell-group>
			  		<van-field label='用户名：' left-icon = 'manager' v-model="userInfo.peoper" placeholder="请输入3-10位的用户名"  right-icon="question-o" @click-right-icon="$toast('question')" />
			  		<van-field label='手机号：' left-icon = 'phone' v-model="userInfo.phone" placeholder="手机号" />
			  		<van-field label='密码：' left-icon = 'lock' v-model="userInfo.pwd" placeholder="密码(8-16位)" type='password' />
			  		<van-field label='确认密码：' left-icon = 'lock' v-model="userInfo.pwded" placeholder="确认密码" type='password' />
			  		<van-field label='邮箱：' left-icon = 'invition' v-model="userInfo.email" placeholder="请输入邮箱号" />
			  		<van-field label='验证码' left-icon = 'comment' v-model="userInfo.validcode" placeholder="请输入验证码" right-icon="question-o" @click-right-icon="$validEqual('question')">
			  			<van-button slot="button" size="small" type="primary" @click="sendValidCode" :disabled='isDisabled'>{{validCodeText}}</van-button></van-field>
				</van-cell-group>
				<!--<van-button class='regidter-btn' size ='large' type="info" >立即注册</van-button>-->
				<van-row class='regidter-btn'> 
					<van-col offset='2' span='9'>
						<van-button class='login-btn' size ='large' type="info" @click = "Loging">去登录</van-button>					</van-col>
					<van-col offset='2' span='9'>
						<van-button class='login-btn' color="#308553" size ='large'  type="warning" @click="regitser">立即注册</van-button>
					</van-col>
				</van-row>
			</van-col>
		</van-row>
	</div>
</template>

<script>
	import validForm from '../untils/validForm.js'
	import tip from '../untils/tip.js'
	import tool from '../untils/tool.js'
	import {Loading, CellGroup,Field,Button,Row,Col,Dialog,Uploader,Icon, Notify} from 'vant'
	export default{
		name:'register',
		data(){
			return{			
//				随机生成的验证码
				validCode:'',
//				验证码倒计时
				validCodeText:'发送验证码',
//				开关
				isDisabled:false,
//				用户列表
				users: null,			
				//用户信息
				userInfo:{
					peoper:'',
					phone:'',
					pwd:'',
					pwded:'',
					email:'',
					validcode:''
				}
			}
		},
		components:{
			[CellGroup.name]: CellGroup,
			[Field.name]: Field,
			[Button.name]: Button,
			[Row.name]: Row,
			[Col.name]: Col,
			[Dialog.name]: Dialog,
			[Uploader.name]: Uploader,
			[Icon.name]: Icon,
			[Notify.name]: Notify,		
		},
		methods:{
			$toast(){
				Dialog.alert({
					  message: '请输入3-10位的用户名(不能带有符号和数字)'
					}).then(() => {
					  // on close
					});
			},
			$validEqual(){
				Dialog.alert({
					  message: '还可以通过控制台查看您的验证码:'+ '</br>'+'F12 --> Console '
					}).then(() => {
					  // on close
					});
			},
			regitser(){
				if(!validForm.validPeople(this.userInfo.peoper)){
//					
					tip.dialogTip('用户名 只支持字母 数字 或中文组成的3-10位字符串，请您重新输入!',true,this.userInfo,'peoper');
					
				}else if(!validForm.validPhone(this.userInfo.phone)){
//					
					tip.dialogTip('手机号不正确，请您重新输入',true,this.userInfo,'phone');
					}else if (!validForm.validPwd(this.userInfo.pwd, 8, 16)){
//				
						tip.dialogTip('只支持!@._字母数字组合，请您重新输入',true,this.userInfo,'pwd');
				}else if (!validForm.validEqual(this.userInfo.pwd,this.userInfo.pwded)){
//					
					tip.dialogTip('两次密码不一致，请您重新输入',true,this.userInfo,'pwded');
				}else if (!validForm.validEmali(this.userInfo.email)){					
//					
						tip.dialogTip('邮箱格式错误，请您重新输入',true,this.userInfo,'email');
				}else if(!validForm.validEqual(this.userInfo.validcode,this.validCode) || this.userInfo.validcode.length < 6){
//					
					tip.dialogTip('验证码错误，请您重新获取',true,this.userInfo,'validcode');
				}else{
//					验证是否已存在该用户
					for( var i = 0; i < this.users.length; i++){
						if(this.users[i].peoper == this.userInfo.peoper){
							tip.dialogTip('该用户名已被注册！',true,this.userInfo,'peoper');
							return;
						}else if(this.users[i].phone == this.userInfo.phone){
							tip.dialogTip('该手机号已被注册！',true,this.userInfo,'phone');
							return;
						}
					}
//					如果不存在 则添加一个用户
//					生成用户id
					var time = new Date ();
					var uid = 'vue'+ time.getTime();
					var peoper = this.userInfo.peoper;
					var phone =this.userInfo.phone;
					var pwd = this.userInfo.pwd;
					var email = this.userInfo.email;
					var registerTime = tool.format(time,'yyyy-MM-dd hh:mm:ss');
					var user = {
						uid,
						peoper,
						phone,
						pwd,
						email,
						registerTime
					};
					this.users.push(user)
					var usersData = JSON.stringify(this.users);
//					console.log('usersData==>',usersData);
					localStorage.setItem('users',usersData);
					tip.dialogTip('恭喜您注册成功！');
//					跳到登入
					this.$router.push({name:'login'});
				}
			},
//			//发送验证码
			sendValidCode(){
				if(!validForm.validPhone(this.userInfo.phone)){
//					Dialog.alert({
//						title: '错误提示',
//						message: '手机号不正确，请您重新输入！'
//					}).then(()=>{
//						this.userInfo.phone="";
//					})
					tip.dialogTip('手机号不正确，请您重新输入',true,this.userInfo,'phone');
				}else{
					this.isDisabled = true;
  					var time = 5;
					this.validCodeText = time + '秒后重新发送';
					var timer = setInterval(()=>{
						if (time <= 0){
							this.isDisabled = false;
							this.validCodeText = '发送验证码';							
							clearInterval(timer);
							time = null;
						}else{
							this.validCodeText = --time + '秒后重新发送';
							
						}
					},1000)
					
					this.validCode = validForm.generateValidCode();
					
					Notify({
							  message: '尊敬的'+this.userInfo.phone+'用户\n您的验证码为：'+this.validCode,
							  duration: 3000,
							  background: '#dc8096'
					});
					
					console.log("验证码：",this.validCode)
					}	
				},
				Loging(){
					this.$router.push({name:'login'});
				},
				page(){
						this.$router.go(-1)
				},
		},
		created(){
			this.$store.commit('getNavnone');
			this.$store.commit('getAudionone');
			var userData = localStorage.getItem('users');
			this.users = userData == undefined ? [] : JSON.parse(userData);
		},
	}
</script>

<style lang="less" scoped>
.register{
	height: 100%;
	width: 100%;
	padding-bottom: 1rem;
	background-image:linear-gradient(to right, #cdaeae 0%, #da4949 100%);
	.nav{
		height: 1rem;
		background-image: linear-gradient(to right,  #f26060 0%, #db4747 100%);
		/*margin-bottom: 2.5rem;*/
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
		height:3.5rem;
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
		}
	}
}
.regidter-btn{
	margin-top:0.4rem;
}

</style>