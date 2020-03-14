<template>
  <div class="tool-bar">
    <div class="tool-bar-item" @click="onChangeFragment(item, index)"
    v-for="(item, index) in toolBarData" :key="index">
      <img class="tool-bar-item-img" :src="[index === selectedItemIndex ? item.hIcon : item.nIcon]" />
      <!-- 当前p标签的index===选中tab的index的时候，就让img显示高亮图片 -->
      <p
        class="tool-bar-item-name"
        :class="{'tool-bar-item-name-h' : index === selectedItemIndex}"
      >{{item.name}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      /*
       * tab 按钮数据源
       * nIcon: 默认状态下的图片
       * hIcon: 高亮状态下的图片
       * name: 名称
       * componentName: 组件名称
       */
      toolBarData: [
        {
          nIcon: require('@img/home-n.svg'),
          hIcon: require('@img/home-h.svg'),
          name: '首页',
          componentName: 'home'
        },
        {
          nIcon: require('@img/shopping-n.svg'),
          hIcon: require('@img/shopping-h.svg'),
          name: '购物车',
          componentName: 'shopping'
        },
        {
          nIcon: require('@img/my-n.svg'),
          hIcon: require('@img/my-h.svg'),
          name: '我的',
          componentName: 'my'
        }
      ],
      // 选中的 tab 按钮
      selectedItemIndex: 0
    }
  },
  methods: {
    onChangeFragment: function (item, index) {
      this.selectedItemIndex = index
      this.$emit('onChangeFragment', item.componentName)
    },
    pushFragment: function(index) {
      this.onChangeFragment(this.toolBarData[index], index)
    }
  }
}
</script>

<style lang='scss' scoped>
@import '@css/style.scss';
  .tool-bar {
    width: 100%;
    height: px2ren(46);
    display: flex;
    justify-content: space-around;
    background-color: white;
    box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.2);
    border-top: 1px solid $lineColor;

    &-item {
      text-align: center;
      padding: px2rem(4) px2rem(12);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &-img {
        width: px2rem(22);
        height: px2rem(22);
      }

      &-name {
        font-size: $infoSize;
        margin-top: px2rem(4);

        &-h {
          color: $mainColor;
        }
      }
    }
  }
</style>
