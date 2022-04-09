<template>
	<view class="container">
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
				<u-form-item label="姓名" prop="name" borderBottom ref="item1" style="margin-top: 12rpx;">
					<u--input inputAlign="right" v-model="formContent.name" border="none" suffixIcon="/static/icon/my_name.png"></u--input>
				</u-form-item>
				<u-form-item label="身份证号" prop="idCardNo" borderBottom ref="item1">
					<u--input inputAlign="right" v-model="formContent.idCardNo" border="none" suffixIcon="/static/icon/my_idcard.png"></u--input>
				</u-form-item>
				<u-form-item label="所属银行" prop="bankName" borderBottom ref="item1">
					<u--input inputAlign="right" v-model="formContent.bankName" border="none" suffixIcon="/static/icon/right.png"></u--input>
				</u-form-item>
				<u-form-item label="银行卡号" prop="bankNo" borderBottom ref="item1">
					<u--input inputAlign="right" v-model="formContent.bankNo" border="none" suffixIcon="/static/icon/my_bank.png"></u--input>
				</u-form-item>

				<u-form-item label="预留手机号" prop="phone" borderBottom ref="item1">
					<u--input inputAlign="right" v-model="formContent.phone" border="none" suffixIcon="/static/icon/my_phone.png"></u--input>
				</u-form-item>

			</u--form>


		</view>

		<view class="btn">
			<u-button type="primary" :plain="true" class="custom-style" @click="submit" :hairline="true" text="完成">
			</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formContent: {
					phone: ''
				},
				rules: {
					name: [{
							required: true,
							message: '请输入姓名',
							trigger: ['blur', 'change']
						},
						{
							// 自定义验证函数，见上说明
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								// uni.$u.test.mobile()就是返回true或者false的
								return uni.$u.test.chinese(value);
							},
							message: '只能输入汉子',
							// 触发器可以同时用blur和change
							trigger: ['change', 'blur'],
						}
					],
					idCardNo: [{
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
					],
					bankName: [{
						required: true,
						message: '请输入所属银行',
						trigger: ['blur', 'change']
					}],
					bankNo: [{
						required: true,
						message: '请输银行卡号',
						trigger: ['blur', 'change']
					}],
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
			submit() {
				this.$refs.uForm.validate().then(res => {
					uni.$u.toast('校验通过')
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
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
	}
</style>
