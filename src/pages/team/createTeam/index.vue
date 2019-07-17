<template>
  <div class="container">
    <van-notice-bar
      text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。"
    ></van-notice-bar>
    <div class="width-90 information-cell">
      <div class="information-cell-title">球队名</div>

    </div>
    <div class="width-90 information-cell">
      <div class="information-cell-title">活动地区</div>
    </div>
    <div class="width-90 information-cell">
      <div class="information-cell-title">主场颜色</div>
    </div>
    <div class="width-90 information-cell">
      <div class="information-cell-title">介绍</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateTeam',
  components: {},
  props: {},
  data () {
    return {}
  },
  watch: {},
  computed: {},
  methods: {},
  created () {},
  mounted () {}
}
</script>
<style lang="scss" scoped>
.information-cell {
    &-title {
        color: white;
    }
}
</style>