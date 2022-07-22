<template>
	<view class="container">
		<common-dialog v-if="showDialog" title="温馨提示" content="请您保证余额在300元以上，否则会误判您还款能力导致下款失败！" :showCancel="true"
			confirmText="重新绑卡" cancelText="原卡重试" v-on:on-click-dialog="onClickDialog"></common-dialog>
		<view class="hello">
			<u-loading-page :loading="loadingStatus" loadingColor="#1B8DFF" loading-text="loading..."
				bg-color="transparent"></u-loading-page>
		</view>
		<view class="content">
			<view class="title_tips">恭喜！您的审核已通过，额度为</view>
			<view class="bg u-flex u-flex-column u-row-center u-flex-items-center ">
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
								class="num">{{userAssessInfo.bankNoLast}}</text></view>
					</u-col>
				</u-row>

			</view>
		</view>

		<view class="btn">
			<!-- <u-button :type="getInsufficientBalance ? 'warning' : 'primary'" @click="clickSubmit" :plain="true"
				:class="getInsufficientBalance ? '' : 'custom-style'" :hairline="true"
				:text="getInsufficientBalance ? '重新绑卡' : '立即提现'">
			</u-button> -->
			<u-button type="primary" @click="clickSubmit" :plain="true" class="custom-style" :hairline="true"
				text="立即提现">
			</u-button>
		</view>
		<view class="read u-flex u-flex-items-center">
			<view :class="[!selectRadio ? 'icon-this-option' : 'icon-has-checked']" @click="checkboxChange"></view>
			<view class="wenan">
				<text class="read_tip">我已经同意<text class="blue"
						@click="jumpContent('platform')">{{` 《评估协议》 `}}</text>和<text class="blue"
						@click="jumpContent('hide')">{{` 《隐私协议》 `}}</text></text>
			</view>
		</view>
		<u-popup class="popupView" :closeable='closeable' :closeOnClickOverlay="closeOnClickOverlay"
			overlayOpacity='0.8' :show="showPopup" :round="10" mode="center" @close="close" @open="open">
			<view class="popupCon u-flex u-flex-column u-flex-items-center">
				<text class="title u-flex-align-self">输入验证码</text>
				<view class="tip">
					<text>验证码发送至: {{this.userAssessInfo.phone || storageUserInfo.phone}}</text>
				</view>
				<view class="codeContent">
					<u-code-input v-model="smsCodeValue" mode="line" @finish="finishSmsCode" :focus="true">
					</u-code-input>
				</view>
			</view>
			<view class="sms_num">
				<text v-if="!restCode"><text class="restSms">{{`${seconds} `}}</text>秒后重发短信验证码</text>
				<text class="restSms" v-else @click="restSmsCode">重新获取</text>
			</view>

		</u-popup>
	</view>
</template>

<script>
	import {
		mapGetters,
	} from 'vuex'
	import {
		getAssessResult,
		getUserInfo
	} from "@/config/api/user.js";
	import {
		sendSecondOrderSms,
		payVerify
	} from "@/config/api/product.js";
	import commonDialog from '@/components/common-dialog/common-dialog.vue'
	export default {
		components: {
			commonDialog,
		},
		data() {
			return {
				showDialog: false,
				seconds: 60,
				restCode: false,
				messageArr: ['186****0764 总借款共计12000元', '186****0765 总借款共计12000元', '186****0766 总借款共计12000元'],
				selectRadio: false,
				userAssessInfo: {},
				smsCodeValue: '',
				showPopup: false,
				order_no: '',
				storageUserInfo: {},
				timer: '',
				closeable: true,
				closeOnClickOverlay: false,
				insufficient_balance: false,
				timerStatus: '', // 定时器
				loadingStatus: false,
				isJump: false, // 为ture，跳转到首页
			}
		},

		computed: {
			// 获取银行卡余额
			...mapGetters(['getInsufficientBalance']),
		},
		created() {
			this.storageUserInfo = uni.getStorageSync('userInfo');
			this.getAssessInfo()
		},
		methods: {
			onClickDialog(event) {
				if (event == 'confirm') {
					uni.$u.route({
						url: '/pages/evaluation/addBank/addBank'
					});
					return;
				}
				this.clickSubmit();
				this.showDialog = false
			},
			getAssessInfo() {
				getAssessResult({}).then((res) => {
					if (res.code === 100000) {
						this.userAssessInfo = res?.data || {}
						this.userAssessInfo.bankNoLast = res?.data?.user?.card_number?.slice(-4) || ''
					}
				}).catch((err) => {
					console.log(err, 'err');
				})
			},
			jumpContent(val) {
				if (val === 'platform') {
					uni.$u.route('/subpages/assessAgreement/assessAgreement')
					return;
				}

				if (val === 'hide') {
					uni.$u.route('/subpages/appPrivacyAgreement/appPrivacyAgreement')
					return;
				}
			},
			checkboxChange() {
				this.selectRadio = !this.selectRadio
			},
			clickSubmit() {
				this.selectRadio = true
				if (this.selectRadio) {
					uni.$u.debounce(this.handleSmsPopup, 500);
					return;
				}
				uni.$u.toast('请勾选同意')
			},
			// 重新获取验证码
			restSmsCode() {
				this.restCode = false;
				this.seconds = 60
				this.order_no = ''
				this.handleSmsPopup();
				return;
			},

			handleSmsPopup() {
				this.seconds = 60;
				sendSecondOrderSms({})
					.then((res) => {
						if (res.code === 100000) {
							this.order_no = res.data.order_no
							this.showPopup = true;
							this.timer = setInterval(() => {
								this.seconds--
								if (this.seconds <= 0) {
									this.seconds = 60
									this.restCode = true;
									clearInterval(this.timer)
								}
							}, 1000)
						}

						if (res.code === 123000) {
							uni.showToast({
								icon: "none",
								title: res.msg || "获取验证码失败，请稍后再试",
							});
							return;
						}

					})
					.catch((err) => {
						uni.showToast({
							icon: "none",
							title: err.msg || "获取验证码失败，请稍后再试",
						});
					});
			},

			open() {
				this.showPopup = true
			},
			close(val = 'close') {
				if (val == 'smserr') this.order_no = ''
				this.showPopup = false;
				this.smsCodeValue = '';
				clearInterval(this.timer)
			},
			finishSmsCode() {
				payVerify({
						order_no: this.order_no,
						code: this.smsCodeValue
					})
					.then(async (res) => {
						// if (res.code === 121000 || res.code === 123000) {
						// 	let closeStatus;
						// 	if (res.code === 123000) closeStatus = 'smserr'
						// 	this.close(closeStatus)
						// 	Promise.reject(res)
						// 	return;
						// }
						if (res.code === 121000 || res.code === 123000) {
							let closeStatus;
							if (res.code === 123000) closeStatus = 'smserr'
							this.close(closeStatus)
							this.showDialog = true
							this.showPopup = false;
							return;

						}

						if (res.code === 100000) {
							this.showPopup = false;
							this.loadingStatus = true
							uni.$u.sleep(2000).then(() => {
								this.getUpdateUserInfos()
							})
						}




					})
					.catch((err) => {
						uni.showToast({
							icon: "none",
							title: err.msg || "请稍后再试",
						});
					})
			},
			getUpdateUserInfos() {
				this.timerStatus = setInterval(() => {
					getUserInfo({}).then(async (res) => {
						if (res.code === 100000) {
							this.payDetails = res?.data || ''
							if ((res.data.status === 5)) {
								this.loadingStatus = false
								this.isJump = true
								await this.$store.dispatch('setCurrentUserInfo')
								clearInterval(this.timerStatus)
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
			isJump(newVal, oldVal) {
				if (newVal === true) {
					clearInterval(this.timer)
					clearInterval(this.timerStatus)
					uni.$u.sleep(300).then(() => {
						uni.$u.route({
							type: 'switchTab',
							url: '/pages/index/index',
							params: {
								page: 'home'
							}
						})
					})
					this.isJump = false

				}
			}
		},
		onUnload() {
			clearInterval(this.timer)
			clearInterval(this.timerStatus)
		},
	}
</script>

<style lang="scss" scoped>
	.hello {
		z-index: 2;
		background: transparent;
	}

	.container {
		width: 100%;
		min-height: 100vh;
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

			.title_tips {
				text-align: center;
				margin: 48rpx 0;
				font-size: 28rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #414141;
				line-height: 40rpx;
			}

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

			// box-sizing: border-box;
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

	.icon-has-checked {
		width: 28rpx;
		height: 28rpx;
		background: url(../../../static/icon/checked.png) no-repeat;
		background-size: cover;
	}

	.icon-this-option {
		width: 28rpx;
		height: 28rpx;
		background: url(../../../static/icon/noChecked.png) no-repeat;
		background-size: cover;
	}

	.wenan {
		margin-left: 12rpx;
	}

	.popupView {

		box-sizing: border-box;

		/deep/ .u-popup__content {
			border-radius: 20rpx;
			background: #fff;
			width: 100%;
			padding: 40rpx;
			width: 670rpx;
			height: 497rpx;
			background: #FFFFFF;
			border-radius: 10rpx;
			box-sizing: border-box;
		}

		/deep/ .uicon-close {
			display: block;
		}

		.popupCon {

			.title {
				font-size: 40rpx;
				margin: 20rpx 0;
			}

			.tip {

				font-size: 30rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #BFC2CD;
				line-height: 42rpx;
			}
		}

		.sms_num {
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #BEC2CC;
			line-height: 33rpx;
			text-align: right;

			.restSms {
				color: #3E69E5;

			}
		}

		.codeContent {
			margin: 50rpx 0;
		}

		/deep/ .u-button--success {
			border: none;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #4579E6;
			line-height: 34rpx;
			background: none;
		}

		/deep/ .u-form-item {
			margin: 40rpx 0;
		}

	}
</style>
