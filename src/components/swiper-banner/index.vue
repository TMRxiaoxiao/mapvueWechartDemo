<template>
  <swiper class="swiper" indicator-dots="true" autoplay="true" interval="5000" duration="1000">
    <block v-for="(item, index) in swiperData" :index="index" :key="index">
      <swiper-item>
        <image :src="item.url" class="slide-image" mode="aspectFill"/>
      </swiper-item>
    </block>
  </swiper>
</template>
<script>
  export default {
    props:['swiperData']
  }
</script>
<style lang="stylus">
.swiper{
  margin 5px 0;
  width 375px;
  height 111px;
}
.slide-image{
  width 375px;
  height 111px;
}
</style>
