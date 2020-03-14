<template>
  <div class="manager">
    <span class="manager-remove" :class="{'manager-disabled' :quantity === 1}" @click="onRemoveClick">-</span>
    <span class="manager-quantity">{{quantity}}</span>
    <span class="manager-add" @click="onAddClick">+</span>
  </div>
</template>

<script>
export default {
  props: {
    defaultQuantity: {
      type: Number,
      default: 1
    }
  },
  data: function() {
    return {
      quantity: 1
    };
  },
  methods: {
    onRemoveClick: function() {
      if (this.quantity === 1) {
        return;
      }
      this.quantity -= 1;
    },
    onAddClick: function() {
      this.quantity += 1;
    }
  },
  watch: {
    defaultQuantity: function(value) {
      this.quantity = value;
    },
    quantity: function(value) {
      this.$emit("onChangeQuantity", value);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.manager {
  display: flex;
  font-size: $infoSize;
  height: px2rem(20);
  line-height: px2rem(20);

  span {
    width: px2rem(30);
    text-align: center;
    display: inline-block;
    font-weight: 500;
  }

  &-quantity {
    background-color: $bgColor;
    padding: 0 px2rem(4);
  }

  &-disabled {
    color: $hintColor;
  }
}
</style>