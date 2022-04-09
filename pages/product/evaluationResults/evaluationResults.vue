<template>
	<view class="container">
		<view class="loan u-flex u-flex-column">
			<text class="title">预计放款额度</text>
			<text class="money">50000</text>
			<text class="desc u-line-1">*此额度根据您的日常行为记录评估额度</text>
			<text class="desc u-line-1">最终可下款额度以资金方最终审核情况为准</text>
		</view>

		<view class="advert">
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

		<view class="remark">
			工商银行金融服务全面介绍，投资理财信息丰富全面，在线交易方便快捷，满足客户金融服务需求。
		</view>

		<view class="formData">
			<u--form :model="formContent" :borderBottom='noneBorder' ref="uForm" labelWidth="auto">
				<u-form-item label="申请用途" prop="" :borderBottom="noneBorder" @click="showSex = true; hideKeyboard()"
					ref="item1">
					<u--input v-model="purpose" disabled inputAlign="right" disabledColor="#ffffff" border="none">
					</u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="银行卡号" prop="bankNo" :borderBottom="noneBorder" ref="item1">
					<u--input inputAlign="right" v-model="formContent.bankNo" border="none"
						suffixIcon="/static/icon/my_bank.png">
							</u--input>
				</u-form-item>

				<u-form-item label="预留手机号" prop="phone" :borderBottom="noneBorder" ref="item1">
					<u--input inputAlign="right" v-model="phone" border="none" suffixIcon="/static/icon/my_phone.png">
					</u--input>
				</u-form-item>

				<u-form-item label="验证码" prop="phone" borderBottom ref="item1">
					<!-- <u--input inputAlign="right" v-model="phone" border="none" suffixIcon="/static/icon/my_phone.png"></u--input> -->
					<!-- 注意：由于兼容性差异，如果需要使用前后插槽，nvue下需使用u--input，非nvue下需使用u-input -->
					<!-- #ifndef APP-NVUE -->
					<u-input inputAlign="right" v-model="formContent.smsCode" border="none">
						<!-- #endif -->
						<!-- #ifdef APP-NVUE -->
						<u--input inputAlign="right" v-model="formContent.smsCode" border="none">
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

				<!-- <u-line></u-line> -->

				<view class="remarkForm">
					工商银行金融服务全面介绍，投资理财信息丰富全面，在线交易方便快捷，满足客户金融服务需求。
				</view>

				<view class="read">
					<u-radio-group v-model="selectRadio">
						<u-radio shape="square"></u-radio>
						<text class="read_tip">我已阅读并同意同意<text class="blue">{{` 《会员协议》 `}}</text></text>
					</u-radio-group>
				</view>

				<!-- <u-form-item label="银行卡号" prop="bankNo" borderBottom ref="item1">
<u-radio-group v-model="formContent.selectRadio">
				<u-radio shape="square"></u-radio>
				<text class="read_tip">我已阅读并同意同意<text class="blue">{{` 会员协议 `}}</text></text>
			</u-radio-group>
				</u-form-item> -->

			</u--form>

			<u-action-sheet :show="showSex" :actions="actions" title="请选择申请用途" description="请选择申请用途"
				@close="showSex = false" @select="sexSelect">
			</u-action-sheet>

		</view>

		<view class="btn">
			<u-button type="primary" :plain="true" class="custom-style" :hairline="true" text="确认">
			</u-button>
		</view>



	</view>
</template>

<script>
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
				actions: [{
						name: '男',
					},
					{
						name: '女',
					},
					{
						name: '保密',
					},
				],
				showSex: false,
				purpose: '',
				phone: '',
				formContent: {},
				selectRadio: false,

				tips: '获取验证码',
				noneBorder: false,
			};
		},
		onLoad() {},
		methods: {
			sexSelect(e) {
				this.purpose = e.name
			},
			codeChange(text) {
				this.tips = text;
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
			}

		},
	};
</script>

<style lang="scss" scoped>
	.container {
		width: 375px;
		height: 812px;
		background: #ffffff;

		.loan {
			margin-top: 8px;
			padding: 0px 32px 0 32px;

			.title {
				font-size: 16px;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #414141;
				line-height: 22px;
			}

			.money {
				font-size: 37px;
				font-family: Arial-BoldMT, Arial;
				font-weight: normal;
				color: #020f2b;
				line-height: 42px;
			}

			.desc {
				font-size: 10px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #414141;
				line-height: 14px;
			}
		}

		.advert {
			width: 343px;
			height: 171px;
			background: linear-gradient(180deg, #9EBEFF 0%, #FFFFFF 100%);
			box-shadow: 2px 5px 6px 0px rgba(0, 0, 0, 0.04);
			border-radius: 4px;
			margin: 12px 16px;

			.top {
				padding: 9px 12px 0 12px;

				.title {
					font-size: 14px;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: #333333;
					line-height: 20px;
					margin-left: 8px;
				}

				image {
					width: 16px;
					height: 16px;
				}
			}
		}

		.advList {
			position: relative;
			padding: 12px 12px;

			.list {
				margin-bottom: 12px;

				image {
					width: 28px;
					height: 28px;
				}

				.content {
					margin-left: 8px;

					.title {
						width: 48px;
						height: 17px;
						font-size: 12px;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #282626;
						line-height: 17px;
					}

					.desc1 {
						width: 115px;
						height: 22px;
						font-size: 8px;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #282626;
						// line-height: 11px;
					}
				}
			}
		}

		.remark {
			width: 343px;
			height: 34px;
			font-size: 12px;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #414141;
			line-height: 17px;
			margin: 12px 16px;

		}

		.formData {
			margin: 12px 14px;
			padding: 0 16px;

			.remarkForm {
				width: 311px;
				height: 28px;
				font-size: 10px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #414141;
				line-height: 14px;
				padding: 14px;
			}

			.read {
				margin-top: 24px;

				.read_tip {

					font-size: 12px;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #414141;
					line-height: 17px;

					.blue {
						color: #4579E6;
					}
				}
			}

			.setImgbox {
				width: 18px;
				height: 18px;
				image {
					width:100%;
					height: 100%;
				}
			}

		}

		.btn {
			padding: 0 26px;
			margin-top: 28px;
			width: 323px;
			height: 44px;
			position: fixed;
			bottom: 0;

			.custom-style {
				background: #4579E6;
				border-radius: 4px;
				font-size: 16px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				line-height: 22px;
			}
		}
	}
</style>
