<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
	import rem from './untils/rem.js'
//	const url = '/api/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8¬ice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=27&_=1519963122923'
//	const url = '/api/music/api/wy/?key=523077333&cache=1&type=songlist&id=128509912'
	export default{
		name:'app',
//		created(){
//			this.axios.get(url).then(response => {
//				console.log(response.data)
//			},err => {
//				alert(err)
//			})
//		},
		mounted(){
			rem();
		},
		
	}
</script>

<style lang="less">
body{
	margin: 0 auto;
	width: 100%;
}
ul{
	margin: 0;
	padding: 0;
	list-style: none;
}
.auto-img{
	width: 100%;
	display: block;
}
input{
	padding: 0;
	margin: 0;
	border: none;
	outline: none;
	background-color: transparent;
}
.fl{
	float: left;
}
.fr{
	float: right;
}
.clearfix{
	overflow: hidden;
}

</style>
