<template>
  <div class="flex-column-x-center container">
    <div class="width-100 change-info-cell flex-column-x-center" v-if="type === 'age'">
      <div class="width-90 flex-row-space-between">
          <div>修改年龄</div>
          <div @click="handleShowPopup">{{userChoiceAge === -1 ? '修改': userChoiceAge}}</div>
      </div>
      <div :class="userChoiceAge === -1 ? 'container-btn-disable' : 'container-btn' "
           data-type="age" @click="handleSaveInformation">保存</div>
      <van-popup
        :show="showPopup"
        position="bottom"
        :close-on-click-overlay="true"
        v-on:close="onClose"
      >
        <van-picker :columns="ageList" :default-index="9"
                    @change="onChange" show-toolbar title="修改年龄"
                    @cancel="onCancel" @confirm="onConfirm"></van-picker>
      </van-popup>
    </div>
    <div class="width-100 flex-column-x-center" v-if="type === 'position'">
      <div class="tips" v-if="userChoicePosition === '' ">点击选择您场上位置</div>
      <div v-else class="width-90 flex-row-space-between">
        <div>您选择的位置:{{userChoicePosition}}</div>
        <div @click="handleSaveInformation" data-type="position">保存</div>
      </div>
      <div class="football-bg">
        <image class="football-bg-image" src="https://yuegeqiuba.oss-cn-beijing.aliyuncs.com/football_ground_bg.jpeg"
          mode="widthFix">
        </image>
        <div @click="handleChangePosition">
          <span class="football-bg-fornt-left" data-position="前锋">前锋</span>
          <span class="football-bg-fornt-right" data-position="前锋">前锋</span>
          <span class="football-bg-side-left" data-position="左边前卫">左边前卫</span>
          <span class="football-bg-side-right" data-position="右边前卫">右边前卫</span>
          <span class="football-bg-middle-top" data-position="前腰">前腰</span>
          <span class="football-bg-backend-bottom" data-position="后腰">后腰</span>
          <span class="football-bg-back-left" data-position="左后卫">左后卫</span>
          <span class="football-bg-back-right" data-position="右后卫">右后卫</span>
          <span class="football-bg-middle-back-left" data-position="中后卫">中后卫</span>
          <span class="football-bg-middle-back-right" data-position="中后卫">中后卫</span>
          <span class="football-bg-keeper" data-position="门将">门将</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const Url = require('../../../utils/Url')
const Model = require('../../../utils/model')
const Util = require('../../../utils/util')
let isChoiceAge = -1
export default {
  name: 'changeUserInformation',
  components: {},
  props: {},
  data () {
    return {
      type: '',
      ageList: [],
      showPopup: false,
      userChoiceAge: -1,
      userChoicePosition: ''
    }
  },
  watch: {},
  computed: {},
  methods: {
    handleShowPopup () {
      this.showPopup = !this.showPopup
    },
    makeAgeChoiceList () {
      for (let i = 14; i <= 65; i++) {
        this.ageList.push(i)
      }
    },
    onCancel () {
      isChoiceAge = -1
      this.handleShowPopup()
    },
    onConfirm () {
      this.userChoiceAge = isChoiceAge === -1 ? 24 : isChoiceAge
      this.handleShowPopup()
    },
    onChange (event) {
      const { value } = event.mp.detail
      isChoiceAge = value
    },
    handleChangePosition (ev) {
      this.userChoicePosition = ev.target.dataset.position
    },
    handleSaveInformation (ev) {
      const type = ev.currentTarget.dataset.type
      const templateData = {
        user_id: Model.openId
      }
      switch (type) {
        case 'age':
          templateData.type = 0
          templateData.age = this.userChoiceAge
          break
        case 'position':
          templateData.type = 1
          templateData.position = this.userChoicePosition
          break
      }
      this.$http.post(Url.changeUserInformation, templateData).then(res => {
        if (res.data.status) {
          wx.showToast({
            title: '个人信息修改成功',
            icon: 'success',
            duration: 1500,
            success: (result) => {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        } else {
          Util.showToast(res.data.msg)
        }
      })
    }
  },
  created () {},
  mounted () {
    this.makeAgeChoiceList()
  },
  onLoad (options) {
    const type = options.type
    this.type = type
    switch (type) {
      case 'age':
        wx.setNavigationBarTitle({
          title: '修改年龄'
        })
        break
      case 'position':
        wx.setNavigationBarTitle({
          title: '修改场上位置'
        })
        break
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  color: white;
  &-btn {
    width: 90vw;
    height: 90rpx;
    border-radius: 10rpx;
    text-align: center;
    line-height: 90rpx;
    color: white;
    background-color: #6441a5;
    margin-top: 90rpx;
    &-disable {
      @extend .container-btn ;
      color: white;
      background-color: #a9a9aa;
    }
  }
}
.change-info-cell {
  margin-top: 90rpx;
}
.football-bg {
  margin-top: 40rpx;
  width: 90vw;
  height: calc(90vh - 40rpx);
  background-color: red;
  position: relative;
  &-image {
    width:100%;
    position: absolute;
    top: 0;
    left: 0;
  } 
}
.football-bg span {
  // box-sizing: border-box;
  position: absolute;
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  border: 6rpx solid goldenrod;
  background-color: #eeeeee;
  text-align: center;
  line-height: 80rpx;
  color: black;
  font-weight: 500;
  font-size: 18rpx;
}
.football-bg-fornt-left {
  top: 140rpx;
  left: 200rpx;
}
.football-bg-fornt-right {
  top: 140rpx;
  right: 200rpx;
}
.football-bg-keeper {
  bottom: 40rpx;
  left: calc(45vw - 43rpx);
}
.football-bg-side-left {
  top: 480rpx;
  left: 100rpx;
}
.football-bg-side-right {
  top: 480rpx;
  right: 100rpx;
}
.football-bg-middle-top {
  top: 400rpx;
  left: calc(45vw - 40rpx)
}
.football-bg-backend-bottom {
  top: 600rpx;
  left: calc(45vw - 40rpx)
}
.football-bg-middle-back-left {
  bottom: 190rpx;
  left: 200rpx;
}
.football-bg-middle-back-right {
  bottom: 190rpx;
  right: 200rpx;
}
.football-bg-back-left {
  bottom: 240rpx;
  left: 40rpx;
}
.football-bg-back-right {
  bottom: 240rpx;
  right: 40rpx;
}
.tips {
  color: white;
  font-size: 18px;
  font-weight: 500;
}
</style>