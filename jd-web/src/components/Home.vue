<template>
  <div class="home">
    <div class="home-content">
      <my-swiper :swiperImgs="swiperData.map(item => item.icon)" :height="swiperHeight"></my-swiper>
      <activity>
        <div class="activity-520">
          <img v-for="(item, index) in activityData" :key="index" :src="item.icon" />
        </div>
      </activity>
      <!-- 功能选项 -->
      <mode-options></mode-options>
      <!-- 秒杀模块 -->
      <seconds :dataSource="secondData"></seconds>
    </div>
  </div>
</template>

<script>
import MySwiper from "@c/swiper/MySwiper.vue";
import Activity from "@c/currency/Activity.vue";
import ModeOptions from "@c/currency/ModeOptions.vue";
import Seconds from "@c/seconds/Seconds.vue";
export default {
  components: {
    MySwiper,
    Activity,
    ModeOptions,
    Seconds
  },
  data: function() {
    return {
      swiperImgs: [],
      swiperData: [],
      swiperHeight: "184px",
      activityData: [],
      secondData: []
    };
  },
  created: function() {
    this.initData();
  },
  methods: {
    // 获取数据
    initData: function() {
      this.$http
        .all([
          this.$http.get("/swiper"),
          this.$http.get("/activitys"),
          this.$http.get("/seconds")
        ])
        .then(
          this.$http.spread((swiperData, activityData, secondData) => {
            this.swiperData = swiperData.list;
            this.activityData = activityData.list;
            this.secondData = secondData.list;
          })
        );
    }
  }
};
</script>

<style lang='scss' scoped>
@import "@css/style.scss";
.home {
  width: 100%;
  height: 100%;
  background-color: $bgColor;

  &-content {
    height: 100%;

    .activity-520 {
      margin-top: px2rem(-8);
      border-top-left-radius: px2rem(8);
      border-top-right-radius: px2rem(8);

      img {
        display: inline-block;
        width: 33.33%;
      }
    }
  }
}
</style>