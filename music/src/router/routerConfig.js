import routerComponent from './routerComponent.js'
export default[
	{
		path:'/',
		name:'music',
		component:routerComponent.music,
		children: [
			{
				path: '/music/page',
				name: 'page',
				component: routerComponent.page
			},
			{
				path: '/music/me',
				name: 'me',
				component: routerComponent.me
			},
			{
				path: '/music/hotShot',
				name: 'hotShot',
				component: routerComponent.hotShot
			},
			{
				path: '/urse',
				name: 'urse',
				component: routerComponent.urse
			},
			{
				path: '/like',
				name: 'like',
				component: routerComponent.like
			},
			{
				path: '/seach',
				name: 'seach',
				component: routerComponent.seach
			},
			{
				path: '/details',
				name: 'details',
				component: routerComponent.details
			},
			{
				path: '/hotlist',
				name: 'hotlist',
				component: routerComponent.hotlist
			},
			{
				path: '/login',
				name: 'login',
				component: routerComponent.login
			},
			{
				path: '/register',
				name: 'register',
				component: routerComponent.register
			},
			{
				path: '/sleep',
				name: 'sleep',
				component: routerComponent.sleep
			},
			{
				path: '/about',
				name: 'about',
				component: routerComponent.about
			},
			{
				path: '/history',
				name: 'history',
				component: routerComponent.history
			},
			{
				path: '/mv',
				name: 'mv',
				component: routerComponent.mv
			},
			{
				path: '/playmv',
				name: 'playmv',
				component: routerComponent.playmv
			},
			{
				path: '/mvseach',
				name: 'mvseach',
				component: routerComponent.mvseach
			},
						
		],redirect:'/music/me',
	},
]
