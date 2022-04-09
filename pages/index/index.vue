<template>
	<view class="content">
		<view class="topBox">

		</view>

		<view class="quotaBox u-flex u-row-center">
			<view class="circleimg">
				<image src="/static/img/circle.png" mode="aspectFill" @click="clickEvaluation"></image>
				<!-- <u--image :showLoading="true" class="imageE" src="/static/img/evaluation.png" width="343px" height="112px" @click="clickEvaluation"></u--image> -->
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
			<u-notice-bar :text="messageArr" icon="volume" direction="column"  speed="250" url=""></u-notice-bar>
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
	</view>
</template>

<script>
	import {
		HandleRealName
	} from "@/config/api/user.js";
	export default {
		data() {
			return {
				title: 'Hello',
				messageArr: ['凯文罗', '小罗', '二流子']
			}
		},
		onLoad() {

		},
		methods: {
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
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 0 16px;
		background: #F7F7F7;
	}

	.topBox {
		/* width: 375px; */
		width: calc(100% + 32px);
		height: 220px;
		background: linear-gradient(180deg, #1B5BE2 0%, rgba(81, 135, 249, 0.51) 63%, rgba(62, 121, 250, 0) 100%);
	}

	.quotaBox {
		width: 343px;
		height: 303px;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		// justify-content: center;
		background: #FFFFFF;
		box-shadow: 2px 2px 12px 0px rgba(47, 92, 247, 0.27);
		border-radius: 8px;
		margin-top: -156px;

		.circleimg {

			margin-top: 32px;
			margin-bottom: 17px;

			image {
				// width: 100%;
				// height: 100%;
				width: 248px;
				height: 129px;
			}
		}

		.tiplist {
			padding: 0 30px;
			width: 100%;
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
						width: 12px;
						height: 12px;
						margin-left: 4px;
					}

					.tiptext {
						font-size: 12px;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #666565;
						line-height: 17px;
					}
				}

				.title {
					font-size: 10px;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #666565;
					line-height: 14px;
				}


			}

		}

		.btnBox {
			margin: 25px 0;
			padding: 0 10px;

			.btn {
				width: 323px;
				height: 44px;
				display: flex;
				align-items: center;
				justify-content: center;
				background: #4579E6;
				border-radius: 4px;
				font-size: 18px;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 25px;
			}
		}
	}

	.tipsBox {
		width: 343px;
		height: 32px;
		background: #FFFFFF;
		border-radius: 4px;
		margin: 12px 0;
	}

	.listBox {
		width: 342px;
		height: 96px;
		background: #FFFFFF;
		border-radius: 4px;
		margin-bottom: 18px;

		display: flex;
		align-items: center;

		// justify-content: center;
		.iconList {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;


			.title {
				font-size: 14px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #282626;
				line-height: 20px;
			}

			image {
				width: 36px;
				height: 36px;
			}
		}
	}

	.assessBox {
		height: 100%;
		margin-bottom: 13px;

		.title {
			width: 64px;
			height: 22px;
			font-size: 16px;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #000000;
			line-height: 22px;
			margin-bottom: 13px !important;
		}

		.assessimg {
			width: 343px;
			height: 112px;
			margin-bottom: 43px !important;

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
