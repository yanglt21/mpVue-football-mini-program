<template>
  <div class="container flex-column-x-center">
    <loading v-if="showLoading"></loading>
    <my-swiper
      :imageList="bannerList"
      width="100%"
      :indicatorDots="swiperOption.indicatorDots"
      :autoplay="swiperOption.autoplay"
      :circular="swiperOption.circular"
    ></my-swiper>     
    <div class="width-100 flex-row box">
      <div class="flex-row-center banner-btn" @click="handleCreateTeam" v-if="!isCreatedTeam">
        <image class="home-box-image" src="/static/images/create_team.png"></image>
        <span>创建球队</span>
      </div>
      <div class="flex-row-center banner-btn" @click="handlMineTeam" v-else>
        <image class="home-box-image" src="/static/images/create_team.png"></image>
        <span>我的球队</span>
      </div>
      <div class="flex-row-center banner-btn">
        <image class="home-box-image" src="/static/images/join_team.png"></image>
        <span>加入球队</span>
      </div>
    </div>
    <div class="width-100 calendar" v-if="isLogin && (isCreatedTeam || isJoinTeam)">
      <span class="calendar-title">近期活动</span>
    </div>
    <div class="football-data">
      
    </div>
  </div>
</template>

<script>
import MySwiper from '../../components/Swiper'
import Loading from '../../components/Loading'
const Url = require('../../utils/Url.js')
const Model = require('../../utils/model')
export default {
  data () {
    return {
      bannerList: [],
      swiperOption: {
        indicatorDots: true,
        autoplay: true,
        circular: true
      },
      isLogin: Model.isLogin,
      showLoading: true,
      isCreatedTeam: false,
      isJoinTeam: false
    }
  },

  components: {
    MySwiper,
    Loading
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
      this.$http.post(Url.home, {
        open_id: Model.openId || null
      }).then(res => {
        if (res.data.status) {
          const data = res.data.data
          this.bannerList = data.banner
          this.isCreatedTeam = data.is_created_team
          this.isJoinTeam = data.team_info.length > 0
        } else {
          wx.showToast({
            title: res.data.msg
          })
        }
      })
    },
    handleCreateTeam () {
      if (!Model.isLogin) return
      wx.navigateTo({
        url: '/pages/team/createTeam/main'
      })
    },
    handlMineTeam () {
      if (!Model.isLogin) return
      wx.navigateTo({
        url: '/pages/team/teamPage/main'
      })
    }
  },

  created () {
    // let app = getApp()
  },
  onShow () {
    this.fetchHomeData()
    this.showLoading = false
  }
}
</script>

<style lang="scss" scoped>
Page {
  background-color: $base-color;
}
.box {
  box-sizing: border-box;
  background:linear-gradient(236deg,rgba(232,118,193,1) 0%,rgba(188,104,234,1) 100%);
}
.banner-btn {
  box-sizing: border-box;
  width: 50%;
  height: 100%;
  color: white;
  font-size: 16px;
  font-weight: 500;
  padding: 20rpx 0px;
  span {
    margin-left: 20rpx;
  }
}
.banner-btn:nth-of-type(1) {
  border-right: .5px solid #eeeeee;
}
.home-box-image {
  width: 40rpx;
  height: 40rpx;
}
.calendar {
  color: white;
}
</style>
