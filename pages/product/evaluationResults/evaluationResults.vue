<template>
	<view class="resultContainer u-flex u-flex-column u-flex-center u-row-center">
		<view class="info u-flex u-flex-column u-flex-center u-row-center">
			<text class="title">
				预计放款额度
			</text>
			<text class="price">50000</text>
			<text class="desc">*此额度根据您的日常行为记录评估额度</text>
			<text class="desc">最终可下款额度以资金方最终审核情况为准</text>
		</view>

		<view class="advantage u-flex u-flex-column">
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

		<view class="jieshaoText">
			工商银行金融服务全面介绍，投资理财信息丰富全面，在线交易方便快捷，满足客户金融服务需求。
		</view>

		<view class="formList">
			<u--form labelWidth="auto">
				<u-form-item label="申请用途" labelWidth="auto">
					<u--input v-model="purpose" disabled inputAlign="right" disabledColor="#ffffff" border="none">
					</u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>

				<u-form-item label="银行卡号" labelWidth="auto" class="bankForm">
					<u--input inputAlign="right" v-model="cardIdNum" border="none"
						suffixIcon="/static/icon/my_bank.png">
					</u--input>
					<text slot="right" class="restBank" @click="restAddBank">
						重新绑卡
					</text>
				</u-form-item>

				<u-form-item label="预留手机号" labelWidth="auto">
					<u--input inputAlign="right" v-model="userMobile" border="none" suffixIcon="/static/icon/my_phone.png">
					</u--input>
				</u-form-item>

				<u-form-item label="验证码" prop="phone">
					<!-- <u--input inputAlign="right" v-model="phone" border="none" suffixIcon="/static/icon/my_phone.png"></u--input> -->
					<!-- 注意：由于兼容性差异，如果需要使用前后插槽，nvue下需使用u--input，非nvue下需使用u-input -->
					<!-- #ifndef APP-NVUE -->
					<u-input inputAlign="right" v-model="code" border="none">
						<!-- #endif -->
						<!-- #ifdef APP-NVUE -->
						<u--input inputAlign="right" v-model="code" border="none">
							<!-- #endif -->
							<template slot="suffix">
								<u-code ref="uCode" @change="codeChange" seconds="20" changeText="X秒重新获取哈哈哈"></u-code>
								<u-button @tap="getCode" :text="tips" type="success" size="mini"></u-button>
							</template>
							<!-- #ifndef APP-NVUE -->
					</u-input>
					<!-- #endif -->
					<!-- #ifdef APP-NVUE -->
					</u--input>
					<!-- #endif -->
				</u-form-item>
			</u--form>
		</view>

		<view class="adddesc">
			<view class="detail">
				提交申请将会产生300元的审核费用，判断是否能够偿还，将从您提交的银行卡中进行扣款，请检查余额是否足够完成扣款。
			</view>
			<view class="read">
				<u-radio-group v-model="selectRadio">
					<u-radio shape="square"></u-radio>
					<text class="read_tip">我已阅读并同意同意<text class="blue"
							@click="jumpContent('assess')">{{` 《会员协议》 `}}</text></text>
				</u-radio-group>
			</view>
		</view>
		<view class="btn">
			<u-button type="primary" :plain="true" class="custom-style" @click="clickSubmit" :hairline="true" text="确认">
			</u-button>
		</view>

		<u-action-sheet :show="showAssessSheet" :actions="assessReasonList" title="请选择申请用途" description="请选择申请用途"
			@close="showAssessSheet = false" @select="selectRreason">
		</u-action-sheet>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {
		assessResult,
	} from "@/config/api/user.js";
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
				showAssessSheet: false,
				purpose: '',
				phone: '',
				formContent: {},
				selectRadio: false,
				assessReasonList: [],
				tips: '获取验证码',
				noneBorder: false,
				userAssessInfo: {

				},
				cardIdNum: ''
			};
		},
		created() {
			this.getAssessInfo()
		},
		onLoad() {},
		methods: {
			clickSubmit() {
				// if (!this.selectRadio) {
				// 	uni.$u.toast('请勾选同意')
				// 	return;
				// }

				uni.$u.debounce(this.submit, 500)
			},
			submit() {
				let params = {
					type: 'success',
					message: "评估成功",
					url: '/pages/product/reflect/reflect'
				}
				this.$refs.uToast.show({
					...params,
					complete() {
						params.url && uni.navigateTo({
							url: params.url
						})
					}
				})
			},
			selectRreason(e) {
				console.log(e, '选择啊')
				this.purpose = e.name
			},
			codeChange(text) {
				this.tips = text;
			},
			getAssessInfo() {
				assessResult({}).then((res) => {
					if (res.code === 100000) {
						this.userAssessInfo = res?.data || {}
						this.cardIdNum = res?.data?.user?.card_number
						this.userMobile = res?.data?.user?.reserve_phone
						this.assessReasonList = res?.data?.application_reason.map((item, i) => {
							return {
								name: item,
								id: i
							}
						})
					}
					console.log(res, 'nihao')
				}).catch((err) => {
					console.log(err, 'err');
				})
			},
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					setTimeout(() => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						uni.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}, 2000);
				} else {
					uni.$u.toast('倒计时结束后再发送');
				}
			},
			change(e) {
				console.log('change', e);
			},
			jumpContent(val) {
				if (val === 'assess') {
					uni.$u.route('/pages/mine/agreement/agreement')
					return;
				}
			},
			restAddBank() {
				uni.$u.route({
					// type: 'reLaunch',
					url: 'pages/evaluation/addBank/addBank',
				})
				return;
			}

		},
	};
</script>

<style lang="scss" scoped>
	.resultContainer {
		box-sizing: border-box;

		.info {
			margin: 16rpx 64rpx 24rpx 64rpx;
			box-sizing: border-box;

			.title {
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #414141;
				line-height: 44rpx;
			}

			.price {
				font-size: 74rpx;
				font-family: Arial-BoldMT, Arial;
				font-weight: normal;
				color: #020F2B;
				line-height: 84rpx;
			}

			.desc {
				font-size: 20rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #414141;
				line-height: 28rpx;
				margin-bottom: 4rpx;
			}
		}

		.advantage {
			margin: 0 32rpx;
			width: 686rpx;
			height: 342rpx;
			background: linear-gradient(180deg, #9EBEFF 0%, #FFFFFF 100%);
			box-shadow: 4rpx 10rpx 12rpx 0px rgba(0, 0, 0, 0.04);
			border-radius: 8rpx;
			background: url(../../../static/img/assessBg.png) no-repeat;
			background-size: cover;

			.top {
				padding: 18rpx 24rpx 0 24rpx;

				.title {
					font-size: 28rpx;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: #333333;
					line-height: 40rpx;
					margin-left: 16rpx;
				}

				image {
					width: 32rpx;
					height: 32rpx;
				}
			}

			.advList {
				margin: 40rpx 24rpx;

				.list {
					margin-bottom: 24rpx;

					.img {
						image {
							width: 56rpx;
							height: 56rpx;
						}
					}

					.content {
						margin-left: 16rpx;

						.title {
							width: 96rpx;
							height: 34rpx;
							font-size: 24rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #282626;
							line-height: 34rpx;
						}

						.desc1 {
							width: 230rpx;
							height: 44rpx;
							font-size: 16rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #282626;
							// line-height: 11px;
						}
					}
				}
			}
		}

		.jieshaoText {
			margin: 24rpx 32rpx;
			font-size: 12px;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #414141;
			line-height: 17px;
		}

		.formList {
			margin: 0 32rpx;

			.bankForm {
				height: 150rpx;
				position: relative;
			}

			.restBank {
				position: absolute;
				right: 0;
				top: 100rpx;
				width: 56px;
				height: 20px;
				font-size: 14px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #4579E6;
				line-height: 20px;
				cursor: pointer;
			}

			// .bankbox {
			// 	position: relative;

			// }
		}

		.adddesc {
			margin: 24rpx 32rpx;

			.detail {
				font-size: 20rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #414141;
				line-height: 28rpx;
			}

			.read {
				margin: 24rpx 0 128rpx 0;

				.read_tip {
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #414141;
					line-height: 34rpx;

					.blue {
						color: #4579E6;
						cursor: pointer;
					}
				}
			}
		}

		.btn {
			padding: 0 52rpx;
			// margin-top: 56rpx;
			width: 646rpx;
			height: 88rpx;
			position: fixed;
			bottom: 16rpx;

			.custom-style {
				background: #4579E6;
				border-radius: 8rpx;
				font-size: 32rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				line-height: 44rpx;
			}
		}
	}
</style>
