<template>
  <view class="my-settle-container">
    <!-- 全选组件 -->
    <label class="radio" @click="changeAllState">
      <radio color="#c00000" :checked="isFullCheck"/><text>全选</text>
    </label>
    
    <!-- 合计 -->
    <view class="amount-box">
      合计:<text class="amount">${{checkedGoodsAmount}}</text>
    </view>
    
    <!-- 结算按钮 -->
    <view class="btn-settle" @click="settlement">
    结算 ({{checkedCount}})
    </view>
  </view>
</template>

<script>
  import {mapGetters,mapMutations,mapState} from 'vuex'
  export default {
    name:"my-settle",
    data() {
      return {
        //倒计时的秒数
        seconds:3,
        timer:null
      };
    },
    computed:{
      ...mapGetters('m_cart',['checkedCount','total','checkedGoodsAmount']),
       ...mapGetters('m_user', ['addstr']),
          // token 是用户登录成功之后的 token 字符串
          ...mapState('m_user', ['token']),
          ...mapState('m_cart',['cart']),
      //是否全选
       isFullCheck() {
            return this.total === this.checkedCount
          },
    },
    methods:{
      ...mapMutations('m_cart',['updateAllGoodsState']),
      ...mapMutations('m_user',['updateRedirectInfo']),
      changeAllState(){
        this.updateAllGoodsState(!this.isFullCheck)
      },
      // 点击了结算按钮
      settlement(){
         // 1. 先判断是否勾选了要结算的商品
          if (!this.checkedCount) return uni.$showMsg('请选择要结算的商品！')
        
          // 2. 再判断用户是否选择了收货地址
          if (!this.addstr) return uni.$showMsg('请选择收货地址！')
        
          // 3. 最后判断用户是否登录了
          if (!this.token) return this.delayNavigate()
          
          this.payOrder()
      },
    // async payOrder(){
    //     //1.创建订单
    //      // 1.1 组织订单的信息对象
    //       const orderInfo = {
    //         // 开发期间，注释掉真实的订单价格，
    //         // order_price: this.checkedGoodsAmount,
    //         // 写死订单总价为 1 分钱
    //         order_price: 0.01,
    //         consignee_addr: this.addstr,
    //         goods: this.cart.filter(x => x.goods_state).map(x => ({ 
    //           goods_id: x.goods_id,
    //            goods_number: x.goods_count, 
    //            goods_price: x.goods_price 
    //            }))
    //       },
    //       // 1.2 发起请求创建订单
    //       const { data: res } = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo)
    //       if (res.meta.status !== 200) return uni.$showMsg('创建订单失败！')
    //       // 1.3 得到服务器响应的“订单编号”
    //       const orderNumber = res.message.order_number
        
    //        // 2. 订单预支付
        
    //        // 3. 发起微信支付
    //   },
      //延迟导航到my的页面
      delayNavigate(){
        this.seconds=3
        
        this.showTips(this.seconds)
        
     this.timer = setInterval(()=>{
          this.seconds--
          if(this.seconds<=0){
            clearInterval(this.timer)
            uni.switchTab({
              url:'/pages/my/my',
              success:()=>{
                this.updateRedirectInfo({
                  openType:'switchTab',
                  from:'/pages/cart/cart'
                })
              }
            })
            return
          }
          this.showTips(this.seconds)
        },1000)
      },
      //展示倒计时的提示消息
      showTips(n){
        uni.showToast({
          icon:'none',
          title:'请登录后再结算'+n+'秒后跳转页面',
          mask:true,
          duration:1500
        })
      }
    }
  }
</script>

<style lang="scss">
.my-settle-container{
  position: fixed;
  bottom:0;
  left:0;
  width:100%;
  height:50px;
  background-color:white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  padding-left: 8px;
  
  .radio {
      display: flex;
      align-items: center;
    }
  
    .amount {
      color: #c00000;
    }
  
    .btn-settle {
      height: 50px;
      min-width: 100px;
      background-color: #c00000;
      color: white;
      line-height: 50px;
      text-align: center;
      padding: 0 10px;
    }
  
  
  
}
</style>
