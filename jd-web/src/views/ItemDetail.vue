<template>
  <div class="item-detail">
    <navigation-bar :isShowBack="false" :navBarStyle="navBarStyle">
      <template v-slot:nav-left>
        <div class="item-detail-nav-left" @click="onBackClick">
          <img src="@img/back-2.svg" :style="{opacity: leftImgOpacity}" />
          <!-- 完全展示之后的白色后退按钮 -->
          <img src="@img/back-white.svg" :style="{opacity: navBarOpacity}" />
        </div>
      </template>
      <template v-slot:nav-center>
        <p class="item-detail-nav-title" :style="{opacity: navBarOpacity}">商品详情</p>
      </template>
    </navigation-bar>
    <div class="item-detail-content">
      <parallax  @onScroll="onScroll">
        <template v-slot:parallax-slow>
          <my-swiper
            :paginationType="'number'"
            :height="SWIPER_IMG_HEIGHT+'px'"
            :swiperImgs="itemData.swiperImgs"
          ></my-swiper>
        </template>
        <template>
          <div class="item-detail-content-desc">
            <div class="item-detail-content-desc-item">
              <p class="item-detail-content-desc-item-price">￥{{itemData.price | priceValue}}</p>
              <p class="item-detail-content-desc-item-name">
                <direct v-if="itemData.isDirect"></direct>
                {{itemData.name}}
              </p>
            </div>
            <div class="item-detail-content-desc-item">
              <p class="item-detail-content-desc-item-select">
                已选
                <span class="single-row-text">{{itemData.name}}</span>
              </p>
              <div class="item-detail-content-desc-item-support">
                <ul class="item-detail-content-desc-item-suppport-list">
                  <li
                    class="item-detail-content-desc-item-support-list-item"
                    v-for="(item, index) in attachData"
                    :key="index"
                  >
                    <img src="@img/support.svg" />
                    <span>{{item}}</span>
                  </li>
                </ul>
              </div>
              <div class="item-detail-content-desc-detail">
                <img v-for="(item, index) in itemData.detailImgs" :key="index" :src="item" />
              </div>
            </div>
          </div>
        </template>
      </parallax>
    </div>
    <div class="item-detail-buy">
      <div class="item-detail-buy-add">加入购物车</div>
      <div class="item-detail-buy-now">立即购买</div>
    </div>
  </div>
</template>

<script>
import NavigationBar from "@c/currency/NavigationBar.vue";
import MySwiper from "@c/swiper/MySwiper.vue";
import Direct from "@c/items/Direct.vue";
import Parallax from "@c/parallax/Parallax.vue";
export default {
  components: {
    NavigationBar,
    MySwiper,
    Direct,
    Parallax
  },
  data: function() {
    return {
      SWIPER_IMG_HEIGHT: 364,
      itemData: {},
      attachData: [
        "可配送海外",
        "京东发货&售后",
        "京准达",
        "211限时达",
        "可自提",
        "不可使用优惠券"
      ],
      ANCHOR_SCROLL_TOP: 310,
      scrollValue: 0
    };
  },
  methods: {
    onBackClick: function() {
      this.$router.go(-1);
    },
    onScroll: function(value) {
      this.scrollValue = value;
    }
  },
  created: function() {
    this.itemData = this.$route.params.item;
  },
  computed: {
    /**
     * 左侧后退按钮的透明度
     */
    leftImgOpacity: function() {
      return 1 - this.scrollValue / this.ANCHOR_SCROLL_TOP;
    },
    /**
     * navBar 的样式
     */
    navBarStyle: function() {
      return {
        backgroundColor: "rgba(216, 30, 6, " + this.navBarOpacity + ")",
        position: "fixed",
        top: 0
      };
    },
    /**
     * navBar的透明度
     */
    navBarOpacity: function() {
      return this.scrollValue / this.ANCHOR_SCROLL_TOP;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@css/style.scss";
.item-detail {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;

  &-nav-left {
    width: 100%;
    display: flex;
    position: relative;

    img {
      position: absolute;
      align-self: center;
    }
  }

  &-nav-title {
    width: 100%;
    height: 100%;
    font-size: $titleSize;
    font-weight: bold;
    text-align: center;
    color: white;
  }

  &-content {
    overflow: hidden;
    height: 100%;

    &-desc {
      width: 100%;
      background-color: $bgColor;
      box-shadow: 0 0 px2rem(16) 0 rgba(0, 0, 0, 0.2);

      &-item {
        background-color: white;
        padding: $marginSize;
        margin-bottom: $marginSize;

        &-price {
          font-size: px2rem(25);
          color: $mainColor;
          font-weight: 500;
        }

        &-name {
          margin-top: $marginSize;
          font-size: $titleSize;
          font-weight: 500;
          line-height: px2rem(20);
        }

        &-select {
          font-size: $infoSize;
          color: $hintColor;
          height: px2rem(44);
          display: flex;
          align-items: center;
          border-bottom: px2rem(1) solid $lineColor;

          span {
            color: $textColor;
            font-size: $titleSize;
            font-weight: bold;
            margin-left: px2rem(4);
            width: 80%;
          }
        }

        &-support {
          margin-top: $marginSize;

          &-list {
            display: flex;
            flex-wrap: wrap;

            &-item {
              display: flex;
              align-items: center;
              padding: px2rem(6) 0;
              margin-right: $marginSize;

              img {
                width: px2rem(12);
                margin-right: px2rem(4);
              }

              span {
                font-size: $minInfoSize;
                color: $hintColor;
              }
            }
          }
        }
      }

      &-detail {
        img {
          width: 100%;
        }
      }
    }
  }

  &-buy {
    background-color: white;
    border-top: px2rem(1) solid $lineColor;
    height: px2rem(46);
    line-height: px2rem(46);
    text-align: right;

    div {
      display: inline-block;
      width: px2rem(100);
      text-align: center;
      font-size: $infoSize;
      color: white;
    }

    &-add {
      background-color: $mainColor;
    }

    &-now {
      background-color: darkgoldenrod;
    }
  }
}
</style>