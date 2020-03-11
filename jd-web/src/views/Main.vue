<template>
  <div class="main">
    <!-- 动态组件 -->
    <component :is="currentComponent"></component>
    <tool-bar @onChangeFragment="onChangeFragment"></tool-bar>
  </div>
</template>

<script>
import Toolbar from '@c/currency/Toolbar.vue'
export default {
  components: {
    'tool-bar': Toolbar,
    // 异步组件引入方式
    'home': () => import('@c/Home'),
    'shopping': () => import('@c/Shopping'),
    'my': () => import('@c/My')
  },
  data: function () {
    return {
      currentComponent: 'home'
    }
  },
  methods: {
    onChangeFragment: function (compoentName) {
      this.currentComponent = compoentName
    }
  }
}
</script>

<style lang='scss' scoped>
  .main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
