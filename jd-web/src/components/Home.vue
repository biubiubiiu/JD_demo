<template>
  <div class="home" @scroll="onScrollChange" ref="home">
    <navigation-bar :isShowBack="false" :navBarStyle="navBarStyle">
      <template v-slot:nav-left>
        <img :src="navBarCurrentSlotStyle.leftIcon" />
      </template>
      <template v-slot:nav-center>
        <search
          :bgColor="navBarCurrentSlotStyle.search.bgColor"
          :hintColor="navBarCurrentSlotStyle.search.hintColor"
          :icon="navBarCurrentSlotStyle.search.icon"
        ></search>
      </template>
      <template v-slot:nav-right>
        <img :src="navBarCurrentSlotStyle.rightIcon" />
      </template>
    </navigation-bar>
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
      <activity>
        <div class="activity-pin-gou-jie">
          <img src="@img/haoHuoQiang.gif" />
        </div>
      </activity>
      <!-- 商品列表 -->
      <item :layoutType="'waterfall'" :isScroll="false"></item>
    </div>
  </div>
</template>

<script>
import MySwiper from "@c/swiper/MySwiper.vue";
import Activity from "@c/currency/Activity.vue";
import ModeOptions from "@c/currency/ModeOptions.vue";
import NavigationBar from "@c/currency/NavigationBar.vue";
import Search from "@c/currency/Search.vue";
import Seconds from "@c/seconds/Seconds.vue";
import Item from "@c/items/Item.vue";
export default {
  components: {
    MySwiper,
    Activity,
    ModeOptions,
    Seconds,
    Item,
    NavigationBar,
    Search
  },
  data: function() {
    return {
      swiperImgs: [],
      swiperData: [],
      swiperHeight: "184px",
      activityData: [],
      secondData: [],
      // navBar 插槽的样式数据
      // 包括正常状态和高亮状态
      navBarSlotStyle: {
        normal: {
          leftIcon: require("@img/more-white.svg"),
          search: {
            bgColor: "#ffffff",
            hintColor: "#999999",
            icon: require("@img/search.svg")
          },
          rightIcon: require("@img/message-white.svg")
        },
        highlight: {
          leftIcon: require("@img/more.svg"),
          search: {
            bgColor: "#d7d7d7",
            hintColor: "#ffffff",
            icon: require("@img/search-white.svg")
          },
          rightIcon: require("@img/message.svg")
        }
      },
      // navBar 当前使用的插槽样式
      navBarCurrentSlotStyle: {},
      navBarStyle: {
        position: "fixed",
        backgroundColor: ""
      },
      // 记录页面滚动值
      scrollTopValue: -1,
      // 锚点值
      ANCHOR_SCROLL_TOP: 160
    };
  },
  created: function() {
    this.navBarCurrentSlotStyle = this.navBarSlotStyle.normal;
    this.initData();
  },
  activated: function() {
    this.$refs.home.scrollTop = this.scrollTopValue;
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
    },
    /**
     * 监听页面滚动
     */
    onScrollChange: function($event) {
      // 获取到当前页面滚动的距离
      this.scrollTopValue = $event.target.scrollTop;
      // 使不透明度线性变化
      let opacity = this.scrollTopValue / this.ANCHOR_SCROLL_TOP;
      // 如果滚动距离超过锚点位置
      // 设置导航栏为高亮状态
      if (opacity >= 1) {
        this.navBarCurrentSlotStyle = this.navBarSlotStyle.highlight;
      } else {
        this.navBarCurrentSlotStyle = this.navBarSlotStyle.normal;
      }
      this.navBarStyle.backgroundColor = "rgba(255, 255, 255, " + opacity + ")";
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
  overflow: hidden;
  overflow-y: auto;

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

    .activity-pin-gou-jie {
      background-color: white;
      margin-top: $marginSize;

      img {
        width: 100%;
      }
    }
  }
}
</style>