<template>
  <div class="container flex-column-x-center">
    <div class="width-90 my-team-container">
      <div class="flex-column-center my-team-item" v-for="(item,index) in myTeamList" 
           v-bind:key="index" @click="handleTeamPage" :data-id="item.team_Id">
        <div class="my-team-item-name">{{item.name}}</div>
        <div class="my-team-item-introduce">{{item.introduce}}</div>
      </div>
    </div>
  </div>
</template>

<script>
const Url = require('../../../utils/Url')
const Util = require('../../../utils/util')
const Model = require('../../../utils/model')
export default {
  name: 'TeamPage',
  components: {},
  props: {},
  data () {
    return {
      myTeamList: []
    }
  },
  watch: {},
  computed: {},
  methods: {
    fetchTeamData () {
      this.$http.post(Url.getUserTeamData, {
        open_id: Model.isLogin ? Model.openId : null
      }).then((res) => {
        if (res.data.status) {
          const data = res.data.data
          this.myTeamList = data.team_info
        } else {
          Util.showToast(res.data.msg)
        }
      })
    },
    handleTeamPage (ev) {
      const teamId = ev.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/team/teamData/main?team_id=' + teamId
      })
    }
  },
  created () {
  },
  mounted () {
    this.fetchTeamData()
  }
}
</script>
<style lang="scss" scoped>
.my-team-item {
  width: 30vw;
  height: 30vw;
  border-radius: 20rpx;
  color: white;
  text-align: center;
  background:linear-gradient(236deg,rgba(232,118,193,1) 0%,rgba(188,104,234,1) 100%);
  margin: 40rpx;
  float: left;
}
</style>