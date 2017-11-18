import axios from 'axios';
import localEvent from './local'

export default {
	setIgBol({commit, state},data){
		// 直接调mutations的方法
		commit('IG_BOL',data);
	}
};