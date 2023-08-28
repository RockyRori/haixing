<template>
	<div>
		<Header :waiting="waiting"></Header>
		<el-row>
		  <el-col :span="3"><Aside></Aside></el-col>
		  <el-col :span="21"><Hindex></Hindex></el-col>
		</el-row>
	</div>
</template>

<script>
	import Header from '../components/Header.vue'
	import Aside from '../components/Aside.vue'
	import Hindex from '../home/Hindex.vue'
	export default {
		props:['waiting'],
		components: {
			Header,
			Aside,
			Hindex
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
