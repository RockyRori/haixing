<template>
	<div>
		<Header :waiting="waiting"></Header>
		<el-row>
		  <el-col :span="3"><Aside></Aside></el-col>
		  <el-col :span="16"><yangqi></yangqi></el-col>
			<el-col :span="5"><Poet></Poet></el-col>
		</el-row>
	</div>
</template>

<script>
	import Header from '../components/Header.vue'
	import Aside from '../components/Aside.vue'
	import Poet from '../components/Poet.vue'
	import yangqi from '../poems/平水旧韵.vue'
	export default {
		props:['waiting'],
		components: {
			Header,
			Aside,
			Poet,
			yangqi
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
