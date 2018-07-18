<template>
  <div class="filter-group" @click="dialogHide">
    <div class="filter-dialog" :class="{active:dialogShow}">
      <div class="content" @click.stop="1">
        <div class="filter-bar">
          <div class="filter-item" :class="{active:activeIndex === 0}" @click="selectIndex(0)">职位类别 <div class="down-icon"></div></div>
          <div class="filter-item" :class="{active:activeIndex === 1}" @click="selectIndex(1)">筛选条件 <div class="down-icon"></div></div>
        </div>
        <div class="filter-content-warp">
          <div class="filter-content" :class="{condition:activeIndex===1}">
            <div class="filter-position">
              <div class="job-warp">
                <div class="job-type">
                  <div
                    class="job-item"
                    :class="{active: index === activeJobPosition[0]}"
                    v-for="(jobType,index) in jobJson"
                    @click="choiceJobSub(index)"
                    :key="index"
                    >
                    {{jobType.type}}
                  </div>
                </div>
              </div>
              <div class="job-warp">
                <div class="job-type-sub">
                  <div
                    class="job-item-sub"
                    :class="{active: index === activeJobPosition[1]}"
                    v-for="(jobType,index) in jobJson[activeJobPosition[0]].industry"
                    @click="choiceJobSubActive(index)"
                    :key="index"
                    >
                    {{jobType}}
                  </div>
                </div>
              </div>
            </div>
            <div class="filter-condition">
              <div 
                class="condition-group"
                v-for="(condition,index) in positionType"
                :key="index">
                <div class="title">{{condition.type}}</div>
                <div class="item-bar">
                  <div
                    class="condition-item"
                    :class="{active: currentCondition[index] === subcondition}"
                    v-for="(subcondition,subindex) in condition.industry"
                    @click="choiceCondition(index,subcondition)"
                    :key="subindex"
                    >
                    {{subcondition}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="opreate">
          <div class="reset" @click="reset">重置</div>
          <div class="confirm" @click="submit">确定</div>
        </div>
      </div>
    </div>
    <div class="filter-bar" @click.stop="1">
      <div class="filter-item" :class="{active: positionName!=='职位类别'}" @click="showFilter(0)">{{positionName}}<div class="down-icon"></div></div>
      <div class="filter-item" :class="{active: conditionNum > 0 }" @click="showFilter(1)">筛选条件<template v-if="conditionNum > 0">({{conditionNum}})</template><div class="down-icon"></div></div>
    </div>
  </div>
</template>
<script>
import jobJson from './job-type.json';
import positionType from './position-type.json';
const noLimit = val=> val === '不限' ? null : val;
const nullString = val=> val ===  null ? '不限' : val;

export default {
  props:['filterCondition','index'],
  data(){
    return {
      jobJson,
      positionType,
      activeJobPosition: [0,0],
      activeIndex: 0,
      dialogShow: false,
      currentCondition: [
        "不限",
        "不限",
        "不限",
        "不限",
        "不限"
      ],
      conditionNum: 0,
      positionName:'职位类别'
    }
  },
  methods:{
    choiceJobSub(index){
      this.$set(this.activeJobPosition, '0', index);
      this.choiceJobSubActive(0);
    },
    choiceJobSubActive(index){
      this.$set(this.activeJobPosition, '1', index);
    },
    selectIndex(index){
      this.activeIndex = index;
    },
    showFilter(index){
      this.selectIndex(index);
      this.dialogShow = true;
    },
    dialogHide(){
      this.dialogShow = false;
    },
    reset(){
      this.activeJobPosition = [0,0];
      this.currentCondition = new Array(5).fill("不限");
      this.emitConfirm(true);
    },
    choiceCondition(index,name){
      this.$set(this.currentCondition, index, name);
    },
    dataReset(){
      return {
        type: noLimit(this.jobJson[this.activeJobPosition[0]].type),
        name: noLimit(this.jobJson[this.activeJobPosition[0]].industry[this.activeJobPosition[1]]),
        perDiem: noLimit(this.currentCondition[0]),
        workTime: noLimit(this.currentCondition[1]),
        workDate: noLimit(this.currentCondition[2]),
        education: noLimit(this.currentCondition[3]),
        correctionChance: noLimit(this.currentCondition[4])
      }
    },
    emitConfirm(reset){
      this.$emit(
        'confirm',
        this.dataReset(),
        reset
      )
      this.setShowBar();
    },
    submit(){
      this.emitConfirm();
      this.dialogHide();
    },
    setShowBar(){
      this.conditionNum = this.currentCondition.filter(val=> val !== '不限').length;
      const name = this.jobJson[this.activeJobPosition[0]].industry[this.activeJobPosition[1]];
      this.positionName = name === '不限' ? '职位类别' : name;
    },
    initFilterBar(){
      if(!this.filterCondition) return;
      const condition = this.filterCondition;
      this.activeJobPosition[0] = condition.type ? this.jobJson.findIndex(val=>val.type === condition.type) : 0;
      this.activeJobPosition[1] = condition.type && condition.name ? this.jobJson[this.activeJobPosition[0]].industry.findIndex(val=>val === condition.name) : 0;
      this.currentCondition[0] = nullString(condition.perDiem);
      this.currentCondition[1] = nullString(condition.workTime);
      this.currentCondition[2] = nullString(condition.workDate);
      this.currentCondition[3] = nullString(condition.education);
      this.currentCondition[4] = nullString(condition.correctionChance);
      this.setShowBar();
    }
  },
  watch:{
    filterCondition(){
      this.initFilterBar();
    }
  },
  created() {
    this.initFilterBar();
  }
}
</script>
<style lang="stylus">
.filter-dialog{
  position fixed
  z-index 5
  top 0
  left 0
  width 100%;
  height 100%;
  background rgba(0, 0, 0, 0.4)
  transition all .3s
  transform translateY(-100%);
  &.active{
    transform translateY(0);
  }
  .filter-content-warp{
    width 375px
    margin-top 5px
    overflow hidden
  }
  .filter-content{
    transition all .3s;
    position relative
    display flex
    width 750px;
    &.condition{
      transform translateX(-375px);
    }
  }
  .content{
    background #fff
    .filter-bar{
      border 0;
      box-shadow 0 2px 2px 2px #fafafa
    }
  }
  .job-warp{
    flex 1
    height 380px
    overflow auto
  }
  .job-type{
    border-right 1rpx solid #ebebeb
    background #f8f8f8
  }
  .job-type,.job-type-sub{
    line-height 40px
    color #666666
    font-size 15px
    text-align center
  }
  .job-item{
    border-bottom 1rpx solid #ebebeb
    &.active{
      background #ffffff
      color #5c91fd
    }
  }
  .job-item-sub{
    border-bottom 1rpx solid #fff
    &.active{
      background #ffffff
      color #5c91fd
    }
  }
  .filter-position{
    display flex
    width 375px
  }
  .filter-condition{
    width 375px
    height 380px
  }
  .condition-group{
    padding 5px 15px
    .title{
      margin-bottom 10px
      color #666
      font-size 14px
      font-weight bold;
    }
    .item-bar{
      display flex
      flex-wrap wrap
    }
    .condition-item{
      width 80px;
      font-size 13px
      line-height 65rpx;
      background #f8f8f8;
      color #777777;
      text-align center;
      border-radius 5px
      &.active{
        background #5c91fd
        color #fff
      }
      &+.condition-item{
        margin-left 8px
      }
      &:nth-child(5n){
        margin-left 0
      }
      &:nth-child(n+5){
        margin-top 10px
      }
    }
  }
  .opreate{
    display flex
    border-top 1rpx solid #ebebeb;
    line-height 45px
    font-size 17px
    .reset,.confirm{
      flex 1
      text-align center
    }
    .reset{
      color #666666
      background #fff
    }
    .confirm{
      color #fff
      background #5c91fd
    }
  }
}
.filter-bar{
  position relative
  display flex
  border-bottom 1rpx solid #ebebeb;
  border-top 10px solid #f8f8f8;
  color: #777777;
  font-size 15px;
  height 39px
  line-height 39px
  &::after{
    position absolute
    top 0;
    left calc(50% - 1px);
    content '';
    border-right 1rpx solid #ebebeb;
    height 100%;
  }
}
.filter-item{
  position relative
  display flex
  justify-content center
  align-items center
  flex 1;
  font-size 15px
  color #777
  font-weight 300
  &.active{
    color #5c91fd
    .down-icon{
      background url(./blue_03.png) center center/100% 100%;
    }
  }
  .down-icon{
    display inline-block
    margin-left 10px
    width 20rpx;
    height 10rpx;
    background url(./icon_06.png) center center/100% 100%;
  }
  .weui-cell__ft{
    color #fff
    transform rotate(90deg)
    margin-left 5px
    margin-bottom 5px
  }
}
</style>
