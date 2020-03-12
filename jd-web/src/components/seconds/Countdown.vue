<template>
  <div class="count-down">
    <span class="count-down-end-time">{{endHour}}点场</span>
    <span class="count-down-surplus">{{surplus | time}}</span>
  </div>
</template>

<script>
export default {
  props: {
    // 活动开始时间
    endHour: {
      type: Number,
      required: true,
      default: 0
    }
  },
  data: function() {
    return {
      surplus: '',
      // 距离活动开始的秒数
      diffSeconds: 0,
      interval: undefined
    }
  },
  created: function () {
    this.computedSurplusTime()
  },
  methods: {
    computedSurplusTime: function() {
      if (this.interval) {
        clearInterval(this.interval)
      }
      const date = new Date()
      if(date.getHours() > this.endHour) {
        this.surplus = '活动已结束'
        return
      }
      else if(date.getHours() === this.endHour) {
        this.surplus = '活动进行中'
        return
      }
      const diffHours = this.endHour-date.getHours()-1
      const diffMinutes = 60-date.getMinutes()-1
      const diffSeconds = 60-date.getSeconds()
      this.diffSeconds = diffHours*3600 + diffMinutes*60 + diffSeconds
      this.interval = setInterval(() => {
        this.diffSeconds -= 1
      }, 1000)
    }
  },
  watch: {
    /**
     * 当 diffSeconds 值变化时，执行此回调
     * 将秒数转化为 时：分：秒格式
     */
    diffSeconds: function (val) {
      const hour = Math.floor(val/3600)
      const minute = Math.floor(val/60)%60
      const second = val%60
      this.surplus = hour + ':' + minute + ':' + second

      if(val === 0) {
        this.computedSurplusTime()
      }
    },
    /**
     * 当活动开始时间变化时，执行此回调
     */
    endHour: function () {
      this.computedSurplusTime()
    }
  }
};
</script>

<style lang='scss' scoped>
@import '@css/style.scss';
  .count-down {
    display: inline-block;
    font-size: $infoSize;
    margin-left: $marginSize;

    span {
      display: inline-block;
      padding: px2rem(2) px2rem(4);
    }

    &-end-time {
      background-color: $mainColor;
      border-top-left-radius: px2rem(4);
      border-bottom-left-radius: px2rem(4);
      border: px2rem(1) solid $mainColor;
      color: white;
    }

    &-surplus {
      background-color: white;
      border-top-right-radius: px2rem(4);
      border-bottom-right-radius: px2rem(4);
      border: px2rem(1) solid $mainColor;
      color: $mainColor;
    }
  }
</style>