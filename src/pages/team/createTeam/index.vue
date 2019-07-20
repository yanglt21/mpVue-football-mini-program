<template>
  <div class="container flex-column-x-center">
    <div class="width-100 flex-column-x-center form-content">
      <div class="width-90 flex-row-space-between information-cell">
        <div class="information-cell-title">球队名</div>
        <input type="text" class="information-cell-input" v-model="teamName">
      </div>
      <div class="width-90 flex-row-space-between information-cell">
        <div class="information-cell-title">注册地区</div>
        <div
          @click="handleShowPopup"
          class="information-cell-btn"
        >{{haveSelectCity ? teamLocation.city :'选择'}}</div>
      </div>
      <div class="width-90 flex-column-space-between information-cell">
        <div class="information-cell-title">介绍</div>
        <textarea v-model="teamIntroduce"></textarea>
      </div>
      <div class="width-90 flex-column information-cell">
        <div class="information-cell-title">标签</div>
        <div class="width-100 label-list">
          <div
            :class="item.isSelected ? 'label-list-item-selected':'label-list-item'"
            @click="handleSelectCity"
            v-for="(item,index) in labelList"
            v-bind:key="index"
            :data-index="index"
          >{{item.title}}</div>
        </div>
      </div>
      <div class="width-72 create-btn" @click="handleCreateTeam">成立球队</div>
    </div>
    <van-popup
      :show="showPopup"
      position="bottom"
      :close-on-click-overlay="true"
      v-on:close="onClose"
    >
      <van-area
        :area-list="areaList"
        columns-num="2"
        title="请选择您球队所在的城市"
        cancel-button-text="返回"
        @cancel="cancelSelectCity"
        @confirm="confirmSelectCity"
        @change="handleChange"
      ></van-area>
    </van-popup>
  </div>
</template>

<script>
const Area = require('../../../utils/area.js')
let teamLocationTemp = {}
const Url = require('../../../utils/Url.js')
const Util = require('../../../utils/util')

export default {
  name: 'CreateTeam',
  components: {},
  props: {},
  data () {
    return {
      teamName: '',
      teamIntroduce: '',
      showPopup: false,
      areaList: [],
      teamLocation: {
        province: '北京市',
        city: '北京市'
      },
      haveSelectCity: false,
      labelList: [],
      selectLabelList: []
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
      this.haveSelectCity = true
      this.handleShowPopup()
    },
    handleChange () {
      const obj = arguments[0].target.values
      teamLocationTemp = {
        province: obj[0].name,
        city: obj[1].name
      }
    },
    handleSelectCity (ev) {
      const index = ev.currentTarget.dataset.index
      this.labelList[index].isSelected = !this.labelList[index].isSelected
    },
    formatelabelList (labelList) {
      let list = []
      labelList.forEach(element => {
        list.push({
          title: element,
          isSelected: false
        })
      })
      return list
    },
    fetchPageData () {
      this.$http
        .get(Url.getCreateInfo, {})
        .then(res => {
          if (res.data.status) {
            const data = res.data.data
            this.labelList = data.label_list
          } else {
            wx.showToast({
              title: res.data.msg
            })
          }
        })
        .then(() => {
          this.labelList = this.formatelabelList(this.labelList)
        })
    },
    handleCreateTeam () {
      if (this.teamName === '') {
        Util.showToast('请输入球队名')
        return
      } else if (teamLocationTemp === {}) {
        Util.showToast('请选择球队的城市')
        return
      } else if (this.teamIntroduce === '') {
        Util.showToast('介绍一下您的球队吧')
        return
      }
      let list = this.getLabelSelectList()
      const templateData = {
        team_name: this.teamName,
        team_introduce: this.teamIntroduce,
        team_location: this.teamLocation,
        label_list: list
      }
      this.$http.post(Url.createTeam, templateData).then((res) => {
        debugger
      })
    },
    getLabelSelectList () {
      let arr = []
      this.labelList.map((item) => {
        if (item.isSelected === true) {
          arr.push(item.title)
        }
      })
      return arr
    }
  },
  created () {},
  mounted () {
    this.areaList = Area
    this.fetchPageData()
  }
}
</script>
<style lang="scss" scoped>
.information-cell {
  color: white;
  padding: 20px 0px;
  border-bottom: 1px solid #a9a9a9;
  &-title {
    color: white;
  }
  &-input {
    background-color: $base-color;
    color: rgba(188, 104, 234, 1);
  }
  &-btn {
  }
}
.create-btn {
  background: linear-gradient(
    236deg,
    rgba(232, 118, 193, 1) 0%,
    rgba(188, 104, 234, 1) 100%
  );
  color: white;
  text-align: center;
  height: 100rpx;
  line-height: 100rpx;
  font-size: 17px;
  font-weight: 500;
  border-radius: 20rpx;
  margin-top: 80rpx;
  margin-bottom: 80rpx;
}
.label-list {
  &-item {
    border: 1px solid #a9a9a9;
    padding: 5rpx 10px;
    float: left;
    margin-right: 10px;
    margin-top: 10px;
    font-size: 12px;
    color: white;
    &-selected {
      @extend .label-list-item;
      border: 1px solid rgba(188, 104, 234, 1);
      color: rgba(232, 118, 193, 1);
    }
  }
}
</style>