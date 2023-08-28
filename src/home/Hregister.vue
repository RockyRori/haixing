<template>
	<div id="Hregister">
		<div class="form-wrapper">
			<div class="header">
				海星快乐屋
			</div>
			<div class="input-wrapper" @keydown.enter="Register()">
				<div class="border-wrapper">
					<input tabindex="1" type="text" v-model="username" placeholder="账号" class="border-item"
						autocomplete="off"></input>
				</div>
				<div class="border-wrapper">
					<input tabindex="2" type="password" v-model="password" placeholder="密码" class="border-item"
						autocomplete="off"></input>
				</div>
				<div class="border-wrapper">
					<input tabindex="2" type="password" v-model="confirm" placeholder="确认" class="border-item"
						autocomplete="off"></input>
				</div>
			</div>
			<div class="action" @keydown.enter="Register()">
				<div tabindex="5" class="button" @click="Login()">返回</div>
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
		inject: ['getTime', 'reload'],
		props: ['state'],
		data() {
			return {
				username: '',
				password: '',
				confirm: '',
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
			checkPassword() {
				if (this.password == this.confirm) {
					return true;
				}
				this.$message({
					showClose: true,
					type: 'warning',
					message: '密码不同，重新输入'
				});
				this.password = '';
				this.confirm = '';
				return false;
			},
			checkLength() {
				if (this.username.length > 12) {
					this.$message({
						showClose: true,
						type: 'warning',
						duration: 5000,
						message: '用户名不要超过12个字'
					});
					this.username = '';
					return false;
				}
				if (this.password.length > 12) {
					this.$message({
						showClose: true,
						type: 'warning',
						duration: 5000,
						message: '密码不要超过12个字'
					});
					this.password = '';
					this.confirm = '';
					return false;
				}
				return true;
			},
			Register() {
				if (!this.checkNull()) {
					return false;
				}
				if (!this.checkPassword()) {
					return false;
				}
				if (!this.checkLength()) {
					return false;
				}
				this.addOne();
			},
			addOne() {
				let that = this;
				that.users.time = that.getTime();
				that.users.name = that.username;
				that.users.pass = that.password;
				that.$axios({
						method: 'put',
						// url: 'backend/website/users/addOne',
						url: 'http://47.107.117.199:8800/website/users/addOne',
						data: that.users
					}).then(function(response) {
						if (response.data.toString() == 'true') {
							that.$message({
								showClose: true,
								type: 'success',
								message: '注册成功'
							});
							Cookies.set('state', 'main');
							Cookies.set('users', that.users);
							that.$emit('state', 'main');
							that.reload();
						} else {
							that.$message({
								showClose: true,
								type: 'error',
								duration: 5000,
								message: '已存在同名用户'
							});
							that.username = '';
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
			Login() {
				Cookies.set('state', 'login');
				this.$emit('state', 'login');
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
	#Hregister {
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
		/* width: 60%; */
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
