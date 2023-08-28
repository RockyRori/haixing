import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const routes = [{
	path: '/Afangshanzizhuan',
	name: 'A方山子传',
	component: () => import('../views/A方山子传.vue'),
	meta: {}
}, {
	path: '/Ataohuayuanji',
	name: 'A桃花源记',
	component: () => import('../views/A桃花源记.vue'),
	meta: {}
}, {
	path: '/Ayangqiyuanwen',
	name: 'A养气原文',
	component: () => import('../views/A养气原文.vue'),
	meta: {}
}, {
	path: '/Ayueyanglouji',
	name: 'A岳阳楼记',
	component: () => import('../views/A岳阳楼记.vue'),
	meta: {}
}, {
	path: '/Azuiwengtingji',
	name: 'A醉翁亭记',
	component: () => import('../views/A醉翁亭记.vue'),
	meta: {}
}, {
	path: '/Geightqueens',
	name: 'Geightqueens',
	component: () => import('../views/Geightqueens.vue'),
	meta: {}
}, {
	path: '/Ggobang',
	name: 'Ggobang',
	component: () => import('../views/Ggobang.vue'),
	meta: {}
}, {
	path: '/Ggreedysnake',
	name: 'Ggreedysnake',
	component: () => import('../views/Ggreedysnake.vue'),
	meta: {}
}, {
	path: '/Ghangman',
	name: 'Ghangman',
	component: () => import('../views/Ghangman.vue'),
	meta: {}
}, {
	path: '/Gjigsaw',
	name: 'Gjigsaw',
	component: () => import('../views/Gjigsaw.vue'),
	meta: {}
}, {
	path: '/Gminesweeper',
	name: 'Gminesweeper',
	component: () => import('../views/Gminesweeper.vue'),
	meta: {}
}, {
	path: '/Gpinball',
	name: 'Gpinball',
	component: () => import('../views/Gpinball.vue'),
	meta: {}
}, {
	path: '/Gspelling',
	name: 'Gspelling',
	component: () => import('../views/Gspelling.vue'),
	meta: {}
}, {
	path: '/Gsudoku',
	name: 'Gsudoku',
	component: () => import('../views/Gsudoku.vue'),
	meta: {}
}, {
	path: '/Gtreasure',
	name: 'Gtreasure',
	component: () => import('../views/Gtreasure.vue'),
	meta: {}
}, {
	path: '/Haccount',
	name: 'Haccount',
	component: () => import('../views/Haccount.vue'),
	meta: {}
}, {
	path: '/Hhome',
	name: 'Hhome',
	component: () => import('../views/Hhome.vue'),
	meta: {}
}, {
	path: '/Hindex',
	name: 'Hindex',
	component: () => import('../views/Hindex.vue'),
	meta: {}
}, {
	path: '/Hlog',
	name: 'Hlog',
	component: () => import('../views/Hlog.vue'),
	meta: {}
}, {
	path: '/Hmusic',
	name: 'Hmusic',
	component: () => import('../views/Hmusic.vue'),
	meta: {}
}, {
	path: '/Hpillar',
	name: 'Hpillar',
	component: () => import('../views/Hpillar.vue'),
	meta: {}
}, {
	path: '/Hshrink',
	name: 'Hshrink',
	component: () => import('../views/Hshrink.vue'),
	meta: {}
}, {
	path: '/Hstars',
	name: 'Hstars',
	component: () => import('../views/Hstars.vue'),
	meta: {}
}, {
	path: '/Htransition',
	name: 'Htransition',
	component: () => import('../views/Htransition.vue'),
	meta: {}
}, {
	path: '/Pcilinzhengyun',
	name: 'P词林正韵',
	component: () => import('../views/P词林正韵.vue'),
	meta: {}
}, {
	path: '/Pingshuijiuyun',
	name: 'P平水旧韵',
	component: () => import('../views/P平水旧韵.vue'),
	meta: {}
}, {
	path: '/Pzhonghuaxinyun',
	name: 'P中华新韵',
	component: () => import('../views/P中华新韵.vue'),
	meta: {}
}, {
	path: '/TDataGrip',
	name: 'TDataGrip',
	component: () => import('../views/TDataGrip.vue'),
	meta: {}
}, {
	path: '/TMyBatisPlus',
	name: 'TMyBatisPlus',
	component: () => import('../views/TMyBatisPlus.vue'),
	meta: {}
}, {
	path: '/TPowerDesigner',
	name: 'TPowerDesigner',
	component: () => import('../views/TPowerDesigner.vue'),
	meta: {}
}, {
	path: '/:pathMatch(.*)',
	redirect: '/Hhome'
}]

const router = new Router({
	mode: 'hash',
	base: process.env.baseURL,
	routes: routes
})


export default router
