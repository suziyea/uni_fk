<template>
	<view class="container_pay">
		<view class="pay_status u-flex u-flex-column u-flex-items-center u-flex-center">
			<view class="img">
				<image :src="'/static/icon/'+payCustomerInfo.icon+'.png'" mode="aspectFill"></image>
			</view>
			<view class="pay_tips u-flex u-flex-column u-flex-items-center u-flex-center">
				<view class="title">
					{{payCustomerInfo.title}}
				</view>
				<view class="money">
					{{payCustomerInfo.tip}}
				</view>
			</view>
		</view>

		<!-- footer -->
		<view class="footer u-flex u-flex-items-center u-flex-center">
			<button class="btn primary" :class="payType == 1 ? 'doubleBtn': 'noShow'"
				@click="handleBtn('home')">回到首页</button>
			<button class="btn success" :class="payType == 2 ? 'singleBtn': ''"
				@click="handleBtn(payType == 2 ? 'home' : 'next')">{{payType == 2 ? '回到首页' : '下一步'}}</button>
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
				payDetails: {},
				showFlag: false,
				timer: '', // 定时器
				payType: '', // 第几次支付 服务费
				service_charge: '', // 服务费用
			}
		},
		onLoad(props) {
			this.payType = props.serviceType
			this.service_charge = props.service_charge
		},
		created() {
			this.getUpdateUserInfos()
		},
		computed: {
			payCustomerInfo() {
				let status = this.payDetails.status
				let resultObj = {
					icon: 'result_processing',
					title: '处理中',
					tip: '请耐心等待哦'
				}
				if ((this.payType == 1 && status == 4) || (this.payType == 2 && status == 5)) {
					resultObj.icon = 'result_success';
					resultObj.title = '支付成功';
					resultObj.tip = this.service_charge ? `¥${this.service_charge}` : '';
				}
				return resultObj
			},
		},
		methods: {
			getUpdateUserInfos() {
				this.timer = setInterval(() => {
					getUserInfo({}).then(async (res) => {
						if (res.code === 100000) {
							this.payDetails = res?.data || ''
							if ((this.payType == 1 && res.data.status == 4) || (this.payType == 2 && res.data.status == 5)) {
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
			handleBtn(val = '') {
				if (val === 'home') {
					uni.$u.route({
						type: 'switchTab',
						url: '/pages/index/index',
						params: {
							page: 'home'
						}
					})
				}
				if (val == 'next') {
					uni.$u.route('/pages/product/reflect/reflect');
				}
			}
		},
		onUnload() {
			clearInterval(this.timer)
		},
	}
</script>

<style lang="scss" scoped>
	.container_pay {
		width: 750rpx;
		min-height: 100vh;
		background: #F7F6F8;
		box-sizing: border-box;

		.pay_status {
			width: 750rpx;
			height: 414rpx;
			background: #FFFFFF;
			box-sizing: border-box;

			.img {
				width: 120rpx;
				height: 120rpx;
				margin-bottom: 30rpx;

				image {
					width: 120rpx;
					height: 120rpx;
				}
			}

			.pay_tips {
				.title {
					font-size: 38rpx;
					font-family: Helvetica;
					color: #162641;
					line-height: 60rpx;
				}

				.money {
					font-size: 38rpx;
					font-family: Helvetica;
					color: #162641;
					line-height: 60rpx;
				}
			}
		}

		.footer {
			position: fixed;
			width: 750rpx;
			height: 128rpx;
			background: #FFFFFF;
			bottom: 0;
			box-sizing: border-box;
			padding: 20rpx 40rpx;

			.btn {
				width: 320rpx;
				height: 88rpx;
				border-radius: 46rpx;
			}

			.primary {
				background: #FFFFFF;
				border-radius: 46rpx;
				border: 1rpx solid #EEEEEE;
				font-size: 32rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #3E536C;
			}

			.success {
				background: #F33C2A;
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
			}

			.noShow {
				display: none;
			}

			.singleBtn {
				flex: 1 !important;
			}
		}

	}
</style>
