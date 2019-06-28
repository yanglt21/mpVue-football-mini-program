<template>
  <div class="app">
    <div class="box"></div>
  </div>
</template>

<script>
const Url = require('../../../utils/Url.js')
export default {
  name: 'userCenter',
  components: {},
  props: {},
  data () {
    return {}
  },
  watch: {},
  computed: {},
  methods: {
    fetchHomePage () {
      this.$http.get(Url.rank, {
        season_id: 14225,
        version: 0,
        refer: 'data_tab',
        type: 'total_ranking',
        from: 'msite_com'
      }).then((res) => {
        debugger
      })
    },
    test () {
      this.$http.get(Url.test, {
      }).then((res) => {
        debugger
      })
    }
  },
  created () {},
  mounted () {
    this.test()
    this.fetchHomePage()
  }
}
</script>
<style scoped lang="scss">
</style>