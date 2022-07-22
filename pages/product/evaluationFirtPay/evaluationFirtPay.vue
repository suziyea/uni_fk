<template>
	<view class="container" v-if="showFlag">
		<common-dialog v-if="showDialog" title="温馨提示" content="请您保证余额在300元以上，否则会误判您还款能力导致下款失败！" :showCancel="true"
			confirmText="重新绑卡" cancelText="原卡重试" v-on:on-click-dialog="onClickDialog"></common-dialog>
		<!-- 预计放款内容 -->
		<view class="predict_loan">
			<view class="content">
				<view class="titlebox">
					<text class="title">
						预计放款额度
					</text>
				</view>
				<view class="amount">
					<text class="sign">¥</text><text class="price">{{handlePrice}}</text>
				</view>
				<view class="descbox">
					<view class="desc">
						*此额度根据您的日常行为记录评估额度
					</view>
					<view class="desc">
						最终可下款额度以资金方最终审核情况为准
					</view>
				</view>
			</view>
		</view>

		<!-- 四大优势 -->
		<view class="advantage">
			<view class="top u-flex u-flex-items-center">
				<image src="/static/icon/result_zan.png" mode="aspectFill"></image>
				<text class="title">四大优势</text>
			</view>

			<view class="advantageList  u-flex u-flex-wrap u-flex-row u-flex-between">
				<view class="adv_item u-flex u-flex-wrap" v-for="(item, k) in productsNav" :key="k">
					<view class="icon">
						<image :src="item.icon" mode="aspectFill"></image>
					</view>
					<view class="desc u-flex u-flex-column u-flex-wrap">
						<view class="title">{{ item.title }}</view>
						<view class="tip">{{ item.desc }}</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 介绍 -->
		<view class="introduce">
			工商银行金融服务全面介绍，投资理财信息丰富全面，在线交易方便快捷，满足客户金融服务需求。
		</view>

		<!-- 申请用户信息 -->
		<view class="apply_info">
			<u-cell-group :border="false">
				<u-cell title="申请用途" :border="false" name="applyreason" @click="handleReasonStatus" isLink
					:value="applyValue"></u-cell>
				<u-cell class="mt_20" title="银行卡号" :border="false" :center="true">
					<view slot="value" class="u-slot-title restText">
						<text class="u-cell-text">{{this.userInfo.bankInfo}}</text>
						<u-tag text="重新绑卡" plain size="mini" class="restBank" @click="restAddBank">
						</u-tag>
					</view>
				</u-cell>
				<u-cell title="手机号" :border="false" :value="this.userInfo.reserve_phone"></u-cell>
			</u-cell-group>

			<view class="tips">
				<u-line class="my_line"></u-line>
				<view class="notice">
					提交申请将会产生<text
						class="restSms">{{` ${service_charge}元 `}}</text>的审核费用，判断是否能够偿还，将从您提交的银行卡中进行扣款，请检查余额是否足够完成扣款。
				</view>
				<view class="read u-flex u-flex-items-center">
					<view :class="[!selectRadio ? 'icon-this-option' : 'icon-has-checked']" @click="checkboxChange">
					</view>
					<view class="wenan">
						<text class="read_tip">我已阅读并同意<text class="blue"
								@click="jumpContent('assess')">{{` 《评估协议》 `}}</text></text>
					</view>
				</view>
			</view>

		</view>
		<view class="btn">
			<u-button type="primary" :plain="true" class="custom-style" @click="clickSubmit" :hairline="true" text="确认">
			</u-button>
		</view>

		<u-action-sheet :show="showAssessSheet" :actions="applicationUseList" title="请选择申请用途"
			@close=" showAssessSheet = false" @select="selectReason">
		</u-action-sheet>
		<u-popup class="popupView" :closeable='closeable' :closeOnClickOverlay="closeOnClickOverlay"
			overlayOpacity='0.8' :show="showPopup" :round="10" mode="center" @close="close" @open="open">
			<view class="popupCon u-flex u-flex-column u-flex-items-center">
				<text class="title u-flex-align-self">输入验证码</text>
				<view class="tip">
					<text>验证码发送至: {{this.userInfo.reserve_phone}}</text>
				</view>
				<view class="codeContent">
					<u-code-input v-model="smsCodeValue" mode="line" @finish="finishSmsCode" :focus="true">
					</u-code-input>
				</view>
			</view>
			<view class="sms_num">
				<text v-if="!restCode"><text class="restSms">{{`${seconds} `}}</text>秒后重发短信验证码</text>
				<text class="restSms" v-else @click="restSmsCode">重新获取</text>
			</view>
		</u-popup>
	</view>

</template>

<script>
	import commonDialog from '@/components/common-dialog/common-dialog.vue'

	import {
		mapGetters,
	} from 'vuex'
	import {
		assessResult,
		getEdu
	} from "@/config/api/user.js";
	import {
		sendFirstOrderSms,
		payVerify,
	} from "@/config/api/product.js";
	import common from '@/utils/common.js'
	export default {
		components: {
			commonDialog,
		},
		data() {
			return {
				showDialog: false,
				showFlag: false,
				// 绑定银行卡用户信息
				userAssessInfo: {},
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
				selectRadio: false,
				order_no: '',
				smsCodeValue: '',
				showPopup: false,
				showAssessSheet: false,
				applyValue: '日常消费',
				seconds: 60,
				restCode: false,
				timer: '',
				closeable: true,
				closeOnClickOverlay: false,
				service_charge: '', // 服务费
			}
		},
		computed: {
			// 获取银行卡余额
			...mapGetters(['getInsufficientBalance']),
			handlePrice() {
				let num = this.userAssessInfo?.loan_amount ? common.formatNumber(this.userAssessInfo?.loan_amount, 2, '.',
					',') : common.formatNumber(0, 2, '.', ',')
				return num
			},
			// 申请用途
			applicationUseList() {
				const reasonLists = this.userAssessInfo.application_reason.map((item, i) => {
					return {
						name: item,
						id: i
					}
				})
				return reasonLists || []
			},
			// 用户信息
			userInfo() {
				let bankInfo =
					`${this.userAssessInfo?.user?.bank_name || ''} 尾号 ${this.userAssessInfo?.user?.card_number?.slice(-4) || ''}`
				return {
					bankInfo,
					...this.userAssessInfo?.user
				}
			}


		},
		watch: {
			getInsufficientBalance(data) {
				if (data === true) {
					this.showPopup = false
				}
			}
		},
		created() {
			this.getEdus()
			this.getAssessInfo()
		},
		methods: {
			onClickDialog(event) {
				if (event == 'confirm') {
					uni.$u.route({
						url: '/pages/evaluation/addBank/addBank'
					});
					return;
				}
				this.clickSubmit();
				this.showDialog = false;
			},
			getEdus() {
				getEdu({
					"code": "first_debit_amount"
				}).then((res) => {
					if (res.code === 100000) {
						this.service_charge = res?.data?.value?.value || '****'
					}
				}).catch((err) => {
					console.log(err, 'err');
				})
			},
			getAssessInfo() {
				assessResult({}).then((res) => {
					if (res.code === 100000) {
						this.userAssessInfo = res?.data || {};
						this.showFlag = true;
					}
				}).catch((err) => {
					console.log(err, 'err');
				}).finally(() => {
					this.showFlag = true;
				})
			},
			clickSubmit() {
				this.selectRadio = true;
				if (this.selectRadio) {
					uni.$u.debounce(this.handleSmsPopup, 500);
					return;
				}
				uni.$u.toast('请勾选同意')
			},
			// 重新获取验证码
			restSmsCode() {
				this.restCode = false;
				this.order_no = ''
				uni.$u.debounce(this.handleSmsPopup, 500);
				return;
			},

			handleSmsPopup() {
				this.seconds = 60;
				sendFirstOrderSms({
						application_reason: this.applyValue
					})
					.then((res) => {
						if (res.code === 100000) {
							this.order_no = res.data.order_no
							this.showPopup = true;
							this.timer = setInterval(() => {
								this.seconds--
								if (this.seconds <= 0) {
									this.seconds = 60;
									this.restCode = true;
									clearInterval(this.timer)
								}
							}, 1000)
						}

					})
					.catch((err) => {
						uni.showToast({
							icon: "none",
							title: err.msg || "获取验证码失败，请稍后再试",
						});
					});
			},
			checkboxChange() {
				this.selectRadio = !this.selectRadio

			},
			handleReasonStatus(e) {
				if (e.name === 'applyreason') {
					this.showAssessSheet = true;
				}
			},
			restAddBank() {
				uni.$u.route({
					url: '/pages/evaluation/addBank/addBank',
				})
				return;
			},
			selectReason(e) {
				this.applyValue = e.name
			},
			open() {
				this.showPopup = true
			},
			close(val = 'close') {
				if (val == 'smserr') this.order_no = ''
				this.showPopup = false;
				this.smsCodeValue = '';
				clearInterval(this.timer)
			},
			finishSmsCode() {
				payVerify({
						order_no: this.order_no,
						code: this.smsCodeValue
					})
					.then(async (res) => {
						// if (res.code === 121000 || res.code === 123000) {
						// 	let closeStatus;
						// 	if (res.code === 123000) closeStatus = 'smserr'
						// 	this.close(closeStatus)
						// 	Promise.reject(res)
						// 	return;
						// }
						if (res.code === 121000 || res.code === 123000) {
							let closeStatus;
							if (res.code === 123000) closeStatus = 'smserr'
							this.showDialog = true
							this.showPopup = false;
							return;
						}
						if (res.code === 100000) {
							this.showPopup = false;
							await this.$store.dispatch('setCurrentUserInfo')
							uni.$u.route('/pages/payResult/payResult', {
								serviceType: 1,
								service_charge: this.service_charge
							});
						}

					})
					.catch((err) => {
						this.showPopup = false;
						if (this.getInsufficientBalance) {
							uni.$u.toast(data.msg)
							return;
						}
						uni.showToast({
							icon: "none",
							title: err.msg,
						});
					});
			},
			jumpContent(val) {
				if (val === 'assess') {
					uni.$u.route('/subpages/assessAgreement/assessAgreement')
					return;
				}
			}
		},
		onUnload() {
			clearInterval(this.timer)
		},
	}
</script>

<style scoped lang="scss">
	.container {
		width: 750rpx;
		height: 1624rpx;
		background: #FFFFFF;
		box-sizing: border-box;
		padding: 0 32rpx;

		// 预计放款内容
		.predict_loan {
			box-sizing: border-box;
			height: 298rpx;

			.content {
				margin: 0 28rpx;

				.titlebox {
					margin: 44rpx 0 20rpx 0;

					.title {
						font-size: 16px;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #414141;
						line-height: 22px;
					}
				}

				.amount {
					margin-bottom: 14rpx;

					.sign {
						font-size: 36rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #414141;
						line-height: 50rpx;
					}

					.price {
						font-size: 80rpx;
						font-family: Arial-BoldMT, Arial;
						font-weight: normal;
						color: #020F2B;
						line-height: 90rpx;
						margin-left: 20rpx;
					}
				}

				.descbox {
					.desc {
						font-size: 20rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #414141;
						line-height: 28rpx;
					}

					.desc:nth-child(2n) {
						margin-top: 12rpx;
					}
				}
			}

		}

		// 四大优势样式
		.advantage {
			width: 686rpx;
			height: 366rpx;
			overflow: hidden;
			box-sizing: border-box;
			background: url(../../../static/img/assessBg.png) no-repeat;
			background-size: cover;

			.top {
				margin: 26rpx 0 40rpx 28rpx;

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

			.advantageList {
				padding: 0 28rpx;

				.adv_item {
					margin-bottom: 32rpx;

					.icon {

						image {
							width: 56rpx;
							height: 56rpx;
						}
					}

					.desc {
						margin-left: 16rpx;

						.title {
							width: 48px;
							height: 17px;
							font-size: 12px;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #282626;
							line-height: 17px;
						}

						.tip {
							width: 115px;
							height: 22px;
							font-size: 8px;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #282626;
							line-height: 11px;
						}
					}
				}
			}
		}

		// 介绍样式
		.introduce {
			width: 343px;
			height: 34px;
			font-size: 12px;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #414141;
			line-height: 17px;
			margin-bottom: 20rpx;
		}

		// 申请用户信息样式
		.apply_info {
			width: 686rpx;
			height: 448rpx;
			background: #FFFFFF;
			box-shadow: 4rpx 10rpx 12rpx 0 rgba(0, 0, 0, 0.04), -1px -2px 4px 0px rgba(0, 0, 0, 0.03);
			border-radius: 4px;
			padding: 32rpx 0;

			.mt_20 {
				margin-bottom: 48rpx !important;

				.restText {
					position: relative;

					.restBank {
						position: absolute;
						right: 0;
						top: 50rpx;
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #4579E6;
						cursor: pointer;

						/deep/ .u-tag {
							min-width: 100rpx;
							border: none;
						}
					}
				}

			}


			/deep/ .u-cell__body {
				padding: 12rpx 28rpx;
			}

			.tips {
				margin: 0 28rpx 24rpx 28rpx;

				.my_line {
					margin-bottom: 24rpx !important;
				}

				.notice {
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

					.wenan {
						margin-left: 12rpx;
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


			}
		}

		.btn {
			width: 686rpx;
			height: 88rpx;
			position: fixed;
			bottom: 16rpx;
			box-sizing: border-box;

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

		/deep/ .u-action-sheet {
			height: 520rpx;
			overflow: auto;
		}

		.popupView {

			box-sizing: border-box;

			/deep/ .u-popup__content {
				border-radius: 20rpx;
				background: #fff;
				width: 100%;
				padding: 40rpx;
				width: 670rpx;
				height: 497rpx;
				background: #FFFFFF;
				border-radius: 10rpx;
				box-sizing: border-box;
			}

			/deep/ .uicon-close {
				display: block;
			}

			.popupCon {

				.title {
					font-size: 40rpx;
					margin: 20rpx 0;
				}

				.tip {

					font-size: 30rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #BFC2CD;
					line-height: 42rpx;
				}
			}

			.sms_num {
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #BEC2CC;
				line-height: 33rpx;
				text-align: right;
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

		.restSms {
			color: #4579E6;

		}

	}
</style>
