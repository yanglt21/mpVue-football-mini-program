<template>
  <div class="container">
    <my-swiper
      :imageList="bannerList"
      width="100%"
      :indicatorDots="swiperOption.indicatorDots"
      :autoplay="swiperOption.autoplay"
      :circular="swiperOption.circular"
    ></my-swiper>
    <div class="container-grid">
      
    </div>
  </div>
</template>

<script>
import MySwiper from '../../components/Swiper'
const Url = require('../../utils/Url.js')
export default {
  data () {
    return {
      bannerList: [],
      swiperOption: {
        indicatorDots: true,
        autoplay: true,
        circular: true
      }
    }
  },

  components: {
    MySwiper
  },

  methods: {
    bindViewTap () {
      const url = '../logs/main'
      if (mpvuePlatform === 'wx') {
        mpvue.switchTab({ url })
      } else {
        mpvue.navigateTo({ url })
      }
    },
    clickHandle (ev) {
      console.log('clickHandle:', ev)
      // throw {message: 'custom test'}
    },
    fetchHomeData () {
      this.$http.post(Url.home, {}).then(res => {
        if (res.data.status) {
          const data = res.data.data
          this.bannerList = data.banner
        } else {
          wx.showToast({
            title: res.data.msg
          })
        }
      })
    }
  },

  created () {
    this.fetchHomeData()
    console.log(this.$http)
    // let app = getApp()
  }
}
</script>

<style lang="scss" scoped>
.container-grid {
  width: 100vw;
  height: 100px;
  background-color: $subject-color;
}
.box {
  width: 40px;
  height: 40px;
  background-color: palegoldenrod;
}
</style>
