<template>
  <view class="loading black block">
    <view class="dot-spinner">
      <view></view>
      <view></view>
      <view></view>
      <view></view>
      <view></view>
      <view></view>
      <view></view>
      <view></view>
      <view></view>
      <view></view>
      <view></view>
      <view></view>
    </view>
  </view>
</template>
<script>
  
</script>
<style>
.loading.block .dot-spinner{overflow:hidden}.loading.block .dot-spinner view{width:8px;height:8px;border-radius:8px;background:#fff;display:inline-block;margin-left:3px;position:relative;left:0;-webkit-animation:dot-spinner 2s ease infinite;animation:dot-spinner 2s ease infinite}.loading.block .dot-spinner view:nth-child(1){-webkit-animation-delay:.5s;animation-delay:.5s}.loading.block .dot-spinner view:nth-child(2){-webkit-animation-delay:.4s;animation-delay:.4s}.loading.block .dot-spinner view:nth-child(3){-webkit-animation-delay:.3s;animation-delay:.3s}.loading.block .dot-spinner view:nth-child(4){-webkit-animation-delay:.2s;animation-delay:.2s}.loading.block .dot-spinner view:nth-child(5){-webkit-animation-delay:.1s;animation-delay:.1s}.loading.block .dot-spinner view:nth-child(6){-webkit-animation-delay:0s;animation-delay:0s}.loading.block .dot-spinner view:nth-child(6){display:none}.loading.block .dot-spinner view:nth-child(7){display:none}.loading.block .dot-spinner view:nth-child(8){display:none}.loading.block .dot-spinner view:nth-child(9){display:none}.loading.block .dot-spinner view:nth-child(10){display:none}.loading.block .dot-spinner view:nth-child(11){display:none}.loading.block .dot-spinner view:nth-child(12){display:none}.loading.block.black .dot-spinner view{background:#c9c9c9}@-webkit-keyframes dot-spinner{40%{left:-webkit-calc(50% - 15px);left:calc(50% - 15px)}60%{left:-webkit-calc(50% - 15px);left:calc(50% - 15px)}100%{left:100%}}@keyframes dot-spinner{40%{left:-webkit-calc(50% - 15px);left:calc(50% - 15px)}60%{left:-webkit-calc(50% - 15px);left:calc(50% - 15px)}100%{left:100%}}@-webkit-keyframes circular{0%{border-color:#fff}12%{border-top-color:transparent}25%{border-right-color:transparent}37%{border-bottom-color:transparent}50%{border-left-color:transparent}64%{border-top-color:#fff}75%{border-right-color:#fff}87.5%{border-bottom-color:#fff}100%{border-color:#fff}}@keyframes circular{0%{border-color:#fff}12%{border-top-color:transparent}25%{border-right-color:transparent}37%{border-bottom-color:transparent}50%{border-left-color:transparent}64%{border-top-color:#fff}75%{border-right-color:#fff}87.5%{border-bottom-color:#fff}100%{border-color:#fff}}@-webkit-keyframes loading{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes loading{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}
</style>
