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
			<u--form :model="formContent" :rules="rules" ref="uForm" labelWidth="auto" :errorType="errorType">
				<u-form-item label="姓名" prop="actual_name" borderBottom ref="item1" style="margin-top: 12rpx;">
					<u--input inputAlign="right" v-model="formContent.actual_name" border="none" placeholder="请输入姓名"
						placeholderClass="placeholderClass" suffixIcon="/static/icon/my_name.png"></u--input>
				</u-form-item>
				<u-form-item label="身份证号" prop="id_number" borderBottom ref="item2">
					<u--input inputAlign="right" v-model="formContent.id_number" border="none" placeholder="请输入身份证号"
						placeholderClass="placeholderClass" suffixIcon="/static/icon/my_idcard.png"></u--input>
				</u-form-item>
				<u-form-item label="所属银行" @click="showBankListStatus = true;" prop="bank_name" borderBottom ref="item3">
					<u--input readonly inputAlign="right" v-model="formContent.bank_name" border="none"
						placeholder="请选择银行卡所属银行" placeholderClass="placeholderClass"
						suffixIcon="/static/icon/right.png"></u--input>
				</u-form-item>
				<u-form-item label="银行卡号" prop="card_number" borderBottom ref="item4">
					<u--input inputAlign="right" v-model="formContent.card_number" border="none" placeholder="请输入银行卡号"
						placeholderClass="placeholderClass" suffixIcon="/static/icon/my_bank.png"></u--input>
				</u-form-item>

				<u-form-item label="预留手机号" prop="reserve_phone" borderBottom ref="item5">
					<u--input inputAlign="right" v-model="formContent.reserve_phone" border="none" placeholder="请输入手机号"
						placeholderClass="placeholderClass" suffixIcon="/static/icon/my_phone.png"></u--input>
				</u-form-item>

				<u-form-item label="验证码">
					<!-- <u--input  v-model="phone" border suffixIcon="/static/icon/my_phone.png"></u--input> -->
					<!-- 注意：由于兼容性差异，如果需要使用前后插槽，nvue下需使用u--input，非nvue下需使用u-input -->
					<!-- #ifndef APP-NVUE -->
					<u-input v-model="formContent.code" inputAlign="right" type="number" maxlength='6' border="none"
						placeholder="请输入验证码" placeholderClass="placeholderClass">
						<!-- #endif -->
						<!-- #ifdef APP-NVUE -->
						<u--input v-model="formContent.code" inputAlign="right" type="number" maxlength='6'
							border="none" placeholder="请输入验证码" placeholderClass="placeholderClass" type="number">
							<!-- #endif -->
							<template slot="suffix">
								<u-code ref="uCode" @change="codeChange" seconds="60" changeText="X秒重新获取"></u-code>
								<u-button @tap="getCode" :text="tips"
									:class="!handleSmsCodeStatus ? 'disable_pointer' : '' " type="success" size="mini">
								</u-button>
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
		<u-action-sheet :closeOnClickOverlay="true" :closeOnClickAction="true" :show="showBankListStatus"
			:actions="bankList" title="请选择银行" @close="showBankListStatus = false" @select="bankSelect">
		</u-action-sheet>

		<view class="btn">
			<u-button type="primary" :plain="true" class="custom-style" :disabled='!(formContent)' @click="clickSubmit"
				:hairline="true" text="完成">
			</u-button>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {
		getBank,
		addBankInfo,
		addBankInfoSms
	} from "@/config/api/product.js";
	import store from "@/store"
	import {
		mapGetters,
	} from 'vuex'
	import common from '@/utils/validator.js'

	export default {
		data() {
			return {
				errorType: 'toast',
				showFlag: false,
				showBankListStatus: false,
				tips: '获取验证码',
				seconds: 60,
				formContent: {
					actual_name: '',
					id_number: '',
					bank_name: '',
					bank_id: '',
					reserve_phone: '',
					code: '',
				},
				bind_card_id: '',
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
					code: [{
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
				},
				handleSmsCodeStatus: false,

			}
		},
		computed: {
			formSubmit() {
				if (this.handleSmsCodeStatus && this.formContent.code) {
					return true
				}
				return false;
			}
		},
		created() {
			const storage = uni.getStorageSync('userInfo');
			if (storage) {
				this.formContent.actual_name = storage?.actual_name || '';
				this.formContent.id_number = storage?.id_number || '';
				this.formContent.bank_id = storage?.bank_card?.bank_id || ''
				this.formContent.bank_name = storage?.bank_card?.bank_name || ''
				this.formContent.card_number = storage?.bank_card?.card_number || ''
				this.formContent.reserve_phone = storage?.bank_card?.reserve_phone || ''
			}
			this.getBankList()

		},
		methods: {
			closeSheet() {
				this.showBankListStatus = false
			},
			bankSelect(e) {
				this.formContent.bank_id = e.id;
				this.formContent.bank_name = e.name
				this.$refs.uForm.validateField('formContent.bank_name')
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
					this.showFlag = true;
				})
			},
			clickSubmit() {
				uni.$u.debounce(this.submit, 500)
			},
			submit() {
				this.$refs.uForm.validate().then(res => {
					addBankInfo({
						bind_card_id: this.bind_card_id,
						code: this.formContent.code
					}).then(async (res) => {
						if (res.code === 100000) {
							store.commit('PAY_ERROR', false);

							await this.$store.dispatch('setCurrentUserInfo')
							let params = {
								message: "绑卡成功，请到下一步",
								url: '/pages/product/evaluationFirtPay/evaluationFirtPay'
							}
							if (this.getUserInfos.status === 4) {
								params.url = '/pages/product/reflect/reflect'
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
					uni.$u.toast(errors[0].message)
				})
			},
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				this.$refs.uForm.validate().then(res => {
					if (this.$refs.uCode.canGetCode) {
						// 模拟向后端请求验证码
						uni.showLoading({
							title: '正在获取验证码'
						})
						addBankInfoSms(this.formContent)
							.then((res) => {
								if (res.code === 100000) {
									uni.hideLoading();
									// 这里此提示会被this.start()方法中的提示覆盖
									uni.$u.toast('验证码已发送');
									// 通知验证码组件内部开始倒计时
									this.$refs.uCode.start();
									this.bind_card_id = res.data?.bind_card_id || ''
								}

							})
							.catch((err) => {
								this.formContent.code = ''
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

				}).catch(errors => {
					uni.$u.toast(errors[0].message)
				})

			},
			clickSubmit() {
				uni.$u.debounce(this.submit, 500)
			},


		},
		computed: {
			...mapGetters(['getUserInfos']),
		},
		watch: {
			formContent: {
				handler() {
					if (this.formContent.actual_name && this.formContent.id_number && this.formContent.bank_name && this
						.formContent.card_number && this.formContent.reserve_phone) {
						if (uni.$u.test.chinese(this.formContent.actual_name) && uni.$u.test.idCard(this.formContent
								.id_number) && common.isBankCardNo(this.formContent.card_number) && uni.$u.test.mobile(this
								.formContent.reserve_phone)) {
							this.handleSmsCodeStatus = true
							return;
						}
						this.handleSmsCodeStatus = false
					} else {
						this.handleSmsCodeStatus = false
					}

				},
				deep: true //true 深度监听
			}
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

			/deep/ .u-form-item__body {
				padding: 20rpx 56rpx;
				background: #FFFFFF;
			}

			/deep/ .u-form-item:nth-child(2n) {
				margin-bottom: 24rpx;
				border-bottom: none !important;
			}
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

		/deep/ .u-action-sheet {
			height: 520rpx;
			overflow: auto;
		}
	}
</style>
