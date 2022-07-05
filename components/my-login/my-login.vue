<template>
  <view class="login-container">
    <!-- 提示登录的图标 -->
        <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
        <!-- 登录按钮 -->
       <button type="primary" class="btn-login"  open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
         <!-- <button type="primary" class="btn-login" @click="getUserProfile">一键登录</button> -->
        <!-- 登录提示 -->
        <view class="tips-text">登录后尽享更多权益</view>
  </view>
</template>

<script>
  // 1. 按需导入 mapMutations 辅助函数
  import { mapMutations,mapState } from 'vuex'
  
  export default {
    name:"my-login",
    data() {
      return {
        
      };
    },
    computed:{
      ...mapState('m_user',['redirectInfo'])
    },
    
    methods:{
       ...mapMutations('m_user', ['updateUserInfo','updateToken','updateRedirectInfo']),
      
      // 获取微信用户的基本信息
       getUserInfo(e) {
        console.log(e)
      //     // 判断是否获取用户信息成功
      //     if (e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权！')
      
      //     // 获取用户信息成功， e.detail.userInfo 就是用户的基本信息
           console.log(e.detail.userInfo)
          this.updateUserInfo(e.detail.userInfo)
          
          // 获取登录成功后的 Token 字符串
            this.getToken(e.detail)
            // this.updateToken('123')
        },
        // 调用登录接口，换取永久的 token
        async getToken(info) {
          // 调用微信登录接口
        //   const [err, res] = await uni.login().catch(err => err)
        //   // 判断是否 uni.login() 调用失败
        //   if (err || res.errMsg !== 'login:ok') return uni.$showError('登录失败！')
        
        //   // 准备参数对象
        //   const query = {
        //     code: res.code,
        //     encryptedData: info.encryptedData,
        //     iv: info.iv,
        //     rawData: info.rawData,
        //     signature: info.signature
        //   }
        
        //   // 换取 token
        //   const { data: loginResult } = await uni.$http.post('/api/public/v1/users/wxlogin', query)
        //   if (loginResult.meta.status !== 200) return uni.$showMsg('登录失败！')
          
        //   //更新 vuex 中的 token
              this.updateToken('123')
              this.navigateBack()
          
        },
        navigateBack(){
          if(this.redirectInfo && this.redirectInfo.openType==='switchTab'){
            uni.switchTab({
              url:this.redirectInfo.from,
              complete: () => {
                this.updateRedirectInfo(null)
              }
            })
          }
        }
    }
  }
</script>

<style lang="scss">
.login-container {
  // 登录盒子的样式
  height: 750rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
  position: relative;
  overflow: hidden;

  // 绘制登录盒子底部的半椭圆造型
  &::after {
    content: ' ';
    display: block;
    position: absolute;
    width: 100%;
    height: 40px;
    left: 0;
    bottom: 0;
    background-color: white;
    border-radius: 100%;
    transform: translateY(50%);
  }

  // 登录按钮的样式
  .btn-login {
    width: 90%;
    border-radius: 100px;
    margin: 15px 0;
    background-color: #0bc04d;
  }

  // 按钮下方提示消息的样式
  .tips-text {
    font-size: 12px;
    color: gray;
  }
}
</style>
