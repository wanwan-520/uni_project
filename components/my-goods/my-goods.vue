<template>
    <view class="goods_item">
        <!-- 商品左侧图片区域 -->
                <view class="goods-item-left">
                  <radio :checked="goods.goods_state" color="#c00000" v-if="showRadio" @click="radioClickHandler"></radio>
                  <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
                </view>
                <!-- 商品右侧信息区域 -->
                <view class="goods-item-right">
                  <!-- 商品标题 -->
                  <view class="goods-name">{{goods.goods_name}}</view>
                  <view class="goods-info-box">
                    <!-- 商品价格 -->
                    
                    <view class="goods-price">￥{{goods.goods_price | tofixed}}</view>
                     <!-- 商品数量 -->
                      <uni-number-box :min="1" :value="goods.goods_count" v-if="showNum" @change="numChangeHandler"></uni-number-box>
                  </view>
             </view>
    </view>
</template>

<script>
  export default {
     // 定义 props 属性，用来接收外界传递到当前组件的数据
        props: {
          // 商品的信息对象
          goods: {
            type: Object,
            defaul: {},
          },
          showRadio:{
            type:Boolean,
            //默认情况下不会展示radio组件
            default:false
          },
          showNum:{
            type:Boolean,
            default:false
          }
        },
    name:"my-goods",
    data() {
      return {
        // 默认的空图片
           defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png' 
      };
    },
    filters:{
       // 把数字处理为带两位小数点的数字
        tofixed(num) {
          return Number(num).toFixed(2)
        }
    },
    methods:{
      //点击事件处理函数
      radioClickHandler(){
        this.$emit('radio-change',{
          goods_id:this.goods.goods_id,
          goods_state:!this.goods.goods_state
        })
      },
      //监听到了NumberBox组件数量变化的事件
      numChangeHandler(val){
        console.log(val)
        this.$emit('num-change',{
          goods_id:this.goods.goods_id,
          goods_count:+val
        })
      }
    }
  }
</script>

<style lang="scss">
.goods_item {
   // 让 goods-item 项占满整个屏幕的宽度
    width: 750rpx;
    // 设置盒模型为 border-box
    box-sizing: border-box;
  display: flex;
  padding: 10px 5px;
  border-bottom: 1px solid #ffe186;

  .goods-item-left {
    margin-right: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
 
    .goods-pic {
      width: 100px;
      height: 100px;
      display: block;
    }
  }

  .goods-item-right {
    display: flex;
    flex:1;
    flex-direction: column;
    justify-content: space-between;

    .goods-name {
      font-size: 13px;
    }
.goods-info-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
    .goods-price {
      font-size: 16px;
      color: #c02e6d;
    }
  }
}
</style>
