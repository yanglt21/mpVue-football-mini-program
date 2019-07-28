<template>
  <div class="app"></div>
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
    }
  },
  watch: {},
  computed: {},
  methods: {
    fetchTeamData () {
      this.$http.post(Url.getTeamBaseData, {
        team_id: 18,
        open_id: Model.isLogin ? Model.openId : null
      }).then((res) => {
        if (res.data.status) {
          // const data = res.data.data
        } else {
          Util.showToast(res.data.msg)
        }
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
<style scoped>
</style>