<template>
  <div class="search-bar" @tap="hasClick">
    <div class="input-bar">
      <icon class="weui-icon-search_in-box" type="search" size="14"></icon>
      <input type="text" class="search-input" :disabled="disabled" @confirm="search" :placeholder="placeholder" v-model="inputVal"/>
      <div class="clear-input" v-if="inputVal.length > 0" @click="clearInput"/>
    </div>
  </div>  
</template>
<script>
   export default{
    props:{
      placeholder:'placeholder',
      value:'value',
      disabled:{
        default: false
      }
    },
    data(){
      return {
        inputVal: ''
      }
    },
    methods:{
      clearInput(){
        this.inputVal = '';
        this.$emit('confirm',this.inputVal);
      },
      search(){
        this.$emit('confirm',this.inputVal);
      },
      hasClick(){
        this.$emit('tap')
      }
    },
    watch:{
      value(val){
        this.inputVal = val;
      }
    }
   }
</script>
<style lang="stylus">
.search-bar
  display flex
  height 28px
  width 100%
  flex 1
  box-sizing border-box
  background #f8f8f8
  color #999
  border-radius 14px
  font-size 12px
.input-bar
  display flex
  justify-content center
  align-items center
  position relative
  width 100%
  padding 0 30rpx
  .search-input
    flex 1
    color #999
    line-height 28px
    margin-left 5px
    background #f8f8f8
  .weui-icon-search_in-box
    flex 0 0 30rpx
  .clear-input
    flex 0 0 30rpx
    width 30rpx
    height 30rpx
    background url(http://47.95.118.92:8012/qietu/icon_10.png) center right/ 13px 13px no-repeat;

  input::-webkit-input-placeholder{
    font-weight 200
  }
  input::-moz-placeholder{   /* Mozilla Firefox 19+ */
    font-weight 200
  }
  input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    font-weight 200
  }
  input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
    font-weight 200
  }

.lable-bar
  width 100%
  line-height 28px
  .content
    display inline-block
    position relative
    text-indent 30px
    .weui-icon-search_in-box
      left -20px
      top 6px
</style>
