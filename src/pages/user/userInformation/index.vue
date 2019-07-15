<template>
  <div class="container flex-column-x-center">
    <div class="user-info-cell">
      <div class="user-image">
        <image class="user-image-icon" :src="userIcon" mode="widthFix"></image>
      </div>
    </div>
    <div class="width-90 flex-row-space-between user-info-cell" v-for="(item,index) in userInfoList" 
         v-bind:key="index">
         <div>{{item.title}}</div>
         <div>{{item.value}}</div>
    </div>
    <div class="width-90 log-out" @click="logout">退出登录</div>
  </div>
</template>

<script>
const localStorage = require('../../../utils/localStorage.js')
const model = require('../../../utils/model.js')
const Url = require('../../../utils/Url.js')
export default {
  name: 'UserInformation',
  components: {},
  props: {},
  data () {
    return {
      isLogin: false,
      userIcon: '',
      userInfoList: []
    }
  },
  watch: {},
  computed: {},
  methods: {
    logout () {
      this.$http
        .post(Url.logout, {
          user_session: model.token || null
        })
        .then(res => {
          const status = res.data.status
          if (status) {
            localStorage.clearUserInfo(model)
            wx.switchTab({
              url: '/pages/user/userCenter/main'
            })
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'error',
              duration: 1500,
              mask: false
            })
          }
        })
    },
    fetchUserInfo () {
      const self = this
      this.$http
        .post(Url.getUserInformation, {
          open_id: model.openId
        })
        .then(res => {
          if (res.data.status) {
            const data = res.data.data
            this.userIcon = data.avatar_url
            self.standardUserInfo(data.user_info)
          } else {
            wx.showToast({
              title: res.data.msg
            })
          }
        })
    },
    standardUserInfo (userInfo) {
      this.userInfoList.push({
        title: '昵称',
        value: userInfo.user_name
      },
      {
        title: '性别',
        value: userInfo.sex
      }, {
        title: '城市',
        value: userInfo.province
      }, {
        title: '国籍',
        value: userInfo.country
      })
    }
  },
  created () {},
  mounted () {},
  onShow () {
    this.fetchUserInfo()
  }
}
</script>
<style lang="scss" scoped>
.log-out {
  height: 90rpx;
  border: 1px solid white;
  color: white;
  font-size: 18px;
  font-weight: 500;
  line-height: 90rpx;
  text-align: center;
  border-radius: 10rpx;
  margin-top: 100rpx;
}
.user-image-icon {
  width: 100px;
  border-radius: 50%;
  border: 1px solid white;
}
.user-info-cell:nth-of-type(1) {
  border: none;
}
.user-info-cell {
  padding: 40rpx 0px;
  color: white;
  font-weight: 500;
  font-size: 32rpx;
  border-bottom: 1px solid #6441a5;
}
</style>