<template>
 <div class="details">
 	<div class="fixed">
 		<div class="header">
	 	<img src="../../../assets/image/movie/back.png" @click="backFn">
	 	<p>{{details.MovieDetailModel.nm}}</p>
	 	</div>
 	</div>
 	<div class="content">
 		<img class="ig" :src="details.MovieDetailModel.img">
 		<div class="div">
 			<p>{{details.MovieDetailModel.nm}}</p>
 			<p>
 				<img src="../../../assets/image/movie/star.png" v-for="item in num">
                <img src="../../../assets/image/movie/star2.png" v-for="item in nums">
                <img src="../../../assets/image/movie/star1.png" v-for="item in num1">
 				<span>{{details.MovieDetailModel.sc}}</span>
 			</p>
 			<p>({{details.MovieDetailModel.snum}}人评价)</p>
 			<p>{{details.MovieDetailModel.cat}}</p>
 			<p>{{details.MovieDetailModel.src}}&nbsp/&nbsp{{details.MovieDetailModel.dur}}分钟</p>
 			<p>{{details.MovieDetailModel.rt}}</p>
 		</div>
 	</div>
 	<button>立即购票</button>
 	<p class="p" :id="show">
 		{{str}}
 		<span class="show" @click="showFn">{{show=='' ? '∨' : '∧'}}</span>
 	</p>
 	<div class="vd">
 		<p>视频展示</p>
 		<iframe frameborder="0" width="750" height="300" src="http://maoyan.meituan.net/movie/videos/854x48047b0e9e9b69c41a585dbe77dec869afe.mp4" allowfullscreen></iframe>
 	</div>
 	<div class="com">
 		<span class="hot">观众热评</span>
 		<span class="hot1">写影评</span>
	 	<ul class="ping">
	 		<li v-for="(item,index) in common">
	 			<div class="left">
	 				<img :src="item.avatarurl">
	 			</div>
	 			<div class="right">
	 				<p>{{item.nickName}}</p>
	 				<p>
	 					<img src="../../../assets/image/movie/star.png" v-for="item in snum[index]">
		                <img src="../../../assets/image/movie/star2.png" v-for="item in snum1[index]">
		                <img src="../../../assets/image/movie/star1.png" v-for="item in snum2[index]">
		                <span class="sc">{{item.sc}}</span>
	 				</p>
	 				<p>{{item.content}}</p>
	 				<div class="footer">
	 					<span class="tiem">{{item.time}}</span>
	 					<div class="dd">
	 						<img :src="appbol[index] ? url[1] : url[0]" @click="appFn(index)">
	 						<span>{{appnum[index]}}</span>
							<img id="more" src="../../../assets/image/movie/iconfont2.png">
	 					</div>
	 				</div>
	 			</div>
	 		</li>
	 	</ul>
	 	<p class="all" @click="allFn" v-if="allbol">查看全部影评</p>
	 </div>
 </div>
</template>

<script>
import axios from 'axios';

export default {
  data () {
    return {
     details:{},
     str:"",
     score:1,
     num:0,
     nums:0,
     num1:0,
     Dbol:0,
     show:"",
     sc:[],
     snum:[],
     snum1:[],
     snum2:[],
     common:[],
     common1:[],
     allbol:true,
     appnum:[],
     appbol:[],
     url:[require('../../../assets/image/movie/good.png'),require('../../../assets/image/movie/good2.png')]
    }
  },
  created(){
  	axios.get('http://xlcyq.sc2yun.com/data/data.php',{
    params: {
      file: 'https://m.maoyan.com/movie/'+this.$route.query.id+'.json'}}).then
    (res =>{
      console.log(JSON.parse(res.request.response).data);
      this.details=JSON.parse(res.request.response).data;
      this.score=this.details.MovieDetailModel.sc;
      this.star();
      // 获取简介
      var str=this.details.MovieDetailModel.dra;
      var s=str.slice(str.indexOf(">")+1);
      var strr=s.slice(str.indexOf("<")+1,s.indexOf("<"));
      this.str=strr;
      // 评论、评分
      var scArr=this.details.CommentResponseModel.cmts;
      var scArr1=scArr.concat(this.details.CommentResponseModel.hcmts);
      // 遍历评论
      this.common=scArr;
      this.common1=scArr1;
      var arr=[];
      var appArr=[];
      var appbol=[];
      for(var i=0;i<scArr1.length;i++){
      	// 获取全部评分
         arr.push(scArr1[i].score);
         // 获取每个点赞个数
         appArr.push(scArr1[i].approve);
         // 获取点赞是否变色
         appbol.push(false);
      }
      this.sc=arr;
      this.appnum=appArr;
      this.appbol=appbol;
      this.stars();
      // console.log(appbol);
    });
  },
  methods:{
  	// 头部电影评分
  	star:function (){
        var s = this.score/2;
        this.num=parseInt(s);
        var tt=s-this.num;
        if(tt>=0.5 && tt<=0.99){
         this.nums=1;
        }else{
         this.nums=0;
        }
        this.num1=5-this.num-this.nums;
      },
      // 观众评分
      stars:function (){
         // console.log(this.score)
        for (var i = 0; i < this.sc.length; i++) {
         var b=this.sc[i];
        var s = b;
        this.snum[i]=parseInt(s);
        var tt=s-this.snum[i];
        if(tt>=0.5 && tt<=0.99){
         this.snum1[i]=1;
        }else{
         this.snum1[i]=0;
        }
        this.snum2[i]=5-this.snum[i]-this.snum1[i];
    	}
      },
    backFn:function(){
    	// 返回上一页
    	this.$router.go(-1);
    },
    showFn:function(){
    	// 展示简介
    	if(this.show===""){
    		this.show="p";
    	}else{
    		this.show="";
    	}
    },
    allFn:function(){
    	// 查看全部影评
    	this.common=this.common1;
    	this.allbol=false;
    },
    appFn:function(index){
    	// 点亮点赞
    	var bol=!this.appbol[index];
    	this.$set(this.appbol,index,bol);
    	// 点击加一
    	var arr=this.appnum;
    	if(bol){
    		arr[index]++;
    	}else{
    		arr[index]--;
    	}
    	this.appnum=arr;
    	// console.log(this.appbol)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='stylus' scoped>
@import "../../../assets/common/stylus/common.styl"
.fixed
	width 100%
	position fixed
	top 0
	left 0
	.header
		overflow hidden
		position relative
		top 0
		left 0
		background white
		height pxtorem(77px)
		padding-top pxtorem(25px)
		img
			width pxtorem(36px)
			height pxtorem(43px)
			float left
			margin-left pxtorem(17px)
		p
			text-align center
			font-size pxtorem(39px)
			margin-top pxtorem(5px)
.content
	overflow hidden
	background rgba(0,0,0,0.4)
	padding-top pxtorem(30px)
	padding-left pxtorem(30px)
	padding-bottom pxtorem(30px)
	margin-top pxtorem(102px)
	.ig
		width pxtorem(205px)
		height pxtorem(287px)
		float left
		border pxtorem(5px) solid white
		margin-right pxtorem(23px)
	.div
		display inline-block
		float left
		p:nth-child(1)
			font-size pxtorem(32px)
		p:nth-child(2)
			margin-top pxtorem(17px)
			margin-bottom pxtorem(10px)
			img
				width pxtorem(35px)
				height pxtorem(36px)
			span
				font-size pxtorem(30px)
				margin-left pxtorem(10px)
				color #ffc300
		p:nth-child(4)
			margin-top pxtorem(12px)
			margin-bottom pxtorem(12px)
		p:nth-child(5)
			margin-bottom pxtorem(12px)
		p
			color white
			font-size pxtorem(25px)
button
	width pxtorem(694px)
	height pxtorem(72px)
	background #e44947
	color white
	font-size pxtorem(34px)
	border 0
	display block
	margin auto
	margin-top pxtorem(28px)
	margin-bottom pxtorem(24px)
	border-radius pxtorem(10px)
#p
	height 100%
	transition 1s
.p
	font-size pxtorem(30px)
	line-height pxtorem(45px)
	padding-left pxtorem(30px)
	padding-right pxtorem(30px)
	padding-bottom pxtorem(40px)
	position relative
	height pxtorem(140px)
	background white
	overflow hidden
	.show
		width 100%
		position absolute
		bottom 0
		left 0
		text-align center
		font-size pxtorem(40px)
		background white
		border-bottom pxtorem(1px) solid #ccc
.vd
	height pxtorem(102px)
	margin-top pxtorem(20px)
	background white
	border-top pxtorem(1px) solid #ccc
	p
		font-size pxtorem(32px)
		height pxtorem(74px)
		line-height pxtorem(74px)
		margin-left pxtorem(30px)
.com
	margin-top pxtorem(300px)
	background white
	border-top pxtorem(1px) solid #ccc
	.hot
		width 100%
		height pxtorem(89px)
		line-height pxtorem(89px)
		font-size pxtorem(32px)
		padding-left pxtorem(30px)
	.hot1
		font-size pxtorem(28px)
		color #0069c1
		margin-left pxtorem(460px)
	.all
		height pxtorem(90px)
		font-size pxtorem(30px)
		text-align center
		line-height pxtorem(90px)
		color #0069c1
	ul
		li
			padding-top pxtorem(42px)
			padding-bottom pxtorem(42px)
			padding-left pxtorem(34px)
			overflow hidden
			border-bottom pxtorem(1px) solid #ccc
			.left
				float left
				width pxtorem(112px)
				display inline-block
				img
					width pxtorem(84px)
					height pxtorem(86px)
					border-radius 50%
					overflow hidden
			.right
				float left
				display inline-block
				width pxtorem(560px)
				overflow hidden
				p:nth-child(1)
					font-size pxtorem(32px)
					font-weight bold
					margin-top pxtorem(5px)
				p:nth-child(2)
					margin-top pxtorem(15px)
					margin-bottom pxtorem(15px)
					img
						width pxtorem(27px)
						height pxtorem(25px)
				p:nth-child(3)
					font-size pxtorem(30px)
					line-height pxtorem(50px)
				.footer
					margin-top pxtorem(15px)
					overflow hidden
					.tiem
						font-size pxtorem(28px)
						float left
					.dd
						display inline-block
						float right
						span
							font-size pxtorem(30px)
							display inline-block
							vertical-align top
							margin-right pxtorem(22px)
						img:nth-of-type
							margin-top pxtorem(10px)
						#more
							width pxtorem(35px)
							height pxtorem(33px)




</style>
