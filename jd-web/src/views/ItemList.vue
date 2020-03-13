<template>
  <div class="item-list-page">
    <navigation-bar @onLeftClick="onBackClick" :pageName="'商品列表'">
      <template v-slot:nav-right>
        <img :src="layoutType.icon" @click="onChangeLayoutClick()" />
      </template>
    </navigation-bar>
    <div class="item-list-page-content">
      <item-options @optionChange="onItemOptionChange"></item-options>
      <item :layoutType="layoutType.type" :sort="sortType"></item>
    </div>
  </div>
</template>

<script>
import NavigationBar from "@c/currency/NavigationBar.vue";
import ItemOptions from "@c/items/ItemOptions.vue";
import Item from "@c/items/Item.vue";
export default {
  components: {
    NavigationBar,
    Item,
    ItemOptions
  },
  data: function() {
    return {
      layoutTypeData: [
        {
          type: 'vertical',
          icon: require('@img/list-type.svg')
        },
        {
          type: 'grid',
          icon: require('@img/grid-type.svg')
        },
        {
          type: 'waterfall',
          icon: require('@img/waterfall-type.svg')
        }
      ],
      layoutType: {},
      sortType: '1'
    };
  },
  created: function() {
    this.layoutType = this.layoutTypeData[0];
  },
  methods: {
    onBackClick: function() {
      this.$router.go(-1);
    },
    /**
     * 切换布局
     */
    onChangeLayoutClick: function() {
      if (this.layoutType.type === 'vertical') {
        this.layoutType = this.layoutTypeData[1];
      } else if (this.layoutType.type === 'grid') {
        this.layoutType = this.layoutTypeData[2];
      } else {
        this.layoutType = this.layoutTypeData[0];
      }
    },
    onItemOptionChange: function (sortType) {
      this.sortType = sortType.id
    }
  }
};
</script>

<style lang='scss' scoped>
@import "@css/style.scss";
.item-list-page {
  height: 100%;
  width: 100%;
  background-color: $bgColor;
  display: flex;
  flex-direction: column;

  &-content {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
}
</style>