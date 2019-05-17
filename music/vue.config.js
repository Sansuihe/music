//module.exports = {
//	baseUrl: "./"
//}
//qq音乐
//const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8¬ice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=27&_=1519963122923'
//网易云1
const url = 'https://api.mlwei.com/music/api/wy/?key=523077333&cache=1&type=songlist&id=128509912'
//网易云2
//const url = ' https://api.itooi.cn/music/netease/songList?key=579621905&id=3778678&limit=10&offset=0'

module.exports = {
	baseUrl: "./",
  configureWebpack: {
  	devServer:{
  		proxy: {
		  "/api": {
		    target: "https://api.mlwei.com",
		    pathRewrite: {"^/api" : ""}
		  }
		}
  	} 		    
  }
}