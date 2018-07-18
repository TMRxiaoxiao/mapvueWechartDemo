import {mapState} from 'vuex';
import {getPositionList} from '@/api';
const filterCondition = {
  type: null,
  name: null,
  perDiem: null,
  workTime: null,
  workDate: null,
  education: null,
  correctionChance: null
}
export default {
  data(){
    return {
      listData: [],
      page: 1,
      nomore: false,
      filterCondition: {...filterCondition},
      searchKey: '',
      workType: null
    }
  },
  computed:{
    ...mapState(['position'])
  },
  watch:{
    position(){
      if(!this.active)return;
      this.reloadPostion();
    }
  },
  methods: {
    getPositionList(page){
      const resultPromise = getPositionList(page || this.page,{
        "city": this.position === '全国' ? null : this.position,
        searchKey: this.searchKey === '' ? null : this.searchKey,
        workType: this.workType,
        ...this.filterCondition
      })
      resultPromise.then(data=>{
        this.nomore = data.count <= data.page * data.size;
      })
      return resultPromise;
    },
    reloadPostion(){
      this.timer = setTimeout(()=>{
        wx.showLoading({
          title: '数据加载中...',
          mask: true
        })
      },500);
      this.page = 1;
      this.getPositionList().then(data=>{
        this.listData = data.list;
        this.page++;
        this.timer && clearTimeout(this.timer);
        wx.hideLoading()
      });
    },
    filterInit(){
      this.$refs.filterBar ? this.$refs.filterBar.reset() : this.filterCondition = {...filterCondition};
    }
  },
  onPullDownRefresh(){
    this.getPositionList(1).then(data=>{
      const tempArr = [];
      for (let index = 0; index < data.list; index++) {
        const element = data.list[index];
        if(element.id === this.listData[0])break;
        tempArr.push(element);
      }
      tempArr.length > 1 && (this.listData = tempArr.concat(this.listData));
      wx.stopPullDownRefresh();
    })
  },
  onReachBottom(){
    if(this.nomore || this.requesting)return;
    this.requesting = true;
    this.getPositionList().then(data=>{
      this.listData = this.listData.concat(data.list);
      this.page++;
      this.requesting = false;
    });
  }
}