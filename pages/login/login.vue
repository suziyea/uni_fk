<template>
	<view class="container">
		<view class="login_bg  u-flex u-flex-items-center u-flex-center">
			<view class="header u-flex u-flex-items-center u-flex-center">
				<image src="/static/img/login_head.png" mode="aspectFill"></image>
			</view>
		</view>

		<view class="formList">
			<u--form :model="formContent" :rules="rules" ref="uForm">
				<u-form-item label="" prop="phone">
					<u--input v-model="formContent.phone" prefixIcon="phone" type="number" ref="item1"
						placeholder="请输入手机号" placeholderClass="placeholderClass" prefixIconStyle="font-size: 44rpx;color: #909399">
					</u--input>
				</u-form-item>

				<u-form-item label="" prop="smsCode" ref="item2">
					<!-- <u--input  v-model="phone" border suffixIcon="/static/icon/my_phone.png"></u--input> -->
					<!-- 注意：由于兼容性差异，如果需要使用前后插槽，nvue下需使用u--input，非nvue下需使用u-input -->
					<!-- #ifndef APP-NVUE -->
					<u-input v-model="formContent.smsCode" type="number" maxlength='4' prefixIcon="lock"
						placeholder="请输入验证码" placeholderClass="placeholderClass" prefixIconStyle="font-size: 44rpx;color: #909399">>
						<!-- #endif -->
						<!-- #ifdef APP-NVUE -->
						<u--input v-model="formContent.smsCode" type="number" maxlength='4' prefixIcon="lock"
							placeholder="请输入验证码" placeholderClass="placeholderClass" prefixIconStyle="font-size: 44rpx;color: #909399">>
							<!-- #endif -->
							<template slot="suffix">
								<u-code ref="uCode" @change="codeChange" seconds="60" changeText="X秒重新获取"></u-code>
								<u-button @tap="getCode" :text="tips" :class="!success_verify ? 'disable_pointer' : '' "
									type="success" size="mini"></u-button>
							</template>
							<!-- #ifndef APP-NVUE -->
					</u-input>
					<!-- #endif -->
					<!-- #ifdef APP-NVUE -->
					</u--input>
					<!-- #endif -->
				</u-form-item>
				<!-- <view class="btn"> -->

				<!-- </view> -->
				<view class="remarkForm">
					<text class="read_tip">登录即表明您已经同意<text class="blue"
							@click="jumpContent('platform')">{{` 《平台用户协议》 `}}</text>和<text class="blue"
							@click="jumpContent('hide')">{{` 《隐私政策》 `}}</text></text>
				</view>
				<u-button class="custom-style" :class="!success_verify || !sms_code_status ? 'disableColor' : '' "
					:plain="true" @tap="clickSubmit" :hairline="true">登录</u-button>

			</u--form>

		</view>

		<view class="iconbox u-flex u-flex-column u-flex-items-center u-flex-center">
			<image src="/static/img/login_guarantee.png" mode="aspectFill"></image>
			<text class="company">普银花花，让您的每一次借款都有保障</text>
		</view>

	</view>
</template>

<script>
	import {
		login,
		sendSMS
	} from "@/config/api/user.js";
	import {
		mapMutations
	} from "vuex";
	export default {
		data() {
			return {
				seconds: 60,
				formContent: {
					smsCode: '',
					phone: ''
				},
				tips: '获取验证码',
				rules: {
					smsCode: [{
							required: true,
							message: '请输入手机验证码',
							trigger: ['blur']
						},
						{
							// 自定义验证函数，见上说明
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								return uni.$u.test.code(value, 4)
							},
							message: '手机验证码不正确',
							// 触发器可以同时用blur和change
							trigger: ['blur'],
						}
					],
					phone: [{
							required: true,
							message: '请输入手机号',
							trigger: ['blur'],
						},
						{
							// 自定义验证函数，见上说明
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								// uni.$u.test.mobile()就是返回true或者false的
								return uni.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							// 触发器可以同时用blur和change
							trigger: ['blur'],
						}
					]
				}
			}
		},
		computed: {
			success_verify() {
				return uni.$u.test.mobile(this.formContent.phone);
			},
			sms_code_status() {
				return uni.$u.test.code(this.formContent.smsCode, 4);
			}
		},
		methods: {
			...mapMutations(['SETDEVICE', 'LOGIN', 'SET_TOKEN']),
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					// setTimeout(() => {
					// 	uni.hideLoading();
					// 	// 这里此提示会被this.start()方法中的提示覆盖
					// 	uni.$u.toast('验证码已发送');
					// 	// 通知验证码组件内部开始倒计时
					// 	this.$refs.uCode.start();
					// }, 2000);
					sendSMS({
							"phone": this.formContent.phone
						})
						.then((res) => {
							if (res.code === 100000) {
								uni.hideLoading();
								// 这里此提示会被this.start()方法中的提示覆盖
								uni.$u.toast('验证码已发送');
								// 通知验证码组件内部开始倒计时
								this.$refs.uCode.start();
								this.formContent.smsCodecode = "";
							}

						})
						.catch((err) => {
							uni.hideLoading();
							uni.showToast({
								icon: "none",
								title: err.msg || "获取验证码失败，请稍后再试",
							});
							this.iscode = true;
						});
				} else {
					uni.$u.toast('倒计时结束后再发送');
				}
			},
			change(e) {
				console.log('change', e);
			},
			clickSubmit() {
				uni.$u.debounce(this.submit, 500)
			},
			end() {
				uni.$u.toast('倒计时结束');
			},
			start() {
				uni.$u.toast('倒计时开始');
			},
			submit() {
				this.$refs.uForm.validate().then(res => {
					let {
						phone,
						smsCode
					} = this.formContent
					// uni.$u.toast('校验通过')
					uni.showLoading({
						title: "加载中",
					});
					let loginHeaderObj = {
						osType: uni.$u.os(),
						deviceId: uni.$u.sys().deviceId,

					}
					this.SETDEVICE(loginHeaderObj)
					login({
							phone: phone,
							code: smsCode,
						}, {
							header: {
								'device-type': uni.$u.os() || '',
								'device-token': uni.$u.sys().deviceId || ''
							}
						})
						.then((res) => {
							uni.hideLoading();
							if (res.code === 100000) {
								let handleBaseInfo = {
									token: res.data.access_token,
									userInfo: res.data
								}
								this.LOGIN(handleBaseInfo)
								this.SET_TOKEN({
									token: res.data.access_token,
									refresh_token: res.data.refresh_token
								})
								uni.switchTab({
									url: '/pages/index/index'
								})
							}
						})
						.catch((err) => {
							uni.hideLoading();
							uni.showToast({
								icon: "none",
								title: err.msg || "登录失败，请稍后重试",
							});
						});

				}).catch(errors => {
					uni.$u.toast('校验失败')
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
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		min-height: 100vh;

		.login_bg {
			width: 100%;
			height: calc(2 * 282rpx);
			background: url(/static/img/login_bg.png) no-repeat;
			background-size: cover;

			.header {
				width: calc(2 * 84rpx);
				height: calc(2 * 84rpx);
				background: #FFFFFF;
				border: calc(2 * 4rpx) solid #C0D4FF;
				border-radius: calc(2 * 84rpx);

				image {
					width: calc(2 * 60rpx);
					height: calc(2 * 60rpx);
				}
			}

		}

		.formList {
			height: calc(2 * 279rpx);
			background: #FFFFFF;
			box-shadow: 4rpx 4rpx 24rpx 0rpx rgba(47, 92, 247, 0.27);
			border-radius: 16rpx;
			margin: -120rpx 32rpx 58rpx 32rpx;
			padding: 88rpx 20rpx 0 20rpx;
			box-sizing: border-box;

			.remarkForm {
				margin-top: 40rpx;

				.read_tip {
					width: 600rpx;
					height: 34rpx;
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

			/deep/ .u-button--success {
				border: none;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #4579E6;
				line-height: 34rpx;
				background: none;
			}

			.custom-style {
				border-radius: 8rpx;
				font-size: 32rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				line-height: 44rpx;
				margin-top: 36rpx;
				background: #4579E6;
				color: #FFFFFF;
			}
			
			

		}

		.iconbox {
			image {
				width: 200rpx;
				height: 200rpx;
			}

			.company {
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #666565;
				line-height: 34rpx;
			}
		}
	}

	.disableColor {
		background: #f5f5f5 !important;
		pointer-events: none;
	}
</style>
