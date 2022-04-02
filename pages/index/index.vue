<template>
	<view class="content">
		<view style="padding: 20px;">
			<button @click.stop="handleReal">
				首页
			</button>
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
				title: 'Hello'
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
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
