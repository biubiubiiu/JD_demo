<template>
  <div class="cart">
    <navigation-bar :pageName="'购物车'" :isShowBack="false"></navigation-bar>
    <div class="cart-content">
      <div class="cart-content-list">
        <div class="cart-content-list-item" v-for="(item, index) in cartData" :key="index">
          <img
            class="cart-content-list-item-check"
            :src="item.isCheck ? require('@img/check.svg') : require('@img/no-check.svg')"
            @click="checkItem(item)"
          />
          <img class="cart-content-list-item-img" :src="item.img" />
          <div class="cart-content-list-item-desc">
            <p class="cart-content-list-item-desc-name text-line-2">
              <direct v-if="item.isDirect"></direct>
              {{item.name}}
            </p>
            <div class="cart-content-list-item-desc-data">
              <p class="cart-content-list-item-desc-data-price">￥{{item.price * item.quantity | priceValue}}</p>
              <quantity-manager
                :defaultQuantity="item.quantity"
                @onChangeQuantity="onQuantityChange(arguments, item, index)"
              ></quantity-manager>
            </div>
          </div>
        </div>
      </div>

      <div class="cart-content-total">
        <div class="cart-content-total-check">
          <img
            :src="total.isAll ? require('@img/check.svg') : require('@img/no-check.svg')"
            @click="checkAll"
          />
          <p>全选</p>
        </div>

        <div class="cart-content-total-price">
          <p class="cart-content-total-price-total">
            合计：
            <span>￥{{total.totalPrice | priceValue}}</span>
          </p>
          <p class="cart-content-total-price-all">
            总额：
            <span>￥{{total.totalPrice | priceValue}}</span>
            &nbsp;&nbsp;
            立减
            <span>￥0.00</span>
          </p>
        </div>

        <div class="cart-content-total-commit">去结算（{{total.itemCount}}）</div>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationBar from "@c/currency/NavigationBar.vue";
import Direct from "@c/items/Direct.vue";
import QuantityManager from "@c/items/QuantityManager.vue";
export default {
  components: {
    NavigationBar,
    Direct,
    QuantityManager
  },
  data: function() {
    return {
      cartData: this.$store.state.cartData,
      total: {
        // 是否全选
        isAll: false,
        // 总价格
        totalPrice: 0,
        // 总数量
        itemCount: 0
      }
    };
  },
  methods: {
    /**
     * @param $arguments
     */
    onQuantityChange: function($arguments, item, index) {
      let quantity = $arguments[0];
      this.$store.commit("modifyItemQuantity", {
        index: index,
        quantity: quantity
      });
      if(item.isCheck) {
        this.computeTotal()
      }
    },
    checkItem: function(item) {
      item.isCheck = !item.isCheck;
      this.computeTotal();
    },
    checkAll: function() {
      this.total.isAll = !this.total.isAll;
      this.cartData.forEach(item => (item.isCheck = this.total.isAll));
      this.computeTotal();
    },
    computeTotal: function() {
      this.total = {
        isAll: true,
        totalPrice: 0,
        itemCount: 0
      };
      this.cartData.forEach(item => {
        if (item.isCheck) {
          this.total.totalPrice +=
            parseFloat(item.price) * parseInt(item.quantity);
          this.total.itemCount += parseInt(item.quantity);
        } else {
          this.total.isAll = false;
        }
      });
    }
  }
};
</script>

<style lang='scss' scoped>
@import "@css/style.scss";
.cart {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-flow: column;

  &-content {
    background-color: $bgColor;
    border-top: px2rem(1) solid $lineColor;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    &-list {
      height: 100%;
      overflow: hidden;
      overflow-y: auto;

      &-item {
        background-color: white;
        padding: $marginSize;
        display: flex;
        border-bottom: px2rem(1) solid $lineColor;

        &-check {
          width: $checkSize;
          height: $checkSize;
          align-self: center;
          padding: px2rem(6);
        }

        &-img {
          width: $listItemImgSize;
          height: $listItemImgSize;
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

          &-data {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: $marginSize;

            &-price {
              font-size: $titleSize;
              color: $mainColor;
              font-weight: 500;
            }
          }
        }
      }
    }

    &-total {
      height: px2rem(56);
      box-sizing: border-box;
      display: flex;
      align-items: center;
      background-color: white;
      border-top: px2rem(1) solid $lineColor;

      &-check {
        display: flex;
        align-items: center;
        margin: 0 $marginSize;

        img {
          width: $checkSize;
          height: $checkSize;
          padding: px2rem(6);
        }

        p {
          font-size: $infoSize;
        }
      }

      &-price {
        flex-grow: 2;
        display: flex;
        flex-direction: column;

        &-total {
          font-size: $titleSize;
          margin-bottom: px2rem(6);

          span {
            font-weight: bold;
          }
        }

        &-all {
          font-size: $minInfoSize;
          span {
            font-weight: bold;
          }
        }
      }

      &-commit {
        width: px2rem(120);
        height: 100%;
        font-size: $titleSize;
        background-color: $mainColor;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>