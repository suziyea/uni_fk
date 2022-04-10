<template>
	<view class="content">
		<view class="topBox">

		</view>

		<view class="quotaBox u-flex u-row-center">
			<view class="circleimg">
				<image src="/static/img/circle.png" mode="aspectFill" @click="clickEvaluation"></image>
				<!-- <u--image :showLoading="true" class="imageE" src="/static/img/evaluation.png" width="343px" height="112px" @click="clickEvaluation"></u--image> -->
				<!-- <u-count-to :endVal="1542" separator="," class="countStyle"></u-count-to> -->
				<view class="countStyle u-flex u-flex-column u-row-centeru-flex-items-center ">
					<text class="title">最高可借额度(元)</text>
					<u-count-to :endVal="loan_amount" separator="," class="count"></u-count-to>
				</view>
			</view>

			<view class="tiplist">
				<u-row justify="space-between">
					<u-col span="4" justify="center">
						<view class="demo-layout bg-purple icontip">
							<view class="productBox">
								<image src="/static/icon/zan.png" mode="aspectFill" @click="clickEvaluation"></image>
								<view class="tiptext">利息最低</view>
							</view>
							<view class="title">0.02%</view>
						</view>
					</u-col>
					<u-col span="4" justify="center">
						<view class="demo-layout bg-purple-light icontip">
							<view class="productBox">
								<image src="/static/icon/zan.png" mode="aspectFill" @click="clickEvaluation"></image>
								<view class="tiptext">分期灵活</view>
							</view>
							<view class="title">12-36期</view>
						</view>
					</u-col>
					<u-col span="4" justify="center">
						<view class="demo-layout bg-purple icontip">
							<view class="productBox">
								<image src="/static/icon/zan.png" mode="aspectFill" @click="clickEvaluation"></image>
								<view class="tiptext">极速放款</view>
							</view>
							<view class="title">10分钟</view>
						</view>
					</u-col>
				</u-row>



			</view>

			<view class="btnBox">
				<view class="btn">我要借钱</view>

			</view>

		</view>

		<!-- 消息轮播 -->
		<view class="tipsBox">
			<u-notice-bar :text="messageArr" icon="volume" direction="column" speed="250" url=""></u-notice-bar>
		</view>

		<!-- list  -->
		<view class="listBox">
			<u-row justify="space-between">
				<u-col span="4" justify="center">
					<view class="demo-layout bg-purple iconList">
						<image src="/static/icon/money.png" mode="aspectFill" @click="clickEvaluation"></image>
						<view class="title">随时可还</view>
					</view>
				</u-col>
				<u-col span="4" justify="center">
					<view class="demo-layout bg-purple-light iconList">
						<image src="/static/icon/apply.png" mode="aspectFill" @click="clickEvaluation"></image>
						<view class="title">极简申请</view>
					</view>
				</u-col>
				<u-col span="4" justify="center">
					<view class="demo-layout bg-purple iconList">
						<image src="/static/icon/organ.png" mode="aspectFill" @click="clickEvaluation"></image>
						<view class="title">合法机构</view>
					</view>
				</u-col>
			</u-row>



		</view>

		<!-- 我要测评 -->
		<view class="assessBox">
			<view class="title">我要测评</view>
			<view class="assessimg">
				<image src="/static/img/evaluation.png" mode="aspectFill" @click="clickEvaluation"></image>
				<!-- <u--image :showLoading="true" class="imageE" src="/static/img/evaluation.png" width="343px" height="112px" @click="clickEvaluation"></u--image> -->
			</view>
		</view>

		<!-- 弹窗 -->
		<view>
			<u-modal :show="showModal" :title="title" :confirmText="confirmText" @confirm="confirm"
				:showCancelButton="true" @cancel=" showModal = false" :content='content'></u-modal>
			<!-- <u-button @click="show = true">打开</u-button> -->
		</view>

	</view>
</template>

<script>
	import {
		HandleRealName,getEdu
	} from "@/config/api/user.js";
	export default {
		props: {
			// 检测类型 + 其他验证
			userStatus: {
				type: Number,
				default: 0,
				required: true,
				validator: function(value) {
					return value >= 0
				}
			}
		},
		// props: ['userStatus'],
		data() {
			return {
				title: 'Hello',
				messageArr: ['凯文罗', '小罗', '二流子'],
				showModal: false,
				title: '实名认证',
				content: '您好，请先完成实名认证信息补全!',
				content: '您好，为了方便的贷款，请绑定银行卡！',
				confirmText: '去绑卡',
				loan_amount: '',
			}
		},
		onLoad(option) {
			console.log('option', option);

		},
		created() {
			this.setModalText()
			this.getEdus()
		},
		
		methods: {
			getEdus() {
				getEdu({
					"code":"loan_amount"
				}).then((res) => {
					if (res.code === 100000) {
							this.loan_amount = res?.data?.value?.value || '****'
							}
					console.log(res,'nihao')
				}).catch((err) => {
					console.log(err, 'err');
				})
			},
			setModalText() {
				if (this.userStatus === 2) {
					this.showModal = true;
					this.title = '实名认证';
					this.content = '您好，请先完成实名认证信息补全!';
					this.confirmText = '去实名'
				}

				if (this.userStatus === 3) {
					this.showModal = true;
					this.title = '绑定银行卡';
					this.content = '您好，为了方便的贷款，请绑定银行卡！';
					this.confirmText = '去绑卡'
				}
			},
			confirm() {
				this.showModal = false;
				if (this.userStatus === 2) {
					uni.$u.route('/pages/evaluation/real/real');
				}
				if (this.userStatus === 3) {
					uni.$u.route('/pages/evaluation/addBank/addBank');
				}
			},
			handleReal() {
				HandleRealName({
					"actual_name": "侯先生",
					"id_number": "123456789123456789"
				}).then((res) => {
					console.log(res)
				}).catch((err) => {
					console.log(err, 'err');
				})
			},
			clickHandler() {
				console.log('点击了')
			},
			clickEvaluation() {
				console.log('---')
			}
		},
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 0 32rpx;
		background: #F7F7F7;
	}

	.topBox {
		width: calc(100% + 64rpx);
		height: 440rpx;
		background: linear-gradient(180deg, #1B5BE2 0%, rgba(81, 135, 249, 0.51) 63%, rgba(62, 121, 250, 0) 100%);
	}

	.quotaBox {
		width: 686rpx;
		height: 606rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		background: #FFFFFF;
		box-shadow: 4rpx 4rpx 24rpx 0rpx rgba(47, 92, 247, 0.27);
		border-radius: 16rpx;
		margin-top: -312rpx;

		.circleimg {
			margin-top: 64rpx;
			margin-bottom: 34rpx;
			align-self: center;
			position: relative;

			image {
				width: 496rpx;
				height: 258rpx;
			}

			.countStyle {
				position: absolute;
				top: 138rpx;
				left: 120rpx;
				width: 256rpx;
				padding: 0 14rpx;
				box-sizing: border-box;
				align-items: center;
				.title {
					height: 34rpx;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #666565;
					line-height: 34rpx;
				}

				.count {
					height: 82rpx;
					font-size: 74rpx;
					font-family: Arial-BoldMT, Arial;
					font-weight: normal;
					color: #020F2B;
					line-height: 84rpx;
				}

			}
		}

		.tiplist {
			padding: 0 60rpx;
			height: 100%;

			.icontip {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				.productBox {
					display: flex;
					align-items: center;
					justify-content: center;

					image {
						width: 24rpx;
						height: 24rpx;
					}

					.tiptext {
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #666565;
						line-height: 34rpx;
						margin-left: 8rpx;
					}
				}

				.title {
					font-size: 20rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #666565;
					line-height: 28rpx;
				}
			}

		}

		.btnBox {
			margin: 50rpx 0;
			padding: 0 20rpx;

			.btn {
				width: 646rpx;
				height: 88rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				background: #4579E6;
				border-radius: 8rpx;
				font-size: 36rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 50rpx;
			}
		}
	}

	.tipsBox {
		width: 686rpx;
		height: 64rpx;
		background: #FFFFFF;
		border-radius: 8rpx;
		margin: 24rpx 0;
	}

	.listBox {
		width: 684rpx;
		height: 192rpx;
		background: #FFFFFF;
		border-radius: 8rpx;
		margin-bottom: 36rpx;
		display: flex;
		align-items: center;

		.iconList {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.title {
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #282626;
				line-height: 40rpx;
			}

			image {
				width: 72rpx;
				height: 72rpx;
			}
		}
	}

	.assessBox {
		height: 100%;
		margin-bottom: 26rpx;

		.title {
			width: 128rpx;
			height: 44rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #000000;
			line-height: 44rpx;
			margin-bottom: 26rpx !important;
		}

		.assessimg {
			width: 686rpx;
			height: 224rpx;
			margin-bottom: 86rpx !important;

			image {
				width: 100%;
				height: 100%;
			}
		}

	}

	::v-deep .u-row {
		width: 100%;
	}
</style>
