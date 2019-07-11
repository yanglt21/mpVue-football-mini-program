<template>
  <div class="container flex-column-x-center">
    <div class="user-info-cell">
        <div class="user-image">
        </div>
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
      isLogin: false
    }
  },
  watch: {},
  computed: {},
  methods: {
    logout () {
      this.$http.post(Url.logout, {
        user_session: model.token || null
      }).then((res) => {
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
    fetchUserInfo() {
        this.$http.post(Url.getUserInformation,{
          user_id: model.userId
        }).then((res)=> {
          debugger
        })
    }
  },
  created () {
    this.fetchUserInfo()
  },
  mounted () {}
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
}
</style>