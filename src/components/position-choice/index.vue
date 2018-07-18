<template>
  <div class="position" @tap="choiceCity">
    {{position || '定位中..'}}<i class="position-icon"></i>
  </div>
</template>
<script>
import {mapState} from 'vuex';
export default{
  computed:{
    ...mapState(['position'])
  },
  methods:{
    choiceCity(){
      wx.navigateTo({
        url:"/pages/cityChoice/main"
      })
    }
  }
}
</script>
<style lang="stylus">
.position{
  display flex
  justify-content center
  align-items center;
  flex 0 0 70px
  color #777777;
  font-size: 15px;
  margin-right 5px
  font-weight 400
}
.position-icon{
  display: inline-block;
  vertical-align: middle;
  width: 8px;
  height: 6px;
  margin-left 4px;
  background: url('./icon_01.png') center center/ 100% 100%;
}
.city_choice-dialog{
  position fixed
  z-index 6
  top 0
  left 0
  bottom 0
  right 0
  background rgba(0,0,0,.8)
  transform translateY(0)
  transition all .3s
}
.city_choice-dialog.acive{
  transform translateY(0)
}
</style>
