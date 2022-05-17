<template>
	<view class="container" v-if="showFlag">
		{{this.userInfo.status}}
		<product v-if="+(inituserStatus) === 5"></product>
		<template v-else>
			<home :userStatus="+(inituserStatus) || 0"></home>
		</template>
	</view>
</template>

<script>
	import {
		mapGetters,
	} from 'vuex'
	import {
		getUserInfo
	} from "@/config/api/user.js";
	import home from './components/home.vue'
	import product from './components/product.vue'
	export default {
		components: {
			home,
			product
		},
		data() {
			return {
				showFlag: false,
				userInfo:{
					status: ''
				}
			}
		},
		created() {
			this.getUpdateUserInfos()
		},
		methods: {

		getUpdateUserInfos() {
				getUserInfo({}).then((res) => {
					if (res.code === 100000) {
						this.userInfo = res?.data || ''

					}
				}).catch((err) => {
					console.log(err, 'err');
				}).finally(() => {
					this.showFlag = true;
				})
			},
		},
		computed: {
			...mapGetters(['isLogin', 'getUserInfos']),
			inituserStatus() {
				return this.userInfo?.status 
			}
		}
	}
</script>

<style lang="scss" scoped>
.container {
	min-width: 100vw;
}
</style>
