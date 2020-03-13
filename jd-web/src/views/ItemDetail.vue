<template>
  <div class="item-detail">
    <navigation-bar :isShowBack="false" :navBarStyle="navBarStyle">
      <template v-slot:nav-left>
        <div class="item-detail-nav-left" @click="onBackClick">
          <img src="@img/back-2.svg" />
        </div>
      </template>
    </navigation-bar>
    <div class="item-detail-content">
      <my-swiper
        :paginationType="'number'"
        :height="SWIPER_IMG_HEIGHT+'px'"
        :swiperImgs="itemData.swiperImgs"
      ></my-swiper>

      <div class="item-detail-content-desc">
        <div class="item-detail-content-desc-item">
          <p class="item-detail-content-desc-item-price">{{itemData.price | priceValue}}</p>
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

      <div class="item-detail-buy">
        <div class="item-detail-buy-add">加入购物车</div>
        <div class="item-detail-buy-now">立即购物车</div>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationBar from "@c/currency/NavigationBar.vue";
import MySwiper from "@c/swiper/MySwiper.vue";
import Direct from "@c/items/Direct.vue";
export default {
  components: {
    NavigationBar,
    MySwiper,
    Direct
  },
  data: function() {
    return {
      navBarStyle: {
        backgroundColor: "",
        position: "fixed"
      },
      SWIPER_IMG_HEIGHT: 364,
      itemData: {},
      attachData: [
        "可配送海外",
        "京东发货&售后",
        "京准达",
        "211限时达",
        "可自提",
        "不可使用优惠券"
      ]
    };
  },
  methods: {
    onBackClick: function() {
      this.$router.go(-1);
    }
  },
  created: function() {
    this.itemData = this.$route.params.item;
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

    img {
      align-self: center;
    }
  }

  &-content {
    overflow: hidden;
    overflow-y: auto;
    height: 100%;
  }
}
</style>