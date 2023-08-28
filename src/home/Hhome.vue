<template>
	<div id="Hhome">
		<div id="tittle">每周推荐</div>
		<el-carousel :interval="3000" arrow="always" indicator-position="outside" style="width: 75vw;" height="60vh">
			<el-carousel-item v-for="item in pictures" :key="item.title" class="carousel-item">
				<img :src="item.url" :title="item.title" v-on:click="handleSelect(item)" />
				<div class="info">{{item.title}}</div>
			</el-carousel-item>
		</el-carousel>
	</div>
</template>

<script>
	export default {
		mounted() {},
		data() {
			return {
				pictures: [{
						title: 'Celeste——蔚蓝,只有两名程序员开发，却精妙绝伦。本作提名2018最佳独立，制作这样一份作品是我一生的目标。',
						url: require("@/assets/news/Celeste.jpg"),
						link: 'http://www.rockyrori.cn/img/Celeste.ae4f17ee.jpg'
					},
					{
						title: 'BBC.LIFE——地球生命脉动，全球制作最精良的纪录片之一。地球的美丽即便我穷尽一生也无法尽知，但我愿用余生三分之一的时间去领略它的美妙。',
						url: require("@/assets/news/ButterFly.png"),
						link: 'http://www.rockyrori.cn/img/ButterFly.8d3299b9.png'
					},
					{
						title: 'Amazing Cultivation Simulator——了不起的修仙模拟器，国内我最喜欢的独立团队吉艾斯球制作。主创凭借6万元的房租水电成本换来了千万的营收，仅仅一年时间便完成demo，两年不到就推出了正式版，这样高效迅猛的迭代速度值得太吾等工作室学习',
						url: require("@/assets/news/ACS1.png"),
						link: 'http://www.rockyrori.cn/img/ACS1.afe1d661.png'
					},
					{
						title: 'EvoCreo——超进化精灵，仿照宝可梦制作，登录Google安卓平台，图中为最强劲的7神兽。但最强的不总是基础属性，更多在于招式技能搭配，掌握了100%命中的绝对零度，任何战斗都不在话下！',
						url: require("@/assets/news/EvoCreo.jpg"),
						link: 'http://www.rockyrori.cn/img/EvoCreo.e983d895.jpg'
					},
					{
						title: '曾经盛极一时的摩尔庄园网页版，现在又有谁记得它？',
						url: require("@/assets/news/SuperRam.png"),
						link: 'http://www.rockyrori.cn/img/SuperRam.e4057d39.png'
					},
					{
						title: 'Commander是Wargroove的核心所在，包括12个以上充满活力的角色，每个角色都有独特的个性和动机。决定效忠于哪个交战派系：Cherrystone王国、Heavensong帝国、Felheim军团和Floran部落。在Campaign模式下，跟随毫无战斗经验的年轻女王一起探索超凡力量，这一切将通过栩栩如生的像素艺术过场动画和动态战斗呈现。',
						url: require("@/assets/news/Wargroove.png"),
						link: 'https://store.steampowered.com/app/607050/_/'
					},
					{
						title: '一款满世界打奇异水果敌人的动作游戏，在这个世界里，动物跟植物的界限已被打破，一场食物链的颠覆拉开了序幕。人类不得不在第一个发现异化植物的区域建立前哨站并开始调查，军方也准备了数目众多的强大武器，由你带领一支先遣军开始了一场旷日持久的拉锯战。',
						url: require("@/assets/news/JuicyRealm.png"),
						link: 'https://store.steampowered.com/app/732370/Juicy_Realm/'
					},
					{
						title: '游玩《双人成行》，踏上生命中最疯狂的旅程，这是一款别开生面的平台冒险游戏，完全为合作模式而设计。利用好友通行证*邀请一位好友免费游玩，共同体验多种多样的乐趣，享受颠覆性的玩法挑战。扮演相互看不顺眼的科迪和小梅夫妇，这两个人被魔咒变成了玩偶。他们一起被困在一个奇幻世界里，每个角落都隐藏着意想不到的东西，他们不得不一起克服挑战，同时挽救他们破裂的关系。',
						url: require("@/assets/news/ItTakesTwo.png"),
						link: 'https://store.steampowered.com/app/1426210/_/'
					},
					{
						title: '在我们的列车大亨益智游戏中推动工业革命向前发展！建造一条高效的铁路，升级机车，并让所有列车在轨道上运行，以满足你的小山谷中城市和工业不断增长的需求。列车！',
						url: require("@/assets/news/TrainValley2.png"),
						link: 'https://store.steampowered.com/app/602320/Train_Valley_2/'
					}
				]
			}
		},
		methods: {
			handleSelect(item) {
				window.open(item.link);
			}
		}
	}
</script>

<style scoped>
	#Hhome {
		height: calc(100vh - 80px);
		background-image: url('../assets/backgrounds/stars.gif');
	}

	#tittle {
		color: #0094ca;
		font-size: 36px;
		text-align: center;
		/* width: max-content; */
	}

	img {
		height: 100%;
		width: 70%;
	}

	.info {
		height: 100%;
		width: 30%;
		font-size: 20px;
		color: rgba(0, 239, 191, 0.8);
		background: repeating-linear-gradient(to top,
				rgba(0, 174, 239, 0.2), rgba(255, 255, 0, 0.2));
	}

	.carousel-item {
		display: flex;
		flex-direction: row;
	}
</style>
