<template>
	<view class="container" :class="addClassName">
		<view class="cells">
			<u-cell-group>
				<view class="tel" v-for="(item,index) in telphones" :key="index">
					<u-cell :title="item">
						<u-icon slot="value" name="phone" :index='index' color="#2979ff" size="28" @click="toTel">
						</u-icon>
					</u-cell>
				</view>
			</u-cell-group>
		</view>

	</view>
</template>

<script>
	import {
		getEdu
	} from "@/config/api/user.js";
	export default {
		data() {
			return {
				emptyStatus: true,
				telphones: []
			}
		},
		created() {
			this.getEdus()
		},
		methods: {
			getEdus() {
				getEdu({
					"code": "customer_service_phone"
				}).then((res) => {
					if (res.code === 100000) {
						if (res?.data?.value?.value) {
							this.telphones = res?.data?.value?.value.split(',')
							return
						}
						this.telphones = []
					}
				}).catch((err) => {
					console.log(err, 'err');
				})
			},
			toTel(i) {
				uni.makePhoneCall({
					phoneNumber: this.telphones[i]
				});
			}
		},
		computed: {
			addClassName() {
				if (this.emptyStatus) {
					// return 'u-flex u-flex-column u-flex-center u-flex-items-center'
				}
				return ''
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		min-height: 100vh;

		.cells {
			margin: 30rpx 30rpx;

			/deep/ .u-cell-group__wrapper {
				background: #FFFFFF;

			}

			/deep/ .u-cell__body {
				padding: 28rpx 30rpx;
			}
		}
	}
</style>
