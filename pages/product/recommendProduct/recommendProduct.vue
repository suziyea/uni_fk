<template>
	<view class="container">
		<view class="swiperBox">
			<u-swiper :list="list3" previousMargin="30" nextMargin="30"  circular :autoplay="true" radius="5"
				bgColor="#ffffff"></u-swiper>
		</view>

		<view class="products">
			<view class="titlebox">
				<text class="title">产品</text>
				<view class="icon">
					<text class="right_title">更多</text>
					<image src="/static/icon/right.png" mode="aspectFill"></image>
				</view>
			</view>

			<view class="productList">
				<view class="product-item">
					<view class="left">
						<text class="top_title">汇聚白卡</text>
						<text class="mid_title">0.3~2.0万</text>
						<text class="bottom_title">额度（元）</text>
					</view>
					<view class="center">
						<text class="top_title">汇聚白卡</text>
						<text class="mid_title">0.3~2.0万</text>
						<!-- <text class="bottom_title">额度（元）</text> -->
						<view class="tags">
							<!-- <u-tag text="标签" plain size="mini" type="warning"></u-tag>
							<u-tag text="标签" plain size="mini" type="warning"></u-tag> -->
							<view class="tagItem">拒就赔</view>
							<view class="tagItem">拒就赔</view>
						</view>
					</view>
					<view class="right">
						<u-button type="primary" :plain="true" class="custom-style" :hairline="true" text="一键申请">
						</u-button>
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
				list3: [
					'https://cdn.uviewui.com/uview/swiper/swiper3.png',
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
				],
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
		background: #F7F7F7;
		padding: 0 16px;
		box-sizing: border-box;

		.swiperBox {
			width: 344px;
			height: 86px;
			.swiperPage {
				width: 100%;
				height: 100%;
			}
		}

		.products {
			box-sizing: border-box;
			margin-top: 29px;

			.titlebox {
				display: flex;
				justify-content: center;
				align-items: center;

				.title {
					font-size: 18px;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #333333;
					line-height: 25px;
				}

				.icon {
					display: flex;
					margin-left: auto;

					.right_title {
						font-size: 12px;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #666666;
						line-height: 17px;
					}

					image {
						width: 16px;
						height: 16px;
					}
				}
			}

			.productList {
				.product-item {
					box-sizing: border-box;
					width: 100%;
					height: 88px;
					background: #FFFFFF;
					box-shadow: 0px 5px 6px 0px rgba(0, 0, 0, 0.04);
					border-radius: 4px;
					display: flex;
					justify-content: center;
					align-items: center;
					margin-top: 12px;
					.left {
						display: flex;
						flex-direction: column;
						justify-content: center;
						// align-items: center;
						height: 100%;
						margin: 0 16px;

						.top_title {
							font-size: 12px;
							font-family: PingFangSC-Semibold, PingFang SC;
							font-weight: 600;
							color: #282626;
							line-height: 17px;
						}

						.mid_title {
							font-size: 18px;
							font-family: DINAlternate-Bold, DINAlternate;
							font-weight: bold;
							color: #F0384A;
							line-height: 21px;
							padding: 6px 0;
						}

						.bottom_title {
							font-size: 12px;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #666666;
							line-height: 17px;
						}
					}

					.center {
						height: 100%;
						display: flex;
						flex-direction: column;
						justify-content: center;
						margin-top: 5px;

						.top_title {
							font-size: 10px;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #FF9C4A;
							line-height: 14px;
						}

						.mid_title {
							font-size: 12px;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #282626;
							padding: 6px 0;
							line-height: 17px;
						}
						
						.tags {
							display: flex;
							flex-direction: row;
							justify-content: center;
							align-items: center;

							.tagItem {
								display: flex;
								justify-content: center;
								align-items: center;
								width: 44px;
								height: 19px;
								background: #FFE6CF;
								border-radius: 4px;
								border: 1px solid #FFC794;
								font-size: 12px;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #FFA34F;
								margin-right: 12px;
							}
						}
					}

					.right {
						// height: 100%;
						margin-left: auto;
						margin-right: 16px;

						.custom-style {
							width: 76px;
							height: 25px;
							background: #FF9C4A;
							border-radius: 15px;
							font-size: 12px;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #FFFFFF;
							line-height: 17px;
						}
					}
				}
			}
		}

	}
	/deep/ .u-swiper {
		height: 86px !important;
	}
</style>
