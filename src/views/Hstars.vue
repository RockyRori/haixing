<template>
	<div>
		<Header :waiting="waiting"></Header>
		<el-row>
			<el-col :span="3"><Aside></Aside></el-col>
			<el-col :span="21"><Hstars></Hstars></el-col>
		</el-row>
	</div>
</template>

<script>
	import Header from '../components/Header.vue'
	import Aside from '../components/Aside.vue'
	import Hstars from '../gifs/Hstars.vue'
	export default {
		components: {
			props:['waiting'],
			Header,
			Aside,
			Hstars
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
