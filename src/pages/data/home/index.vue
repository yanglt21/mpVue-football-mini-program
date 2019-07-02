<template>
  <div class="container">
    <view class="data-bar" v-on:click="changeRankLeague">
      <div :class="selectIndex == 0 ? 'data-bar-item-activity' : 'data-bar-item'" data-type="china" data-index="0">中超</div>
      <div :class="selectIndex == 1 ? 'data-bar-item-activity' : 'data-bar-item'" data-type="english" data-index="1">英超</div>
      <div :class="selectIndex == 2 ? 'data-bar-item-activity' : 'data-bar-item'" data-type="spain" data-index="2">西甲</div>
      <div :class="selectIndex == 3 ? 'data-bar-item-activity' : 'data-bar-item'" data-type="dermany" data-index="3">德甲</div>
      <div :class="selectIndex == 4 ? 'data-bar-item-activity' : 'data-bar-item'" data-type="italy" data-index="4">意甲</div>
      <div :class="selectIndex == 5 ? 'data-bar-item-activity' : 'data-bar-item'" data-type="french" data-index="5">法甲</div>
    </view>
    <div class="rank-content">
      <div class="flex-row rank-content-item rank-header">
        <div>名次</div>
        <div>球队</div>
        <div>场</div>
        <div>胜</div>
        <div>平</div>
        <div>负</div>
        <div>进/失</div>
        <div>积分</div>
      </div>
      <div class="rank-content-item team" v-for="(item,index) in rankData.data" v-bind:key="index">
        <div>{{item.rank}}</div>
        <div>{{item.team_name}}</div>
        <div>{{item.matches_total}}</div>
        <div>{{item.matches_won}}</div>
        <div>{{item.matches_draw}}</div>
        <div>{{item.matches_lost}}</div>
        <div>{{item.goals_pro}}/{{item.goals_against}}</div>
        <div>{{item.points}}</div>
      </div>
    </div>
  </div>
</template>

<script>
const Url = require('../../../utils/Url.js')
const rankType = require('../../../utils/rankType.js')
export default {
  name: 'dataHome',
  components: {},
  props: {},
  data () {
    return {
      rankData: {},
      selectIndex: 0
    }
  },
  watch: {},
  computed: {},
  methods: {
    fetchRank (leagueType = 'china') {
      const seasonId = this.getLeagueType(leagueType)
      this.$http
        .get(Url.rank, {
          season_id: seasonId,
          version: 0,
          refer: 'data_tab',
          type: 'total_ranking',
          from: 'msite_com'
        })
        .then(res => {
          const content = res.data.content.rounds[0].content
          this.rankData = content
        })
    },
    getLeagueType (leagueName) {
      return rankType[leagueName]
    },
    changeRankLeague (ev) {
      const leagueName = ev.target.dataset.type
      this.selectIndex = ev.target.dataset.index
      this.fetchRank(leagueName)
    }
  },
  created () {
    this.fetchRank()
  },
  mounted () {}
}
</script>
<style scoped lang="scss">
Page {
  background-color: $base-color;
}
.data-bar {
  width: 100vw;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  display: inline-block;
  height: 60rpx;
  // background: linear-gradient(236deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
  background-color: #302b63;
  &-item {
    width: 20%;
    height: 60rpx;
    text-align: center;
    line-height: 60rpx;
    display: inline-block;
    color: white;
    font-size: 14px;
    font-weight: 500;
    &-activity {
      @extend .data-bar-item ;
      color: #6441A5;
    } 
  }
}
.rank-content {
  width: 100vw;
  margin-top: 10px;
  &-item {
    width: 100%;
  }
}
.rank-header {
  color: white;
  font-size: 12px;
}
.rank-content-item {
  @extend .rank-header;
  display: grid;
  grid-template-columns: 8% 24% 10% 10% 10% 10% 20% 8%;
  text-align: center;
}
.team {
  margin-top: 10px;
  border-bottom: 1px solid #24243e;
  padding-bottom: 10px;
}
</style>