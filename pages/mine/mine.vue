<template>
	<view class="container">
		<view class="top">
			<view class="user">
				<view class="avatar"><image src="/static/icons/default-avatar.png" mode="aspectFill"></image></view>
				<view class="right" v-if="isLogin">
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
				<navigator v-else class="login" open-type="navigate" url="/pages/login/login">登录</navigator>
			</view>
		</view>
		<view class="order">
			<view class="title"></view>
			<view class="nav">
				<view class="items" v-for="(item, index) in navs" :key="index">
					<view class="icon" @click.stop="orderPage(item)">
						<image :src="item.icon" mode="aspectFill"></image>
					</view>
					<view class="name">{{item.name}}</view>
				</view>
			</view>
		</view>
		<view class="list">
			<navigator open-type="navigate" url="/pages/my/card/card" class="item">
				<view class="item_icon">
					<image src="/static/icons/my_card.png" mode="aspectFill"></image>
				</view>
				<view class="title">我的银行卡</view>
				<view class="arrow"><image src="/static/icons/arrow-icon.png" mode="aspectFill"></image></view>
			</navigator>
			<navigator class="item" open-type="navigate" url="/pages/my/my-rights/my-rights">
				<view class="item_icon">
					<image src="/static/icons/read.png" mode="aspectFill"></image>
				</view>
				<view class="title">我的权益</view>
				<view class="arrow"><image src="/static/icons/arrow-icon.png" mode="aspectFill"></image></view>
			</navigator>
			<navigator class="item" open-type="navigate" url="/pages/service/service">
				<view class="item_icon">
					<image src="/static/icons/service.png" mode="aspectFill"></image>
				</view>
				<view class="title">客服中心</view>
				<view class="arrow"><image src="/static/icons/arrow-icon.png" mode="aspectFill"></image></view>
			</navigator>
			<navigator class="item" open-type="navigate" url="/pages/my/agreement-list/agreement-list">
				<view class="item_icon">
					<image src="/static/icons/read.png" mode="aspectFill"></image>
				</view>
				<view class="title">查看协议</view>
				<view class="arrow"><image src="/static/icons/arrow-icon.png" mode="aspectFill"></image></view>
			</navigator>
			<navigator class="item" open-type="navigate" url="/pages/my/about-us/about-us">
				<view class="item_icon">
					<image src="/static/icons/aboutus.png" mode="aspectFill"></image>
				</view>
				<view class="title">关于我们</view>
				<view class="arrow"><image src="/static/icons/arrow-icon.png" mode="aspectFill"></image></view>
			</navigator>
			<navigator v-if="isLogin" class="item" open-type="navigate" url="/pages/login/unregister/unregister">
				<view class="item_icon">
					<image src="/static/icons/unreg_icon.png" mode="aspectFill"></image>
				</view>
				<view class="title">注销账户</view>
				<view class="arrow"><image src="/static/icons/arrow-icon.png" mode="aspectFill"></image></view>
			</navigator>
			<view v-if="isLogin" class="item" @click.stop="logout">
				<view class="item_icon">
					<image src="/static/icons/logout.png" mode="aspectFill"></image>
				</view>
				<view class="title">退出登录</view>
				<view class="arrow"><image src="/static/icons/arrow-icon.png" mode="aspectFill"></image></view>
			</view>
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
				navs: [{
					icon: '/static/icons/order_all.png',
					path: '/pages/my/my-order/my-order?tab=0',
					name: '全部'
				},{
					icon: '/static/icons/card.png',
					path: '/pages/my/my-order/my-order?tab=1',
					name: '待支付'
				},{
					icon: '/static/icons/complete.png',
					path: '/pages/my/my-order/my-order?tab=2',
					name: '已完成'
				}
				// ,{
				// 	icon: '/static/icons/refund.png',
				// 	path: '/pages/my/my-order/my-order?tab=3',
				// 	name: '退款'
				// },
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
			...mapGetters(['isLogin'])
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		height: 100%;
		// background-color: #f7f7f7;
	}
	.top {
		width: 100%;
		height: 421upx;
		background: url(../../static/bgs/my_top.png) no-repeat;
		background-size: cover;
		.user{
			position: absolute;
			@extend %flex-layout-row;
			justify-content: flex-start;
			top: 119upx;
			left: 50upx;
			.avatar{
				flex: 0 0 96upx;
				width: 96upx;
				height: 96upx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.right{
				flex: 1;
				margin-left: 24upx;
				.nickname{
					font-size: 32upx;
					color: #FFFFFF;
					@extend %flex-layout-row;
					justify-content: flex-start;
					align-items: baseline;
					.star{
						width: 23upx;
						height: 21upx;
						margin-left: 8upx;
						image{
							width: 100%;
							height: 100%;
						}
					}
				}
				.account{
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
	.order{
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
		.nav{
			@extend %flex-layout-row;
			justify-content: space-between;
			.items{
				width: 32%;
				text-align: center;
				.icon{
					width: 112upx;
					height: 112upx;
					margin: 0 auto;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.name{
					padding-top: 5upx;
					font-size: 26upx;
					color: $mc-normal-font-color;
				}
			}
		}	
	}
	.list{
		background-color: #FFFFFF;
		border-radius: 14upx;
		margin: 32upx 26upx 0 26upx;
		.item{
			@extend %flex-layout-row;
			justify-content: space-between;
			padding: 29upx 26upx;
			align-items: center;
			.item_icon{
				flex: 0 0 54upx;
				width: 54upx;
				height: 54upx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.title{
				flex: 1;
				margin-left: 19upx;
				font-size: $mc-normal-font-size;
				color: $mc-normal-font-color;
			}
			.arrow{
				flex: 0 0 54upx;
				width: 54upx;
				height: 54upx;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
