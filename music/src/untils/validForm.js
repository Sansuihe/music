export default{
//	验证用户名
	validPeople(value){
		return /^[\u4e00-\u9fa5@\w\d]{3,10}$/.test(value)
	},
//	验证手机号
	validPhone(value){
		return /^1[3456789]\d{9}$/.test(value);		
	},
//	验证密码
	validPwd(value,min,max){
		return new RegExp('^[!@\\.\\w]{'+ min +',' + max + '}$').test(value);
	},
	validEqual(v1,v2){
		return Object.is(v1,v2);
	},
	validEmali(value){
		return /^(([0-9a-zA-Z]+)|([0-9a-zA-Z]+[_.0-9a-zA-Z-]*[0-9a-zA-Z]+))@([a-zA-Z0-9-]+[.])+([a-zA-Z]{2}|net|NET|com|COM|gov|GOV|mil|MIL|org|ORG|edu|EDU|int|INT)$/.test(value)
	},
	generateValidCode(){
		var time = new Date().getTime().toString().substr(-3,3);
		var random = Math.random().toString().substr(-3,3);
		return time.concat(random)
	}
}
