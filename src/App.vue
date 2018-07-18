<script>
import './zanui.wxss';
import  {mapState, mapMutations} from 'vuex';
import {getToken,getAllCity} from './api';
import {getAddressByPosition}  from './utils'
export default {
  created () {
    // 调用API从本地缓存中获取数据
    wx.getLocation({
      success: pos=>{
        getAddressByPosition(pos.longitude, pos.latitude).then(data=>{
          this.setPosition(data.result.address_component.city.replace('市',''));
        })
      },
      fail:err=>{
        this.setPosition('北京');
      }
    })
    getAllCity().then(data=>{
      this.setAllCity(data);
    });
  },
  computed:{
    ...mapState(['position'])
  },
  methods:{
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: (res) => {
          getToken(res.code);
        },
        fail: ()=>{
          this.getUserInfo();
        }
      })
    },
    ...mapMutations(['setPosition','setAllCity'])
  }
}
</script>

<style>
page{
  height: 100%;
}
.container {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  box-sizing: border-box;
  background: #fff;
}
.index-top{
  display:flex;
  padding:10px 15px 0 10px;
}
</style>
