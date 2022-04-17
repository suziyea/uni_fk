<template>
	<view class="container">
		<!-- <product v-if="+(getUserInfos.status) === 5"></product>
		<template v-else>
			<home :userStatus="+(getUserInfos.status) || 0"></home>
		</template> -->
		<home :userStatus="+(getUserInfos.status)"></home>
	</view>
</template>

<script>
	import {
		mapGetters,
	} from 'vuex'
	import home from './components/home.vue'
	import product from './components/product.vue'
	export default {
		components: {
			home,
			product
		},
		data() {
			return {}
		},
		methods: {

		},
		computed: {
			...mapGetters(['isLogin', 'getUserInfos'])
		}
	}
</script>

<style lang="scss" scoped>

</style>
