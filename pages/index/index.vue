<template>
	<view class="container" v-if="showFlag">
		<product v-if="showProduct" :randomNum='number'></product>
		<template v-else>
			<home :userStatus="+(this.userInfo.status) || 0"></home>
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
				userInfo: {
					status: ''
				},
				timer: '', // 定时器
				timerTotal: 0,
				number: 0,
				showProduct: false
			}
		},
		created() {
			this.getUserInfoStatus()
		},
		onShow() {
			this.number = (new Date().valueOf()).toString()
		},
		methods: {
			getUserInfoStatus() {
				getUserInfo({}).then(async (res) => {
					if (res.code === 100000) {
						this.userInfo = res?.data
					}
				}).catch((err) => {
					console.log(err, 'err');
				}).finally(() => {
					this.showFlag = true;
				})
			}
		},
		watch: {
			timerTotal(newVal, oldVal) {
				if (newVal >= 3) {
					clearInterval(this.timer)
				}
			},
			number(newVal, oldVal) {
				this.getUserInfoStatus()
			},
			userInfo: {
				handler() {
					if (this.userInfo.status === 5) {
						this.showProduct = true
						this.$forceUpdate()
					}
				},
				deep: true //true 深度监听
			}
		},
		computed: {
			...mapGetters(['isLogin', 'getUserInfos']),
			// inituserStatus() {
			// 	return this.userInfo.status ? this.userInfo.status : 0
			// }
		},
		onUnload() {
			clearInterval(this.timer)
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		min-width: 100vw;
	}
</style>
