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
			<view class="formItem">
				<text class="realName">真实姓名</text>
				<u--input placeholder="请输入真实姓名" border="bottom" placeholderStyle='font-size: 28rpx;
font-family: PingFangSC-Regular, PingFang SC;
font-weight: 400;
color: #CBCBCB;
line-height: 40rpx;' clearable></u--input>
			</view>

			<view class="formItem">
				<text class="realName">身份证号</text>
				<u--input placeholder="请输入身份证号" border="bottom" placeholderStyle='font-size: 28rpx;
font-family: PingFangSC-Regular, PingFang SC;
font-weight: 400;
color: #CBCBCB;
line-height: 40rpx;' clearable></u--input>
			</view>
		</view>
		<view class="btn">
			<u-button type="primary" :plain="true" class="custom-style" :hairline="true" text="下一步"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

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
		}

		.btn {
			padding: 0 52rpx;
			margin-top: 164rpx;

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
