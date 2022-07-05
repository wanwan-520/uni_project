<template>
  <view>
    <!-- 使用自定义的搜索组件 -->
    <view class="search-box">
      <my-search @click="gotoSearch"></my-search>
    </view>
    
    
   <!-- 轮播图示例代码 -->
   <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
     <swiper-item v-for="(item,i) in swiperList" :key="i">
       <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+ item.goods_id">
         <image :src='item.image_src'></image>
       </navigator>
     </swiper-item>
     <swiper-item>
       <view class="swiper-item"></view>
     </swiper-item>
   </swiper>
   
   <!-- 分类导航区 -->
   <view class="nav_list">
     <view class="nav_item" v-for="(item,i) in navList" :key='i' @click="navClickHandler(item)">
       <image :src="item.image_src" class="nav-image"></image>
     </view>
   </view>
   
   <!-- 楼层区域 -->
   <!-- 楼层的容器 -->
   <view class="floor_list">
     <!-- 每一个楼层的item项 -->
     <view class="floor_item" v-for="(item,i) in floorList" :key="i">
       <image :src="item.floor_title.image_src" class="floor_title"></image>
        <!-- 楼层的图片区域 -->
        <view class="floor-img-box">
           <!-- 左侧大图片的盒子 -->
          <navigator class="left-img-box" :url="item.product_list[0].url">
            <image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
          </navigator>
           <!-- 右侧 4 个小图片的盒子 -->
          <view class="right-img-box">
            <navigator class="right-img-item" v-for="(item2, i2) in item.product_list" :key="i2" v-if="i2 !== 0" :url="item2.url">
                 <image :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}"></image>
            </navigator>
          </view>
        </view>
     </view>
   </view>
  </view>
</template>

<script>
  import badgeMix from '@/mixins/tabbar-badge.js'
  export default {
    mixins:[badgeMix],
    data() {
      return {
          //这是轮播图的数据列表
          swiperList:[],
          navList:[],
          //楼层数据
          floorList:[]
      };
    },
    onLoad(){
      this.getSwiperList()
      this.getNavList()
      this.getFloorList()
    },
    methods:{
     async getSwiperList(){
    const {data:res} = await uni.$http.get('/api/public/v1/home/swiperdata')
     //请求失败
      if(res.meta.status!==200){
           return uni.$showMsg()
          
      }
   
      
      this.swiperList = res.message
      },
     async getNavList(){
    const {data:res} = await  uni.$http.get('/api/public/v1/home/catitems')
     if(res.meta.status!==200)return uni.$showMsg()
     this.navList = res.message
      },
      navClickHandler(item){
        if(item.name==='分类'){
          uni.switchTab({
            url:'/pages/cart/cart'
          })
        }
      },
      //获取楼层数据
    async  getFloorList(){
    const {data:res} = await  uni.$http.get('/api/public/v1/home/floordata')
    if(res.meta.status!==200)return uni.$showMsg()
    
    //对数据进行处理
    res.message.forEach(floor =>{
      floor.product_list.forEach(prod=>{
        prod.url='/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
      })
    })
    this.floorList = res.message
      },
      gotoSearch() {
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      }
    }
  }
</script>

<style lang="scss">
// swiper {
//   height:220rpx;
//   // .swiper-item,
//   image{
//     width:100%,
//     height:100%;
//   }
// }
swiper{
  height: 330rpx;
  .swiper-item,image{
    width: 100%;
    height: 100%;
  }
}


.nav_list{
  display: flex;
  justify-content: space-around;
  margin: 16px 0;
}

.nav-image{
  width:120rpx;
  height: 140rpx; 
}
.floor_title{
  width:100%;
  height:60rpx;
}

.right-img-box{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.floor-img-box{
  display: flex;
  padding-left: 12rpx;
}

.search-box {
  // 设置定位效果为“吸顶”
  position: sticky;
  // 吸顶的“位置”
  top: 0;
  // 提高层级，防止被轮播图覆盖
  z-index: 999;
}
</style>
