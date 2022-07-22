<template>
	<view>
		<view class="dialog">
			<view class="title">{{title}}
				<!-- <view class="close" @click.stop="close">
					<image src="/static/icon/close_icon.png" mode="aspectFill"></image>
				</view> -->
			</view>
			<view class="content">
				{{content}}
			</view>
			<view class="button_layout">
				<view v-if="showCancel" class="cancel" @click.stop="cancel">{{cancelText}}</view>
				<view class="confirm" @click.stop="confirm">{{confirmText}}</view>
			</view>
		</view>
		<view class="mask" @touchmove.stop.prevent="stopScroll"></view>
	</view>
</template>

<script>
	export default {
		name: 'common-dialog',
		props: {
			title: {
				type: String,
				default: ''
			},
			content: {
				type: String,
				default: ''
			},
			confirmText: {
				type: String,
				default: '确定'
			},
			cancelText: {
				type: String,
				default: '取消'
			},
			showCancel: {
				type: Boolean,
				default: false
			}
		},
		// data() {
		// 	return {
		// 		show: false
		// 	}
		// },
		created() {},
		mounted() {},
		methods: {
			close() {
				this.$emit('on-click-dialog', 'close')
			},
			confirm() {
				this.$emit('on-click-dialog', 'confirm')
			},
			cancel() {
				this.$emit('on-click-dialog', 'cancel')
			},
			stopScroll() {
				return false
			},
		}
	}
</script>

<style lang="scss" scoped>
	.dialog {
		position: fixed;
		z-index: 100000;
		top: 30%;
		left: 50%;
		margin-left: -40%;
		width: 80%;
		background-color: #FFFFFF;
		padding-bottom: 60upx;
		color: #333333;
		font-size: 28upx;
		border-radius: 20upx;

		.title {
			font-size: 32upx;
			color: #333333;
			padding: 46upx 0 37upx 0;
			width: 100%;
			text-align: center;
			font-weight: 600;
			position: relative;

			.close {
				position: absolute;
				right: 42upx;
				top: 47upx;
				width: 30upx;
				height: 31upx;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.content {
			width: 80%;
			margin: 0 auto;
			font-size: 28upx;
			text-align: center;
			color: #333333;
			padding-bottom: 30upx;
		}

		.content_bottom {
			width: 80%;
			margin: 0 auto;
			font-size: 28upx;
			color: #333333;
		}

		.cancel {
			width: 100%;
			height: 84upx;
			text-align: center;
			line-height: 84upx;
			// color: #FFFFFF;
			color: rgb(111, 111, 111);
			margin: 30upx 30upx 0 auto;
			// background-image: linear-gradient(-90deg, #ff7510 0%, #ff9000 100%);
			background: rgb(255, 255, 255);
			border-radius: 42upx;
			border: 1px solid rgb(179, 179, 179);
			// border-color: rgb(179, 179, 179);
		}

		.confirm {
			width: 100%;
			height: 84upx;
			text-align: center;
			line-height: 84upx;
			color: #FFFFFF;
			margin: 30upx auto 0 auto;
			// background-image: linear-gradient(-90deg, #ff7510 0%, #ff9000 100%);
			// background-image: linear-gradient(-90deg,#3E3EFF 0%, #8888FF 100%);
			background: rgb(23, 94, 255);
			border: 1px solid rgb(22, 103, 242);



			border-radius: 42upx;
		}

		.button_layout {
			display: flex;
			flex-direction: row;
			margin: 0 40upx;
		}
	}

	.mask {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 99999;
		background: rgba(0, 0, 0, 0.5);
	}
</style>
