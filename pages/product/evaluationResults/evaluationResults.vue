<template>
	<view class="container">
		<view class="loan u-flex u-flex-column">
			<text class="title">预计放款额度</text>
			<text class="money">50000</text>
			<text class="desc u-line-1">*此额度根据您的日常行为记录评估额度</text>
			<text class="desc u-line-1">最终可下款额度以资金方最终审核情况为准</text>
		</view>

		<view class="advert">
			<view class="top u-flex u-flex-items-center">
				<image src="/static/icon/result_zan.png" mode="aspectFill"></image>
				<text class="title">四大优势</text>
			</view>

			<view class="advList u-flex u-flex-wrap u-flex-row u-flex-between">
				<view class="list u-flex u-flex-wrap" v-for="(item, k) in productsNav" :key="k">
					<view class="img">
						<image :src="item.icon" mode="aspectFill"></image>
					</view>
					<view class="content u-flex u-flex-column u-flex-wrap">
						<text class="title">{{ item.title }}</text>
						<text class="desc1">{{ item.desc }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				productsNav: [{
						icon: "/static/icon/shenhe.png",
						title: "快速审核",
						desc: "持牌机构专属审核通道，提高下款效率。",
					},
					{
						icon: "/static/icon/edu.png",
						title: "专享额度",
						desc: "VIP专享，信用良好可获得更高授信额度。",
					},
					{
						icon: "/static/icon/quanyi.png",
						title: "尊享权益",
						desc: "汇集餐饮、娱乐、出行等众多专享权益。",
					},
					{
						icon: "/static/icon/result_kefu.png",
						title: "VIP客服",
						desc: "24小时专属客服，为用户提供贴心服务。",
					},
				],
			};
		},
		onLoad() {},
		methods: {},
	};
</script>

<style lang="scss" scoped>
	.container {
		width: 375px;
		height: 812px;
		background: #ffffff;

		.loan {
			margin-top: 8px;
			padding: 0px 32px 0 32px;

			.title {
				font-size: 16px;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #414141;
				line-height: 22px;
			}

			.money {
				font-size: 37px;
				font-family: Arial-BoldMT, Arial;
				font-weight: normal;
				color: #020f2b;
				line-height: 42px;
			}

			.desc {
				font-size: 10px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #414141;
				line-height: 14px;
			}
		}

		.advert {
			width: 343px;
			height: 171px;
			background: linear-gradient(180deg, #9ebeff 0%, #ffffff 100%);
			box-shadow: 2px 5px 6px 0px rgba(0, 0, 0, 0.04);
			border-radius: 4px;
			margin: 12px 16px;

			.top {
				padding: 9px 12px 0 12px;

				.title {
					font-size: 14px;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: #333333;
					line-height: 20px;
					margin-left: 8px;
				}

				image {
					width: 16px;
					height: 16px;
				}
			}
		}

		.advList {
			position: relative;
			padding: 12px 12px;

			.list {
				margin-bottom: 12px;

				image {
					width: 28px;
					height: 28px;
				}

				.content {
					margin-left: 8px;

					.title {
						width: 48px;
						height: 17px;
						font-size: 12px;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #282626;
						line-height: 17px;
					}

					.desc1 {
						width: 115px;
						height: 22px;
						font-size: 8px;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #282626;
						line-height: 11px;
					}
				}
			}
		}
	}
</style>
