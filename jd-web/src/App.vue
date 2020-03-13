<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive :include="virtualTaskStack">
        <router-view />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      transitionName: "fold-left",
      // 虚拟任务栈
      virtualTaskStack: [
        'homepage'
      ]
    };
  },
  // watch $route 决定使用哪种过渡
  watch: {
    $route(to, from) {
      const routerType = to.params.routerType;
      if (routerType === "push") {
        // 保存新页面名称到虚拟任务栈
        this.virtualTaskStack.push(to.name);
        // 设置切换动画
        this.transitionName = "fold-left";
      } else {
        // 从虚拟任务栈中弹出任务
        this.virtualTaskStack.pop();
        // 设置切换动画
        this.transitionName = "fold-right";
      }
    }
  }
};
</script>

<style lang='scss'>
@import "@css/style.scss";
#app {
  width: 100%;
  height: 100%;

  .fold-left-enter-active {
    animation-name: fold-left-in;
    animation-duration: 0.4s;
  }

  .fold-left-leave-active {
    animation-name: fold-left-out;
    animation-duration: 0.4s;
  }

  .fold-right-enter-active {
    animation-name: fold-right-in;
    animation-duration: 0.4s;
  }

  .fold-right-leave-active {
    animation-name: fold-right-out;
    animation-duration: 0.4s;
  }

  @keyframes fold-left-in {
    0% {
      transform: translate(100%, 0);
    }
    100% {
      transform: translate(0, 0);
    }
  }

  @keyframes fold-left-out {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(-100%, 0);
    }
  }

  @keyframes fold-right-in {
    0% {
      transform: translate(-100%, 0);
    }
    100% {
      transform: translate(0, 0);
    }
  }

  @keyframes fold-right-out {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(100%, 0);
    }
  }
}
</style>
