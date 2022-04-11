<template>
	<view class="feedback">
		<view class="group">
			<view class="item">
				<view class="title">联系人</view>
				<view class="input"><input type="text" v-model="contact" placeholder="请输入您的姓名"
						placeholder-class="myholder" /></view>
			</view>
			<view class="item">
				<view class="title">联系电话</view>
				<view class="input"><input type="number" v-model="mobile" placeholder="请输入您的电话"
						placeholder-class="myholder" /></view>
			</view>
			<view class="item">
				<view class="title">联系邮箱</view>
				<view class="input"><input type="text" v-model="email" placeholder="请输入您的邮箱"
						placeholder-class="myholder" /></view>
			</view>
		</view>
		<view class="block"></view>
		<view class="group">
			<view class="textarea">
				<view class="title">反馈内容</view>
				<view class="content">
					<textarea v-model="content" maxlength="-1" placeholder="如果您对我们的商品、服务、APP有什么意见或建议， 请在这里告诉我们"
						placeholder-class="myholder" />
				</view>
			</view>
		</view>
		<view class="btn">
			<u-button type="primary" :plain="true" class="custom-style" @tap="clickSubmit" :hairline="true" text="下一步">
			</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				contact: '',
				mobile: '',
				email: '',
				content: ''
			};
		},
		methods: {
			submiting() {
				if (!this.contact) {
					this.showNoneIconToast('请输入您的姓名')
					return
				}
				if (!this.mobile) {
					this.showNoneIconToast('请输入您的电话')
					return
				}
				if (!this.content) {
					this.showNoneIconToast('请填写反馈内容')
					return
				}
				this.$request.POST('/add_feedback', {
						contacts: this.contact,
						contact_number: this.mobile,
						contact_email: this.email,
						feedback_content: this.content
					}, true,
					(res) => {
						this.showNoneIconToast('我们已经收到您的反馈，谢谢')
						setTimeout(() => {
							uni.navigateBack({
								delta: 2
							})
						}, 1000)
					},
					(err) => {
						this.showNoneIconToast(err.data || '反馈失败，请稍后再试')
					})
			},
			showNoneIconToast(title) {
				uni.showToast({
					icon: 'none',
					title: title
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		width: 100%;
		background-color: #f7f7f7;

		.feedback {
			width: 100%;
			height: 100%;
			position: fixed;
			background-color: #f7f7f7;

			.block {
				width: 100%;
				height: 20rpx;
			}

			.group {
				background-color: #FFFFFF;

				.myholder {
					color: #cccccc;
					font-size: $mc-normal-font-size;
				}

				.item {
					@extend %flex-layout-row;
					height: 100rpx;
					line-height: 100rpx;
					justify-content: space-between;
					margin-left: 45rpx;
					border-bottom: 1rpx solid #e6e6e6;

					.title {
						flex: 0 0 121rpx;
						font-size: $mc-normal-font-size;
						color: $mc-normal-font-color;
					}

					.input {
						flex: 1;
						text-align: left;
						margin-left: 72rpx;

						input {
							padding-right: 20rpx;
						}
					}
				}

				:last-of-type {
					border-bottom: none;
				}

				.textarea {
					.title {
						font-size: $mc-normal-font-size;
						color: $mc-normal-font-color;
						margin-left: 45rpx;
						padding: 33rpx 0 28rpx 0;
					}

					.content {
						padding: 0 46rpx 46rpx 46rpx;

						textarea {
							width: 100%;
						}
					}

				}
			}

			.submit {
				width: 640rpx;
				height: 88rpx;
				background: linear-gradient(-90deg, #FF7611, #FF9001);
				border-radius: 44rpx;
				position: fixed;
				bottom: 19rpx;
				z-index: 1;
				left: 55rpx;
				right: 55rpx;
				color: #FFFFFF;
				font-size: $mc-large-font-size;
			}
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
</style>
