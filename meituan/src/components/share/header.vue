<template>
	<!-- 子组件 --> 
  <div id ="header">
	<span class="left">
		<!-- 从父组件传递过来的标签 -->
		<slot name="left"></slot>
	</span>
	<span>{{title}}</span>
	<span class="right">
		<slot name="right"></slot>
	</span>
  </div>
</template> 

<script>
export default {
	props:['title'], 
  data () {
    return {
      
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '../../assets/common/stylus/common.styl'
#header
	width: 100%
	height: pxtorem(100px)
	text-align: center 
	line-height: pxtorem(100px)
	vertical-align: middle
	font-size pxtorem(40px)
	background-color orange
	color white
	border-bottom 1px solid rgba(155,155,155,.8)
	position fixed
	left 0
	top 0
	z-index 999
	.left
		position fixed
		left pxtorem(40px)
		top pxtorem(0px)
		z-index 9999
		img
			width pxtorem(60px)
			position relative
			left pxtorem(-10px)
			top pxtorem(20px)
			z-index 99999
		strong
			font-size pxtorem(32px)
	.right
		width pxtorem(60px)
		position fixed
		right pxtorem(40px)
		top pxtorem(10px)
		img
			width pxtorem(50px)


</style>
