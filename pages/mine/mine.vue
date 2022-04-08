<template>
	<view class="container">
		<view class="bgBox">
			<view class="userInfo">
				<view class="avatar">
					<image src="/static/icon/head.png" mode="aspectFill"></image>
				</view>
				<view class="userName" v-if="isLogin">
					17701140105
				</view>
				<view class="userName" v-else>
					登录
				</view>
				
				<!-- <view class="right" v-if="isLogin">
					<view class="nickname">
						<view>{{realName}}</view>
						<view class="star" v-if="isMember">
							<image src="/static/icons/star.png" mode="aspectFill"></image>
						</view>
						<view class="star" v-else>
							<image src="/static/icons/star2.png" mode="aspectFill"></image>
						</view>
					</view>
					<view class="account">账号：{{account}}</view>
				</view>
				<navigator v-else class="login" open-type="navigate" url="/pages/login/login">登录</navigator> -->
			</view>
		</view>
		
		
		<view class="memberLegal">
			<view class="memberEnjoy">
				<u-row justify="space-between">
					<u-col span="4" justify="center" v-for="(item,index) in memberNav">
						<view class="demo-layout bg-purple iconList">
							<image :src="item.icon" mode="aspectFill" @click="clickNav(item)"></image>
							<view class="title">{{item.name}}</view>
						</view>
					</u-col>
				</u-row>
			</view>
		</view>
		
		<view class="listView">
			<u-cell-group>
				<u-cell v-for="(item,index) in cellList"
				    :title="item.name"
					size="large"
				    isLink
				    :icon="item.icon"
				></u-cell>
			</u-cell-group>
		</view>
		
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				isLogin: true,
				memberNav: [{
						icon: '/static/icon/memberLegal.png',
						path: '',
						name: '会员权益'
					}, {
						icon: '/static/icon/myLegal.png',
						path: '',
						name: '我的权益'
					}, {
						icon: '/static/icon/kefu.png',
						path: '',
						name: '客服中心'
					}
				],
				// cellList 
				cellList: [{
						icon: '/static/icon/look_agreement.png',
						path: '',
						name: '查看协议'
					}, {
						icon: '/static/icon/about_us.png',
						path: '',
						name: '关于我们'
					}, {
						icon: '/static/icon/logoff.png',
						path: '',
						name: '注销账户'
					},
					{
						icon: '/static/icon/logout.png',
						path: '',
						name: '退出登录'
					}
				]
			};
		},
		methods: {
			orderPage(item) {
				uni.navigateTo({
					url: item.path
				})
			},
			logout() {
				this.$store.commit('logout')
				getApp().globalData.refreshIndexList = true
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			clickNav(item) {
				
			},
		},
		onLoad() {
			uni.showLoading({

			})
		},
		onReady() {
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle('light');
			// #endif
		},
		onShow() {
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle('light');
			// #endif
			uni.hideLoading()
		},
		computed: {
			...mapState(['realName', 'account', 'isMember']),
			...mapGetters(['isLogin'])
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		height: 100vh;
		background-color: #f7f7f7;
	}
	.bgBox {
		width: 100%;
		height: 200px;
		background: url(../../static/img/my_bg.png) no-repeat;
		background-size: cover;
		position: relative;
		.userInfo {
			position: absolute;
			top: 82px;
			left: 30px;
			display: flex;
			justify-content: center;
			align-items: center;
			.avatar {
				width: 50px;
				height: 50px;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.userName {
				font-size: 14px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				line-height: 20px;
				margin: 0 13px;
			}
		}
		
	}
	
	.memberLegal {
		padding: 0 16px;
		.memberEnjoy {
			width: 343px;
			height: 84px;
			background: #FFFFFF;
			box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.07);
			border-radius: 4px;
			margin-top: -47px;
			position: relative;
			z-index: 21;
			display: flex;
			.iconList {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				image {
					width: 36px;
					height: 36px;
				}
				.title {
					font-size: 12px;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #656565;
					line-height: 17px;
				}
			}
		}
		.listView {
		}
		
	}

	.top {
		width: 100%;
		height: 200px;
		background: url(../../static/img/my_bg.png) no-repeat;
		background-size: cover;

		.user {
			position: absolute;
			@extend %flex-layout-row;
			justify-content: flex-start;
			top: 119upx;
			left: 50upx;

			.avatar {
				flex: 0 0 96upx;
				width: 96upx;
				height: 96upx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.right {
				flex: 1;
				margin-left: 24upx;

				.nickname {
					font-size: 32upx;
					color: #FFFFFF;
					@extend %flex-layout-row;
					justify-content: flex-start;
					align-items: baseline;

					.star {
						width: 23upx;
						height: 21upx;
						margin-left: 8upx;

						image {
							width: 100%;
							height: 100%;
						}
					}
				}

				.account {
					font-size: 24upx;
					color: #FFFFFF;
				}
			}

			.login {
				font-size: 32upx;
				color: #FFFFFF;
				margin-left: 24upx;
			}
		}
	}

	.order {
		width: 699upx;
		height: 250upx;
		background-color: #FFFFFF;
		margin: -160upx auto 0 auto;
		border-radius: 14upx;

		.title {
			height: 30upx;
			font-size: 30upx;
			color: #FFFFFF;
		}

		.nav {
			@extend %flex-layout-row;
			justify-content: space-between;

			.items {
				width: 32%;
				text-align: center;

				.icon {
					width: 112upx;
					height: 112upx;
					margin: 0 auto;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.name {
					padding-top: 5upx;
					font-size: 26upx;
					color: $mc-normal-font-color;
				}
			}
		}
	}

	.list {
		background-color: #FFFFFF;
		border-radius: 14upx;
		margin: 32upx 26upx 0 26upx;

		.item {
			@extend %flex-layout-row;
			justify-content: space-between;
			padding: 29upx 26upx;
			align-items: center;

			.item_icon {
				flex: 0 0 54upx;
				width: 54upx;
				height: 54upx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.title {
				flex: 1;
				margin-left: 19upx;
				font-size: $mc-normal-font-size;
				color: $mc-normal-font-color;
			}

			.arrow {
				flex: 0 0 54upx;
				width: 54upx;
				height: 54upx;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	::v-deep .u-row {
		width: 100%;
	}
	/deep/ .u-cell-group {
		margin: 0 16px;
		background: #FFFFFF;
		margin-top: 12px !important;
	}
</style>
