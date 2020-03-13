<template>
  <!-- 让多层背景以不同速度进行移动，实现视差效果 -->
  <div class="parallax" @scroll="onScroll">
    <div class="parallax-slow" :style="{top: slowTop}">
      <slot name="parallax-slow"></slot>
    </div>
    <div class="parallax-content z-index-2">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      SPEED_DIFF: 2,
      parallaxScroll: 0
    };
  },
  methods: {
    onScroll: function($event) {
      this.parallaxScroll = $event.target.scrollTop;
      this.$emit("onScroll", this.parallaxScroll);
    }
  },
  computed: {
    slowTop: function() {
      // 缓慢移动区的滑动距离 = 当前滑动距离/速度比
      // 缓冲掉的距离使用css的top来设置
      return this.parallaxScroll - this.parallaxScroll / this.SPEED_DIFF + "px";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@css/style.scss";
.parallax {
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;

  &-slow {
    width: 100%;
    position: relative;
  }

  &-content {
    width: 100%;
    position: relative;
  }
}
</style>