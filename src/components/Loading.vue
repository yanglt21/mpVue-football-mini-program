<template>
  <div class="container flex-column-center">
    <div class="father-container flex-column-center">
      <div class="rotate-ball"></div>
      <div class="center-box"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
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
.container {
  width: 100vw;
  height: 100vh;
  background-color: transparent;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
}
.animation-box {
  width: 100vw;
}
.father-container {
  width: 40px;
  height: 40px;
  background-color: transparent;
  border-radius: 50%;
  border: 1px solid white;
  position: relative;
  animation: boxRoate 1s linear infinite;
}
.center-box {
  width: 20rpx;
  height: 20rpx;
  background:linear-gradient(236deg,rgba(232,118,193,1) 0%,rgba(188,104,234,1) 100%);
  border-radius: 50%;
}
.rotate-ball {
  width: 10rpx;
  height: 10rpx;
  border-radius: 50%;
  position: absolute;
  top: 20px;
  left: 0px;
  background-color: red;
}
.mother-container {
  @extend .father-container;
  width: 30px;
  height: 30px;
  animation: boxRoateUN 1s linear infinite;
}
@keyframes boxRoate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes boxRoateUN {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(720deg);
  }
}
</style>