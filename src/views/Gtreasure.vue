<template>
	<div>
		<Header :waiting="waiting"></Header>
		<el-row>
		  <el-col :span="3"><Aside></Aside></el-col>
		  <el-col :span="16"><Gtreasure></Gtreasure></el-col>
			<el-col :span="5"><Beside></Beside></el-col>
		</el-row>
	</div>
</template>

<script>
	import Header from '../components/Header.vue'
	import Aside from '../components/Aside.vue'
	import Beside from '../components/Beside.vue'
	import Gtreasure from '../games/Gtreasure.vue'
	export default {
		props:['waiting'],
		components: {
			Header,
			Aside,
			Beside,
			Gtreasure
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
