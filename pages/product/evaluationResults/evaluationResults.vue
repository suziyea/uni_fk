<template>
	<view class="resultContainer u-flex u-flex-column u-flex-center u-row-center" v-if="showFlag">
		<view class="info u-flex u-flex-column u-flex-center u-row-center">
			<text class="title">
				预计放款额度
			</text>
			<view>
				<text class="sign">¥</text><text class="pice">{{handlePrice}}</text>
			</view>
			<!-- <u--text mode="price" class="price" :text="userAssessInfo.loan_amount"></u--text> -->
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
			<u--form :model="formContent" labelWidth="auto">
				<u-form-item label="申请用途" @click="showAssessSheet = true;" labelWidth="auto">
					<u--input v-model="formContent.purpose" disabled inputAlign="right" disabledColor="#ffffff"
						border="none">
					</u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>

				<u-form-item label="银行卡号" labelWidth="auto" class="bankForm">
					<u--input readonly inputAlign="right" v-model="formContent.bankInfo" border="none" disabled
						disabledColor="#ffffff" suffixIcon="/static/icon/my_bank.png">
					</u--input>
					<text slot="right" class="restBank" @click="restAddBank">
						重新绑卡
					</text>
				</u-form-item>

				<u-form-item label="预留手机号" labelWidth="auto">
					<u--input readonly inputAlign="right" v-model="formContent.reserve_phone" border="none"
						suffixIcon="/static/icon/my_phone.png">
					</u--input>
				</u-form-item>
			</u--form>
		</view>

		<view class="adddesc">
			<view class="detail">
				提交申请将会产生300元的审核费用，判断是否能够偿还，将从您提交的银行卡中进行扣款，请检查余额是否足够完成扣款。
			</view>
			<view class="read u-flex u-flex-items-center">
				<view :class="[!selectRadio ? 'icon-this-option' : 'icon-has-checked']" @click="checkboxChange"></view>
				<view class="wenan">
					<text class="read_tip">我已阅读并同意同意<text class="blue"
							@click="jumpContent('assess')">{{` 《评估协议》 `}}</text></text>
				</view>
			</view>
		</view>
		<view class="btn">
			<u-button type="primary" :plain="true" class="custom-style" @click="clickSubmit" :hairline="true" text="确认">
			</u-button>
		</view>

		<u-action-sheet :show="showAssessSheet" :actions="assessReasonList" title="请选择申请用途"
			@close=" showAssessSheet = false" @select="selectRreason">
		</u-action-sheet>
		<u-toast ref="uToast"></u-toast>

		<u-popup class="popupView" :show="showPopup" :round="10" mode="center" @close="close" @open="open">
			<view class="popupCon u-flex u-flex-column">
				<text class="title u-flex-align-self">正在验证您的银行卡</text>
				<view class="tip">
					<text>已发送手机号: {{this.userAssessInfo.reserve_phone}}</text>
				</view>
				<view class="codeContent">
					<u-code-input v-model="smsCodeValue" mode="line" @finish="finishSmsCode"></u-code-input>
				</view>
			</view>

		</u-popup>
	</view>
</template>

<script>
	import {
		assessResult,
	} from "@/config/api/user.js";
	import {
		sendFirstOrderSms,
		payVerify,
	} from "@/config/api/product.js";
	import common from '@/utils/common.js'
	// 
	export default {
		data() {
			return {
				showPopup: false,
				showFlag: false,
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
				formContent: {
					purpose: '日常消费'
				},
				selectRadio: false,
				assessReasonList: [],
				userAssessInfo: {},
				order_no: '',
				smsCodeValue: ''
			};
		},
		created() {
			this.getAssessInfo()
		},
		onLoad() {},
		computed: {
			handlePrice() {
				let num = this.userAssessInfo?.loan_amount ? common.formatNumber(this.userAssessInfo?.loan_amount, 2, '.',
					',') : common.formatNumber(0, 2, '.', ',')
				return num
			},


		},
		methods: {
			checkboxChange() {
				this.selectRadio = !this.selectRadio

			},
			clickSubmit() {
				if (this.selectRadio) {
					uni.$u.debounce(this.handleSmsPopup, 500);
					return;
				}
				uni.$u.toast('请勾选同意')
			},
			handleSmsPopup() {
				sendFirstOrderSms({
						application_reason: this.formContent.purpose
					})
					.then((res) => {
						if (res.code === 100000) {
							this.order_no = res.data.order_no
							this.showPopup = true;
							uni.$u.toast('验证码发送成功');
						}

					})
					.catch((err) => {
						uni.showToast({
							icon: "none",
							title: err.msg || "获取验证码失败，请稍后再试",
						});
					});
			},
			selectRreason(e) {
				this.formContent.purpose = e.name
			},
			getAssessInfo() {
				assessResult({}).then((res) => {
					if (res.code === 100000) {
						this.userAssessInfo = res?.data || {};
						this.formContent.bankInfo =
							`${res?.data?.user?.bank_name || ''} 尾号 ${res?.data?.user?.card_number?.slice(-4) || ''}`
						Object.assign(this.formContent, res?.data?.user)
						this.assessReasonList = res?.data?.application_reason.map((item, i) => {
							return {
								name: item,
								id: i
							}
						})
						this.showFlag = true;
					}
				}).catch((err) => {
					console.log(err, 'err');
				}).finally((data) => {
					this.showFlag = true;
				})
			},
			jumpContent(val) {
				if (val === 'assess') {
					uni.$u.route('/subpages/assessAgreement/assessAgreement')
					return;
				}
			},
			restAddBank() {
				uni.$u.route({
					// type: 'reLaunch',
					url: 'pages/evaluation/addBank/addBank',
				})
				return;
			},

			open() {
				this.showPopup = true
				// console.log('open');
			},
			close() {
				this.showPopup = false
				// console.log('close');
			},
			finishSmsCode() {
				payVerify({
						order_no: this.order_no,
						code: this.smsCodeValue
					})
					.then((res) => {
						if (res.code === 100000) {
							this.showPopup = false;
							let params = {
								type: 'success',
								message: "评估成功",
								url: '/pages/product/reflect/reflect'
							}
							this.$store.dispatch('setCurrentUserInfo')
							this.$refs.uToast.show({
								...params,
								complete() {
									params.url && uni.navigateTo({
										url: params.url
									})
								}
							})
						}

					})
					.catch((err) => {
						uni.showToast({
							icon: "none",
							title: err.msg || "获取验证码失败，请稍后再试",
						});
					});
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

			.sign {
				font-size: 18px;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #414141;
				line-height: 25px;
			}

			.pice {
				font-size: 37px;
				font-family: Arial-BoldMT, Arial;
				font-weight: normal;
				color: #020F2B;
				line-height: 42px;

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

			/deep/ .u-button--success {
				border: none;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #4579E6;
				line-height: 34rpx;
				background: none;
			}
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

	.icon-has-checked {
		width: 28rpx;
		height: 28rpx;
		background: url(../../../static/icon/checked.png) no-repeat;
		background-size: cover;
	}

	.icon-this-option {
		width: 28rpx;
		height: 28rpx;
		background: url(../../../static/icon/noChecked.png) no-repeat;
		background-size: cover;
	}

	.wenan {
		margin-left: 12rpx;
	}

	.popupView {
		/deep/ .u-popup__content {
			border-radius: 20rpx;
			background: #fff;
			width: 90%;
			margin: 0 40rpx;
			padding: 40rpx;
			box-sizing: border-box;
		}

		.popupCon {
			.title {
				font-size: 40rpx;
				margin: 20rpx 0;
			}
		}

		.codeContent {
			margin: 50rpx 0;
		}

		/deep/ .u-button--success {
			border: none;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #4579E6;
			line-height: 34rpx;
			background: none;
		}

		/deep/ .u-form-item {
			margin: 40rpx 0;
		}

	}
</style>
