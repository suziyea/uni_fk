<template>
	<view class="container_home">
		<view class="topBox">

		</view>

		<view class="quotaBox u-flex u-row-center">
			<view class="circleimg">
				<image src="/static/img/circle.png" mode="aspectFill" @click="setModalText"></image>
				<view class="countStyle u-flex u-flex-column u-row-centeru-flex-items-center ">
					<text class="title">最高可借额度(元)</text>
					<u-count-to :endVal="loan_amount" separator="," class="count"></u-count-to>
				</view>
			</view>

			<view class="tiplist">
				<u-row justify="space-between">
					<u-col span="4" justify="center" v-for="(item,index) in productDelsNav" :key="index">
						<view class="demo-layout bg-purple icontip">
							<view class="productBox">
								<image src="/static/icon/zan.png" mode="aspectFill" @click="setModalText"></image>
								<view class="tiptext">{{item.tips}}</view>
							</view>
							<view class="title">{{item.name}}</view>
						</view>
					</u-col>
				</u-row>
			</view>

			<view class="btnBox">
				<view class="btn" @click="borrowMoney">我要借钱</view>
			</view>

		</view>

		<!-- 消息轮播 -->
		<view class="tipsBox" @click="setModalText">
			<u-notice-bar :text="messageArr" icon="volume" direction="column" speed="250" url=""></u-notice-bar>
		</view>

		<!-- list  -->
		<view class="listBox">
			<u-row justify="space-between">
				<u-col span="4" justify="center" v-for="(item,index) in memberNav" :key="index">
					<view class="demo-layout bg-purple iconList" @click="setModalText">
						<image :src="item.icon" mode="aspectFill"></image>
						<view class="title">{{item.name}}</view>
					</view>
				</u-col>
			</u-row>
		</view>

		<!-- 我要测评 -->
		<view class="assessBox" @click="borrowMoney">
			<view class="title">我要测评</view>
			<view class="assessimg">
				<image src="/static/img/evaluation.png" mode="aspectFill"></image>
			</view>
		</view>

		<!-- 弹窗 -->
		<view>
			<u-modal :show="showModal" :title="title" :confirmText="confirmText" @confirm="confirm"
				:showCancelButton="true" @cancel=" showModal = false" :content='content'></u-modal>
		</view>

	</view>
</template>

<script>
	import store from "@/store"
	import {
		getEdu
	} from "@/config/api/user.js";
	import {
		mapGetters,
	} from 'vuex'
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
		data() {
			return {
				title: 'Hello',
				messageArr: ['评估如实反映您的信用情况，最终结果以第三方审核为准', '评估如实反映您的信用情况，最终结果以第三方审核为准', '评估如实反映您的信用情况，最终结果以第三方审核为准'],
				showModal: false,
				title: '实名认证',
				content: '您好，请先完成实名认证信息补全!',
				confirmText: '去绑卡',
				loan_amount: '',
				memberNav: [{
					icon: '/static/icon/money.png',
					path: '',
					name: '随时可还'
				}, {
					icon: '/static/icon/apply.png',
					path: '',
					name: '极简申请'
				}, {
					icon: '/static/icon/organ.png',
					path: '',
					name: '合法机构'
				}],
				productDelsNav: [{
					icon: '/static/icon/zan.png',
					tips: '利息最低',
					name: '0.02%'
				}, {
					icon: '/static/icon/zan.png',
					tips: '分期灵活',
					name: '12-36期'
				}, {
					icon: '/static/icon/zan.png',
					tips: '极速放款',
					name: '10分钟'
				}],
			}
		},
		onLoad(option) {
			console.log(option);

		},
		created() {
			this.getEdus()
			this.setModalText()
		},
		methods: {
			getEdus() {
				getEdu({
					"code": "loan_amount"
				}).then((res) => {
					if (res.code === 100000) {
						this.loan_amount = res?.data?.value?.value || '****'
					}
				}).catch((err) => {
					console.log(err, 'err');
				})
			},
			borrowMoney() {
				this.setModalText()
			},
			setModalText() {
				const storeToken = uni.getStorageSync('token');
				const storeUserInfo = uni.getStorageSync('userInfo');
				if (!(storeToken) && !storeUserInfo) {
					this.showModal = true;
					this.title = '登录';
					this.content = '您好，请先完成登录！';
					this.confirmText = '去登录'
				}

				if (this.userStatus === 1) {
					this.showModal = true;
					this.title = '实名认证';
					this.content = '您好，请先完成实名认证信息补全!';
					this.confirmText = '去实名'
				}

				if (this.userStatus === 2) {
					this.showModal = true;
					this.title = '绑定银行卡';
					this.content = '您好，为了方便的贷款，请绑定银行卡！';
					this.confirmText = '去绑卡'
				}

				if (this.userStatus === 3) {
					this.showModal = true;
					this.title = '评估';
					this.content = '您好，为了方便的贷款，请完成评估！';
					this.confirmText = '去评估'
				}

				if (this.userStatus === 4) {
					this.showModal = true;
					this.title = '评估结果';
					this.content = '您好，为了方便的贷款，请完成二次评估！';
					this.confirmText = '去评估'
				}
			},
			confirm() {
				this.showModal = false;
				if (!store.state.user.token) {
					uni.$u.route('/pages/login/login');
					return;
				}
				if (this.userStatus === 1) {
					uni.$u.route('/pages/evaluation/real/real');
				}
				if (this.userStatus === 2) {
					uni.$u.route('/pages/evaluation/addBank/addBank');
				}
				if (this.userStatus === 3) {
					uni.$u.route('/pages/product/evaluationFirtPay/evaluationFirtPay');
				}
				if (this.userStatus === 4) {
					uni.$u.route('/pages/product/reflect/reflect');
				}
			},
			clickEvaluation() {
				this.setModalText()
			}
		},
	}
</script>

<style lang="scss" scoped>
	.container_home {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 0 32rpx;
		background: #F7F7F7;
	}

	.topBox {
		width: calc(100% + 62rpx);
		height: 440rpx;
		overflow: hidden;
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
