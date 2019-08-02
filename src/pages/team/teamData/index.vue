<template>
  <div class="container">
    <div class="width-100 team-header">
        
    </div>
  </div>
</template>

<script>
const Url = require('../../../utils/Url')
// const Util = require('../../../utils/util')
const Model = require('../../../utils/model')
export default {
  name: 'InputComponentName',
  components: {},
  props: {},
  data () {
    return {
      teamId: undefined,
      teamInfo: {}
    }
  },
  watch: {},
  computed: {},
  methods: {
    fetchTeamData () {
      this.$http.post(Url.getTeamData, {
        user_id: Model.openId,
        team_id: this.teamId
      }).then(res => {
        const teamData = res.data.data
        this.teamInfo = teamData
        wx.setNavigationBarTitle({
          title: teamData.team_info.name
        })
      })
    }
  },
  created () {
  },
  mounted () {
  },
  onLoad (options) {
    if (typeof options.team_id !== 'undefined') {
      this.teamId = options.team_id
    }
    this.fetchTeamData()
  }
}
</script>
<style lang="scss" scoped>

</style>