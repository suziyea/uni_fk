<template>
	<view class="container">
		<view class="content">
			<view class="bg u-flex u-flex-column u-row-center u-flex-items-center ">
				<!-- <image src="/static/img/reflect_bg.png" mode="aspectFill"></image> -->

				<view class="countStyle u-flex u-flex-column u-row-centeru-flex-items-center ">
					<text class="title">最高可借额度(元)</text>
					<u-count-to :endVal="userAssessInfo.loan_amount" separator="," class="count"></u-count-to>
				</view>
			</view>
			<!-- 消息轮播 -->
			<view class="tipsBox">
				<u-notice-bar :text="messageArr" icon="volume" direction="column" speed="250" url=""></u-notice-bar>
			</view>
			<view class="list">
				<u-row customStyle="margin-bottom: 20rpx">
					<u-col span="6">
						<view class="demo-layout title">预计服务费</view>
					</u-col>
					<u-col span="6">
						<view class="demo-layout right_title">{{userAssessInfo.second_debit_amount}}元</view>
					</u-col>
				</u-row>

				<u-row customStyle="margin-bottom: 20rpx">
					<u-col span="6">
						<view class="demo-layout title">提现到您的</view>
					</u-col>
					<u-col span="6">
						<view class="demo-layout right_title">银行尾号 <text
								class="num">{{` ${userAssessInfo.user.card_number.slice(-4)}`}}</text></view>
					</u-col>
				</u-row>

			</view>
		</view>

		<view class="btn">
			<u-button type="primary" @click="clickSubmit" :plain="true" class="custom-style" :hairline="true"
				text="立即体现">
			</u-button>
		</view>
		<view class="read">
			<u-radio-group v-model="selectRadio">
				<u-radio shape="square"></u-radio>
				<text class="read_tip">我已经同意 <text class="blue"
						@click="jumpContent('register')">{{` 《注册协议》 `}}</text>和<text class="blue"
						@click="jumpContent('hide')">{{` 《隐私协议》 `}}</text></text>
			</u-radio-group>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {
		getAssessResult,setSecondPay
	} from "@/config/api/user.js";
	export default {
		data() {
			return {
				messageArr: ['凯文罗', '小罗', '二流子'],
				selectRadio: false,
				userAssessInfo: {}
			}
		},
		created() {
			this.getAssessInfo()
		},
		methods: {
			getAssessInfo() {
				getAssessResult({}).then((res) => {
					if (res.code === 100000) {
						this.userAssessInfo = res?.data || {}
					}
					console.log(res, 'nihao')
				}).catch((err) => {
					console.log(err, 'err');
				})
			},
			jumpContent(val) {
				if (val === 'register') {
					uni.$u.route('/pages/mine/agreement/agreement')
					return;
				}

				if (val === 'hide') {
					uni.$u.route('/pages/mine/agreement/agreement')
					return;
				}
			},
			clickSubmit() {
				// if (!this.selectRadio) {
				// 	uni.$u.toast('请勾选同意')
				// 	return;
				// }

				uni.$u.debounce(this.submit, 500)
			},
			submit() {
				let params = {
					type: 'success',
					message: "提现成功",
					url: '/pages/index/index'
				}
				setSecondPay({}).then((res) => {
					if (res.code === 100000) {
						this.$store.dispatch('setCurrentUserInfo')
						this.$refs.uToast.show({
							...params,
							complete() {
								params.url && uni.switchTab({
									url: params.url
								})
							}
						})
					}
				
				}).catch((err) => {
					console.log(err, 'err');
				})
				
				
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		height: 100vh;
		background: #F7F7F7;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0 32rpx;
		box-sizing: border-box;

		.content {
			width: 686rpx;
			height: 784rpx;
			// padding: 0 16rpx;
			background: #FFFFFF;
			border-radius: 16rpx;
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
			box-sizing: border-box;
			position: relative;

			.bg {
				width: 330rpx;
				height: 330rpx;
				position: absolute;
				top: 128rpx;
				left: 178rpx;
				// position: relative;
				background: url(../../../static/img/reflect_bg.png) no-repeat;
				background-size: cover;

				image {
					width: 100%;
					height: 100%
				}

				.countStyle {
					align-items: center;
					justify-content: center;
					width: 256rpx;
					height: 100%;
					padding: 0 14rpx;
					box-sizing: border-box;
					align-items: center;

					.title {
						height: 34rpx;
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #666565;
						line-height: 34rpx;
					}

					.count {
						height: 82rpx;
						font-size: 74rpx;
						font-family: Arial-BoldMT, Arial;
						font-weight: normal;
						color: #020F2B;
						line-height: 84rpx;
					}

				}
			}

			.tipsBox {
				position: absolute;
				width: 480rpx;
				top: 524rpx;
				left: 120rpx;
				height: 34rpx;
			}

			.list {
				position: absolute;
				width: 624rpx;
				top: 624rpx;
				padding: 0 32rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #414141;
				line-height: 40rpx;

				.right_title {
					text-align: right;

					.num {
						color: red;
					}
				}
			}
		}

		.btn {
			padding: 0 52rpx;
			margin-top: 56rpx;
			width: 646rpx;
			height: 88rpx;

			.custom-style {
				background: #4579E6;
				border-radius: 8rpx;
				font-size: 32rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				line-height: 44rpx;
			}
		}

		.read {
			margin: 48rpx 0rpx;
			align-self: flex-start;
			padding-left: 32rpx;

			.read_tip {
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #414141;
				line-height: 34rpx;

				.blue {
					color: #4579E6;
				}
			}
		}

		/deep/ .u-notice-bar {

			background: #FFFFFF !important;
			padding: 0 !important;

			.u-notice__swiper__item__text {
				font-size: 24rpx !important;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400 !important;
				line-height: 34rpx;
				color: #414141 !important;
			}
		}
	}
</style>
