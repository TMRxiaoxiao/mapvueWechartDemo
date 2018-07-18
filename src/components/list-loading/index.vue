<template>
  <div>
    <block v-if="nomore">
      <div class="zan-loadmore">
        <div class="zan-loadmore__tips">暂无更多数据</div>
      </div>
    </block>

    <block v-else-if="nodata">
      <div class="zan-loadmore zan-loadmore--nodata">
        <div class="zan-loadmore__tips">{{ nodata_str || '暂无数据' }}</div>
      </div>
    </block>

    <block v-else-if="loading">
      <div class="zan-loadmore">
        <div class="zan-loading"></div>
        <div class="zan-loadmore__tips">加载中...</div>
      </div>
    </block>
  </div>
</template>

<script>
  export default {
    props: ['nomore', 'nodata', 'loading']
  }
</script>

