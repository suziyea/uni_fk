<template>
	<view class="container">
		<view class="service">
			<view class="logo">
				<image src="/static/icons/logo.png" mode="aspectFill"></image>
			</view>
			<view class="group">
				<view class="item" @click="telPhone">
					<view class="icon">
						<image src="/static/icons/tel_icon.png" mode="aspectFill"></image>
					</view>
					<view class="title">客服电话</view>
					<view class="tel">
						<u--text mode="phone" :text="servecPhone"></u--text>
					</view>
				</view>
				<!-- <view class="item">
					<view class="icon">
						<image src="/static/icons/service-icon.png" mode="aspectFill"></image>
					</view>
					<view class="title">在线客服</view>
					<view class="tel">9:00-20:00</view>
				</view> -->
				<navigator class="item" url="/pages/mine/feedback/feedback" open-type="navigate">
					<view class="icon">
						<image src="/static/icons/callback_icon.png" mode="aspectFill"></image>
					</view>
					<view class="title">改善建议/投诉反馈</view>
					<view class="arrow">
						<image src="/static/icons/icon15.png" mode="aspectFill"></image>
					</view>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				servecPhone: '17701140105'
			};
		},
		onLoad(option) {
			
		},
		methods: {
			telPhone() {
				uni.makePhoneCall({
					phoneNumber: this.servecPhone
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		height: 100%;
		position: fixed;
		background-color: #f7f7f7;

		.service {
			padding-top: 60upx;

			.logo {
				width: 182upx;
				height: 182upx;
				margin: 0 auto 57upx auto;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.group {
				background-color: #FFFFFF;

				.item {
					@extend %flex-layout-row;
					justify-content: space-between;
					margin-left: 40upx;
					padding: 28upx 0;
					font-size: 28upx;
					border-bottom: 1upx solid #eeeeee;

					&:last-child {
						border-bottom: none;
					}

					.icon {
						flex: 0 0 44upx;
						width: 44upx;
						height: 44upx;

						image {
							width: 100%;
							height: 100%;
						}
					}

					.title {
						flex: 1;
						text-align: left;
						margin-left: 13upx;
						color: #333333;
					}

					.tel {
						color: #808080;
						margin-right: 40upx;
						font-weight: 400;
					}

					.arrow {
						width: 14upx;
						height: 25upx;
						line-height: 25upx;
						margin-right: 40upx;

						image {
							width: 100%;
							height: 100%;
						}
					}
				}

			}
		}
	}
</style>
