<template>
  <!-- 使用瀑布流布局的商品列表 -->
  <div class="goods goods-waterfall" :style="{height: goodsViewHeight}">
    <div
      class="goods-item goods-waterfall-item"
      ref="goodsItem"
      v-for="(item, index) in dataSource"
      :key="index"
      :style="goodsItemStyles[index]"
    >
      <img class="goods-item-img" :src="item.img" :style="imgStyles[index]" />
      <div class="goods-item-desc">
        <p class="goods-item-desc-name text-line-2" :class="{'goods-item-decs-name-hint' : !item.isHave}">
          <direct v-if="item.isDirect"></direct>
          <lack v-if="!item.isHave"></lack>
          {{item.name}}
        </p>
        <div class="goods-item-desc-data">
          <p class="goods-item-desc-data-price">￥{{item.price | priceValue}}</p>
          <p class="goods-item-desc-data-volume">销量：{{item.volume}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Direct from '@c/items/Direct.vue';
import Lack from '@c/items/Lack.vue';
export default {
  components: {
    Lack,
    Direct
  },
  created: function() {
    this.initData();
  },
  methods: {
    initData: function() {
      this.$http.get("/goods").then(data => {
        this.dataSource = data.list;
        this.initImgStyles();
        // 等到dom创建完成后，渲染瀑布流布局
        this.$nextTick(() => {
          this.initWaterfall();
        });
      });
    },
    /**
     * 返回随机的图片高度
     */
    imgHeight: function() {
      let result =
        Math.random() * (this.MAX_IMG_HEIGHT - this.MIN_IMG_HEIGHT) +
        this.MIN_IMG_HEIGHT;
      return result;
    },
    /**
     * 根据图片的高度，生成对应的图片样式数据
     */
    initImgStyles: function() {
      this.dataSource.forEach(element => {
        let imgHeight = this.imgHeight() + "px";
        this.imgStyles.push({
          height: imgHeight
        });
      });
    },
    /**
     * 实现瀑布流布局
     * 1. 获取到所有的item元素
     * 2. 遍历item元素，得到每一个item的高度，再加上margin高度
     * 3. 创建两个变量，分别表示左右两侧目前距离顶部的高度
     * 4. 选择距离顶部高度较小的一侧，放置item元素
     * 5. 保存所有样式，配置到对应item上
     */
    initWaterfall: function() {
      let $goodsItems = this.$refs.goodsItem;
      if (!$goodsItems) return;
      let leftHeightTotal = 0,
        rightHeightTotal = 0;
      $goodsItems.forEach(($el, index) => {
        let goodsItemStyle = {};
        let elHeight = $el.clientHeight + this.ITEM_MARGIN_SIZE;
        if (leftHeightTotal <= rightHeightTotal) {
          goodsItemStyle = {
            left: "0px",
            top: leftHeightTotal + "px"
          };
          leftHeightTotal += elHeight;
        } else {
          goodsItemStyle = {
            right: "0px",
            top: rightHeightTotal + "px"
          };
          rightHeightTotal += elHeight;
        }
        this.goodsItemStyles.push(goodsItemStyle);
      });
      this.goodsViewHeight = Math.max(leftHeightTotal, rightHeightTotal) + "px";
    }
  },
  data: function() {
    return {
      dataSource: [],
      // 商品图片的最大高度和最小高度
      MAX_IMG_HEIGHT: 230,
      MIN_IMG_HEIGHT: 178,
      // 图片样式集合
      imgStyles: [],
      ITEM_MARGIN_SIZE: 8,
      // 商品样式集合
      goodsItemStyles: [],
      goodsViewHeight: 0
    };
  }
};
</script>

<style lang='scss' scoped>
@import "@css/style.scss";
.goods {
  background-color: $bgColor;

  &-item {
    background-color: white;
    padding: $marginSize;
    box-sizing: border-box;

    &-desc {
      width: 100%;

      &-name {
        font-size: $infoSize;
        line-height: px2rem(18);

        &-hint {
          color: $hintColor;
        }
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

        &-volume {
          font-size: $infoSize;
          color: $hintColor;
        }
      }
    }
  }
}

.goods-waterfall {
  position: relative;
  margin: $marginSize;

  &-item {
    position: absolute;
    width: 49%;
    border-radius: $radiusSize;

    .goods-item-img {
      width: 100%;
    }
  }
}
</style>