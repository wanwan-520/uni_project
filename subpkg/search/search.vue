<template>
  <view>
    <view class="search-box">
      <!-- 使用 uni-ui 提供的搜索组件 -->
        <uni-search-bar @input="input" :radius="100" cancelButton="none"></uni-search-bar>
        
        <!-- 搜索建议列表 -->
        <view class="sugg-list" v-if="searchResults.length!==0">
          <view class="sugg-item" v-for="(item,i) in searchResults":key="i"@click="gotoDetail(item)">
            <view class="goods_name">
              {{item.goods_name}}
               <uni-icons type="arrowright" size="16"></uni-icons>
            </view>
          </view>
        </view>
        
        <!-- 搜索历史列表 -->
        <view class="history-box" v-else>
          <!-- 标题区域 -->
          <view class="history-title">
            <text>搜索历史</text>
             <uni-icons type="trash" size="17" @click="clean"></uni-icons>
          </view>
          <!-- 列表区域 -->
          <view class="history-list">
            <uni-tag :text="item" v-for="(item, i) in historys" :key="i" @click="gotoGoodsList(item)"></uni-tag>
          </view>
        </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        timer:null,
        kw:'',
        //搜索的结果列表
        searchResults:[],
        //搜素历史的数组
        historyList:[]
      };
    },
    onLoad() {
      this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
    },
    methods: {
      input(e) {
        // e.value 是最新的搜索内容
      clearTimeout(this.timer)
     this.timer = setTimeout(()=>{
          // console.log(e)
          this.kw = e
          this.getSearchList()
        },1000)
        // console.log(e)
      },
    async  getSearchList(){
        //判断关键词是否为空
        if(this.kw.length === 0){
          this.searchResults = []
          return 
        }
        
  const {data:res} = await uni.$http.get('/api/public/v1/goods/qsearch',{query:this.kw})
        if (res.meta.status !== 200) return uni.$showMsg()
        this.searchResults = res.message
        
        this.saveSearchHistory()
      },
      gotoDetail(goods_id){
         uni.navigateTo({
            // 指定详情页面的 URL 地址，并传递 goods_id 参数
            url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
          })
      },
      saveSearchHistory(){
        // this.historyList.unshift(this.kw)
        const set = new Set(this.historyList);
        set.delete(this.kw)
        set.add(this.kw)
        
        // 4. 将 Set 对象转化为 Array 数组
          this.historyList = Array.from(set)
          
          //对搜索历史化的数据进行持久性的存储
          uni.setStorageSync('kw',JSON.stringify( this.historyList))
      },
      clean(){
        this.historyList = [],
        uni.setStorageSync('kw','[]')
      },
      gotoGoodsList(kw){
         uni.navigateTo({
            url: '/subpkg/goods_list/goods_list?query=' + kw
          })
      }
      
    },
    computed: {
      historys() {
        // 注意：由于数组是引用类型，所以不要直接基于原数组调用 reverse 方法，以免修改原数组中元素的顺序
        // 而是应该新建一个内存无关的数组，再进行 reverse 反转
        return [...this.historyList].reverse()
      }
    }
  }
</script>

<style lang="scss">
.uni-searchbar {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  position: relative;
  padding: 16rpx;
  /* 将默认的 #FFFFFF 改为 #C00000 */
  // background-color: #c00000;
}

.sugg-list {
  padding: 0 5px;

  .sugg-item {
    font-size: 12px;
    padding: 13px 0;
    border-bottom: 1px solid #efefef;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .goods_name {
      // 文字不允许换行（单行文本）
      white-space: nowrap;
      // 溢出部分隐藏
      overflow: hidden;
      // 文本溢出后，使用 ... 代替
      text-overflow: ellipsis;
      margin-right: 3px;
    }
  }
 
}
 .history-box {
    padding: 0 5px;
  
    .history-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      font-size: 13px;
      border-bottom: 1px solid #efefef;
    }
  
    .history-list {
      display: flex;
      flex-wrap: wrap;
  
      .uni-tag {
        margin-top: 5px;
        margin-right: 5px;
      }
    }
  }
</style>
