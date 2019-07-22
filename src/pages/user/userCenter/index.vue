<template>
  <div class="container">
    <div class="width-100 flex-row-y-center user-content">
      <button class="width-100 flex-row-y-center user-confirm-btn" 
              open-type="getUserInfo" @getuserinfo='handleLogin'
              lang="zh_CN"
              v-if="!isLogin">
        <image class="user-icon" :src="userIcon" mode="widthFix"></image>
        <div class="login-btn">立即登录</div>
      </button>
      <block v-else>
            <image :src="userInfo.avatarUrl" mode="widthFix" class="user-icon-login"></image>
            <div class="user-info-content flex-column-y-center">
                <div class="nike-name">{{userInfo.nickName}}</div>
                <div class="user-info-btn" @click="actionUserInformation">个人信息</div>
            </div>
      </block>
    </div>
    <div class="navigation-bar">
        
    </div>
  </div>
</template>

<script>
const Url = require('../../../utils/Url.js')
const localStorage = require('../../../utils/localStorage.js')
const model = require('../../../utils/model.js')
export default {
  name: 'userCenter',
  components: {},
  props: {},
  data () {
    return {
      userIcon: '/static/images/user_icon.png',
      isLogin: false,
      userInfo: {}
    }
  },
  watch: {},
  computed: {},
  methods: {
    /**
     * 获取用户中心数据
    */
    fetchUserCenter () {
      console.log('用户token:', model.token)
      this.$http.post(Url.userCenter, {
        token: model.token || null
      }).then(res => {
        const data = res.data.data
        this.isLogin = data.isLogin
        model.isLogin = data.isLogin
        if (data.isLogin) this.userInfo = model
        localStorage.asyncStorageUserData()
      })
    },
    /**
     * 登录
     * 前端传递 用户信息 code给后端
     * 后端存储 用户信息 openId 创建user_id 返回token,user_id
    */
    async handleLogin (ev) {
      const detail = ev.mp.detail
      const userInfo = JSON.parse(detail.rawData)
      this.$http.getWxCode().then(res => {
        const code = res.code
        this.postUserCode(code, userInfo)
      })
    },
    /**
     * 将code传递给后端
    */
    postUserCode (code, userInfo) {
      this.$http.post(Url.login, {
        code: code,
        user_info: userInfo
      }).then(res => {
        if (res.data.status) {
          const data = res.data.data
          model.token = data._3rd_session
          model.openId = data.open_id
          model.userId = data.user_id
          this.saveUserInfo(userInfo)
          localStorage.asyncStorageUserData()
          this.fetchUserCenter()
        } else {
          wx.showToast({
            title: res.data.msg,
            mask: false
          })
        }
      })
    },
    saveUserInfo (userInfo) {
      model.avatarUrl = userInfo.avatarUrl
      model.country = userInfo.country
      model.sex = userInfo.gender === 1 ? '男' : '女'
      model.nickName = userInfo.nickName
      model.province = userInfo.province
    },
    actionUserInformation () {
      wx.navigateTo({
        url: '/pages/user/userInformation/main'
      })
    }
  },
  created () {
  },
  mounted () {
  },
  onShow () {
    this.fetchUserCenter()
  }
}
</script>
<style scoped lang="scss">
.user-content {
  height: 20vh;
  box-sizing: content-box;
  background-color:#302b63;
  color: white;
  background-image: url('https://spacebox-resources.oss-cn-beijing.aliyuncs.com/wxapp/mine_hearder_banner.png');
  background-size: 100% 100%;
}
.user-icon {
  width: 180rpx;
  border-radius: 50%;
}
.user-confirm-btn {
  width: 100vw;
  height: 100%;
  background-color: transparent;
  color: white;
}
.nike-name {
  font-size: 36rpx;
  margin-left: 20rpx;
  font-weight: 500;
}
.login-btn {
  margin-left: 20rpx;
  font-weight: 500;
  font-size: 22px;
}
.user-icon-login {
  width: 150rpx;
  border-radius: 50%;
  margin-left: 80rpx;
}
.user-info-btn {
  padding: 5px 10px;
  border: 2px solid white;
  font-size: 14px;
  font-weight: 500;
  margin: 20rpx 0 0 20rpx;
}
</style>