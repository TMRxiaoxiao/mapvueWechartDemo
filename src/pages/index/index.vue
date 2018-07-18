<template>  
  <view class="container">
    <div class="index-top">
      <positionChoice></positionChoice>
      <searchBar :disabled="true" @tap="searchTap" placeholder="搜索职位/公司"></searchBar>
    </div>
    <swiperBanner :swiperData="swiperData"></swiperBanner>
    <indexNav @navTo="navTo"></indexNav>
    <filterBar ref="filterBar" @confirm="filterSelect"></filterBar>
    <postList :isIndex="true" :listData="listData"></postList>
    <listLoading
      v-if="listData.length > 0"
      :nomore="nomore"
      :nodata="false"
      :loading="!nomore"
      ></listLoading>
    <topTop></topTop>
  </view>
</template>

<script>
import postList from '@/components/post-list/index.vue';
import swiperBanner from '@/components/swiper-banner/index.vue';
import searchBar from '@/components/search-bar/index.vue';
import indexNav from '@/components/nav/index.vue';
import filterBar from '@/components/filter-bar/index.vue';
import listLoading from '@/components/list-loading/index.vue';
import topTop from '@/components/to-top/index.vue';
import positionChoice from '@/components/position-choice/index.vue';
import positionListMixin from '@/mixins/positionListMixin';

export default {
  mixins:[positionListMixin],
  data () {
    return {
      swiperData:[
        {
          url: 'http://tpc.googlesyndication.com/daca_images/simgad/9920487840257457470'
        },
        {
          url: 'http://tpc.googlesyndication.com/daca_images/simgad/9920487840257457470'
        },
        {
          url: 'http://tpc.googlesyndication.com/daca_images/simgad/9920487840257457470'
        }
      ]
    }
  },
  methods:{
    filterSelect(val,reset){
      if(reset) return;
      wx.navigateTo({
        url:"/pages/search/main?fitlerData=" + JSON.stringify(val)
      })
    },
    searchTap(){
      wx.navigateTo({
        url:"/pages/search/main"
      })
    },
    navTo(val){
      wx.navigateTo({
        url:"/pages/search/main?workType=" + val
      })
    }
  },
  components: {
    postList,
    swiperBanner,
    searchBar,
    indexNav,
    filterBar,
    listLoading,
    topTop,
    positionChoice
  },
  onShow(){
    this.active = true;
    this.position && this.reloadPostion();
    this.filterInit();
  },
  onHide(){
    this.active = false;
  },
  created () {
    this.position && this.reloadPostion();
  }
}
</script>

<style lang="stylus">

</style>
