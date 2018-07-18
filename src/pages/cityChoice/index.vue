<template>
  <div class="city-chioce">
    <div class="title">定位城市</div>
    <div class="city-bar">
      <div class="city-item active">{{position}}</div>
    </div>
    <div class="title">热门城市</div>
    <div class="city-bar">
      <div
        class="city-item"
        :class="{active: hotCity===position}"
        :key="index"
        @tap="setCurrentChoice(hotCity)"
        v-for="(hotCity,index) in hotCitys">{{hotCity}}</div>
    </div>
    <template 
      v-for="(group,index) in allCity"
      >
      <div class="title" :key="index">{{group.key}}</div>
      <div class="city-bar" :key="index">
        <div
          class="city-item"
          :class="{active: hotCity===position}"
          :key="groupIndex"
          @tap="setCurrentChoice(hotCity)"
          v-for="(hotCity,groupIndex) in group.citys">
            {{hotCity}}
        </div>  
      </div>
    </template>
  </div>
</template>
<script>
  import {mapState,mapMutations} from 'vuex';
  const hotCitys = ['全国','北京','成都','大连','广州','杭州','南京','上海','深圳','苏州','天津','武汉'];
  export default {
    computed:{
      hotCitys:()=>hotCitys,
      ...mapState({
        position: 'position',
        allCity: state=>{
          if(!state.allCity)return [];

          const keyCity = [];
          const citysMap = Object.entries(state.allCity).sort((pre,next)=>pre[0] > next[0] ? 1 : -1);
          // 新建第一个分组
          keyCity.push({
            key: citysMap[0][0].toUpperCase(),
            citys: citysMap[0][1]
          })

          citysMap.slice(1).forEach(item=>{
            const tail = keyCity.slice(-1)[0];
            if(tail.citys.length + item[1].length < 13){
              tail.key += item[0].toUpperCase();
              tail.citys = tail.citys.concat(item[1]);
            } else{
              // 修改 title 值
              tail.key = tail.key[0] + ' - ' + tail.key.slice(-1);
              keyCity.push({
                key: item[0].toUpperCase(),
                citys: item[1]
              })
            }
          })

          // 修改 title 值
          const tail = keyCity.slice(-1)[0];
          tail.key = tail.key[0] + ' - ' + tail.key.slice(-1);

          return keyCity;
        }
      })
    },
    watch:{
    },
    methods:{
      setCurrentChoice(city){
        this.setPosition(city);
        wx.navigateBack();
      },
      ...mapMutations(['setPosition'])
    }
  }
</script>
<style lang="stylus">
  .city-chioce{
    .title{
      line-height 25px
      padding-left 30px
      background #f8f8f8
      color #777
      font-size 15px
    }
    .city-bar{
      padding 15px 30px
    }
    .city-item{
      display inline-block
      width 180rpx
      height 60rpx
      line-height 60rpx
      border-radius 60rpx
      border 1rpx solid #dcdcdc
      font-size 15px
      color #777777
      text-align center
      font-weight: 400;
      &.city-item{
        margin-left 18px;
      }
      &:nth-child(3n + 1){
        margin-left 0
      }
      &:nth-child(n + 3){
        margin-top 15px
      }
      &.active{
        color #5c91fd
        border-color #5c91fd
      }
    }
    

  }
</style>
