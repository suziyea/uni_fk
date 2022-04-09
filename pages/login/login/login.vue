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
					<u--input v-model="formContent.phone" prefixIcon="phone" ref="item1"
						prefixIconStyle="font-size: 22px;color: #909399">
					</u--input>
				</u-form-item>

				<u-form-item label="" prop="smsCode" ref="item1">
					<!-- <u--input  v-model="phone" border suffixIcon="/static/icon/my_phone.png"></u--input> -->
					<!-- 注意：由于兼容性差异，如果需要使用前后插槽，nvue下需使用u--input，非nvue下需使用u-input -->
					<!-- #ifndef APP-NVUE -->
					<u-input v-model="formContent.smsCode" prefixIcon="lock"
						prefixIconStyle="font-size: 22px;color: #909399">>
						<!-- #endif -->
						<!-- #ifdef APP-NVUE -->
						<u--input v-model="formContent.smsCode" prefixIcon="lock"
							prefixIconStyle="font-size: 22px;color: #909399">>
							<!-- #endif -->
							<template slot="suffix">
								<u-code ref="uCode" @change="codeChange" seconds="20" changeText="秒重新获取"></u-code>
								<u-button @tap="getCode" :text="tips" type="success" size="mini"></u-button>
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
					<text class="read_tip">登录即表明您已经同意<text class="blue">{{` 《平台用户协议》 `}}</text>和<text
							class="blue">{{` 《隐私政策》 `}}</text></text>
				</view>
				<u-button class="custom-style" :plain="true" @tap="clickSubmit" :hairline="true">登录</u-button>

			</u--form>

		</view>

		<view class="iconbox u-flex u-flex-column u-flex-items-center u-flex-center">
			<image src="/static/img/login_guarantee.png" mode="aspectFill"></image>
			<text class="company">弁财，让您的每一次借款都有保障</text>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				formContent: {
					smsCode: '',
					phone: ''
				},
				tips: '获取验证码',
				rules: {
					smsCode: [{
							required: true,
							message: '请输入手机验证码',
							trigger: ['blur', 'change']
						},
						{
							// 自定义验证函数，见上说明
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								return uni.$u.test.code(value, 4)
							},
							message: '手机验证码不正确',
							// 触发器可以同时用blur和change
							trigger: ['change', 'blur'],
						}
					],
					phone: [{
							required: true,
							message: '请输入手机号',
							trigger: ['change', 'blur'],
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
							trigger: ['change', 'blur'],
						}
					]
				}
			}
		},
		methods: {
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					setTimeout(() => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						uni.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}, 2000);
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
			submit() {
				console.log('你好')
				this.$refs.uForm.validate().then(res => {
					uni.$u.toast('校验通过')
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.login_bg {
			width: 100%;
			height: 282px;
			background: url(../../../static/img/login_bg.png) no-repeat;
			background-size: cover;

			.header {
				width: 84px;
				height: 84px;
				background: #FFFFFF;
				border: 4px solid #C0D4FF;
				border-radius: 84px;

				image {
					width: 60px;
					height: 60px;
				}
			}

		}

		.formList {
			height: 279px;
			background: #FFFFFF;
			box-shadow: 2px 2px 12px 0px rgba(47, 92, 247, 0.27);
			border-radius: 8px;
			margin: -38px 16px 91px 16px;
			padding: 44px 10px 0 10px;
			box-sizing: border-box;



			.remarkForm {
				margin-top: 20px;

				.read_tip {
					width: 300px;
					height: 17px;
					font-size: 12px;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #414141;
					line-height: 17px;

					.blue {
						color: #4579E6;
					}
				}
			}

			/deep/ .u-button--success {
				border: none;
				font-size: 12px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #4579E6;
				line-height: 17px;
				background: none;
			}

			.custom-style {
				border-radius: 4px;
				font-size: 16px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				line-height: 22px;
				margin-top: 18px;
				background: #4579E6;
				color: #FFFFFF;
			}

		}

		.iconbox {
			image {
				width: 100px;
				height: 100px;
			}

			.company {
				font-size: 12px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #666565;
				line-height: 17px;
				margin: 16px 0 65px 0;
			}
		}
	}
</style>
