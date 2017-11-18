<template>
  <div class="seach">
    <my-header title="搜索">
    	<span slot="left">
            <img src="../../assets/image/home/back.png" @click="backFn">
        </span>  
    </my-header>
    <div class="div1">
    	<img src="../../assets/image/home/seach.png" class="img">
    	<input type="text" class="txt1" placeholder="搜索/关键字" @input="seachFn" ref="val">
    </div>
  </div>
</template>

<script>
import Header from "../share/header.vue";
import {mapGetters,mapActions} from "vuex"
export default {
  data () {
    return {
      
    }
  },
  components:{
  	"my-header":Header,
  	
  },
  computed:mapGetters({
   
  }),
  methods:{
  	...mapActions([
      
      ]),	
    seachFn:function() {
      
    },
    backFn:function() {
    	this.$router.push({path:"./"});
    }
  },
mounted: function () {
    
 }
}
</script>


<style lang='stylus' scoped>
@import '../../assets/common/stylus/common.styl'
.seach
	padding-top pxtorem(100px)
	.div1
		/*background-color rgba(155,155,151,.2)*/
		height pxtorem(140px)
		.img
			position relative
			left pxtorem(20px) 
			top pxtorem(50px)
			width pxtorem(60px)
		.txt1
			width 100%
			font-size pxtorem(40px)
			height pxtorem(80px)
			outline none
			text-indent 1.2rem
			margin-top pxtorem(-80px)
			border-radius pxtorem(60px)
	.div2
		width pxtorem(700px)
		margin-left pxtorem(25px)
		text-align center
		p
			font-size pxtorem(36px)
			margin-top pxtorem(20px)
			color #ccc
		button
			width pxtorem(230px)
			font-size pxtorem(28px)
			margin-top pxtorem(20px)
			border-radius pxtorem(40px)
			outline none
			background-color white
</style>
