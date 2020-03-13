<template>
  <div class="items-options z-index-2">
    <ul class="items-options-list">
      <li class="items-options-list-item" v-for="(item, index) in optionData" :key="index">
        <a class="items-options-list-item-content" @click="onOptionClick(item, index)">
          <span
            class="items-options-list-item-content-name"
            :class="{'items-options-list-item-content-name-active' :selectedOption.id === item.id}"
          >{{item.name}}</span>
          <span
            class="items-options-list-item-content-caret caret"
            v-if="item.subs.length>0"
            :class="[isShowSubContent && selectedOption.id === item.id ? 'items-options-list-item-content-caret-open' : 'items-options-list-item-content-caret-close']"
          ></span>
        </a>
      </li>
    </ul>
    <!-- 子选项 -->
    <transition name="fold-height">
      <div class="options-sub-content z-index-2" v-show="isShowSubContent">
        <ul class="options-sub-content-list">
          <li
            class="options-sub-content-list-item"
            v-for="(item, index) in selectedOption.subs"
            :key="index"
          >
            <a class="options-sub-content-list-item-content" @click="onSubOptionClick(item, index)">
              <span
                class="options-sub-content-list-item-content-name"
                :class="{'options-sub-content-list-item-content-name-active' :selectedOption.id === item.id}"
              >{{item.name}}</span>
              <img
                class="options-sub-content-list-item-content-select"
                src="@img/options-select.svg"
                v-show="selectedOption.id == item.id"
              />
            </a>
          </li>
        </ul>
      </div>
    </transition>
    <!-- 遮盖层 -->
    <div class="cover" v-show="isShowSubContent" @click="isShowSubContent=false"></div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      optionData: [
        {
          id: "1-1",
          name: "默认",
          subs: [
            {
              id: "1-1",
              name: "默认"
            },
            {
              id: "1-2",
              name: "价格由高到低"
            },
            {
              id: "1-3",
              name: "价格由低到高"
            }
          ]
        },
        {
          id: "2",
          name: "有货优先",
          subs: []
        },
        {
          id: "3",
          name: "自营优先",
          subs: []
        }
      ],
      selectedOption: {},
      // 标记子选项视图是否展开
      isShowSubContent: false
    };
  },
  created: function() {
    this.selectedOption = this.optionData[0];
  },
  methods: {
    onOptionClick: function(item, index) {
      if (item.subs.length) {
        this.isShowSubContent = !this.isShowSubContent;
      } else {
        this.isShowSubContent = false;
      }
      this.selectedOption = item;
    },
    onSubOptionClick: function(item, index) {
      this.selectedOption = item;
      this.optionData.forEach(option => {
        option.subs.forEach(subOption => {
          if (subOption.id === this.selectedOption.id) {
            option.id = subOption.id;
            option.name = subOption.name;
          }
        });
      });
      this.isShowSubContent = false;
    }
  },
  watch: {
    selectedOption: function(val) {
      this.$emit("optionChange", val.id);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@css/style.scss";
.items-options {
  width: 100%;
  border-bottom: 1px solid $lineColor;

  &-list {
    display: flex;
    width: 100%;
    height: px2rem(46);
    background-color: white;

    &-item {
      flex-grow: 1;

      &-content {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        &-name {
          font-size: $infoSize;
          margin-right: $marginSize;

          &-active {
            color: $mainColor;
          }
        }

        &-caret {
          // 子选项展开时的样式
          &-open {
            transform: rotate(-180deg);
            transition: all 0.3s;
          }

          // 子选项折叠时的样式
          &-close {
            transform: rotate(0deg);
            transition: all 0.3s;
          }
        }
      }
    }
  }

  .options-sub-content {
    position: absolute;
    width: 100%;
    max-height: px2rem(180);
    overflow: hidden;
    overflow-y: auto;
    background-color: white;

    &-list {
      &-item {
        &-content {
          display: flex;
          align-items: center;
          border-top: 1px solid $lineColor;
          padding: $marginSize;
          height: px2rem(44);
          box-sizing: border-box;

          &-name {
            font-size: $infoSize;
            display: inline-block;
            flex-grow: 1;

            &-active {
              color: $mainColor;
            }
          }

          &-select {
            width: px2rem(18);
            height: px2rem(18);
          }
        }
      }
    }
  }

  // 子选项内容展开样式
  .fold-height-enter-active {
    animation-duration: 0.3s;
    animation-name: fold-height-open;
  }

  @keyframes fold-height-open {
    0% {
      max-height: 0;
    }
    100% {
      max-height: px2rem(180);
    }
  }

  // 子选项内容折叠样式
  .fold-height-leave-active {
    animation-duration: 0.3s;
    animation-name: fold-height-close;
  }

  @keyframes fold-height-close {
    0% {
      max-height: px2rem(180);
    }
    100% {
      max-height: 0;
    }
  }

  .cover {
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.4);
  }
}
</style>