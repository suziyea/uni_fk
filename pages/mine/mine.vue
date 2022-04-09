<template>
	<view class="container">
		<view class="bgBox">
			<view class="userInfo">
				<view class="avatar">
					<image src="/static/icon/head.png" mode="aspectFill"></image>
				</view>
				<!-- {{getUserInfos}}-- -->
				<view class="userName u-flex u-flex-column" v-if="isLogin">
					<!-- 17701140105 -->
					<text class="name">{{`HI，${getUserInfos.actual_name || ''}`}}</text>
					<text class="phone">{{getUserInfos.phone}}</text>
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
					<u-col span="4" justify="center" v-for="(item,index) in memberNav" :key="index">
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
				<u-cell v-for="(item,index) in cellList" :key="index" :title="item.name" size="large"
					:name="item.enName" isLink :icon="item.icon" @click="handleListItem"></u-cell>
			</u-cell-group>
		</view>

	</view>
</template>

<script>
	import {
		mapState,
		mapGetters,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
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
				}],
				cellList: [{
						icon: '/static/icon/look_agreement.png',
						path: '',
						name: '查看协议',
						enName: 'look'
					}, {
						icon: '/static/icon/about_us.png',
						path: '',
						name: '关于我们',
						enName: 'about'
					}, {
						icon: '/static/icon/logoff.png',
						path: '',
						name: '注销账户',
						enName: 'logoff'
					},
					{
						icon: '/static/icon/logout.png',
						path: '',
						name: '退出登录',
						enName: 'logout'
					}
				]
			};
		},
		methods: {
			...mapMutations(['LOGOUT']),
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
			handleListItem(item) {
				console.log(item, 'niyade');
				if (item.name === 'logout') {
					this.LOGOUT()
					uni.$u.route('/pages/login/login/login');
				}
			}
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
			...mapGetters(['isLogin', 'getUserInfos'])
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
		height: 400rpx;
		background: url(../../static/img/my_bg.png) no-repeat;
		background-size: cover;
		position: relative;

		.userInfo {
			position: absolute;
			top: 164rpx;
			left: 60rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			.avatar {
				width: 100rpx;
				height: 100rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.userName {
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				line-height: 40rpx;
				margin: 0 26rpx;

				.name {
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					line-height: 40rpx;
				}

				.phone {

					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					line-height: 34rpx;
				}
			}
		}

	}

	.memberLegal {
		padding: 0 32rpx;

		.memberEnjoy {
			width: 686rpx;
			height: 168rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 2rpx 8rpx 0rpx rgba(0, 0, 0, 0.07);
			border-radius: 8rpx;
			margin-top: -94rpx;
			position: relative;
			z-index: 21;
			display: flex;

			.iconList {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				image {
					width: 72rpx;
					height: 72rpx;
				}

				.title {
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #656565;
					line-height: 34rpx;
				}
			}
		}

		.listView {}

	}

	::v-deep .u-row {
		width: 100%;
	}

	/deep/ .u-cell-group {
		margin: 0 16rpx;
		background: #FFFFFF;
		margin-top: 12rpx !important;
	}
</style>
