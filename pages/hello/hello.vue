<template>
	<view class="hello">
		<view class="timer">{{second}}s</view>
		<image class="hello_bg" :src="image" mode="scaleToFill"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				second: 3,
				timer: null,
				image: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F019bbc5542e1300000019ae965f0bf.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652152833&t=8a93930dd64a870df5e17343d3223c92"
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
		onLoad() {
			// this.loadImage()
		},
		methods: {
			loadImage() {
				this.$request.POST('/startup_page', null, true,
					(res) => {
						this.image = res.data.image
					},
					(err) => {
						this.image = '/static/bgs/hello_bg.jpg'
					})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.hello {
		.hello_bg {
			width: 100%;
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
