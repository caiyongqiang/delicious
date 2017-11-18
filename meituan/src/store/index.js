import Vue from 'vue';
import Vuex from 'vuex';

// 引入其他的js文件
import getters from './getters.js';
import actions from './actions.js';
import mutations from './mutations.js';
import local from './local.js';

Vue.use(Vuex);

let state = {
  igbol:[false,true,true,true],
  city:'广东省',
  num:0
}
// 导出去
export default new Vuex.Store({
  state,
  getters,
  actions, 
  mutations,
  local
});



