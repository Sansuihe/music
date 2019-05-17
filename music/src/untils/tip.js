import Vue from 'vue'
import {Dialog} from 'vant'
Vue.use(Dialog)
//对话框提示
export default{
	dialogTip(message, isClear, o, property){
//		title:提示信息
//		message:提示信息
//		isClear:是否清空对象的属性值
//		o:清空属性值的对象
//		property:对象o的属性
		Dialog.alert({
			title:'提示',
			message:message
		}).then(() => {
			if(typeof isClear === 'boolean' && isClear){
				o[property] = '';
			}
		})
	}
}
