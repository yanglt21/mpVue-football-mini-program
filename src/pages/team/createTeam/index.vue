<template>
  <div class="container flex-column-x-center">
    <div class="width-90 flex-row-space-between information-cell">
      <div class="information-cell-title">球队名</div>
      <input type="text" class="information-cell-input" v-model="teamName">
    </div>
    <div class="width-90 flex-row-space-between information-cell">
      <div class="information-cell-title">活动地区</div>
      <div @click="handleShowPopup">选择</div>
      <van-popup :show="showPopup" position="bottom" :close-on-click-overlay="true" v-on:close="onClose">
        <van-area :area-list="areaList" 
                  columns-num="2" title="请选择您球队所在的城市" 
                  cancel-button-text="返回" @cancel="cancelSelectCity" 
                  @confirm="confirmSelectCity" @change="handleChange">
        </van-area>
      </van-popup>
    </div>
    <div class="width-90 flex-row-space-between information-cell">
      <div class="information-cell-title">主场颜色</div>
    </div>
    <div class="width-90 flex-row-space-between information-cell">
      <div class="information-cell-title">介绍</div>
    </div>
  </div>
</template>

<script>
const Area = require('../../../utils/area.js')
let teamLocationTemp = {}
export default {
  name: 'CreateTeam',
  components: {},
  props: {},
  data () {
    return {
      teamName: '',
      showPopup: false,
      areaList: [],
      teamLocation: {
        province: '北京市',
        city: '北京市'
      }
    }
  },
  watch: {},
  computed: {},
  methods: {
    handleShowPopup () {
      this.showPopup = !this.showPopup
    },
    cancelSelectCity (ev) {
      this.handleShowPopup()
    },
    confirmSelectCity (ev) {
      this.teamLocation = teamLocationTemp
      this.handleShowPopup()
    },
    handleChange () {
      const obj = arguments[0].target.values
      teamLocationTemp = {
        province: obj[0].name,
        city: obj[1].name
      }
    }
  },
  created () {
  },
  mounted () {
    this.areaList = Area
  }
}
</script>
<style lang="scss" scoped>
.information-cell {
  color: white;
  &-title {
    color: white;
  }
  &-input {
    background-color: white;
    color: white;
    border: 1px solid white;
  }
}
</style>