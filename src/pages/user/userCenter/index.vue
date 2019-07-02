<template>
  <div class="container">
    <div class="width-100 flex-row-y-center user-content">
      <button class="width-100 flex-row-y-center" open-type="getUserInfo" @getuserinfo='onGetUserInfo'>
        <image class="user-icon" :src="userIcon" mode="widthFix"></image>
        <div>立即登录</div>
      </button>
    </div>
  </div>
</template>

<script>
const Url = require('../../../utils/Url.js')
export default {
  name: 'userCenter',
  components: {},
  props: {},
  data () {
    return {
      userIcon: '/static/images/user_icon.png'
    }
  },
  watch: {},
  computed: {},
  methods: {
    onGetUserInfo (ev) {
      const detail = ev.mp.detail
      console.log(JSON.parse(detail.rawData))
      debugger
      this.$http.getWxCode().then((res) => {
        const code = res.code
        console.log(code)
        this.$http.post(Url.getOpenId, {
          code: code
        }).then(res => {
          debugger
        })
      })
    }
  },
  created () {},
  mounted () {
  }
}
</script>
<style scoped lang="scss">
.user-content {
  height: 20vh;
  box-sizing: content-box;
  background-color:#302b63;
  color: white;
}
.user-icon {
  width: 80px;
}
</style>