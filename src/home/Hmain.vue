<template>
	<div id="Hmain">
		<div>
			注册时间:{{users.time.substring(0,10)}}——
			用户名称:{{users.name}}——
			临时头像:{{users.portrait}}——
			您的性别:{{users.gender}}——
			您的生日:{{users.birth}}——
			<el-button @click="logout()" type="primary">退出登录</el-button>
		</div>
		<div class="unlimit">
			<div>
				<div>您的反馈：</div>
				<ul style="overflow: hidden;height: 100vh;">
					<li v-for="feedback in feedbacksList">
						<span>时间:{{feedback.time.substring(5,10)}}——</span>
						<span>页面:{{feedback.page.substring(2)}}——</span>
						<span>内容:{{feedback.feedback}}</span>
						<div>回复:{{feedback.reply}}</div>
					</li>
				</ul>
			</div>
			<div>
				<div>您的评论：</div>
				<ul style="overflow: hidden;height: 100vh;">
					<li v-for="comment in commentsList">
						<span>时间:{{comment.time.substring(5,10)}}——</span>
						<span>页面:{{comment.game}}——</span>
						<span>评论:{{comment.comment}}</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import Cookies from 'js-cookie'
	export default {
		inject: ['reload'],
		props: ['state'],
		created() {
			this.users = JSON.parse(Cookies.get('users'));
			this.feedbacks.user = this.users.name;
			this.comments.name = this.users.name;
		},
		mounted() {
			this.selectList();
		},
		data() {
			return {
				users: null,
				feedbacks: {
					user: null
				},
				comments: {
					name: null
				},
				feedbacksList: [],
				commentsList: []
			}
		},
		methods: {
			selectList() {
				let that = this;
				that.$axios({
						method: 'post',
						// url: 'backend/website/feedbacks/selectList',
						url: 'http://47.107.117.199:8800/website/feedbacks/selectList',
						data: that.feedbacks
					}).then(function(response) {
						that.feedbacksList = response.data;
					})
					.catch(function(error) {
						console.log(error);
					});
				that.$axios({
						method: 'post',
						// url: 'backend/website/comments/selectUserComments',
						url: 'http://47.107.117.199:8800/website/comments/selectUserComments',
						data: that.comments
					}).then(function(response) {
						that.commentsList = response.data;
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			logout() {
				Cookies.set('state', 'login');
				Cookies.remove('users');
				this.$emit('state', 'main');
				this.reload();
			}
		}
	}
</script>

<style scoped>
	#Hmain {
		height: 200vh;
		width: 100%;
		background:
			linear-gradient(217deg, rgba(255, 85, 127, 0.8) 0%, rgba(255, 0, 0, 0.0) 30%),
			linear-gradient(127deg, rgba(145, 255, 139, 0.8) 0%, rgba(0, 255, 0, 0.1) 50%),
			linear-gradient(336deg, rgba(167, 151, 255, 0.8) 0%, rgba(0, 0, 255, 0.0) 50%);
		color: #000000;
	}

	.unlimit {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		align-items: baseline;
	}
</style>