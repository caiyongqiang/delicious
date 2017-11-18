<template>
  <div class="find">
    <my-nav></my-nav>
    <div class="header">电影</div>
    <!-- 轮播图 -->
    <div class="Lunbo">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in lunArr">
          <img v-bind:src="item.url">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <ul class="movie">
       <li v-for='(item,index) in movieArr' @click="detailsFn(index)">
          <img class="ig" :src="item.img">
          <div>
            <div class="title">
               <p class="p">{{item.nm}}</p>
               <span class="sp" v-if="Dbol[index]">3D</span>
            </div>
             <p v-show="num[index]==0 ? false : true">
                <img src="../../assets/image/movie/star.png" v-for="item in num[index]">
                <img src="../../assets/image/movie/star2.png" v-for="item in nums[index]">
                <img src="../../assets/image/movie/star1.png" v-for="item in num1[index]">
                <span class="sc">{{item.sc}}</span>
             </p>
             <strong v-show="num[index]==0 ? true : false">{{item.rt}}</strong>
             <p>导演：{{item.dir}}</p>
             <p>主演：{{item.star}}</p>
          </div>
          <p class="ap" :id="num[index]==0 ? 'ap1' : ''">{{num[index]==0 ? "预售" : "购票"}}</p>
       </li>
    </ul>
  </div>
</template>

<script>
import Nav from '../Nav.vue';
import axios from 'axios';

// (js的引入)轮播图
  import Vue from 'vue';
  import { Swipe, SwipeItem } from 'mint-ui';
  Vue.component(Swipe.name, Swipe);
  Vue.component(SwipeItem.name, SwipeItem);
  // 2. css的引入（mint）
  import 'mint-ui/lib/style.css';

export default {
  data () {
    return {
     lunArr:[
     {url:require('../../assets/image/movie/01.jpg')},
     {url:require('../../assets/image/movie/02.jpg')},
     {url:require('../../assets/image/movie/03.jpg')},
     {url:require('../../assets/image/movie/04.jpg')}
     ],
     movieArr:[],
     score:[],
     nums:[],
     num:[],
     num1:[],
     Dbol:[]
    }
  },
  created(){
    axios.get('http://xlcyq.sc2yun.com/data/data.php',{
    params: {
      file: 'https://m.maoyan.com/movie/list.json?type=hot&offset=0&limit=1000'}}).then
    (res =>{
      console.log(res.data.data.movies);
      this.movieArr=res.data.data.movies;
      // 获取得分
      var arr=[];
      // 获取是否显示3D
      var d=[];
      for(var i=0;i<this.movieArr.length;i++){
         arr.push(this.movieArr[i].sc);
      }
      this.score=arr;
      this.star();
      // 获取是否显示3D
      var dd=[];
      for(var i=0;i<this.movieArr.length;i++){
         dd.push(this.movieArr[i]['3d']);
      }
      this.Dbol=dd;
    });

  },
  methods:{
   star:function (){
         // console.log(this.score)
        for (var i = 0; i < this.score.length; i++) {
         var b=this.score[i]/2;
        var s = b;
        this.num[i]=parseInt(s);
        var tt=s-this.num[i];
        if(tt>=0.5 && tt<=0.99){
         this.nums[i]=1;
        }else{
         this.nums[i]=0;
        }
        this.num1[i]=5-this.num[i]-this.nums[i];
      }
    },
    detailsFn:function(index){
      // console.log(this.movieArr[index].id)
      this.$router.push({path:'/details',query:{id:this.movieArr[index].id}})
    }
  },
  components:{
    'my-nav':Nav
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='stylus' scoped>
@import "../../assets/common/stylus/common.styl"
.find
   background white
   .header
      width 100%
      height pxtorem(90px)
      text-align center
      line-height pxtorem(90px)
      font-size pxtorem(40px)
      border-bottom pxtorem(1px) solid #ccc
      position fixed
      top 0
      left 0
      z-index 100
      background white
   .Lunbo
       padding-top pxtorem(90px)
       width pxtorem(750px)
       height pxtorem(298px)
       margin-bottom pxtorem(10px)
       img
         width pxtorem(750px)
         height pxtorem(298px)
   .movie
      padding-bottom pxtorem(130px)
      li
         width pxtorem(750px)
         height pxtorem(206px)
         padding-top pxtorem(26px)
         overflow hidden
         border-bottom pxtorem(1px) solid #ccc
         position relative
         #ap1
            border pxtorem(1px) solid #f0a443
            border-radius pxtorem(10px)
            color #f0a443
         .ap
            position absolute
            top pxtorem(89px)
            right pxtorem(34px)
            font-size pxtorem(29px)
            border pxtorem(1px) solid #0a76be
            color #0a76be
            border-radius pxtorem(10px)
            line-height pxtorem(57px)
            padding 0 pxtorem(15px)
         .ig
            width pxtorem(130px)
            height pxtorem(180px)
            float left
            margin-left pxtorem(33px)
         div
            width pxtorem(529px)
            margin-left pxtorem(27px)
            float left
            .title
               overflow hidden
               margin-left 0
               margin-bottom pxtorem(24px)
               .p
                  max-width pxtorem(300px)
                  font-size pxtorem(34px)
                  color black
                  margin-top 0
                  float left
                  overflow hidden
                  text-overflow ellipsis
                  white-space nowrap
                  display inline-block
               .sp
                  border pxtorem(1px) solid #ccc
                  padding pxtorem(1px)
                  float left
                  margin-left pxtorem(15px)
                  padding 0 pxtorem(8px)
                  border-radius pxtorem(10px)
                  background rgba(0,0,0,0.1)
            p:nth-of-type(2)
               margin-top pxtorem(6px)
               margin-bottom pxtorem(7px)
            p:nth-of-type(3)
               width pxtorem(400px)
               overflow hidden
               text-overflow ellipsis
               white-space nowrap
            p
               font-size pxtorem(28px)
               color gray
            p:nth-of-type(1)
               img
                  width pxtorem(27px)
                  height pxtorem(27px)
               .sc
                  margin-left pxtorem(10px)
            strong
               color #f79a35
               font-size pxtorem(25px)
            


</style>
