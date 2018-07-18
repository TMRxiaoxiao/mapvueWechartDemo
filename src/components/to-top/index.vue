<template>
  <div
    class="to-top"
    v-show="show"
    @click="totop"></div>
</template>
<script>
  export default {
    data(){
      return{
        show: false
      }
    },
    onPageScroll(e){
      this.show = e.scrollTop > 300;
    },
    methods:{
      totop(){
        wx.pageScrollTo({
          scrollTop: 0,
          duration: 300
        })
      }
    }
  }
</script>
<style>
  .to-top{
    position: fixed;
    z-index: 2;
    right: 20px;
    bottom: 20px;
    width: 76rpx;
    height: 76rpx;
    background: url(./top.png) center center/100% 100%;
  }
</style>
