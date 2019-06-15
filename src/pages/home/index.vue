<template>
  <div class="container">
    <my-swiper :imageList="imageList" width="100%" 
               :indicatorDots="swiperOption.indicatorDots" 
               :autoplay="swiperOption.autoplay"
               :circular="swiperOption.circular"></my-swiper>
  </div>
</template>

<script>
import MySwiper from '../../components/Swiper'
export default {
  data () {
    return {
      imageList: [
        'http://psdme4dz2.bkt.clouddn.com/avatar/root1559397165626.jpg',
        'http://psdme4dz2.bkt.clouddn.com/avatar/majiaao1559320046685.jpg'
      ],
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
    }
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}
.all {
  width: 7.5rem;
  height: 1rem;
  background-color: blue;
}
.all:after {
  display: block;
  content: "";
  clear: both;
}
.left {
  float: left;
  width: 3rem;
  height: 1rem;
  background-color: red;
}

.right {
  float: left;
  width: 4.5rem;
  height: 1rem;
  background-color: green;
}
</style>
