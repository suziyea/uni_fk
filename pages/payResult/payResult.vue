<template>
	<view class="container u-flex u-flex-column">
		<view class="tipImg u-flex u-flex-column u-flex-items-center u-flex-center">
			<view class="img u-flex u-flex-column u-flex-items-center u-flex-center">
				<image :src="'/static/img/payResult'+randomNumber+'.png'"></image>
			</view>
		</view>
		<view class="stepContainer u-flex u-flex-column  u-flex-items-center u-flex-center">
			<u-steps :current="payCustomerInfo" activeColor="#3661E0" inactiveColor='#DCDCDC' direction="column">
				<u-steps-item :iconSize='iconSize' title="身份信息认证成功">
				</u-steps-item>
				<u-steps-item :iconSize='iconSize' title="基本资料认证成功">
				</u-steps-item>
				<u-steps-item :iconSize='iconSize' title="已为您匹配最优产品成功"></u-steps-item>
				<u-steps-item :iconSize='iconSize' title="已为您成功生成放款订单"></u-steps-item>
			</u-steps>
		</view>
	</view>
</template>

<script>
	import {
		getUserInfo
	} from "@/config/api/user.js";
	export default {
		data() {
			return {
				iconSize: 30,
				payDetails: {
					recordStatus: 0,
				},
				timer: '', // 定时器
				timerInit: '', // 初始化
				payType: '', // 第几次支付 服务费
				service_charge: '', // 服务费用
				isJumpNext: false,
			}
		},
		created() {
			this.timerInit = setInterval(() => {
				this.payDetails.recordStatus += 0.5
				if ((this.payDetails.recordStatus === 3.5)) {
					this.getUpdateUserInfos()
					clearInterval(this.timerInit)
				}
				this.showFlag = true;
			}, 1500)
		},
		watch: {
			isJumpNext(newVal, oldVal) {
				if (newVal === true) {
					clearInterval(this.timer)
					uni.$u.sleep(300).then(() => {
						uni.$u.route('/pages/product/reflect/reflect');
					})

				}
			}
		},
		computed: {
			randomNumber() {
				return uni.$u.random(1, 2);
			},
			payCustomerInfo() {
				let {
					recordStatus,
					status
				} = this.payDetails
				if (recordStatus == 4 && status === 4) return 4;
				return recordStatus
			},
		},
		methods: {
			getUpdateUserInfos() {
				this.timer = setInterval(() => {
					getUserInfo({}).then(async (res) => {
						if (res.code === 100000) {
							this.payDetails = {
								...res,
								recordStatus: this.payDetails.recordStatus
							}
							if (res.data.status === 4) {
								this.isJumpNext = true
								await this.$store.dispatch('setCurrentUserInfo')
								clearInterval(this.timer)
							}
						}
					}).catch((err) => {
						console.log(err, 'err');
					}).finally(() => {
						this.showFlag = true;
					})
				}, 1500)


			},
		},
		onUnload() {
			clearInterval(this.timer)
		},
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 750rpx;
		min-height: 100vh;
		// background: #F7F6F8;
		box-sizing: border-box;
		// width: 375px;
		// height: 812px;
		background: #FFFFFF;

		.tipImg {
			width: 750rpx;
			// height: 414rpx;
			// background: #FFFFFF;
			// background: hotpink;
			box-sizing: border-box;
			margin: 100rpx 0;

			// margin-bottom: auto;
			.img {
				// width: 706rpx;
				// height: 480rpx;
				width: 516rpx;
				height: 352rpx;
				margin: 40rpx;
				// border: 1px solid hotpink;

				image {
					// width: 706rpx;
					// height: 480rpx;
					// width: 702rpx;
					// height: 480rpx
					width: 516rpx;
					height: 352rpx;
				}

			}
		}

		.stepContainer {
			// width: 750rpx;
			// border: 1px solid red;
			padding: 40rpx 60rpx;
			// height: 100%;

			/deep/.u-steps-item--column {
				// padding-bottom: 100rpx;
				padding-bottom: 48rpx
			}

			// /deep/ .u-text__value--content {
			// 	color: #000;
			// }

		}
	}
</style>
