<template>
  <div class="pay">
    <navigation-bar :pageName="'立即购买'" @onLeftClick="onBackClick"></navigation-bar>
    <div class="pay-content">
      <div class="pay-content-item">
        <img class="pay-content-item-img" :src="itemData.img" />
        <div class="pay-content-item-desc">
          <p class="pay-content-item-desc-name">{{itemData.name}}</p>
          <p class="pay-content-item-desc-price">￥{{itemData.price | priceValue}}</p>
        </div>
      </div>

      <!-- 支付方式 -->
      <ul class="pay-content-list">
        <li
          class="pay-content-list-item"
          v-for="(item, index) in paymentData"
          :key="index"
          @click="onItemClick(item)"
        >
          <img :src="item.icon" class="pay-content-list-item-icon" />
          <div class="pay-content-list-item-desc">
            <p class="pay-content-list-item-desc-name">{{item.name}}</p>
            <p class="pay-content-list-item-desc-desc">{{item.desc}}</p>
          </div>
          <img
            class="pay-content-list-item-check"
            :src="getCheckIcon(selectedPayment.id === item.id)"
          />
        </li>
      </ul>
    </div>
    <div class="payment page-commit">立即购买</div>
  </div>
</template>

<script>
import NavigationBar from "@c/currency/NavigationBar.vue";
export default {
  name: "pay",
  components: {
    NavigationBar
  },
  data: function() {
    return {
      itemData: {},
      paymentData: [
        {
          id: "1",
          name: "支付宝支付",
          desc: "数亿用户都在用，安全可信托",
          icon: require("@img/alipay.svg")
        },
        {
          id: "2",
          name: "微信支付",
          desc: "亿万用户选择，更快更安全",
          icon: require("@img/wechat.png")
        }
      ],
      selectedPayment: {}
    };
  },
  created: function() {
    this.selectedPayment = this.paymentData[0];
    this.loadItemData();
  },
  methods: {
    loadItemData: function() {
      this.$http
        .get("/goodsDetail", {
          params: {
            goodsId: this.$route.query.itemId
          }
        })
        .then(data => {
          this.itemData = data.goodsData;
        });
    },
    onBackClick: function() {
      this.$router.go(-1);
    },
    onItemClick: function(item) {
      this.selectedPayment = item;
    },
    getCheckIcon: function(isCheck) {
      return isCheck ? require("@img/check.svg") : require("@img/no-check.svg");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@css/style.scss";
.pay {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: $bgColor;

  &-content {
    overflow: hidden;
    height: 100%;

    &-item {
      background-color: white;
      padding: $marginSize;
      display: flex;
      border-bottom: px2rem(1) solid $lineColor;
      border-top: px2rem(1) solid $lineColor;
      margin-top: $marginSize;

      &-img {
        width: px2rem(100);
        height: px2rem(100);
      }

      &-desc {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 0 $marginSize;

        &-name {
          font-size: $infoSize;
          line-height: px2rem(18);
        }

        &-price {
          font-size: $titleSize;
          color: $mainColor;
          font-weight: 500;
        }
      }
    }

    &-list {
      margin-top: $marginSize;

      &-item {
        display: flex;
        background-color: white;
        border-bottom: px2rem(1) solid $lineColor;
        padding: $marginSize;
        align-items: center;

        &-icon {
          height: px2rem(30);
        }

        &-desc {
          margin-left: px2rem(12);
          flex-grow: 1;

          &-name {
            font-size: $infoSize;
          }

          &-desc {
            font-size: $minInfoSize;
            margin-top: px2rem(6);
            color: $hintColor;
          }

          &-check {
            width: px2rem(16);
            height: px2rem(16);
          }
        }
      }
    }
  }

  .payment {
    position: absolute;
    bottom: px2rem(52);
  }
}
</style>