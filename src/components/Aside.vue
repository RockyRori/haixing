<template>
	<el-menu mode="vertical" @select="handleSelect" :unique-opened="true" :background-color="color"
		:default-openeds="openeds" :class="{'Home':isHome,'Game':isGame,'Poem':isPoem,'Tutorial':isTutorial}"
		:style="{height:(isTutorial?HEIGHT+'px':'')}">
		<el-submenu index="1">
			<template slot="title"><i class="el-icon-s-ticket tittle">古文</i></template>
			<el-menu-item index="101">
				<div class="sub">方山子传</div>
			</el-menu-item>
			<el-menu-item index="102">
				<div class="sub">桃花源记</div>
			</el-menu-item>
			<el-menu-item index="103">
				<div class="sub">养气原文</div>
			</el-menu-item>
			<el-menu-item index="104">
				<div class="sub">岳阳楼记</div>
			</el-menu-item>
			<el-menu-item index="105">
				<div class="sub">醉翁亭记</div>
			</el-menu-item>
		</el-submenu>
		<el-submenu index="2" v-if="true">
			<template slot="title"><i class="el-icon-s-platform tittle">休闲</i></template>
			<el-menu-item index="201">
				<div class="sub">八皇后</div>
			</el-menu-item>
			<el-menu-item index="202">
				<div class="sub">五子棋</div>
			</el-menu-item>
			<el-menu-item index="203">
				<div class="sub">贪吃蛇</div>
			</el-menu-item>
			<el-menu-item index="204">
				<div class="sub">吊死鬼</div>
			</el-menu-item>
			<el-menu-item index="205">
				<div class="sub">九宫格</div>
			</el-menu-item>
			<el-menu-item index="206">
				<div class="sub">扫地雷</div>
			</el-menu-item>
			<el-menu-item index="207">
				<div class="sub">接弹球</div>
			</el-menu-item>
			<el-menu-item index="208">
				<div class="sub">字母机</div>
			</el-menu-item>
			<el-menu-item index="209">
				<div class="sub">填数字</div>
			</el-menu-item>
			<el-menu-item index="210">
				<div class="sub">接宝藏</div>
			</el-menu-item>
		</el-submenu>
		<el-submenu index="3">
			<template slot="title"><i class="el-icon-star-on tittle">欣赏</i></template>
			<el-menu-item index="301">
				<div class="sub">光柱</div>
			</el-menu-item>
			<el-menu-item index="302">
				<div class="sub">群星</div>
			</el-menu-item>
			<el-menu-item index="303">
				<div class="sub">流星</div>
			</el-menu-item>
			<el-menu-item index="304">
				<div class="sub">天际</div>
			</el-menu-item>
		</el-submenu>
		<el-submenu index="4">
			<template slot="title"><i class="el-icon-s-management tittle">诗词</i></template>
			<el-menu-item index="401">
				<div class="sub">词林正韵</div>
			</el-menu-item>
			<el-menu-item index="402">
				<div class="sub">平水旧韵</div>
			</el-menu-item>
			<el-menu-item index="403">
				<div class="sub">中华新韵</div>
			</el-menu-item>
		</el-submenu>
		<el-submenu index="5">
			<template slot="title"><i class="el-icon-s-opportunity tittle">教程</i></template>
			<el-menu-item index="501">
				<div class="sub">PowerDesigner</div>
			</el-menu-item>
			<el-menu-item index="502">
				<div class="sub">DataGrip</div>
			</el-menu-item>
			<el-menu-item index="503">
				<div class="sub">MybatisPlus</div>
			</el-menu-item>
		</el-submenu>
	</el-menu>
</template>

<script>
	export default {
		props: ['HEIGHT'],
		mounted() {
			this.isHome = false;
			this.isGame = false;
			this.isPoem = false;
			this.isTutorial = false;
			this.openeds = [];
			if (this.$route.path.substring(0, 2) == '/A') {
				this.isPoem = true;
				this.openeds.push('1');
			}
			if (this.$route.path.substring(0, 2) == '/G') {
				this.isGame = true;
				this.openeds.push('2');
			}
			if (this.$route.path.substring(0, 2) == '/H') {
				this.isHome = true;
				this.openeds.push('3');
			}
			if (this.$route.path.substring(0, 2) == '/P') {
				this.isPoem = true;
				this.openeds.push('4');
			}
			if (this.$route.path.substring(0, 2) == '/T') {
				this.isTutorial = true;
				this.openeds.push('5');
			}
		},
		data() {
			return {
				color: "rgba(0, 0, 0, 0.0)",
				isHome: false,
				isGame: false,
				isPoem: false,
				isTutorial: false,
				openeds: []
			}
		},
		methods: {
			handleSelect(key) {
				switch (key % 1000) {
					case 101:
						this.$router.push('/Afangshanzizhuan');
						break;
					case 102:
						this.$router.push('/Ataohuayuanji');
						break;
					case 103:
						this.$router.push('/Ayangqiyuanwen');
						break;
					case 104:
						this.$router.push('/Ayueyanglouji');
						break;
					case 105:
						this.$router.push('/Azuiwengtingji');
						break;
					case 201:
						this.$router.push('/Geightqueens');
						break;
					case 202:
						this.$router.push('/Ggobang');
						break;
					case 203:
						this.$router.push('/Ggreedysnake');
						break;
					case 204:
						this.$router.push('/Ghangman');
						break;
					case 205:
						this.$router.push('/Gjigsaw');
						break;
					case 206:
						this.$router.push('/Gminesweeper');
						break;
					case 207:
						this.$router.push('/Gpinball');
						break;
					case 208:
						this.$router.push('/Gspelling');
						break;
					case 209:
						this.$router.push('/Gsudoku');
						break;
					case 210:
						this.$router.push('/Gtreasure');
						break;
					case 301:
						this.$router.push('/HPillar');
						break;
					case 302:
						this.$router.push('/HShrink');
						break;
					case 303:
						this.$router.push('/HStars');
						break;
					case 304:
						this.$router.push('/Htransition');
						break;
					case 401:
						this.$router.push('/Pcilinzhengyun');
						break;
					case 402:
						this.$router.push('/Pingshuijiuyun');
						break;
					case 403:
						this.$router.push('/Pzhonghuaxinyun');
						break;
					case 501:
						this.$router.push('/TPowerDesigner');
						break;
					case 502:
						this.$router.push('/TDataGrip');
						break;
					case 503:
						this.$router.push('/TMyBatisPlus');
						break;
					default:
						;
				}
			}
		}
	}
</script>

<style scoped>
	.Home {
		height: calc(100vh - 80px);
		/* height: unset; */
		background-image: url('../assets/backgrounds/stars.gif');
		background-size: 150% 50%;
		overflow: hidden;
	}

	.Game {
		height: calc(100vh - 80px);
		background-image: url('../assets/backgrounds/shrink.gif');
		background-size: 200% 75%;
		overflow: hidden;
	}

	.Poem {
		height: calc(100vh - 100px);
		background-image: url('../assets/backgrounds/transition.gif');
		background-size: 100% 110%;
		overflow: hidden;
	}

	.Tutorial {
		background-image: url('../assets/backgrounds/stars.gif');
		overflow: hidden;
	}

	.el-menu-item {
		text-align: left;
	}

	.el-menu :hover {
		color: #00aeef;
	}

	.tittle {
		color: #e1e1e1;
		width: 100%;
		font-size: 24px;
		text-align: center;
	}

	.sub {
		color: rgba(0, 239, 191, 0.8);
		font-size: 20px;
		text-align: left;
	}
</style>
