<template>
  <div
    class="goods"
    :class="[layoutClass, {'goods-scroll':isScroll}]"
    :style="{height: goodsViewHeight}"
    ref="items"
    @scroll="onScroll"
  >
    <div
      class="goods-item"
      :class="layoutItemClass"
      ref="goodsItem"
      @click="onItemClick(item)"
      v-for="(item, index) in dataSource"
      :key="index"
      :style="goodsItemStyles[index]"
    >
      <img class="goods-item-img" :src="item.img" :style="imgStyles[index]" />
      <div class="goods-item-desc">
        <p
          class="goods-item-desc-name text-line-2"
          :class="{'goods-item-decs-name-hint' : !item.isHave}"
        >
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
import Direct from "@c/items/Direct.vue";
import Lack from "@c/items/Lack.vue";
export default {
  components: {
    Lack,
    Direct
  },
  props: {
    // 布局形式
    // "vertical", "grid", "waterfall"
    layoutType: {
      type: String,
      default: "vertical"
    },
    /**
     * 是否允许单独滑动
     */
    isScroll: {
      type: Boolean,
      default: true
    },
    sort: {
      type: String,
      default: "ignore"
    }
  },
  created: function() {
    this.initData();
  },
  activated: function (){
    this.$refs.items.scrollTop = this.scrollTopValue;
  },
  watch: {
    layoutType: function() {
      this.initLayout();
    },
    sort: function () {
      this.setSortItemsData();
    }
  },
  methods: {
    initData: function() {
      this.$http.get("/goods").then(data => {
        this.dataSource = data.list;
        this.setSortItemsData();
        this.initLayout();
      });
    },
    setSortItemsData: function() {
      switch (this.sort) {
        case "1":
          this.sortedDataSource = this.dataSource.slice(0);
          break;
        case "1-2":
          this.getSortItemDataFromKey("price");
          break;
        case "1-3":
          this.getSortItemDataFromKey("volume");
          break;
        case "2":
          this.getSortItemDataFromKey("isHave");
          break;
        case "3":
          this.getSortItemDataFromKey("isDirect");
          break;
      }
    },
    getSortItemDataFromKey: function(key) {
      this.sortedDataSource.sort((item1, item2) => {
        let v1 = item1[key],
          v2 = item2[key];
        if (typeof v1 === "boolean") {
          if (v1) return -1;
          if (v2) return 1;
          return 0;
        }
        if (parseFloat(v1) >= parseFloat(v2)) {
          return -1;
        }
        return 1;
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
      if (!this.isScroll) {
        this.goodsViewHeight =
          Math.max(leftHeightTotal, rightHeightTotal) + "px";
      }
    },
    /**
     * 设置布局，为不同的 layoutType 设定不同的展示形式
     */
    initLayout: function() {
      // 初始化
      this.goodsViewHeight = "100%";
      this.goodsItemStyles = [];
      this.imgStyles = [];

      switch (this.layoutType) {
        case "vertical":
          this.layoutClass = "goods-vertical";
          this.layoutItemClass = "goods-vertival-item";
          break;
        case "grid":
          this.layoutClass = "goods-grid";
          this.layoutItemClass = "goods-grid-item";
          break;
        case "waterfall":
          this.layoutClass = "goods-waterfall";
          this.layoutItemClass = "goods-waterfall-item";
          this.initImgStyles();
          // 等到dom创建完成后，渲染瀑布流布局
          this.$nextTick(() => {
            this.initWaterfall();
          });
          break;
      }
    },
    onItemClick: function (item) {
      if (!item.isHave) {
        alert('该商品无库存');
        return;
      }
      this.$router.push({
        name: 'ItemDetail',
        params: {
          routerType: 'push'
        },
        query: {
          itemId: item.id
        }
      })
    },
    onScroll: function ($event) {
      this.scrollTopValue = $event.target.scrollTop;
    }
  },
  data: function() {
    return {
      dataSource: [],
      sortedDataSource: [],
      // 商品图片的最大高度和最小高度
      MAX_IMG_HEIGHT: 230,
      MIN_IMG_HEIGHT: 178,
      // 图片样式集合
      imgStyles: [],
      ITEM_MARGIN_SIZE: 8,
      // 商品样式集合
      goodsItemStyles: [],
      goodsViewHeight: "100%",
      layoutClass: "goods-vertical",
      layoutItemClass: "goods-vertical-item",
      scrollTopValue: 0
    };
  }
};
</script>

<style lang='scss' scoped>
@import "@css/style.scss";
.goods {
  background-color: $bgColor;

  &-scroll {
    overflow: hidden;
    overflow-y: auto;
  }

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

.goods-vertical {
  &-item {
    display: flex;
    border-bottom: 1px solid $lineColor;

    .goods-item-img {
      width: px2rem(12);
      height: px2rem(12);
    }

    .goods-item-desc {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: $marginSize;
    }
  }
}

.goods-grid {
  padding: $marginSize;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  &-item {
    width: 49%;
    border-radius: $radiusSize;
    margin-bottom: $marginSize;

    .goods-item-img {
      width: 100%;
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