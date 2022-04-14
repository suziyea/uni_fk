<template>
	<view class="container" :class="addClassName">
		<view class="empty" v-if="emptyStatus">
			<u-empty mode="order" :text="emptyText" icon="http://cdn.uviewui.com/uview/empty/order.png">
			</u-empty>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				emptyStatus: true,
				emptyText: '暂无权益'
			}
		},
		methods: {

		},
		computed: {
			addClassName() {
				if (this.emptyStatus) {
					return 'u-flex u-flex-column u-flex-center u-flex-items-center'
				}
				return ''
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		min-height: 100vh;
	}
</style>
