<template>
	<div>
		<Header :waiting="waiting"></Header>
		<el-row>
			<el-col :span="3">
				<Aside :HEIGHT="1000"></Aside>
			</el-col>
			<el-col :span="21">
				<Hmusic :musicMode="musicMode"></Hmusic>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import Header from '../components/Header.vue'
	import Aside from '../components/Aside.vue'
	import Hmusic from '../home/Hmusic.vue'
	export default {
		props: ['waiting', 'musicMode'],
		components: {
			Header,
			Aside,
			Hmusic
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
