<template>
  <div class="container">
    <div v-if="type === 'age' ">
      <view class="width-100 flex-row-space-around">
          <view>修改年龄</view>
          <view @click="handleShowPopup">修改</view>
      </view>
      <van-popup
        :show="showPopup"
        position="bottom"
        :close-on-click-overlay="true"
        v-on:close="onClose"
      >
        <van-picker :columns="columns" v-on:change="onChange" show-toolbar title="修改年龄"></van-picker>
      </van-popup>
    </div>
    <div v-if="type === 'position' "></div>
  </div>
</template>

<script>
export default {
  name: 'InputComponentName',
  components: {},
  props: {},
  data () {
    return {
      type: '',
      columns: [18, 19, 20, 21],
      showPopup: false
    }
  },
  watch: {},
  computed: {},
  methods: {
    handleShowPopup () {
      this.showPopup = !this.showPopup
    }
  },
  created () {},
  mounted () {},
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
<style scoped>
</style>