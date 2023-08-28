<template>
	<div>
		<Header :waiting="waiting"></Header>
		<el-row>
			<el-col :span="3"><Aside :HEIGHT="HEIGHT"></Aside></el-col>
			<el-col :span="21"><TPowerDesigner></TPowerDesigner></el-col>
		</el-row>
	</div>
</template>

<script>
	import Header from '../components/Header.vue'
	import Aside from '../components/Aside.vue'
	import TPowerDesigner from '../tutorials/TPowerDesigner.vue'
	export default {
		props:['waiting'],
		components: {
			Header,
			Aside,
			TPowerDesigner
		},
		watch: {},
		mounted() {},
		data() {
			return {
				HEIGHT: 1800 * 11
			}
		},
		methods: {},
	}
</script>

<style scoped>
</style>
