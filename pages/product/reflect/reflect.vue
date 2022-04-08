<template>
	<view class="container">
		<view class="content">
			<view class="bg">
				<image src="/static/img/reflect_bg.png" mode="aspectFill"></image>
			</view>
			<!-- 消息轮播 -->
			<view class="tipsBox">
				<u-notice-bar :text="messageArr" icon="volume" direction="column" speed="250" url=""></u-notice-bar>
			</view>
			<view class="list">
				<u-row customStyle="margin-bottom: 10px">
					<u-col span="6">
						<view class="demo-layout title">预计服务费</view>
					</u-col>
					<u-col span="6">
						<view class="demo-layout right_title">299元</view>
					</u-col>
				</u-row>
				
				<u-row customStyle="margin-bottom: 10px">
					<u-col span="6">
						<view class="demo-layout title">提现到您的</view>
					</u-col>
					<u-col span="6">
						<view class="demo-layout right_title">银行尾号 <text class="num">{{` 1277`}}</text></view>
					</u-col>
				</u-row>
				
			</view>
		</view>
		
		<view class="btn">
			<u-button type="primary" :plain="true" class="custom-style" :hairline="true" text="立即体现">
			</u-button>
		</view>
<view class="read">
			<u-radio-group v-model="selectRadio">
				<u-radio shape="square"></u-radio>
				<text class="read_tip">我已经同意 <text class="blue">{{` 《注册协议》 `}}</text>和<text class="blue">{{` 《隐私协议》 `}}</text></text>
			</u-radio-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				messageArr: ['凯文罗', '小罗', '二流子'],
				selectRadio:false
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 375px;
		height: 100vh;
		background: #F7F7F7;
		display: flex;
		flex-direction: column;
		align-items: center;

		.content {
			width: 343px;
			height: 392px;
			// padding: 0 16px;
			background: #FFFFFF;
			border-radius: 8px;
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
			box-sizing: border-box;
			position: relative;

			.bg {
				width: 165px;
				height: 165px;
				position: absolute;
				top: 64px;
				left: 89px;

				image {
					width: 100%;
					height: 100%
				}
			}

			.tipsBox {
				position: absolute;
				width: 240px;
				top: 262px;
				left: 60px;
				height: 17px;
			}
			.list {
				position: absolute;
				width: 312px;
				top: 312px;
				padding: 0 16px;
				font-size: 14px;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #414141;
				line-height: 20px;
				
				.right_title {
					text-align: right;
					.num {
						color: red;
					}
				}
			}
		}
		.btn {
			padding: 0 26px;
			margin-top: 28px;
			width: 323px;
			height: 44px;
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
		.read {
			margin-top: 24px;
			.read_tip {
				
				font-size: 12px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #414141;
				line-height: 17px;
				.blue {
					color: #4579E6 ;
				}
			}
		}

		/deep/ .u-notice-bar {

			background: #FFFFFF !important;
			padding: 0 !important;

			.u-notice__swiper__item__text {
				font-size: 12px !important;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400 !important;
				line-height: 17px;
				color: #414141 !important;
			}
		}
	}
</style>
