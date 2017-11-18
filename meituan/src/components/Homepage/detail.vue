<template>
  <div class="detail">
  	<div class="head">
  		<img src="../../assets/image/home/back.png" @click="backFn">
  		<p>{{this.head.name}}</p>
  	</div>
  	<div class="chose">
  		<a v-for="(item,index) in choseArr" @click="choseFn(index)"><span ref="line">{{item}}</span></a>
  	</div>
  	<div class="goodList" ref="good">
  		<div class="big">
  			<div v-for="(item,index) in menu" class="menu" @click="menuFn(index,item.spus)" ref="menu">
  				<img :src="item.icon">
  				<span>{{item.name.length>=4?item.name.slice(2):item.name}}</span>
  			</div>
  		</div>
  		<div class="right">
  			<div class="shop" v-for="(item,index) in goodList">
  				<img :src="item.picture">
  				<div class="detail">
  					<p class="name">{{item.name}}</p>
  					<span>{{item.month_saled_content}}&nbsp&nbsp{{item.praise_content}}</span>
  					<div class="money">
  						￥{{item.min_price}}
  						<button class="add" @click="addFn(index,goodList)">+</button>
  						<span  ref="val" style="display:none;" class="many">0</span>
	  					<button class="sub" style="display:none;" @click="subFn(index,goodList)" ref="btn">-</button>
  					</div>
  				</div>
  			</div>
  		</div>
  		<div class="car" ref="car">
  			<img src="../../assets/image/home/car.png">
  			<span>您的购物车空空如也~~</span>
  			<strong>￥0起送</strong>
  		</div>
  		<div class="car1" style="display:none;" ref="car1">
  			<img src="../../assets/image/home/car1.png">
  			<p>￥{{sum}}</p>
  			<em>{{send}}</em>
  			<button ref="sum">结算</button>
  		</div>
  	</div>
  </div>
</template>

<script>
import axios from 'axios';
import {mapGetters,mapActions} from "vuex"
export default {
  data () {
    return {
     choseArr:['点菜','评价','商家'],
     menu:"",
     goodList:"",
     send:'',
     sum:"",
     bol:true
    }
  },
  computed:{
    ...mapGetters({
      head:"getNum"
    })   
  },
  methods:{
  	...mapActions([//展开mapActions
      "setNum"
      ]),
  	backFn:function() {
  		 this.$router.push({path:"./"});
  	},
  	choseFn:function (index) {
  		if (index!=0){this.$refs.good.style.display="none"}else{this.$refs.good.style.display="block"}
  		for (var i = 0; i < this.$refs.line.length; i++) {
  			this.$refs.line[i].style.borderBottom ="none";
  		}
  		this.$refs.line[index].style.borderBottom = "8px solid yellow"
  	},
  	menuFn:function(index,shopList){
  		this.goodList=shopList
  		for (var i = 0; i < this.$refs.menu.length; i++) {
  			this.$refs.menu[i].style.backgroundColor = "rgba(155,155,155,.2)"
  		}
  		this.$refs.menu[index].style.backgroundColor = "white"
  	},
  	addFn:function(index,item) {
  		var num = parseInt(this.$refs.val[index].innerHTML);
  		this.$refs.btn[index].style.transform='rotateZ(360deg)';
  		num++;
  		this.$refs.val[index].innerHTML=num;
  		this.sumFn(num,item);
  		$('.many').eq(index).css("display","block").animate({"opacity":1,"right":"1.067rem"},0.5)
  		$('.sub').eq(index).css('display','block').animate({'rotate':'360deg','right':'1.74rem','opacity':1},0.5)
  	},
  	subFn:function(index,item){
  		var num = parseInt(this.$refs.val[index].innerHTML);
  		num--;
  		if (num<=0) {
  			$('.many').eq(index).css("display","none").animate({"opacity":0,"right":"0.4rem"},0.5)
  			$('.sub').eq(index).animate({'rotate':'360deg','right':'0.4rem','opacity':0},0.5,function(){
  					setTimeout(function(){
  						$('.sub').eq(index).css({'display':'none'})
  					},500)
  			})
  		}
  		this.$refs.val[index].innerHTML=num;
  		this.sumFn(num,item);
  	},
  	sumFn:function(index,item){
  		var num = 0;
  		for (var i = 0; i < this.$refs.val.length; i++) {
  			if (index>0){
  				$(".car").css("display","none")
  				$(".car1").css("display","block")
  				num += parseInt(item[i].min_price) * parseInt(this.$refs.val[i].innerHTML)
  			}else{
  				$(".car1").css("display","none")
  				$(".car").css("display","block")
  				}
  			}
  		this.sum = num
  	}
  },
  created(){
    axios.get('http://xlcyq.sc2yun.com/data/data.php',{
    params: {
      file:'zhuye/0'+ (this.head.num+1) +'.json'
    }}).then(res => {
    	this.menu = res.data.data.food_spu_tags;
    	this.send = res.data.data.shopping_cart.shipping_fee_cart_tip;
    	this.goodList = res.data.data.food_spu_tags[0].spus;
      	console.log(res)
    });   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='stylus' scoped>
@import '../../assets/common/stylus/common.styl'
.detail
	.head
		height pxtorem(100px)
		line-height pxtorem(100px)
		position relative
		border-bottom 2px solid #ccc
		background-color white 
		img
			position absolute
			width pxtorem(50px)
			top pxtorem(25px)
			left pxtorem(25px)
		p
			text-align center
			font-size pxtorem(32px)
			font-weight bold
	.chose
		display flex
		background-color white
		a
			flex 1
			text-align center
			height pxtorem(100px)
			span
				font-size pxtorem(36px)
				height pxtorem(92px)
				line-height pxtorem(92px)
				display inline-block
	.chose a:nth-child(1)
		span
			border-bottom 8px solid yellow
	.goodList
		.big
			float left
			overflow-y: scroll
			height pxtorem(1050px)
			background-color rgba(155,155,155,.2)
			.menu
				height pxtorem(125px)
				width pxtorem(165px)
				position relative 
				border-bottom 1px solid #ccc
				text-align center
				span
					display inline-block
					height pxtorem(85px)
					margin-top pxtorem(40px)
					font-size pxtorem(32px)
					margin-left pxtorem(10px)
				img
					position absolute
					width pxtorem(40px)
					left pxtorem(10px)
					top pxtorem(38px)
		.big div:nth-child(1)
			background-color white
		.right
			overflow-y scroll
			height pxtorem(1130px)
			background-color white
			.shop
				float right
				width pxtorem(550px)
				margin-left pxtorem(20px)
				height pxtorem(200px)
				img
					width pxtorem(200px)
					height pxtorem(150px)
					vertical-align middle
					margin-top pxtorem(25px)
				.detail
					display inline-block
					height pxtorem(200px)
					width pxtorem(330px)
					vertical-align middle
					margin-left pxtorem(10px)
					.name
						font-size pxtorem(24px)
						margin-top pxtorem(30px)
						margin-bottom pxtorem
					span
						color #ccc
					.money
						margin-top pxtorem(10px)
						font-size pxtorem(32px)
						color red
						position  relative
						button
							float right
							width pxtorem(50px)
							height pxtorem(50px)
							border-radius 50%
							font-size pxtorem(28px)
							outline none
						span
							position absolute
							right pxtorem(30px) 
							top pxtorem(0px)
							font-size pxtorem(32px)
							width pxtorem(50px)
							height pxtorem(50px)
							text-align center
							line-height pxtorem(50px)
							transition 2s
						.add
							background-color #ffd263
							margin-right pxtorem(32px)
						.sub
							background-color rgba(211,211,211,.4)
							position absolute
							right pxtorem(30px) 
							top pxtorem(0px)
							transition 1s
							opacity 0
							z-index 0
							
			.shop:last-child
				padding-bottom pxtorem(80px)
	.car,.car1
		position fixed
		left 0
		bottom 0
		width 100%
		height pxtorem(100px)
		vertical-align middle
		background-color rgba(71,71,71,.6)
		img
			width pxtorem(128px)
			margin-top pxtorem(-30px)
			margin-left pxtorem(20px)
		span
			position relative
			left 0 
			top pxtorem(-40px)
			color #ccc
		p
			position relative
			left pxtorem(160px)
			top pxtorem(-90px)
			font-size pxtorem(40px)
			color white
		em
			position relative
			left pxtorem(160px)
			top pxtorem(-90px)
			color #ccc
		strong
			position relative
			top pxtorem(-40px)
			color #ccc
			left  pxtorem(200px)
		button
			position absolute
			top pxtorem(0px)
			right  pxtorem(0px)
			height pxtorem(100px)
			width pxtorem(220px)
			background-color orange
			font-size pxtorem(44px)
			color white
			z-index 22
	.car1
		z-index 111
				
			
			


</style>
