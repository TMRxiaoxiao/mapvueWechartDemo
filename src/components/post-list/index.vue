<template>
  <ul class="post-list" v-if="listData && listData.length > 0">
    <li class="item.post-item" v-for="(item,index) in computedList" :key="index">
      <img :src="item.companyLogo" class="logo" width="71" height="71" alt="logo">
      <div class="info">
        <h3 class="title"> {{item.name}}
          <span v-for="(name,indexs) in item.labels" class="label" :key="indexs">{{name}}</span>
        </h3>
        <h3 class="company">{{item.companyName}}</h3>
        <div class="other"> 
          {{item.city}} | {{item.workTime}}天/周
        </div>
      </div>
      <div class="right-part">
        <p class="time">{{item.updateTime}}</p>
        <p class="money">￥{{item.perDiem}}/天</p>
      </div>
    </li>
  </ul>
  <div class="list-empty" v-else>
    <image src="http://47.95.118.92:8012/qietu/icon_12.png"/>
    这里没有记录哦~
    <div class="to-index" v-if="!isIndex" @tap="toIndex">
      去看看职位
    </div>
  </div>
</template>
<script>
const strSub  = str => str.length > 6 ? str.slice(0,6) + '..' : str;
const keyToLable = {
  '暑假工' : '暑假',
  '寒假工' : '寒假',
  '周末兼职' : '兼职',
  '长期工' : '实习'
}
export default{
  props: {
    listData:'listData',
    isIndex:{
      default: false
    }
  },
  data(){
    return {
    }
  },
  
  computed:{
    computedList(){
      return this.listData ? this.listData.map(val=>{
        const labels = [keyToLable[val.workType]];
        val.isPressing && labels.push('急招');
        return {
          ...val,
          labels,
          name: strSub(val.name)
        }
      }) : [];
    }
  },
  methods:{
    toIndex(){
      wx.switchTab({
        url: '/pages/index/main'
      })
    }
  }
}
</script>
<style lang="stylus">
  .post-item{
    display: flex;
    height: 90px;
    padding: 15px;
    font-size: 12px;
    color: #888888;
    box-sizing: border-box;
    border-bottom 1rpx solid #ebebeb;
    .info{
      flex 1
      height 60px;
      min-width 160px;
      display flex
      flex-direction column
      justify-content space-between
      line-height 1em;
      font-size 13px;
      font-weight 400
      color #666
    }
    .title{
      color #333333;
      font-weight 400
      font-size 16px
      height 18px;
      line-height 18px;
      .label{
        display inline-block;
        padding 0 5px 0 4px
        line-height:28rpx;
        text-align center
        background:rgba(233,243,255,1);
        border-radius:4rpx;
        font-size 10px
        color #5E9DE9
        border 1rpx solid #83BBFF
        vertical-align middle;
        margin-bottom 5px
        &+.label{
          margin-left 2px
        }
      }
    }
    .logo{
      width: 60px;
      height: 60px
      margin-right 12px
    }
    .icon{
      display: inline-block;
      width: 20px;
      height: 20px;
    }
    .other{
      font-weight 200
    }
    .right-part{
      display flex
      flex-direction column
      justify-content space-between
      text-align right;
      font-size:12px;
      line-height 1em;
      .money{
        color: #fd5f39;
        font-size 14px;
      }
      .time{
        font-size 12px;
      }
    }
  }
  .list-empty{
    flex 1
    background #F8F8F8
    display flex
    flex-direction column
    align-items center
    font-size: 15px;
    color:#777777;
    image{
      margin-top 140rpx
      width 90px
      height 81px
      margin-bottom 15px
    }
    .to-index{
      width:281rpx;
      line-height:78rpx;
      margin-top 120rpx;
      background:rgba(92,145,253,1);
      border-radius:4rpx;
      text-align center;
      font-size: 30rpx;
      color:rgba(250,250,250,1);
    }
  }
  
</style>
