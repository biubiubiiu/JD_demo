<template>
  <div class="nav-bar z-index-max" :style="navBarStyle" :class="{'bottom-line':pageName}">
    <div class="left">
      <img v-if="isShowBack" src="@img/back.svg" />
      <!-- 具名插槽 -->
      <slot name="nav-left"></slot>
    </div>
    <div class="center">
      <span class="page-title">{{pageName}}</span>
      <slot name="nav-center"></slot>
    </div>
    <div class="right">
      <slot name="nav-right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pageName: {
      type: String,
      default: ""
    },
    // 是否展示后退按钮
    isShowBack: {
      type: Boolean,
      default: true
    },
    navBarStyle: {
      type: Object,
      default: function() {
        return {
          backgroundColor: "white"
        };
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@css/style.scss";
.nav-bar {
  width: 100%;
  height: px2rem(44);
  line-height: px2rem(44);
  display: flex;
  justify-content: space-between;

  .left,
  .right {
    display: flex;
    height: 100%;
    width: px2rem(26);
    padding: 0 $marginSize;

    img {
      width: 100%;
      align-self: center;
    }
  }

  .center {
    display: flex;
    height: 100%;
    flex-grow: 1;

    .page-title {
      font-size: $titleSize;
      align-self: center;
    }
  }

  .bottom-line {
    border-bottom: 1px solid $lineColor;
  }
}
</style>