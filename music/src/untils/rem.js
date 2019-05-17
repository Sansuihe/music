function setHTMLFont(designWidth){
	var isHasStyle = document.getElementById('style');
	if(isHasStyle){
		isHasStyle.remove();
	}
	
	console.log('rem')
	var maxWidth = 640;
	var minWidth = 320;
	
	var htmlWidth = document.documentElement.getBoundingClientRect().width;
	
	var fontSize;
	if(htmlWidth > maxWidth){
		fontSize = 100;
	}else{
		designWidth = designWidth == undefined ? maxWidth :
		designWidth <= minWidth ? minWidth :designWidth>= maxWidth ? maxWidth :designWidth;
		
		fontSize = htmlWidth /maxWidth * 100;
	}	
	
	var style = document.createElement('style');
	
	style.setAttribute('id','style');
	
	style.type = 'text/css';
	
	style.innerHTML = 'html{font-size:'+ fontSize +'px}';
	document.getElementsByTagName('head')[0].appendChild(style);	
}

window.onresize = function(){
	setHTMLFont
}

export default setHTMLFont;
