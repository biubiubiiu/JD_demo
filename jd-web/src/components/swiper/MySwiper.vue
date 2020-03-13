<template>
  <swiper :options="swiperOption">
    <swiper-slide v-for="(slide, index) in swiperImgs" :key="index">
      <img class="swiper-slide-img" :src="slide" :style="{height: height}" />
    </swiper-slide>
    <template>
      <div class="swiper-pagination" slot="pagination"></div>
    </template>
  </swiper>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  props: {
    height: {
      type: String,
      default: "auto"
    },
    swiperImgs: {
      type: Array,
      required: true,
      default: function() {
        return [];
      }
    },
    // 分页器类型：圆点/页码
    // 'dot' / 'number'
    paginationType: {
      type: String,
      default: "dot"
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  data: function() {
    return {
      swiperOption: {
        autoplay: true,
        autoHeight: true,
        pagination: {
          // 分页器对应的 html 元素
          el: ".swiper-pagination",
          type: "bullets",
          bulletClass: "custom-bullet-class"
        }
      }
    };
  },
  methods: {
    /**
     * 根据分页器类型进行配置
     */
    initPaginationLayout: function() {
      switch (this.paginationType) {
        case 'dot':
          this.swiperOption.pagination = {
            el: ".swiper-pagination",
            type: "bullets",
            bulletClass: "custom-bullet-class"
          };
          break;
        case 'number':
          this.swiperOption.pagination = {
            el: '.swiper-pagination',
            type: 'fraction'
          }
          break
      }
    }
  },
  created: function () {
    this.initPaginationLayout()
  }
};
</script>

<style lang='scss'>
@import "@css/style.scss";
.swiper-slide-img {
  width: 100%;
}

.swiper-pagination {
  bottom: px2rem(12);
  .custom-bullet-class {
    box-sizing: border-box;
    border-radius: 100%;
    height: px2rem(6);
    width: px2rem(6);
    border: px2rem(1) solid #fff;
    margin: 0 px2rem(4);
    display: inline-block;
    opacity: 1;
  }
  .swiper-pagination-bullet-active {
    background: white;
  }
}

.swiper-pagination-fraction {
  left: auto;
  right: 0;
  width: auto;
  font-size: $infoSize;
  background-color: rgba(0, 0, 0, 0.3);
  padding: px2rem(6) px2rem(18);
  border-top-left-radius: px2rem(16);
  border-bottom-left-radius: px2rem(16);
  bottom: px2rem(32);
  color: white;
  
  .swiper-pagination-current {
    font-size: $titleSize;
    font-weight: bold;
  }
}
</style>