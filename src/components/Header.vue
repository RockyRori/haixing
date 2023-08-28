<template>
	<el-menu mode="horizontal" active-text-color="#00aeef" @select="handleSelect" text-color="#e1e1e1" class="el-menu"
		background-color="#000000" :class="{'Home':isHome,'Game':isGame,'Poem':isPoem}">
		<!-- 6个子菜单 -->
		<el-menu-item index="1" style="width: 240px;"><img alt="LOGO" src="@/assets/icons/icon.png"
				style="height: 48px;">
		</el-menu-item>
		<el-menu-item index="2"><i class="el-icon-share tittle">索引</i></el-menu-item>
		<el-menu-item index="3"><i class="el-icon-info tittle">日志</i></el-menu-item>
		<el-menu-item index="4"><i class="el-icon-headset tittle">音乐</i></el-menu-item>
		<el-menu-item index="5" v-if="waiting=='true'"><i class="el-icon-video-play tittle">播放</i></el-menu-item>
		<el-menu-item index="6" v-else><i class="el-icon-video-pause tittle">暂停</i></el-menu-item>
		<el-menu-item index="7" style="width: 120px;"><i class="el-icon-question tittle">反馈</i></el-menu-item>
		<el-menu-item index="8" style="width: max-content;">
			<img alt="头像" style="height: 48px;width: 48px;" :src="this.portrait.url">
			<span>当前登录：{{users.name}}</span>
		</el-menu-item>

		<!-- 问题反馈独立弹窗 -->
		<el-dialog title="问题反馈" :visible.sync="dialogVisible">
			<el-form :model="form" label-position="right" label-width="80px">
				<el-form-item label="当前页面" style="text-align: left;">
					<el-input v-model="form.path" style="width: 360px;" disabled>
						<template slot="prepend">www.rockyrori.cn</template>
					</el-input>
				</el-form-item>
				<el-form-item label="你的邮箱" style="text-align: left;">
					<el-input v-model="form.email" style="width: 360px;"></el-input>
				</el-form-item>
				<el-form-item label="问题描述">
					<el-input type="textarea" v-model="form.feedback"></el-input>
				</el-form-item>
				<el-form-item label="字符校验">
					<el-input v-model="form.verify" style="width: 360px;">
						<template slot="append">{{form.verifycode}}</template>
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit">提交反馈</el-button>
					<el-button @click="onCancel">本次取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</el-menu>
</template>

<script>
	import Cookies from 'js-cookie'
	export default {
		inject: ['getTime', 'playMusic', 'pauseMusic', 'selectMusic'],
		props: ['waiting'],
		created() {
			if (Cookies.get('musicMode') == 'binding') {
				this.binding();
			}
		},
		mounted() {
			this.isHome = false;
			this.isGame = false;
			this.isPoem = false;
			let path = this.$route.path;
			if (path.substring(0, 2) == '/H') {
				this.isHome = true;
			}
			if (path.substring(0, 2) == '/G') {
				this.isGame = true;
			}
			if (path.substring(0, 2) == '/P') {
				this.isPoem = true;
			}
			if (path.substring(0, 2) == '/A') {
				this.isPoem = true;
			}
			if (path.substring(0, 2) == '/T') {
				this.isPoem = true;
			}
			if (Cookies.get('state') == undefined) {
				Cookies.set('state', 'login');
			}
			if (Cookies.get('users') == undefined) {
				Cookies.set('users', this.users);
			} else {
				this.users = JSON.parse(Cookies.get('users'));
				this.form.user = this.users.name;
			}
			this.selectVerifyCode();
		},
		data() {
			return {
				music: {
					page: 'default',
					url: require("@/assets/bgms/default.mp3")
				},
				musics: [{
						page: 'Hhome',
						url: require("@/assets/bgms/Hhome.mp3")
					},
					{
						page: 'Hindex',
						url: require("@/assets/bgms/Hindex.mp3")
					},
					{
						page: 'Hlog',
						url: require("@/assets/bgms/Hlog.mp3")
					},
					{
						page: 'Geightqueens',
						url: require("@/assets/bgms/Geightqueens.mp3")
					},
					{
						page: 'Ggobang',
						url: require("@/assets/bgms/Ggobang.mp3")
					},
					{
						page: 'Ggreedysnake',
						url: require("@/assets/bgms/Ggreedysnake.mp3")
					},
					{
						page: 'Ghangman',
						url: require("@/assets/bgms/Ghangman.mp3")
					},
					{
						page: 'Gjigsaw',
						url: require("@/assets/bgms/Gjigsaw.mp3")
					},
					{
						page: 'Gminesweeper',
						url: require("@/assets/bgms/Gminesweeper.mp3")
					},
					{
						page: 'Gpinball',
						url: require("@/assets/bgms/Gpinball.mp3")
					},
					{
						page: 'Gspelling',
						url: require("@/assets/bgms/Gspelling.mp3")
					},
					{
						page: 'Gsudoku',
						url: require("@/assets/bgms/Gsudoku.mp3")
					},
					{
						page: 'Gtreasure',
						url: require("@/assets/bgms/Gtreasure.mp3")
					}
				],
				isHome: false,
				isGame: false,
				isPoem: false,
				dialogVisible: false,
				portrait: {
					id: 1,
					url: require('@/assets/portraits/portrait1.png')
				},
				form: {
					time: '',
					user: '',
					page: this.$route.path,
					email: '',
					feedback: '',
					reply: null,
					verify: '',
					verifycode: '1234'
				},
				users: {
					time: null,
					name: '游客',
					pass: null,
					portrait: 0,
					gender: null,
					birth: null
				}
			}
		},
		methods: {
			selectVerifyCode() {
				this.form.verify = '';
				this.form.verifycode = Math.floor(Math.random() * 8888 + 1000) + '';
			},
			handleSelect(key, keyPath) {
				switch (key % 10) {
					case 1:
						this.$router.push('/Hhome');
						break;
					case 2:
						this.$router.push('/Hindex');
						break;
					case 3:
						this.$router.push('/Hlog');
						break;
					case 4:
						this.$router.push('/Hmusic');
						break;
					case 5:
						this.playMusic();
						break;
					case 6:
						this.pauseMusic();
						break;
					case 7:
						this.selectVerifyCode();
						this.dialogVisible = true;
					case 8:
						this.$router.push('/HAccount');
						break;
					default:
						;
				}
			},
			onSubmit() {
				if (this.form.verifycode == this.form.verify) {
					this.dialogVisible = false;
					this.addOne();
				} else {
					this.$message({
						showClose: true,
						type: 'error',
						message: '验证码错误'
					});
					this.selectVerifyCode();
				}
			},
			onCancel() {
				this.dialogVisible = false;
				this.form.feedback = '';
				this.form.verify = '';
				this.$message({
					showClose: true,
					type: 'info',
					message: '已取消本次反馈。'
				});
			},
			addOne() {
				let that = this;
				that.form.time = that.getTime();
				that.$axios({
						method: 'put',
						// url: 'backend/website/feedbacks/addOne',
						url: 'http://47.107.117.199:8800/website/feedbacks/addOne',
						data: that.form
					}).then(function(response) {
						if (response.data.toString() === 'true') {
							that.$message({
								showClose: true,
								type: 'success',
								message: '成功收到反馈，管理员将在5个工作日内发送邮件回执，请注意查收。'
							});
							that.form.feedback = '';
							that.form.verify = '';
						} else {
							that.$message({
								showClose: true,
								type: 'error',
								message: '当前访问人数过多，服务器没有收到您的反馈'
							});
						}
					})
					.catch(function(error) {
						console.log(error);
						that.$message({
							showClose: true,
							type: 'error',
							message: '由于网络环境不好，服务器没有接收到您的反馈'
						});
					});
			},
			binding() {
				for (let i of this.musics) {
					if (this.$route.path.substring(1) == i.page) {
						this.music = i;
						break;
					}
				}
				this.selectMusic(this.music.url);
			}
		}
	}
</script>

<style scoped>
	.Home {
		background-image: url('../assets/backgrounds/stars.gif');
		background-size: 20% 480%;
	}

	.Game {
		background-image: url('../assets/backgrounds/shrink.gif');
		background-size: 20% 480%;
	}

	.Poem {
		background-image: url('../assets/backgrounds/shrink.gif');
	}

	.el-menu-item {
		text-align: left;
		width: 88px;
		font-size: 22px;
	}

	.el-menu-item :hover {
		font-size: 22px;
		color: #00aeef;
	}

	.tittle {
		color: #e1e1e1;
	}
</style>
