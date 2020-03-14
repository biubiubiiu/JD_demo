import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartData: []
  },
  mutations: {
    addItemToCart: function (state, item) {
      const flag = state.cartData.some(element => {
        if (element.id === item.id) {
          element.quantity += 1
          return true
        }
      })
      /**
       * isCheck: 表示商品是否被选中
       * quantity: 表示商品的数量
       * 通过 Vue.set 方法可以把新添加的属性变为响应式的数据
       */
      if (!flag) {
        Vue.set(item, 'isCheck', false)
        Vue.set(item, 'quantity', 1)
        state.cartData.push(item)
      }
    },
    modifyItemQuantity: function (state, data) {
      state.cartData[data.index].quantity = data.quantity
    }
  },
  actions: {
  },
  modules: {
  }
})
