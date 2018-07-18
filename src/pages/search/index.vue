<template>
  <div class="search-page container">
    <div class="index-top">
      <searchBar :value="searchKey" @confirm="searchPosition" placeholder="搜索职位/公司"></searchBar>
    </div>
    <div class="search-tips" v-if="!beginSearch">
      <div class="title">热门搜索</div>
      <div class="hot-bar">
        <div
          class="item"
          v-for="(label,index) in hotLabel"
          @tap="toSearch(label)"
          :key="index">{{label}}</div>
      </div>
      <template v-if="searchHistory.length > 0">
        <div class="title">搜索历史</div>
        <div class="history">
          <div
            class="history-item"
            v-for="(item,index) in searchHistory"
            :key="index"
            @tap="toSearch(item)"
            >
              {{item}}
              <div
                class="close"
                @tap.stop="delHistory(index)"></div>
            </div>
          <div
            class="history-item clear"
            @tap="clearHistory"
            >清空历史数据</div>
        </div>
      </template>
    </div>
    <template v-else>
      <filterBar :filterCondition="filterCondition" @confirm="filterSelect"></filterBar>
      <postList :listData="listData"></postList>
      <listLoading
        v-if="listData.length > 0"
        :nomore="nomore"
        :nodata="false"
        :loading="!nomore"
        ></listLoading>
    </template>
  </div>
</template>
<script>
import postList from '@/components/post-list/index.vue';
import searchBar from '@/components/search-bar/index.vue';
import filterBar from '@/components/filter-bar/index.vue';
import listLoading from '@/components/list-loading/index.vue';
import topTop from '@/components/to-top/index.vue';
import positionChoice from '@/components/position-choice/index.vue';
import positionListMixin from '@/mixins/positionListMixin';
import {getPositionList} from '@/api';
import {mapState} from 'vuex';
const hotLabel = ['设计','美术','前端开发','市场总监','市场助理']
export default {
  mixins:[positionListMixin],
  data(){
    return {
      searchHistory:[],
      beginSearch: false
    }
  },
  onLoad(options) {
    // Do some initialize when page load.
    if(options.workType){
      wx.setNavigationBarTitle({
        title: options.workType + '+' + this.position
      })
      this.workType = options.workType;
      this.filterInit();
      this.reloadPostion();
      this.beginSearch = true;
      return;
    }
    if(options.fitlerData){
      this.filterCondition = JSON.parse(options.fitlerData);
      this.reloadPostion();
      this.beginSearch = true;
      return;
    } 
    this.beginSearch = false;
    this.workType = null;
    this.filterInit();
  },
  components:{
    postList,
    searchBar,
    filterBar,
    listLoading,
    topTop,
    positionChoice
  },
  created() {
    wx.getStorage({
      key: 'searchHistroy',
      success:res=>{
        this.searchHistory = JSON.parse(res.data);
      },
      fail(err){
      }
    })
  },
  methods:{ 
    searchPosition(data){
      if(data !== '' && !this.searchHistory.includes(data)){
        this.searchHistory.push(data);
        wx.setStorage({
          key:"searchHistroy",
          data: JSON.stringify(this.searchHistory)
        })
      }
      this.toSearch(data);
    },
    delHistory(index){
      this.searchHistory.splice(index,1);
      wx.setStorage({
        key:"searchHistroy",
        data: JSON.stringify(this.searchHistory)
      })
    },
    clearHistory(){
      this.searchHistory = [];
      wx.removeStorage({
        key:"searchHistroy"
      })
    },
    filterSelect(val,reset){
      if(reset)return;
      this.filterCondition = val;
      this.reloadPostion();
    },
    toSearch(val){
      this.beginSearch = true;
      this.searchKey = val;
    }
  },
  computed:{
    hotLabel:()=>hotLabel
  },
  watch:{
    searchKey(){
      this.reloadPostion();
    }
  }
}
</script>
<style lang="stylus">
.search-tips{
  border-top 1rpx solid #EBEBEB;
  margin-top 9rpx;
  .title{
    margin-top 28rpx
    text-indent 30rpx
    font-size 14px
    color rgb(51,51,51)
  }
  .hot-bar{
    padding 0 30rpx
    margin-bottom 56rpx;
    .item{
      display inline-block
      width:159rpx;
      height:64rpx;
      line-height:64rpx;
      border 1rpx solid #DCDCDC;
      margin-top 12px
      background:rgba(255,255,255,1);
      border-radius:6rpx;
      font-size 13px
      color rgb(119,119,119)
      text-align center
      &.item{
        margin-left 6px
      }
      &:nth-child(4n + 1){
        margin-left 0
      }
    }
  }
  .history{
    margin-top 37rpx
  }
  .history-item{
    position relative
    text-indent 30rpx;
    line-height 40px;
    font-size:13px;
    color:rgb(51,51,51);
    border-bottom 1rpx solid #EBEBEB;
    .close{
      position absolute
      right 24rpx
      top 32rpx
      padding 3px
      width 8px
      height 8px
      background url(http://47.95.118.92:8012/qietu/icon_11.png) center center/8px 8px no-repeat;
    }
    &.clear{
      font-size 13px;
      text-align center
      color:rgba(168,168,168,1)
      border-bottom 0;
      font-weight 200
    }
  }
}
.search-page .filter-bar{
  border-top-width  0
}
</style>
