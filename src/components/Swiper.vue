<template>
  <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :circular="circular">
      <block v-for="(item,index) in imageList" :key="index">
          <swiper-item class="swiper-item">
              <image mode="widthFix" :src="item.img_url" :style="{width:width}"></image>
          </swiper-item>
      </block>
  </swiper>
</template>

<script>
export default {
  name: 'MySwiper',
  components: {},
  props: {
    imageList: {
      type: Array
    },
    width: {
      type: String
    },
    indicatorDots: {
      type: Boolean,
      default: false
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    circular: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {

    }
  },
  watch: {},
  computed: {},
  methods: {},
  created () {},
  mounted () {}
}
</script>
<style scoped lang="scss">
.swiper {
    width: 100%;
    &-item {
        @extend .swiper ;
    }
}
</style>