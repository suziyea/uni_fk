<template>
	<view class="hello">
		<view class="timer">{{second}}s</view>
		<image class="hello_bg" :src="image" mode="scaleToFill"></image>
	</view>
</template>

<script>
	import {
		getStartBg,
	} from "@/config/api/user.js";
	export default {
		data() {
			return {
				second: 3,
				timer: null,
				image: ""
			};
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
			// 模拟三秒倒计时
			var _this = this
			this.second = 3
			this.timer = setInterval(function() {
				_this.second--;
				if (_this.second == 0) {
					clearInterval(_this.timer)
					uni.switchTab({
						url: '/pages/index/index'
					})
				}
			}, 1000)
		},
		created() {
			this.loadImage()
		},
		methods: {
			loadImage() {
				getStartBg({
					code: 'opening_page_image'
				}).then((res) => {
					if (res.code === 100000) {
						this.image = res.data.url
					}

				}).catch((err) => {
					console.log(err, 'err');
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.hello {
		.hello_bg {
			width: 750rpx;
			height: 100vh;
			margin: 0;
			padding: 0;
		}

		.timer {
			width: 70rpx;
			height: 70rpx;
			background-color: rgba(0, 0, 0, 0.2);
			border-radius: 70rpx;
			color: #FFFFFF;
			font-size: 32rpx;
			font-weight: 400;
			text-align: center;
			line-height: 70rpx;
			position: absolute;
			z-index: 2;
			right: 30rpx;
			top: 61rpx;
		}
	}
</style>
