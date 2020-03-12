<template>
  <!-- 缺货的标签 -->
  <span class="goods-item-name-lack">缺货</span>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@css/style.scss";
.goods-item-name-lack {
  padding: 0 px2rem(4);
  font-size: $minInfoSize;
  color: white;
  background-color: #999999;
  border-radius: px2rem(2);
  margin-right: px2rem(2);
}
</style>