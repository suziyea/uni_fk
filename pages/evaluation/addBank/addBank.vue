<template>
	<view class="container" v-if="showFlag">
		<view class="bgBox">
			<view class="realImg">
				<image src="/static/img/real.png" mode="aspectFill"></image>
			</view>
			<view class="titleBox">
				<text class="title">添加收款银行卡</text>
				<text class="desc">您的信息将被严格保密，请放心添加</text>
			</view>
		</view>

		<view class="formList">
			<u--form :model="formContent" :rules="rules" ref="uForm" labelWidth="auto">
				<u-form-item label="姓名" prop="actual_name" borderBottom ref="item1" style="margin-top: 12rpx;">
					<u--input inputAlign="right" v-model="formContent.actual_name" border="none"
						suffixIcon="/static/icon/my_name.png"></u--input>
				</u-form-item>
				<u-form-item label="身份证号" prop="id_number" borderBottom ref="item2">
					<u--input inputAlign="right" v-model="formContent.id_number" border="none"
						suffixIcon="/static/icon/my_idcard.png"></u--input>
				</u-form-item>
				<u-form-item label="所属银行" @click="showBankListStatus = true;" prop="bank_name" borderBottom ref="item3">
					<u--input readonly inputAlign="right" v-model="formContent.bank_name" border="none"
						suffixIcon="/static/icon/right.png"></u--input>
				</u-form-item>
				<u-form-item label="银行卡号" prop="card_number" borderBottom ref="item4">
					<u--input inputAlign="right" v-model="formContent.card_number" border="none"
						suffixIcon="/static/icon/my_bank.png"></u--input>
				</u-form-item>

				<u-form-item label="预留手机号" prop="reserve_phone" borderBottom ref="item5">
					<u--input inputAlign="right" v-model="formContent.reserve_phone" border="none"
						suffixIcon="/static/icon/my_phone.png"></u--input>
				</u-form-item>

				<u-form-item label="验证码" prop="code" ref="item6">
					<!-- <u--input  v-model="phone" border suffixIcon="/static/icon/my_phone.png"></u--input> -->
					<!-- 注意：由于兼容性差异，如果需要使用前后插槽，nvue下需使用u--input，非nvue下需使用u-input -->
					<!-- #ifndef APP-NVUE -->
					<u-input v-model="formContent.code" inputAlign="right" type="number" border="none">
						<!-- #endif -->
						<!-- #ifdef APP-NVUE -->
						<u--input v-model="formContent.code" inputAlign="right" border="none" type="number">
							<!-- #endif -->
							<template slot="suffix">
								<u-code ref="uCode" @change="codeChange" seconds="60" changeText="X秒重新获取"></u-code>
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
		<u-action-sheet :closeOnClickOverlay="true"  :closeOnClickAction="true" :show="showBankListStatus" :actions="bankList" title="请选择银行" @close="showBankListStatus = false"  @select="bankSelect">
		</u-action-sheet>

		<view class="btn">
			<u-button type="primary" :plain="true" class="custom-style" @click="clickSubmit" :hairline="true" text="完成">
			</u-button>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {
		getBank,
		addBankInfo
	} from "@/config/api/product.js";
	import common from '@/utils/validator.js'

	export default {
		data() {
			return {
				showFlag: false,
				showBankListStatus: false,
				tips: '获取验证码',
				seconds: 60,
				formContent: {
					code: 1234,
				},
				bankList: [],
				rules: {
					actual_name: [{
							required: true,
							message: '请输入姓名',
							trigger: ['blur']
						},
						{
							// 自定义验证函数，见上说明
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								// uni.$u.test.mobile()就是返回true或者false的
								return uni.$u.test.chinese(value);
							},
							message: '只能输入汉字',
							// 触发器可以同时用blur和change
							trigger: ['blur'],
						}
					],
					id_number: [{
							required: true,
							message: '请输入身份证号',
							trigger: ['blur'],
						},
						{
							// 自定义验证函数，见上说明
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								// uni.$u.test.mobile()就是返回true或者false的
								return uni.$u.test.idCard(value);
							},
							message: '身份证号码不正确',
							// 触发器可以同时用blur和change
							trigger: ['blur'],
						}
					],
					bank_name: [{
						required: true,
						message: '请输入所属银行',
						trigger: ['blur']
					}],
					card_number: [{
						required: true,
						message: '请输银行卡号',
						trigger: ['blur']
					}, {
						// 自定义验证函数，见上说明
						validator: (rule, value, callback) => {
							// 上面有说，返回true表示校验通过，返回false表示不通过
							// uni.$u.test.mobile()就是返回true或者false的
							return common.isBankCardNo(value);
						},
						message: '请输银行卡号码不正确',
						// 触发器可以同时用blur和change
						trigger: ['blur'],
					}],
					reserve_phone: [{
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
					],
					smsCode: [{
							required: false,
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
							trigger: ['change', 'blur'],
						}
					]
				}

			}
		},
		created() {
			const storage = uni.getStorageSync('userInfo');
			if (storage) {
				this.formContent.actual_name = storage?.actual_name;
				this.formContent.id_number = storage?.idNumber;
				this.formContent.reserve_phone = storage?.phone;
			}
			this.getBankList()
		},
		methods: {
			closeSheet() {
				console.log('你好')
				this.showBankListStatus = false
			},
			bankSelect(e) {
				this.formContent.bank_id = e.id;
				this.formContent.bank_name = e.name
				this.$refs.uForm.validateField('formContent.bank_id')
			},
			getBankList() {
				getBank({}).then((res) => {
					if (res.code === 100000) {
						this.bankList = res?.data || [];
						this.showFlag = true
					}
				}).catch((err) => {
					console.log(err, 'err');
				}).finally((data) => {
					console.log(data)
					this.showFlag = true;
				})
			},
			clickSubmit() {
				uni.$u.debounce(this.submit, 500)
			},
			submit() {
				this.$refs.uForm.validate().then(res => {
					addBankInfo({
						...this.formContent
					}).then((res) => {
						if (res.code === 100000) {
							this.$store.dispatch('setCurrentUserInfo')
							let params = {
								type: 'success',
								message: "绑卡成功，请到下一步",
								url: '/pages/product/evaluationResults/evaluationResults'
							}
							this.$refs.uToast.show({
								...params,
								complete() {
									params.url && uni.navigateTo({
										url: params.url
									})
								}
							})

						}

					}).catch((err) => {
						console.log(err, 'err');
					})

				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
			codeChange(text) {
				this.tips = text;
				console.log('change', text);

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
			clickSubmit() {
				uni.$u.debounce(this.submit, 500)
			},


		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		height: 100vh;
		background: #F6F6F6;

		.bgBox {
			width: 100%;
			height: 440rpx;
			background: url(../../../static/img/real_bg.png) no-repeat;
			background-size: cover;
			position: relative;

			.realImg {
				width: 200rpx;
				height: 200rpx;
				position: absolute;
				top: 166rpx;
				right: 32rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.titleBox {
				width: 460rpx;
				height: 200rpx;
				position: absolute;
				top: 208rpx;
				left: 56rpx;
				display: flex;
				flex-direction: column;

				.title {
					font-size: 42rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					line-height: 58rpx;
					margin-bottom: 8rpx;
				}

				.desc {
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					line-height: 34rpx;
				}
			}

		}

		.formList {
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
			box-sizing: border-box;
			padding: 0 56rpx;
			background: #FFFFFF;
		}

		.btn {
			padding: 0 52rpx;
			margin-top: 80rpx;

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

		/deep/ .u-button--success {
			border: none;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #4579E6;
			line-height: 34rpx;
			background: none;
		}
	}
</style>
