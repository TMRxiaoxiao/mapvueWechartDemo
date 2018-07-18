<template>
  <div></div>
</template>
<script>
export default {
  data(){
    return {
      loading: false,//是否在加载中  
      pull: true,//下拉刷新状态 false释放刷新状态  上拉加载更多状态   false释放加载更多状态
      refreshing_text:'下拉刷新',
      loading_text: '上拉加载更多',
      loadingHeight: 60,//正在加载时高度
      refreshHeight: 0,//刷新布局高度  
      loadMoreHeight:0,//加载更多布局高度
      scrolling:false,//滚动中
      isUpper:true,//scroll-view 滚动条默认在最上
      isLower:false,
      windowHeight: 0,//获取屏幕高度  
      currentSize:0,
      words: [],
      downY: 0//触摸时Y轴坐标 
    }
  },
  methods:{
    scroll() {
      this.scrolling = true;
      this.isLower = false;
      this.isUpper = false;
    },
    //上拉  滚动条 滚动到底部时触发
    lower() {
      this.isLower = true;
      this.scrolling = false;
      this.$emit('upLower');
    },
    //下拉  滚动条 滚动顶底部时触发
    upper() {
      this.isUpper = true;
      this.scrolling = false;
      this.$emit('donwUpper');    
    },
    start(e) {
      var startPoint = e.mp.touches[0]
      var clientY = startPoint.clientY;
      this.downY= clientY;
    },
    end(e) {
      this.scrolling = false;
      //释放开始刷新
      var height = this.loadingHeight;
      if (this.refreshHeight > this.loadingHeight){
        this.refreshHeight = height;
        this.loading =true;
        this.pull = false;
        this.refreshing_text = 'loading';
        this.refresh();
      }else{
        this.refreshHeight = 0;
        this.loadMoreHeight =0;
        this.loading = false;
        this.pull = true;
      }
    
    },
    refresh(){
      this.$emit('loadData',this.loadFinish.bind(this));
    },
    //模拟加载更多数据
    loadMore() {
      // setTimeout(()=>this.loadFinish(),1000)
    },
    loadFinish(){
      this.refreshing_text = '刷新成功...';
      setTimeout(()=>{
        this.refreshHeight = 0;
        this.loadMoreHeight =0;
        this.loading = false;
      },200)
    },
    move(e) {
      var movePoint = e.mp.changedTouches[0]
      if (this.scrolling) {
        return;
      }
      var moveY = (movePoint.clientY - this.downY) * 0.6;
      //1.下拉刷新
      if (this.isUpper && moveY  > 0){
        this.refreshHeight = moveY;
        if (this.refreshHeight > this.loadingHeight){
          this.pull = false;
          this.refreshing_text = '释放立即刷新';
        }else{
          this.pull = true;
          this.refreshing_text = '下拉刷新';
        }
      }
    }
  }
}
</script>
<style>
  .scroll_container{
    z-index: 0;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  /*上拉加载更多布局*/
  .loadMore-block{
    z-index: 1;
    position: fixed;
    background-color:rgba(0, 0, 0, 0.08) ;  
    width:100%;
    max-height: 200rpx;
    text-align: center;
    box-sizing: border-box;
    overflow: hidden;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .loadMore-block image {
    position: absolute;
    left: 20%;
    right: 0;
    top: 15rpx;  
    text-align: center;
    width: 60rpx;  
    height: 60rpx;
  }
  .loadMore-block .loading-text{
    position: absolute;
    width: 100%;
    left: 0;
    right: 0;
    top: 15rpx;  
    text-align: center;
    height: 60rpx;
    line-height: 60rpx;
  }  

  /*下拉刷新布局*/
  .refresh-block {
    position: relative;
    background-color:rgba(0, 0, 0, 0.08) ;
    font-size: 13px;
    display: flex;
    flex-direction: column;
    justify-content: center;  
    width:100%;
    height: 0rpx;
    line-height: 100%;
    max-height: 200rpx;
    overflow: hidden;
  }
  .refresh-block.toZero{
    transition: all .3s;
  }
  /*.refresh-block .load-view{
    position: absolute;
    width: 100%;
    left: 0;
    right: 0;
    bottom: 15rpx;  
    height: 60rpx;
    text-align: center;
  }*/
  .refresh-block image {
    position: absolute;
    left: 25%;
    right: 0;
    bottom: 15rpx;  
    text-align: center;
    width: 60rpx;  
    height: 60rpx;
  }
  .refresh-block .refreshing_text{
    position: absolute;
    width: 100%;
    left: 0;
    right: 0;
    bottom: 15rpx;  
    text-align: center;
    height: 60rpx;
    line-height: 60rpx;
  }  

  @-webkit-keyframes rotate{ 0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}
  @keyframes rotate{0%{transform:rotate(0deg);}100%{ transform:rotate(360deg);}}
  .refresh-block .roate,.loadMore-block .roate{
    -moz-animation:rotate 1s infinite linear;
    -webkit-animation:rotate 1s infinite linear;
    animation:rotate 1s infinite linear;
  }
  .refresh-block .pull,.loadMore-block .pull{
    transform: rotate(180deg) scale(1) translate(0%,0%);
    transition: All 0.5s ease;
  }
  .item-style{  
    padding: 30rpx;  
    font-size: 40rpx;  
    text-align: center;  
    border-top: 2rpx solid #eee;  
  } 
 
  
</style>
