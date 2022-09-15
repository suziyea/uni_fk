<template>
	<view class="container">
		<view class="bgImg">
			<image src="/static/imgs/img_huiyuanfuli.png" mode="aspectFill"></image>
		</view>
		<view class="buy u-flex u-flex-column u-row-center u-flex-center">
			<text class="title u-flex-align-self">VIP福利</text>

			<text class="desc">
				立享爱奇艺充值优惠，腾讯视频充值优惠，芒果TV充值优惠，酒店专享礼包，读书专享礼包，肯德基代金卷，搜狐视频充值优惠，优酷视频充值优惠，QQ音乐充值等等
			</text>
		</view>
		<view class="content">
			<!-- <view class="bg u-flex u-flex-column u-flex-items-center ">

				<view class="countStyle u-flex u-flex-column u-row-centeru-flex-items-center ">
					<text class="title">最高可借额度(元)</text>
					<u-count-to :endVal="userAssessInfo.loan_amount" separator="," class="count"></u-count-to>
				</view>
				
			</view> -->
			<!-- 消息轮播 -->
			<!-- <view class="tipsBox">
				<u-notice-bar :text="messageArr" icon="volume" direction="column" speed="250" url=""></u-notice-bar>
			</view> -->
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
			<u-button type="primary" @click="clickSubmit" :plain="true" class="custom-style" :hairline="true"
				text="立即购买VIP">
			</u-button>
		</view>
		<view class="read">
			<u-checkbox-group>
				<u-checkbox v-model="selectRadio" @change="checkboxChange"></u-checkbox><text class="read_tip">我已经同意
					<text class="blue" @click="jumpContent('platform')">{{` 《评估协议》 `}}</text>和<text class="blue"
						@click="jumpContent('hide')">{{` 《隐私协议》 `}}</text></text>
			</u-checkbox-group>
		</view>
		<u-toast ref="uToast"></u-toast>

		<u-popup class="popupView" :show="showPopup" :round="10" mode="center" @close="close" @open="open">
			<view class="popupCon u-flex u-flex-column">
				<text class="title u-flex-align-self">正在验证您的银行卡</text>
				<view class="tip">
					<text>已发送手机号: {{infos.reserve_phone}}</text>
				</view>
				<view class="formContent">
					<u--form :model="formContent" ref="uForm" labelWidth="auto">

						<u-form-item label="" prop="code" ref="item6">
							<!-- <u--input  v-model="phone" border suffixIcon="/static/icon/my_phone.png"></u--input> -->
							<!-- 注意：由于兼容性差异，如果需要使用前后插槽，nvue下需使用u--input，非nvue下需使用u-input -->
							<!-- #ifndef APP-NVUE -->
							<u-input v-model="formContent.code" placeholder="默认验证码:123456" type="number">
								<!-- #endif -->
								<!-- #ifdef APP-NVUE -->
								<u--input v-model="formContent.code" placeholder="默认验证码:123456" type="number">
									<!-- #endif -->
									<template slot="suffix">
										<u-code ref="uCode" @change="codeChange" seconds="60" changeText="X秒重新获取">
										</u-code>
										<u-button @tap="getCode" :text="tips" type="success" size="mini"></u-button>
									</template>
									<!-- #ifndef APP-NVUE -->
							</u-input>
							<!-- #endif -->
							<!-- #ifdef APP-NVUE -->
							</u--input>
							<!-- #endif -->
						</u-form-item>
					</u--form>

				</view>
				<view class="btnForm">
					<u-button type="primary" @click="clickSubmit('code')" :plain="true" class="custom-style"
						:hairline="true" text="确定">
					</u-button>
				</view>
			</view>
		</u-popup>

		<u-action-sheet :closeOnClickOverlay="true" :closeOnClickAction="true" :show="showCodePopupStatus"
			:actions="smsCodeList" title="请选择" @close="showCodePopupStatus = false" @select="handleSmsCodeSelect"
			cancelText="取消">
		</u-action-sheet>

		<u-modal :show="showtipscontent" :title="payTitle"
			:content='`您将付款 ${this.userAssessInfo.second_debit_amount} 元购买超值会员权益！`' @confirm="confirm" @cancel="cancel"
			:showCancelButton='modalStatus===1' :asyncClose="modalStatus===1"></u-modal>

		<u-modal :show="showResultcontent" :title="payTitle" :content='resultContent' @confirm="confirm(2)"></u-modal>

	</view>
</template>

<script>
	import {
		getAssessResult,
		setSecondPay,
		sendSMS,
		changeStatus,
		getQy
	} from "@/config/api/user.js";
	export default {
		data() {
			return {
				messageArr: ['186****0764 总优惠共计12000元', '186****0765 总优惠共计12000元', '186****0766 总借款共计12000元'],
				selectRadio: false,
				userAssessInfo: {},
				showPopup: false,
				formContent: {},
				tips: '获取验证码',
				seconds: 60,
				showCodePopupStatus: false,
				smsCodeList: [{
					name: '默认验证码：123456'
				}, ],
				infos: {},
				showtipscontent: false,
				showResultcontent: false,
				payTitle: '温馨提示',
				payContent: '您将付款xxx元购买超值会员权益！',
				modalType: 1, // 1 是付款提示， 2是付款成功,
				resultContent: '恭喜您成功成为我们的会员，可享受超值权益！',
				jumpUrlStr: ''
			}
		},
		created() {
			let storeData = uni.getStorageSync('userBankInfo')
			this.infos = storeData
			this.getAssessInfo()
		},
		computed: {
			modalStatus() {
				if (this.modalType === 2) {
					return 2
				}
				return 1
			}
		},
		methods: {
			cancel() {
				this.showtipscontent = false;
			},
			confirm(value = '') {
				if (value === 2) {
					uni.navigateTo({
						url: `/pages/webview/webview?urlPath=${encodeURIComponent(this.jumpUrlStr)}`
					});
					return;
				}
				setTimeout(() => {
					// 2秒后自动关闭
					this.showResultcontent = true;
					this.showtipscontent = false;
				}, 2000)
			},
			handleSmsCodeSelect(e) {
				// this.formContent.bank_id = e.id;
				this.formContent.code = e.name
				// this.$refs.uForm.validateField('formContent.bank_name')
				this.$refs.uCode.start();
				return;
			},
			open() {
				this.showPopup = true
				// console.log('open');
			},
			close() {
				this.showPopup = false
				// console.log('close');
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
			checkboxChange(n) {
				this.selectRadio = n
			},
			clickSubmit(code = '') {
				if (code) {
					if (this.formContent.code !== '123456') {

					} else {

						changeStatus({
							"actual_name": this.infos?.actual_name,
							"id_number": this.infos?.id_number
						}).then((res) => {
							if (res.code === 100000) {
								this.$store.dispatch('setCurrentUserInfo')
								// this.$refs.uToast.show({
								// 	...params,
								// 	complete() {
								// 		params.url && uni.switchTab({
								// 			url: params.url
								// 		})
								// 	}
								// })
								getQy({}).then((res) => {
									if (res.code === 100000) {
										// uni.navigateTo({
										// 	url: `/pages/webview/webview?urlPath=${encodeURIComponent(res?.data?.url)}`
										// });
										this.jumpUrlStr = res?.data?.url || ''
										this.showtipscontent = true;
										this.showPopup = false
									} else {
										uni.$u.route({
											type: 'reLaunch',
											url: 'pages/mine/mine',
										})
									}
								}).catch((err) => {
									console.log(err, 'err');
								})
								return;
							}

						}).catch((err) => {
							console.log(err, 'err');
						})
					}
					return;
				}
				if (this.selectRadio) {
					uni.$u.debounce(this.submit, 500)
					return;
				}
				uni.$u.toast('请勾选同意')
			},
			submit() {
				this.showPopup = true;
				// let params = {
				// 	type: 'success',
				// 	message: "提现成功",
				// 	url: '/pages/index/index'
				// }
				// setSecondPay({}).then((res) => {
				// 	if (res.code === 100000) {
				// 		this.$store.dispatch('setCurrentUserInfo')
				// 		this.$refs.uToast.show({
				// 			...params,
				// 			complete() {
				// 				params.url && uni.switchTab({
				// 					url: params.url
				// 				})
				// 			}
				// 		})
				// 	}

				// }).catch((err) => {
				// 	console.log(err, 'err');
				// })


			},
			codeChange(text) {
				this.tips = text;
			},
			getCode() {

				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					// uni.showLoading({
					// 	title: '正在获取验证码'
					// })
					this.showCodePopupStatus = true;

					return;
					// sendSMS({
					// 		"phone": this.formContent.phone
					// 	})
					// 	.then((res) => {
					// 		if (res.code === 100000) {
					// 			uni.hideLoading();
					// 			// 这里此提示会被this.start()方法中的提示覆盖
					// 			uni.$u.toast('验证码已发送');
					// 			// 通知验证码组件内部开始倒计时
					// 			this.formContent.smsCodecode = "";
					// 		}

					// 	})
					// 	.catch((err) => {
					// 		uni.hideLoading();
					// 		uni.showToast({
					// 			icon: "none",
					// 			title: err.msg || "获取验证码失败，请稍后再试",
					// 		});
					// 		this.iscode = true;
					// 	});

				} else {
					uni.$u.toast('倒计时结束后再发送');
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		min-height: 100vh;
		background: #F7F7F7;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0 32rpx;
		box-sizing: border-box;

		.buy {
			background: #FFFFFF;
			border-radius: 16rpx;
			border-radius: 16rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #414141;
			line-height: 40rpx;
			padding: 32rpx 24rpx;
			margin: 40rpx 0;

			.desc {
				font-size: 22rpx;
			}
		}

		.content {
			width: 686rpx;
			height: 204rpx;
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
				top: 44rpx;
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
			// width: 646rpx;
			width: 100%;
			height: 88rpx;


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

		.popupView {
			/deep/ .u-popup__content {
				border-radius: 20rpx;
				background: #fff;
				width: 90%;
				margin: 0 40rpx;
				padding: 40rpx;
				box-sizing: border-box;
			}

			.popupCon {
				.title {
					font-size: 40rpx;
					margin: 20rpx 0;
				}
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

	::-webkit-input-placeholder {
		/* WebKit browsers，webkit内核浏览器 */
		font-size: 24rpx !important;
	}

	/deep/ .input-placeholder {
		font-size: 24rpx !important;
	}
</style>
