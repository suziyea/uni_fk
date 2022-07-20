<template>
	<view class="container" v-if="showFlag">
		<product v-if="+(inituserStatus) === 5" :randomNum='number'></product>
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
				},
				timer: '', // 定时器
				timerTotal: 0,
				number: 0,
			}
		},
		created() {
			if (this.getUserInfos && this.getUserInfos.status) {
				if (this.getUserInfos.status === 3 || this.getUserInfos.status === 4) {
					this.getUpdateUserInfos()
					return;
				}
			}
			this.showFlag = true;
		},
		onShow() {
			// console.log('你好--')
			this.number = new Date().valueOf()
		},
		methods: {

		getUpdateUserInfos() {
				this.timer = setInterval(() => {
					getUserInfo({}).then(async (res) => {
						if (res.code === 100000) {
							this.timerTotal += 1
							this.userInfo = res?.data || ''
							if ((this.getUserInfos.status == 3 && res.data.status == 4) || (this.getUserInfos.status == 4 && res.data.status == 5)) {
								await this.$store.dispatch('setCurrentUserInfo')
								clearInterval(this.timer)
							}
						}
					}).catch((err) => {
						console.log(err, 'err');
					}).finally(() => {
						this.showFlag = true;
					})
				}, 1000)

			},
		},
		watch: {
			timerTotal(newVal,oldVal) {
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
