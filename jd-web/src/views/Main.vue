<template>
  <div class="main">
    <!-- 动态组件 -->
    <keep-alive>
      <component :is="currentComponent"></component>
    </keep-alive>
    <tool-bar @onChangeFragment="onChangeFragment"></tool-bar>
  </div>
</template>

<script>
import Toolbar from "@c/currency/Toolbar.vue";
export default {
  name: "homepage",
  components: {
    "tool-bar": Toolbar,
    // 异步组件引入方式
    home: () => import("@c/Home"),
    shopping: () => import("@c/Shopping"),
    my: () => import("@c/My")
  },
  data: function() {
    return {
      currentComponent: "home"
    };
  },
  methods: {
    onChangeFragment: function(compoentName) {
      this.currentComponent = compoentName;
    }
  }
};
</script>

<style lang='scss' scoped>
.main {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
