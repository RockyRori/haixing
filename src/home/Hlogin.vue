<template>
	<div id="Hlogin">
		<div class="form-wrapper">
			<div class="header">
				海星快乐屋
			</div>
			<div class="input-wrapper" @keydown.enter="Login()">
				<div class="border-wrapper">
					<input tabindex="1" type="text" v-model="username" placeholder="账号" class="border-item"
						autocomplete="off"></input>
				</div>
				<div class="border-wrapper">
					<input tabindex="2" type="password" v-model="password" placeholder="密码" class="border-item"
						autocomplete="off"></input>
				</div>
				<div style="display: flex;flex-direction: row;justify-content: space-evenly">
					<div class="verify-wrapper">
						<input tabindex="3" type="text" v-model="verify" placeholder="4位数字" class="border-item"
							autocomplete="off"></input>
					</div>
					<div class="verify-wrapper">
						<input tabindex="4" type="button" v-model="verifycode" class="border-item"
							@click="selectVerifyCode()"></input>
					</div>
				</div>
			</div>
			<div class="action" @keydown.enter="Login()">
				<div tabindex="5" class="button" @click="Login()">登录</div>
				<div tabindex="6" class="button" @click="Register()">注册</div>
			</div>
			<div class="icon-wrapper" @keydown.enter="fastlogin()" @click="fastlogin()">
				<i tabindex="7" id="QQ" class="fontFamily iconfont-QQ"></i>
				<i tabindex="8" id="weixin" class="fontFamily iconfont-weixin"></i>
				<i tabindex="9" id="github" class="fontFamily iconfont-github"></i>
			</div>
		</div>
	</div>
</template>

<script>
	import Cookies from 'js-cookie'
	export default {
		inject: ['reload'],
		props: ['state'],
		mounted() {
			this.selectVerifyCode();
		},
		data() {
			return {
				username: '',
				password: '',
				verify: '',
				verifycode: '1234',
				users: {
					time: null,
					name: null,
					pass: null,
					portrait: null,
					gender: null,
					birth: null
				}
			}
		},
		methods: {
			selectVerifyCode() {
				this.verify = '';
				this.verifycode = Math.floor(Math.random() * 8888 + 1000) + '';
			},
			checkVerify() {
				if (this.verify == this.verifycode) {
					return true;
				}
				this.$message({
					showClose: true,
					type: 'error',
					message: '验证码错误'
				});
				this.selectVerifyCode();
				return false;
			},
			checkNull() {
				if (this.username == '') {
					this.$message({
						showClose: true,
						type: 'warning',
						message: '用户名不能为空'
					});
					return false;
				}
				if (this.password == '') {
					this.$message({
						showClose: true,
						type: 'warning',
						message: '密码不能为空'
					});
					return false;
				}
				return true;
			},
			checkUser() {
				let that = this;
				that.users.name = that.username;
				that.users.pass = that.password;
				that.$axios({
						method: 'post',
						// url: 'backend/website/users/selectOne',
						url: 'http://47.107.117.199:8800/website/users/selectOne',
						data: that.users
					}).then(function(response) {
						if (response.data == '') {
							that.$message({
								showClose: true,
								type: 'error',
								duration: 5000,
								message: '尚未注册'
							});
							that.username = '';
							that.password = '';
							that.selectVerifyCode();
						} else {
							that.users = response.data;
							that.checkPassword();
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
			},
			checkPassword() {
				if (this.users.pass == this.password) {
					this.$message({
						showClose: true,
						type: 'success',
						message: '登录成功'
					});
					Cookies.set('state', 'main');
					Cookies.set('users', this.users);
					this.$emit('state', 'main');
					this.reload();
					return true;
				}
				this.$message({
					showClose: true,
					type: 'error',
					message: '密码错误'
				});
				this.password = '';
				this.selectVerifyCode();
				return false;
			},
			Login() {
				if (!this.checkVerify()) {
					return false;
				}
				if (!this.checkNull()) {
					return false;
				}
				this.checkUser();
			},
			Register() {
				Cookies.set('state', 'register');
				this.$emit('state', 'register');
				this.reload();
			},
			fastlogin() {
				this.$message({
					showClose: true,
					type: 'warning',
					message: '尚未合作，敬请期待'
				});
			}
		}
	}
</script>

<style scoped>
	#Hlogin {
		height: calc(100vh - 80px);
		width: 100%;
		background-image: url('../assets/backgrounds/stars.gif');
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: flex-start;
	}

	.form-wrapper {
		width: 360px;
		height: 80%;
		background-color: #292d3e;
		color: #ffffff;
		border-radius: 2px;
		padding: 28px;
	}

	.form-wrapper .header {
		font-family: "Hiragino Sans GB", "Helvetica Neue", Helvetica, "PingFang SC", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
		text-align: center;
		font-size: 36px;
		text-transform: uppercase;
		line-height: 100px;
	}

	.form-wrapper .input-wrapper input {
		background-color: rgb(41, 45, 62);
		border: 0;
		width: 100%;
		height: 160px;
		text-align: center;
		font-size: 15px;
		color: #fff;
		outline: none;
	}

	.form-wrapper .input-wrapper input::placeholder {
		text-transform: uppercase;
	}

	.form-wrapper .input-wrapper .border-wrapper {
		background-image: linear-gradient(to right, #e8198b, #0eb4dd);
		width: 100%;
		height: 50px;
		margin-bottom: 16px;
		border-radius: 28px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.form-wrapper .input-wrapper .verify-wrapper {
		background-image: linear-gradient(to right, #e8198b, #0eb4dd);
		width: 36%;
		height: 50px;
		margin-bottom: 16px;
		border-radius: 28px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.form-wrapper .input-wrapper .border-wrapper .border-item {
		font-size: 25px;
		height: calc(100% - 4px);
		width: calc(100% - 8px);
		border-radius: 30px;
	}

	.form-wrapper .input-wrapper .verify-wrapper .border-item {
		font-size: 25px;
		height: calc(100% - 4px);
		width: calc(100% - 8px);
		border-radius: 30px;
	}

	.form-wrapper .action {
		display: flex;
		justify-content: space-evenly;
	}

	.form-wrapper .action .button {
		width: 36%;
		text-transform: uppercase;
		border: 2px solid #0e92b3;
		text-align: center;
		line-height: 50px;
		border-radius: 30px;
		cursor: pointer;
	}

	.form-wrapper .action .button:hover {
		background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
	}

	.form-wrapper .icon-wrapper {
		text-align: center;
		width: 60%;
		margin: 0 auto;
		margin-top: 20px;
		border-top: 1px dashed #929292;
		padding: 20px;
	}

	.form-wrapper .icon-wrapper i {
		font-size: 28px;
		color: #bbbbbb;
		cursor: pointer;
		border: 1px solid #ffffff;
		padding: 5px;
		border-radius: 20px;
		margin-left: 8px;
	}

	.form-wrapper .icon-wrapper i:hover {
		color: #ffffff;
	}

	.iconfont-QQ {
		background-color: #F56C6C;
	}

	#QQ:hover {
		background-color: #ff0000;
	}

	.iconfont-weixin {
		background-color: #67C23A;
	}

	#weixin:hover {
		background-color: #00ff00;
	}

	.iconfont-github {
		background-color: #303133;
	}

	#github:hover {
		background-color: #000000;
	}
</style>
