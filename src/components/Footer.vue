<template>
	<div id="footer">
		<el-row>
			<el-col :span="6" style="display: flex;flex-direction: column;justify-content: space-evenly;align-items: center;">
				<img alt="LOGO" src="@/assets/icons/icon.png" style="height: 60px;width: 300px;margin-left: 28px;display: block;">
				<br /><br />
				<img alt="二维码" style="height: 160px;width: 160px;display: block;"
					src="@/assets/icons/个人网站.png" />
			</el-col>
			<el-col :span="18">
				<br />
				<div class="content">
					RockyRori版权所有 RockyRori_All_Rights_Reserved CopyRight@2021
				</div>
				<br />
				<div class="content">
					网站地址：广西区桂林市 邮编：541004 管理员联系方式：
					<a href="mailto:1365523465@qq.com">1365523465@qq.com</a>
				</div>
				<br />
				<div>
					<span>
						备案号:
						<img src="@/assets/icons/备案图标.png" alt="备案图标" />
						<a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=45030502000390">桂公网安备45030502000390号</a>
					</span>
					<img style="min-width: 36px;" alt=""></img>
					<span>
						<a target="_blank" href="https://beian.miit.gov.cn/#/Integrated/recordQuery">桂ICP备2021005488号</a>
					</span>
					<img style="min-width: 36px;" alt=""></img>
					<span>
						<a target="_blank" href="http://www.rockyrori.cn/">http://www.rockyrori.cn/</a>
					</span>
				</div>
				<br />
				<div class="content">
					海星快乐屋，快乐停不住 评论、反馈、推广，你的支持是网站更新的最大动力
				</div>
				<br />
				<div class="content">
					已注册用户数：{{userCount}} 总访问量：{{visitCount}} 评论数：{{commentCount}} 反馈数：{{feedbackCount}}
				</div>
				<br />
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		mounted() {
			// this.loading();
		},
		data() {
			return {
				userCount: 0,
				visitCount: 0,
				commentCount: 0,
				feedbackCount: 0
			}
		},
		methods: {
			loading() {
				let that = this;
				that.$axios({
					method: 'get',
					// url: 'backend/website/info/selectCount',
					url: 'http://47.107.117.199:8800/website/info/selectCount'
				}).then(function(response) {
					let array = response.data;
					that.userCount = array[0];
					that.visitCount = array[1];
					that.commentCount = array[2];
					that.feedbackCount = array[3];
				}).catch(function(error) {
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
	#footer {
		background-color: #bbbbbb;
		line-height: 28px;
		width: 100%;
		height: max-content;
	}

	el-row {
		width: inherit;
	}

	.content {
		display: flex;
		flex-direction: row;
		word-spacing: 30px;
	}
</style>
