<template>
	<view class="container" v-if="showFlag">
		<!-- <product v-if="+(inituserStatus) === 5" :randomNum='number'></product> -->
		<template>
			<home :userStatus="+(inituserStatus) || 0"></home>
		</template>
	</view>
</template>

<script>
	import {
		mapGetters,
	} from 'vuex'
	import {
		getUserInfo,
		getQy
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
			}
		},
		created() {
			if (this.inituserStatus === 5 || uni.getStorageSync('userInfo').status === 5) {
				this.goJump()
			} else {
				this.getUpdateUserInfos()
			}

		},
		onShow() {
			this.number = new Date().valueOf()
		},
		methods: {
			getUpdateUserInfos() {
				this.timer = setInterval(() => {
					getUserInfo({}).then(async (res) => {
						if (res.code === 100000) {
							this.timerTotal += 1
							this.userInfo = res?.data || ''
							if ((this.getUserInfos.status === 5)) {
								await this.$store.dispatch('setCurrentUserInfo')
								clearInterval(this.timer)

							}
							this.showFlag = true;

						}
					}).catch((err) => {
						console.log(err, 'err');
					}).finally(() => {
						this.showFlag = true;
					})
				}, 1000)

			},
			// 跳转权益
			goJump() {
				getQy({}).then((res) => {
					if (res.code === 100000) {
						uni.navigateTo({
							url: `/pages/webview/webview?urlPath=${encodeURIComponent(res?.data?.url)}`
						});
					}
				}).catch((err) => {
					console.log(err, 'err');
				})
				return;
			}
		},
		watch: {
			timerTotal(newVal, oldVal) {
				if (newVal >= 3) {
					clearInterval(this.timer)
				}
			}
		},
		computed: {
			...mapGetters(['isLogin', 'getUserInfos']),
			inituserStatus() {
				return this.getUserInfos.status ? this.getUserInfos.status : this.userInfo?.status
			}
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
