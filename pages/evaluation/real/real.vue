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
				<u--input placeholder="请输入真实姓名" border="bottom" placeholderStyle='font-size: 14px;
font-family: PingFangSC-Regular, PingFang SC;
font-weight: 400;
color: #CBCBCB;
line-height: 20px;' clearable></u--input>
			</view>

			<view class="formItem">
				<text class="realName">身份证号</text>
				<u--input placeholder="请输入身份证号" border="bottom" placeholderStyle='font-size: 14px;
font-family: PingFangSC-Regular, PingFang SC;
font-weight: 400;
color: #CBCBCB;
line-height: 20px;' clearable></u--input>
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
			height: 220px;
			background: url(../../../static/img/real_bg.png) no-repeat;
			background-size: cover;
			position: relative;
			margin-bottom: 44px;

			.realImg {
				width: 100px;
				height: 100px;
				position: absolute;
				top: 83px;
				right: 16px;

				image {
					width: 100%;
					height: 100%;
				}
			}
			.titleBox {
				width: 230px;
				height: 100px;
				position: absolute;
				top: 104px;
				left: 28px;
				display: flex;
				flex-direction: column;
				.title {
					font-size: 21px;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					line-height: 29px;
					margin-bottom: 4px;
				}
				.desc {
					font-size: 12px;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					line-height: 17px;
				}
			}

		}

		.formList {
			padding: 0 28px;

			.formItem {
				margin-bottom: 26px;

				.realName {
					font-size: 18px;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #414141;
					line-height: 25px;
				}
			}
		}
		.btn {
			padding: 0 26px;
			margin-top: 82px;
			.custom-style {
					background: #4579E6;
					border-radius: 4px;
					font-size: 16px;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					line-height: 22px;
				}
		}
	}
</style>
