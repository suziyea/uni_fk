<template>
	<view class="container">
		<view class="bgBox">
			<view class="userInfo">
				<view class="avatar">
					<!-- <image src="/static/icon/head.png" mode="aspectFill"></image> -->
					<image :src="'/static/icon/'+headStr+'.png'" mode="aspectFill"></image>
				</view>
				<view class="userName u-flex u-flex-column" v-if="isLogin">
					<text class="name">{{`HI，${getUserInfos.actual_name || ''}`}}</text>
					<text class="phone">{{getUserInfos.phone}}</text>
				</view>
				<view class="userName" v-else>
					<navigator open-type="navigate" url="/pages/login/login">
						登录
					</navigator>
				</view>
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
				<view v-for="(item,index) in cellList" :key="index">
					<u-cell v-if="isLogin" :title="item.name" size="large" :name="item.enName" isLink :icon="item.icon"
						@click="handleListItem"></u-cell>
					<u-cell v-else-if="!isLogin && !item.power" :title="item.name" size="large" :name="item.enName"
						isLink :icon="item.icon" @click="handleListItem"></u-cell>
				</view>

			</u-cell-group>
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
		mapGetters,
		mapMutations
	} from 'vuex'
	import common from '@/utils/common'
	import store from "@/store"

	import {
		getQy,
		getUserInfo
	} from "@/config/api/user.js";

	export default {
		data() {
			return {
				memberNav: [{
					icon: '/static/icon/memberLegal.png',
					path: '/pages/mine/privilege/privilege',
					name: '我的权益',
					page: 'current'
				}, {
					icon: '/static/icon/myLegal.png',
					path: '/pages/mine/order/order',
					name: '我的订单',
					page: ''
				}, {
					icon: '/static/icon/kefu.png',
					path: '/pages/mine/service/service',
					name: '客服中心',
					page: ''
				}],
				cellList: [{
						icon: '/static/icon/look_agreement.png',
						path: '',
						name: '查看协议',
						enName: 'look',
						power: false
					},
					// {
					// 	icon: '/static/icon/about_us.png',
					// 	path: '',
					// 	name: '关于我们',
					// 	enName: 'about',
					// 	power: false
					// },
					//  {
					// 	icon: '/static/icon/logoff.png',
					// 	path: '',
					// 	name: '注销账户',
					// 	enName: 'logoff'
					// },
					{
						icon: '/static/icon/logout.png',
						path: '/pages/login/login',
						name: '退出登录',
						enName: 'logout',
						power: true
					}
				],
				showModal: false,
				title: '登录',
				content: '您好，请先完成登录！',
				confirmText: '去登录',
			};
		},
		methods: {
			...mapMutations(['LOGOUT']),
			orderPage(item) {
				uni.navigateTo({
					url: item.path
				})
			},

			clickNav(item) {
				if (!(store.state.user.token)) {
					this.showModal = true;
					return;
				}

				if (item.page) {
					getUserInfo({}).then(async (res) => {
						if (res.code === 100000) {
							if ((res?.data && res?.data.status === 4) || (res?.data && res?.data.status ===
								5)) {
								getQy({}).then((res) => {
									if (res.code === 100000) {
										uni.navigateTo({
											url: `/pages/webview/webview?urlPath=${encodeURIComponent(res?.data?.url)}`
										});
									} else {
										uni.$u.route(item.path);
									}
								}).catch((err) => {
									console.log(err, 'err');
								})
							} else {
								uni.$u.route(item.path);
							}

						}
					}).catch((err) => {
						console.log(err, 'err');
					})
					return
				}

				if (item.path) {
					uni.$u.route(item.path);
				}
			},
			handleListItem(item) {
				if (item.name === 'logout') {
					uni.$u.route({
						type: 'reLaunch',
						url: 'pages/login/login',
					})
					this.LOGOUT()
					return;
				}
				if (item.name === 'about') {
					uni.$u.route('/subpages/appPrivacyAgreement/appPrivacyAgreement')
					return;
				}
				if (item.name === 'look') {
					uni.$u.route('/subpages/assessAgreement/assessAgreement')
					return;
				}
			},
			confirm() {
				this.showModal = false;
				if (!(store.state.user.token)) {
					uni.$u.route('/pages/login/login');
					return;
				}
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
			...mapGetters(['isLogin', 'getUserInfos']),
			headStr() {
				/**	getSexByBirthday
				 * @param idCard
				 * '0' 男
				 * '1' 女
				 */
				let sexNum = this.getUserInfos?.id_number ? common.getSexByBirthday(this.getUserInfos.id_number) : 2
				if (sexNum === '0') {
					return 'headman'
				}
				if (sexNum === '1') {
					return 'headwomen'
				}
				return 'head'
			},


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
