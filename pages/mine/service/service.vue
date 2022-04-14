<template>
	<view class="container">
		<view class="service">
			<view class="logo">
				<image src="/static/icon/logo.png" mode="aspectFill"></image>
			</view>
			<view class="cells">
				<u-cell-group>
					<u-cell title="客服电话" icon="/static/icon/tel_icon.png" isLink url="/pages/componentsB/tag/tag">
					</u-cell>
					<u-cell title="改善建议/投诉反馈" icon="/static/icon/callback_icon.png" isLink
						url="/pages/mine/feedback/feedback"></u-cell>
				</u-cell-group>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {};
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

			/deep/ .u-cell-group__wrapper {
				background: #FFFFFF;

			}

			/deep/ .u-cell__body {
				padding: 28rpx 30rpx;
			}
		}
	}
</style>
