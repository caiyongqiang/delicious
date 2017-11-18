<template>
  <ul class="nav">
  	<li v-for="(item,index) in navArr" @click="clickFn(index)">
  		<img :src="igbol[index] ? item.url:item.url1">
  		<p :style="{'color':igbol[index]?'gray':'#fed06a'}">{{item.font}}</p>
  	</li>
  </ul>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  data () {
    return {
     navArr:[
     	{font:"首页",url:require("../assets/image/nav/home.png"),url1:require("../assets/image/nav/home1.png")},
     	{font:"发现",url:require("../assets/image/nav/find.png"),url1:require("../assets/image/nav/find1.png")},
     	{font:"订单",url:require("../assets/image/nav/order.png"),url1:require("../assets/image/nav/order1.png")},
     	{font:"我的",url:require("../assets/image/nav/my.png"),url1:require("../assets/image/nav/my1.png")}
     ]
    	}
	},
	created(){
		// for(var i=0;i<this.navArr.length;i++){
		// 	this.igbol.push(true);
		// }
		// this.igbol[0]=!this.igbol[0];
		// this.igbol=this.igbol;
		// console.log(this.igbol)
	},
    methods:{
      ...mapActions([
        'setIgBol'
    ]),
    	clickFn:function(index){
    		// 让图标全变灰色
    		var arr=[];
    		for(var i=0;i<this.navArr.length;i++){
    				arr.push(true);
    			}
    		// 点击选中跳转
    		switch (index) {
    		case 0:
    			// 首页
    			this.$router.push({path:'/'})
    			// 改变图标颜色
    			arr[0]=!arr[0];
				  this.setIgBol(arr);
    			break;
    		case 1:
    			// 发现
    			this.$router.push({path:'/find'})
    			// 改变图标颜色
    			arr[1]=!arr[1];
				  this.setIgBol(arr);
    			break;
    		case 2:
    			// 订单
    			this.$router.push({path:'/order'})
    			// 改变图标颜色
    			arr[2]=!arr[2];
				  this.setIgBol(arr);
    			break;
    		case 3:
    			// 我的
    			this.$router.push({path:'/my'})
    			// 改变图标颜色
    			arr[3]=!arr[3];
				  this.setIgBol(arr);
    			break;
    		default:
    			// statements_def
    			break;
    	}	
    }
  },
  computed: mapGetters({
    igbol:"getIgBol"
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='stylus' scoped>
@import "../assets/common/stylus/common.styl"
.nav
  width 100%
  height pxtorem(101px)
  padding-top pxtorem(15px)
  position fixed
  bottom 0
  left 0
  z-index 120
  display flex
  border-top pxtorem(1px) solid #ccc
  background white
  li:nth-child(2)
    img
      width pxtorem(60px)
      height pxtorem(48px)

  li
    flex 1
    text-align center
    line-height 1.3

	

</style>
