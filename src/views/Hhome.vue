<template>
	<div>
		<Header :waiting="waiting"></Header>
		<el-row>
		  <el-col :span="3"><Aside></Aside></el-col>
		  <el-col :span="21"><Hhome></Hhome></el-col>
		</el-row>
		<Footer></Footer>
		<Chat></Chat>
	</div>
</template>

<script>
	import Header from '../components/Header.vue'
	import Aside from '../components/Aside.vue'
	import Footer from '../components/Footer.vue'
	import Hhome from '../home/Hhome.vue'
	import Chat from '../components/chat.vue'
	export default {
		props:['waiting'],
		components: {
			Header,
			Aside,
			Footer,
			Hhome,
			Chat
		},
		watch: {},
		mounted() {},
		data() {
			return {

			}
		},
		methods: {},
	}
</script>

<style scoped>
</style>
