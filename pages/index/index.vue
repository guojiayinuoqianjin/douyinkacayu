<template>
	<view @click="changeTab2">
		<view class="home_head">
			<u-swiper :list="bannerList" style="height:25rem;" >
			</u-swiper>
			  <view class="tab_index"   :style="tabClick == 2 ? '' : 'display:none;'">
			        <view class="tab_index_l" v-for="(item,index) in searchType"
			                     :key="index" :id="item.value"
			                     :class="{tab_active:toSearchType==item.value}"
			                     @click="changeSearchType(item.value,item.label)">
			                    {{item.label}}
			        </view>
			  </view>
			<view class="head_search">
				<view style="position: relative;">
					<view class="head_s_l" @tap.stop="" @click="changeTab" :id="toSearchType">
						<span>{{toSearchLabel}}</span>
						<view class="icon-xiangshang home_search_icon"></view>
					</view>
					<view class="head_s_l_bor"></view>
					<input type="text" name="s" 
							@tap.stop=""
							@click="showHistory"
							v-model="searchValue"
							:placeholder="`搜索${(toSearchLabel)}`"
							class="search_text" @keyup.enter="navToSearchResult" 
							>
					<view type="button" @click="navToSearchResult" class="search_submit">
						<img src="data:image/png;base64,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" alt="" class="button_img">
					</view>
					<view class="history_box" :class="{display_show:tabHistory==1}" >
			            <view class="history_box_content">
			                <view class="history_box_title">
			                    <span class="OLt9U">最近搜索</span>
			                     <span class="b5nQ3" @click="deleteHistory">清除所有</span>
			                </view>
			                <view class="history_item">
			                    <view  v-for="(item,index) in historyList" :key="index" :title="item" @click="quickNav(item)" class="_4enLb">
			                        <span class="_34evo">{{item}}</span>
			                                <!--<van-icon name="cross" style="top: 0.07rem;padding-right: 0.1rem;"/>-->
			                     </view>
			                </view>
			            </view>
			        </view>
			        <view style="clear: both;"></view>		
				</view>
			</view>
		</view>
		<view class="hidden_title">
			<p class="hidden_title_p">热门分类</p> 
			<view class="title_border"></view>
		</view>
		
		<view class="bl_1">
		    <view class="bl_box" @tap="goList"  v-for="(image, index) in classify" :key="index">
		       <p class="bl_box_title_p">{{image.title}}</p>
		            <view class="bl_box_title"></view>
		                <img class="class_img2"  :src="image.url"  />
		            </view>
		            <view style="clear: both;"></view>
		</view>
				
		 <view class="bl_more" >查看更多</view>
		        
		<view class="bl_2">
		   <img class="bl_img2" style="height: auto;"  :src="messageContent.logo" />
		</view>
		
		<view class="hidden_title"  >
		    <p class="hidden_title_p">合作品牌</p>
		     <view class="title_border"></view>
		</view>
				
		<view class="bl_3" >
		    <view class="bl_3_box" v-for="(image, index) in partner" :key="index">
		        <img class="bl_img2"  :src="image.images"  />
		    </view>
		    <view style="clear: both;"></view>
		</view>
		
		<view class="footer" >
		    <view class="footer_content">
		       <navigator  @click="callPhone()" class="call_phone">
		        <img class="call_phone_img"  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAArCAYAAADhXXHAAAAC0ElEQVRYhc2ZTYhNYRjHf0bGGMlXyNDYTEQaXyuahixMImnSZFZWsyFlLLDCTmwoSbGYjJUp0cQ0IXaiJkkpCylNjIXyNRhj6q/n9p7pznXuvec995xz51fP7jzP/Z33nHPf531fJIXFMkl9kkYkHZE0s8h1mUbYj7U4yXyeSFo63WT3SRpTOMOSNkwX2W2SfhcRDfgmaUe1ZGfkjGE+8BpYQXnGgT3AowjXJkqNK3YmoqhRC/QDO7OWtZFdBHwA6jxzfwKtwIuU3P7DRrYjhqgxF7gHNKTsOInJtlWQvxzosSeUsFcoJrupwhq7gPaU/KZgsosTqNOUoFNR7ANThTW+A2uBjyl65rCRnaiwRlcWojjZkQryTwJ9CfqUxGTfx8w9D1zIyDOHyT6LkWeip1LwKYnJPvXM6amGKE72ITDmkXMrRZ+SmOwoMOCR01wFzxxB13XdI6czJZeyBP2sze1vgNUR83YDg1nLBiMr94VH5RIwu1qyRi/wNmLeGs+bS4aCdU57mTVYIYeqvRQf9JAdl7S3mrJNkkY9hH9VKHxQUmtcWYvDnq/DeIxXwnZ5buTVGJDUGEfW/tL6PYWNc5JqIojWSrobkv/VfTdeshYLJb2LIfxYUkOJuvWS7pepcdpX1mK924Xx5YukrpBRrnc3E4Wr7glHlrVoc+9kHF5J6pRUJ2mlpCHPGpd9ZXEbdnGF5fbQim34leNY4BH0BlGwfuA2MCfjecvWiFuBIR9ZXJK1kwvScwvlJbDFVxbXF9xxy+8s6Ygja8xzjc/+DGUf1ES4KIwfbsvoOPAnXcdJmuOObD7rgJvA5sT1pnIibvNRGLMkdbvpMg16bYJISjYIO9G5JmkiQdGLwdFW0rJBWPd0JcKBSik+SToQZwaLG0skHZX03EPys6SzdnxQ+JtJfGBRWQVsB1qAjUCjOx74Cwy7swnbcLGtfzuvmArwD87H7ePp0eXXAAAAAElFTkSuQmCC" />
		                    点击联系我们
		        </navigator>
		        <img class="footer_img1"  :src="messageContent.pic2"/>
		        <view style="clear: both;margin-bottom: 0.6rem;"></view>
		        <view class="footer_content_2">
		            <p>{{messageContent.title}}</p>
		            <p>{{messageContent.title1}}</p>
		            <p>{{messageContent.title2}}</p>
		            <p>{{messageContent.title3}}</p>
		            <p>{{messageContent.title4}}</p>
		        </view>
		        <img class="footer_img2"  :src="messageContent.pic" />
		        <view style="clear: both;"></view>
		    </view>
		</view>
				
		<!-- 	<view  class="homeTab">
			<u-tabs name="cate_name" count="tab_count" :list="list" :is-scroll="true" :current="currentTab" @change="changeTab"></u-tabs>
			</view>
			<view class="wrap">
					<u-swiper-my  :list="banner" :title="false" :autoplay="false" mode="none" :effect3d="true">
				
					</u-swiper-my>
			</view>
			<view class="goBuy" @click="goB" >立即下载</view> -->
	</view>
	
</template>

<script>
	 import yyVideoPlayer from '@/components/yy-video-player/yy-video-player.nvue';
	import {banner,headnav,chooseNav,sendCode,loginD,alipay,newIndex} from '@/config/http.js';
	export default {
	
		data() {
			return {
				title: '食图图视频素材库',
				list: [],
				currentTab: 0,
				banner: [],
				navId:1,
				myData:'',
				sessionkey:'',
				openid:'',
				bannerList:[{
						image: 'https://image.shitutu.com/uploads/20200815/ba60ea5b244142569b7604315c1f30f8.jpg_artwork',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}
				],
				classify:[],
				messageContent:'',
				partner:[],
				searchType:[
				    {
				        value: "1",
				        label: "图片"
				    },
				    {
				        value: "2",
				        label: "视频"
				    },
				    {
				        value: "3",
				        label: "设计"
				    },
				        ],
				toSearchType:1,
				toSearchLabel:"图片",
				tabClick:1,
				tabHistory:2,
				historyList:[],
				searchValue:'',
			}
		},
		onLoad() {

		},
		onShow:function(){
		    //获取全局设置的变量
		    this.memberData = this.$member.memberObj;
		    console.log(this.memberData);
		    //输出值{name:'初始姓名'}
		},
		methods: {
			// changeTabNav(index) {
			// 				this.currentTab = index;
			// 				this.navId = this.list[index]['id']
			// 			chooseNav({
			// 				'id':this.navId
			// 			}).then(res => {
			// 				this.banner = res.data.data.list
			// 			   console.log(res.data.data.list);
			// 			 })
			// 			},
			 getData() {
				chooseNav().then(res => {
						this.banner = res.data.data.list
				})
				headnav().then(res => {
				 	this.list = res.data.data.list
				})
				newIndex().then(res => {
				 	if (res.data.code == 1) {
				 	    this.classify = res.data.data.classify;
						 this.messageContent = res.data.data.messageContent;
						  this.partner = res.data.data.partner;
				 	     }else {
				 	    console.log(res.msg);
				 	     }
				})
			},
			getDYuserinfo(){
				var that = this
				uni.login({
					  provider: 'toutiao',//这里服务商名是字节跳动小程序 所以填toutiao
					  success: function (loginRes) {
						  sendCode({
						  	'code':loginRes.code
						  }).then(res => {
							  if(res.data.code == 1){
							   console.log(res);   
						  	that.sessionkey = res.data.data.list.session_key
							that.openid = res.data.data.list.openid
							that.getinfo(that.sessionkey)
							}
						   })
						}
					});
			},
			getinfo(sessionkey){
				var that = this
			 uni.getUserInfo({
			      provider: 'toutiao',
			      success: function (infoRes) {
					   that.$member.setMemberObj(infoRes);
					  loginD({
						'openid' : that.openid,
						'avatarUrl' : infoRes.userInfo.avatarUrl,
						'city' : infoRes.userInfo.city,
						'country' : infoRes.userInfo.country,
						'gender' : infoRes.userInfo.gender,
						'language' : infoRes.userInfo.language,
						'nickName' : infoRes.userInfo.nickName,
						'province' : infoRes.userInfo.province,
					  }).then(res => {
							if(res.data.code == 0){
								uni.showToast({
								    title: res.data.msg,
								    duration: 2000
								});
						
							}else{
								uni.showToast({
								    title: res.data.msg,
								    duration: 2000
								});
							}
					   })
					 
			      }
			    });
				},
				goB(){
					alipay().then(e => {
						let order = JSON.parse(e.data.data.list);
						console.log(e,221)
						if(e.data.code == 1){
						        uni.requestPayment({
									provider: 'toutiao',
									service: 4, // 不拉起字节跳动小程序收银台
									 _debug: 1,
									payChannel: {
						            default_pay_channel: 'alipay' // wx || alipay
									},
									orderInfo: order, // 订单信息
									getOrderStatus(res) {
						            let { out_order_no } = res;
									    return new Promise(function (resolve, reject) {
						                })
									},
									success: (res) => {
						            console.log("成功");
						            console.log(res);
						        },
									fail: (res) => {
						            console.log("失败");
						            console.log(res);  // 错误代码：CD0015 CD0025
						        }
								})
								// _this.loadModal = false;
							}

					 })
				},
				 changeSearchType(item,label){
				                   this.toSearchType = item
				                   this.toSearchLabel = label
				            },
				goList(e){
					console.log(e)
					uni.navigateTo({
					    url: '../list/index',
					    success: res => {},
					    fail: () => {},
					    complete: () => {}
					});
				},
				stop(){
					window.event? window.event.cancelBubble = true : e.stopPropagation();
				},
				 changeTab(){
					 	var that = this;
				    if(that.tabClick == 1){
				        that.tabClick = 2
					console.log(123)
						uni.showToast({
						title: that.tabClick,
						icon:'none',
						duration: 2000
						});
				    }
				    if(that.tabHistory == 1){
				        that.tabHistory = 2
				    }
				},
				changeTab2(){
					if(this.tabClick ==2){
						this.tabClick = 1
					}
					if(this.tabHistory ==1){
						this.tabHistory = 2
					}
				},
				  showHistory(){
				                if(this.tabHistory ==2){
				                    this.tabHistory = 1
				                }
				                if(this.tabClick ==2){
				                    this.tabClick = 1
				                }
				                console.log(this.historyList);
				            },
				 navToSearchResult(){
					 if(this.tabHistory ==2){
					     this.tabHistory = 1
					 }
					 if(this.tabClick ==2){
					     this.tabClick = 1
					 }
					 var that = this;
				                if(that.toSearchType != 1){
									uni.showToast({
									title: '开发中，敬请期待！',
									icon:'none',
									duration: 2000
									});
				                    return;
				                }
				                if(!that.searchValue){
									uni.showToast({
									title: '请输入搜索内容！',
									icon:'none',
									duration: 2000
									});
				                    return;
				                }
								if (!that.historyList.includes(that.searchValue)) {
													that.historyList.unshift(that.searchValue);
													uni.setStorage({
														key: 'historyList',
														data: JSON.stringify(that.historyList)
													});
								}else {
										//有搜索记录，删除之前的旧记录，将新搜索值重新push到数组首位
										let i = that.historyList.indexOf(that.searchValue);
										that.historyList.splice(i, 1);
										that.historyList.unshift(that.searchValue);
										uni.showToast({
											title: '不能重复添加'
										});
										uni.setStorage({
											key: 'historyList',
											data: JSON.stringify(that.historyList)
										});
									}
				    //             if(that.historyList.indexOf(that.searchValue)==-1){
				    //                 if(that.historyList.length==20){
				    //                     that.historyList.shift();
				    //                 }
				    //                 that.historyList.push(that.searchValue);
									
								// 	console.log(that.historyList,22221)
								// 	uni.setStorage({key: 'historyList',data: that.historyList});
								
									
				    //                 // uni.setStorage.setItem("historyList",JSON.stringify(that.historyList));
				    //             }
				                // that.$router.push({ path: '/searchResult', query: { value: that.searchValue }  })
				            },
				   deleteHistory(){
				                // Dialog.confirm({
				                //     title: '提示',
				                //     message: '是否全部删除'
				                // }).then(() => {
				                    localStorage.removeItem('historyList');
				                    this.historyList=[];
				                // })
				            },
				callPhone(){
					uni.makePhoneCall({
					 	
					 	// 手机号
					    phoneNumber: this.messageContent.phone, 
					
						// 成功回调
						success: (res) => {
							console.log('调用成功!')	
						},
					
						// 失败回调
						fail: (res) => {
							console.log('调用失败!')
						}
						
					  });
				}
		},
		created() {
			 this.getData();
			 this.getDYuserinfo();
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
	.homeTab{
		width: 80%;
		margin: 0 auto;
	}
		.wrap {
			padding: 40rpx;
		}
		.goBuy{
			width: 60%;
			margin: 0 auto;
			background-color: #009DFB;
			color: #FFFFFF;
			font-size: 30rpx;
			letter-spacing: 10rpx;
			text-align: center;
			height:90rpx;
			line-height: 90rpx;
			border-radius: 50rpx;
		}
</style>
