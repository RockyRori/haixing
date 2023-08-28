<template>
	<div id="PDF">
		<div id="tittle">
			<el-button type="primary">
				Tip:
				<span style="color: #ff007f;font-weight: bold;font-size: 18px;">需要</span>
				点击浏览器的刷新
				<span style="color: #ff007f;font-weight: bold;font-size: 18px;">并且</span>
				等待5秒才能加载出来
			</el-button>
			<el-button type="primary" @click="printPDF()">导出PDF</el-button>
			<div>当前页面：<el-input v-model="current" type="number" style="width: 5em;"></el-input> /{{total}}</div>
			<div>
				<el-button type="primary" @click="previous()">上一页</el-button>
				<el-button type="primary" @click="next()">下一页</el-button>
			</div>
		</div>
		<pdf ref="myPdf" :src="url" :page="current" @num-pages="total = $event" @page-loaded="current = $event"></pdf>
		<el-divider content-position="center">单页全部PDF</el-divider>
		<pdf style="opacity: 0.9;" v-for="i in total" :key="i" :src="url" :page="i">
		</pdf>
	</div>
</template>

<script>
	import pdf from 'vue-pdf'
	export default {
		inject: ['reload'],
		components: {
			pdf
		},
		watch: {
			current(String) {
				this.current = parseInt(String);
				if (this.current > this.total) {
					this.current = 1;
				}
				if (this.current < 1) {
					this.current = this.total;
				}
			}
		},
		mounted() {
			this.init();
			this.addKeyboardEvents();
		},
		data() {
			return {
				url: '',
				current: 1,
				total: 0,
			}
		},
		methods: {
			init() {
				this.url = pdf.createLoadingTask({
					url: '/pdf/DataGrip 中文教程.pdf',
					cMapUrl: '../assets/cmaps/',
					cMapPacked: true
				});
			},
			printPDF() {
				this.$refs.myPdf.print();
			},
			previous() {
				this.current = this.current <= 1 ? this.total : this.current - 1;
			},
			next() {
				this.current = this.current >= this.total ? 1 : this.current + 1;
			},
			addKeyboardEvents() {
				let that = this;
				document.onkeydown = function(e) {
					let key = window.event.keyCode;
					switch (key) {
						case 37:
							that.previous();
							break;
						case 39:
							that.next();
							break;
						case 13:
							that.reload();
							break;
					}
				}
			}
		},
	}
</script>

<style scoped>
	#PDF {
		background-color: #edffe3;
	}

	#tittle {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		align-items: center;
	}
</style>
