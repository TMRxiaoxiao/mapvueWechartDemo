<template>
  <div class="nav">
    <div class="nav-item" @tap="tapNav('周边兼职')">
      <img src="./icon_03.png" alt="icon">
      <div>周边兼职</div>
    </div>
    <div class="nav-item" @tap="tapNav('寒暑假工')">
      <img src="./icon_05.png" alt="icon">
      <div>寒暑假工</div>
    </div>
    <div class="nav-item" @tap="tapNav('应届实习')">
      <img src="./icon_07.png" alt="icon">
      <div>应届实习</div>
    </div>
    <div class="nav-item" @tap="tapNav('高薪推荐')">
      <img src="./icon_09.png" alt="icon">
      <div>高薪推荐</div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
      }
    },
    methods:{
      tapNav(val){
        this.$emit('navTo',val)
      }
    }
  }
</script>
<style lang="stylus">
.nav
  display flex
  margin 10px 0
.nav-item
  display flex;
  flex-direction column;
  align-items center
  flex 1
  text-align center
  font-size 12px;
  color #777777
  img
    width (53px/2);
    height (46px/2);
    margin-bottom 16px
</style>
