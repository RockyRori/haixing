<template>
	<el-menu mode="vertical" @select="handleSelect" background-color="rgba(255, 255, 255, 0)" :default-openeds="active"
		style="overflow: hidden;">
		<el-submenu index="1">
			<template slot="title">
				<div class="tittle">游戏说明</div>
			</template>
			<span class="sub">{{description}}</span>
		</el-submenu>
		<el-submenu index="2">
			<template slot="title">
				<div class="tittle">游戏数据</div>
			</template>
			<span class="sub">
				<!-- 全球最高分：10800 个人最高分：600 -->
				还没做😅
			</span>
		</el-submenu>
		<el-submenu index="3">
			<template slot="title">
				<div class="tittle">排行榜</div>
			</template>
			<span class="sub">
				<!-- 1：10800 2：9800 3：8100 -->
				还没做😅
			</span>
		</el-submenu>
		<el-submenu index="4">
			<template slot="title">
				<div class="tittle">留言区</div>
			</template>
			<el-menu-item index="41">
				<el-input placeholder="请输入友善的评论" v-model="comments.comment"></el-input>
			</el-menu-item>
			<el-menu-item index="42">
				<el-button @click="comment()">提交</el-button>
				<el-button @click="comments.comment=''">清空</el-button>
				<el-button @click="loading()">加载</el-button>
			</el-menu-item>
			<ul style="overflow: scroll;height: 280px;">
				<li v-for="comment in commentList" class="sub">
					<span>发表时间：{{comment.time.substring(5,10)}}&#12288;</span>
					<span>用户：{{comment.name}}&#12288;</span>
					<span>评论内容：{{comment.comment}}</span>
				</li>
			</ul>
		</el-submenu>
	</el-menu>
</template>

<script>
	import Cookies from 'js-cookie'
	export default {
		inject: ['getTime'],
		mounted() {
			this.users = JSON.parse(Cookies.get('users'));
			this.comments.name = this.users.name;
			this.comments.game = this.$route.path.substring(1);
			this.GamePlay();
			// this.loading();
		},
		data() {
			return {
				users: {
					time: null,
					name: '游客',
					pass: null,
					portrait: 0,
					gender: null,
					birth: null
				},
				description: '',
				descriptions: {
					Geightqueens: '在8x8的棋盘上放置8个皇后，且任两个皇后都不能处于同一条横线、纵线或者斜线上',
					Ggobang: '黑子先行，白字后手，连5子为胜',
					Ggreedysnake: '按下方向键移动，红色是蛇头，蓝色是蛇尾，绿色是蛇身，黄色是食物',
					Ghangman: '点击字母或者键盘输入字母，猜测单词，每猜错1次扣1分，最终猜对加单词长度分数。总共有25轮，我不相信有谁能从刽子手刀下救出吊死鬼',
					Gjigsaw: '',
					Gminesweeper: '鼠标左键显示，鼠标右键排雷，可以选择难度。手机上也可以玩，把屏幕横过来，点击按钮切换标记',
					Gpinball: '按下方向键移动平板，接住弹弹球，不要坠落，消除完所有方块胜利',
					Gspelling: '在键盘正确拼写出单词击落敌机，敌机到达防线后爆炸，则游戏结束',
					Gsudoku: '9X9方格填写数字，每行每列包含不重复的1-9',
					Gtreasure: '按下方向键移动，铜钱2分、福袋5分、金条10分、元宝16分、红水晶20分、蓝钻石28分',
				},
				comments: {
					time: null,
					name: null,
					game: null,
					comment: ''
				},
				commentList: [],
				active: ['1', '4']
			}
		},
		methods: {
			GamePlay() {
				switch (this.$route.path.substring(1)) {
					case 'Geightqueens':
						this.description = this.descriptions.Geightqueens;
						break;
					case 'Ggobang':
						this.description = this.descriptions.Ggobang;
						break;
					case 'Ggreedysnake':
						this.description = this.descriptions.Ggreedysnake;
						break;
					case 'Ghangman':
						this.description = this.descriptions.Ghangman;
						break;
					case 'Gjigsaw':
						this.description = this.descriptions.Gjigsaw;
						break;
					case 'Gminesweeper':
						this.description = this.descriptions.Gminesweeper;
						break;
					case 'Gpinball':
						this.description = this.descriptions.Gpinball;
						break;
					case 'Gspelling':
						this.description = this.descriptions.Gspelling;
						break;
					case 'Gsudoku':
						this.description = this.descriptions.Gsudoku;
						break;
					case 'Gtreasure':
						this.description = this.descriptions.Gtreasure;
						break;
					default:
						this.description = '查看评论区找攻略';
				}
			},
			comment() {
				if (this.comments.comment.replace(/\s+/g,'') == '') {
					this.$message({
						showClose: true,
						type: 'error',
						message: '评论不能为空'
					});
				} else {
					let that = this;
					that.comments.time = that.getTime();
					that.$axios({
							method: 'put',
							// url: 'backend/website/comments/addOne',
							url: 'http://47.107.117.199:8800/website/comments/addOne',
							data: that.comments
						}).then(function(response) {
							if (response.data.toString() == 'true') {
								that.$message({
									showClose: true,
									type: 'success',
									message: that.comments.comment
								});
								that.comments.comment = '';
								that.loading();
							} else {
								that.$message({
									showClose: true,
									type: 'error',
									duration: 5000,
									message: '网络不佳或您发表评论太快，请重试'
								});
							}
						})
						.catch(function(error) {
							console.log(error);
							that.$message({
								showClose: true,
								type: 'error',
								duration: 5000,
								message: '按F12查看控制台，把错误信息反馈给管理员'
							});
						});
				}
			},
			loading() {
				let that = this;
				that.$axios({
						method: 'post',
						// url: 'backend/website/comments/selectList',
						url: 'http://47.107.117.199:8800/website/comments/selectList',
						data: that.comments
					}).then(function(response) {
						that.commentList = response.data;
					})
					.catch(function(error) {
						console.log(error);
						that.$message({
							showClose: true,
							type: 'error',
							duration: 5000,
							message: '按F12查看控制台，把错误信息反馈给管理员'
						});
					});
			}
		}
	}
</script>

<style scoped>
	.el-menu {
		height: calc(100vh - 80px);
		background-image: url('../assets/backgrounds/shrink.gif');
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
		font-size: 20px;
		text-align: center;
	}

	.sub {
		color: rgba(0, 239, 191, 0.8);
		font-size: 16px;
		text-align: left;
		font-family: Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
	}
</style>
