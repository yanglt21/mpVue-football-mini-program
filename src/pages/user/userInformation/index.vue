<template>
  <div class="container">
    <div class="user-info-cell">
        
    </div>
    <div class="log-out" @click="logout">退出</div>
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
        }
      })
    }
  },
  created () {},
  mounted () {}
}
</script>
<style scoped>
</style>