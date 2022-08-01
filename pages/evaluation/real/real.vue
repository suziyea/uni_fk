<template>
	<view class="container">
		<view class="bgBox">
			<view class="realImg">
				<image src="/static/img/real.png" mode="aspectFill"></image>
			</view>
			<view class="titleBox">
				<text class="title">实名认证</text>
				<text class="desc">为配合国家监管要求，请完成实名认证。</text>
			</view>
		</view>

		<view class="formList">
			<u--form :model="formContent" :rules="rules" ref="uForm" :errorType="errorType">
				<u-form-item label="" prop="name">
					<text class="form__title">真实姓名</text>

					<u-input v-model="formContent.name" placeholder="请如实填写您的姓名" border="bottom"
						placeholderStyle='font-size: 28rpx;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;color: #CBCBCB;line-height: 40rpx;'
						clearable />
				</u-form-item>
				<u-form-item label="" prop="idcard">
					<text class="form__title">身份证号</text>
					<u--input v-model="formContent.idcard" type="idcard" placeholder="请输入身份证号" border="bottom"
						placeholderStyle='font-size: 28rpx;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;color: #CBCBCB;line-height: 40rpx;'
						clearable>
					</u--input>
				</u-form-item>
			</u--form>
		</view>
		<view class="btn">
			<u-button type="primary" :plain="true" class="custom-style" @tap="clickSubmit" :hairline="true" text="下一步">
			</u-button>
		</view>
	</view>
</template>

<script>
	import {
		HandleRealName
	} from "@/config/api/user.js";
	export default {
		data() {
			return {
				errorType: 'toast',
				formContent: {
					phone: ''
				},
				rules: {
					name: [{
							required: true,
							message: '请输入姓名',
							// trigger: ['blur', 'change']
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
							// trigger: ['change', 'blur'],
						}
					],
					idcard: [{
							required: true,
							message: '请输入身份证号',
							trigger: ['change', 'blur'],
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
							trigger: ['change', 'blur'],
						}
					]
				}
			}
		},
		computed: {
			realname_verify() {
				return uni.$u.test.chinese(this.formContent.name);
			},
			idcard_verify() {
				return uni.$u.test.idCard(this.formContent.idcard);
			}
		},
		methods: {
			clickSubmit() {
				uni.$u.debounce(this.submit, 500)
			},
			submit() {
				this.$refs.uForm.validate().then(res => {
					let {
						name,
						idcard
					} = this.formContent

					HandleRealName({
						"actual_name": name,
						"id_number": idcard
					}).then(async (res) => {
						if (res.code === 100000) {
							uni.removeStorageSync('userInfo');
							await this.$store.dispatch('setCurrentUserInfo')
							uni.$u.route('/pages/evaluation/addBank/addBank');
						}

					}).catch((err) => {
						console.log(err, 'err');
					})

				}).catch(errors => {
					uni.$u.toast(errors[0].message)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		height: 100vh;
		background-color: #f7f7f7;

		.bgBox {
			width: 100%;
			height: 440rpx;
			background: url(../../../static/img/real_bg.png) no-repeat;
			background-size: cover;
			position: relative;
			margin-bottom: 88rpx;

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
			padding: 0 56rpx;

			.formItem {
				margin-bottom: 52rpx;

				.realName {
					font-size: 36rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #414141;
					line-height: 50rpx;
				}
			}

			.form__title {
				height: 50rpx;
				font-size: 36rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #414141;
				margin-bottom: 24rpx;
				line-height: 50rpx;
			}
		}

		.btn {
			padding: 0 52rpx;
			margin-top: 160rpx;

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

		/deep/ .u-form-item__body__right__content__slot {
			flex-direction: column;
			align-items: flex-start;
		}

		/deep/ .u-input {
			width: 100%;
			box-sizing: border-box;
		}
	}

	.disableColor {
		background: #f5f5f5 !important;
		pointer-events: none;
		border: 1px solid #ccc;
		color: #000 !important;
	}
</style>
