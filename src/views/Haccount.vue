<template>
	<div>
		<Header :waiting="waiting"></Header>
		<el-row>
			<el-col :span="3">
				<Aside></Aside>
			</el-col>
			<el-col :span="21">
				<Hregister v-if="state=='register'" :state="state"></Hregister>
				<Hmain v-else-if="state=='main'" :state="state"></Hmain>
				<Hlogin v-else :state="state"></Hlogin>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import Header from '../components/Header.vue'
	import Aside from '../components/Aside.vue'
	import Hlogin from '../home/Hlogin.vue'
	import Hregister from '../home/Hregister.vue'
	import Hmain from '../home/Hmain.vue'
	import Cookies from 'js-cookie'
	export default {
		props:['waiting'],
		components: {
			Header,
			Aside,
			Hlogin,
			Hregister,
			Hmain
		},
		watch: {},
		mounted() {},
		data() {
			return {
				state: Cookies.get('state')
			}
		},
		methods: {},
	}
</script>

<style scoped>
</style>
