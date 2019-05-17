class RouterComponent{
	
	contructor(){}
	
	
	music(r){
			return require(['../views/Music'],r);
		}
	page(r){
			return require(['../views/Page'],r);
		}
	me(r){
			return require(['../views/Me'],r);
		}
	like(r){
			return require(['../views/Like'],r);
		}
	seach(r){
			return require(['../views/Seach'],r);
	}
	details(r){
			return require(['../views/Details'],r);
		}
	hotlist(r){
			return require(['../views/Hotlist'],r);
		}
	login(r){
			return require(['../views/Login'],r);
		}
	register(r){
			return require(['../views/Register'],r);
		}
	sleep(r){
			return require(['../views/Sleep'],r);
		}
	hotShot(r){
			return require(['../views/HotShot'],r);
		}
	about(r){
			return require(['../views/About'],r);
		}
	history(r){
			return require(['../views/History'],r);
		}
	urse(r){
			return require(['../views/Urse'],r);
		}
	mv(r){
			return require(['../views/Mv'],r);
		}
	playmv(r){
			return require(['../views/Playmv'],r);
		}
	mvseach(r){
			return require(['../views/Mvseach'],r);
		}
}
export default new RouterComponent();
