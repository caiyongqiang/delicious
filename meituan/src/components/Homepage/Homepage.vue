<template>
  <div class="home">
    <my-header title="商城">
        <span slot="left" @click="goCityFn">
          <strong ref="name">{{city}}</strong>
          <img src="../../assets/image/home/down.png">
        </span>
        <span slot="right" @click="goSeachFn">
          <img src="../../assets/image/home/seach.png">
        </span>
      </my-header> 
      <img src="../../assets/image/home/header.jpg" class="img">
      <div class="classify" v-for="item in navArr">
        <img :src="item.src" class="img1">
        <p>{{item.name}}</p>
      </div>
      <div class="nearby">
        <p></p>
        <span>附近商家</span>
        <p></p>
      </div>
      <div class="content" v-for="(item,index) in shopArr" @click="godetail({num:index,src:item.pic_url,name:item.name})">
        <img :src="item.pic_url" class="shopimg">
        <div>
          <p class="name">{{item.name}}</p>
          <div class="mes">
            <p>
              <img src="../../assets/image/home/star.png" v-for="item in num[index]">
              <img src="../../assets/image/home/star2.png" v-for="item in nums[index]">
              <img src="../../assets/image/home/star1.png" v-for="item in num1[index]">
              <!-- <img src="../../assets/image/home/star1.png" class="star2"> -->
              <strong>月售{{item.month_sale_num}}</strong>
              <span>{{item.mt_delivery_time}}|{{item.distance}}</span>
            </p>
            <p>{{item.min_price_tip}}|{{item.shipping_fee_tip}}|{{item.average_price_tip}}</p>
          </div>
        </div>
      </div>
  	<my-nav></my-nav>
  </div>
</template>

<script>
import Nav from '../Nav.vue';
import header from '../share/header';
import axios from 'axios';
import {mapGetters,mapActions} from "vuex"
export default {
  props:['title'], 
  data () {
    return {
     navArr:[
          {name:'美食',src:'http://p1.meituan.net/jungle/bd3ea637aeaa2fb6120b6938b5e468a13442.png.webp'},
          {name:'美团超市',src:'http://p0.meituan.net/jungle/6b93ee96be3df7cf2bb6e661280b047d3975.png.webp'},
          {name:'生鲜果蔬',src:'http://p0.meituan.net/jungle/f33ed552c52b4466b6308a2c14dbc62d4882.png.webp'},
          {name:'甜点饮品',src:'http://p0.meituan.net/jungle/45816fffb346c194d58e961fde7c0fad4901.png.webp'},
          {name:'美团专送',src:'http://p0.meituan.net/jungle/f51c34aea31bf3685be15dedde2632bc5391.png.webp'},
          {name:'正餐优选',src:'http://p1.meituan.net/jungle/1543bbcb048218424e2420a6934e17b24236.png.webp'},
          {name:'快餐小吃',src:'http://p0.meituan.net/jungle/b528beea0749cb18dd34a38bd2439ed43867.png.webp'},
          {name:'汉堡披萨',src:'http://p1.meituan.net/jungle/0e63b86b4ff14d214c1999a979fd21d14273.png.webp'},
     ],
     shopArr:'',
     num:[],
     nums:[],
     num1:[],
     score:[]
    }
  },
  created(){
    axios.get('http://xlcyq.sc2yun.com/data/data.php',{
    params: {
      file:'home.json'
    }}).then(res => {
      console.log(res.data.data.poilist)
      this.shopArr = res.data.data.poilist;
      for (var i = 0; i < res.data.data.poilist.length; i++){
        this.score.push(res.data.data.poilist[i].wm_poi_score)
      }
      this.star();
    });   
  },
  components:{
  	'my-nav':Nav,
    "my-header":header
  },
  computed:{
    ...mapGetters({
      city:"getCity"
    })   
  },
  methods:{
    ...mapActions([//展开mapActions
      "setCity",
      "setNum"
      ]),
    goSeachFn:function() {
      this.$router.push({path:"./seach"});
    },
    goCityFn:function(){
      this.setCity(this.$refs.name.innerText)
      this.$router.push({path:"./city"});
    },
    star:function (){
        for (var i = 0; i < this.score.length; i++) {
        var s = this.score[i] 
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
    godetail:function(index){
      this.setNum(index);
      this.$router.push({path:"./detail"});
    }
  },
  mounted: function (){
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang='stylus' scoped >
@import '../../assets/common/stylus/common.styl'
.home
  padding-top pxtorem(100px)
  text-align center
  .img
    width 100%
    height pxtorem(340px)
  .classify
    width pxtorem(180px)
    height pxtorem(206px)
    display inline-block
    .img1
      width pxtorem(100px)
      margin-top pxtorem(30px)
  .nearby
    span
      font-size pxtorem(32px)
      vertical-align middle
    p
      display inline-block
      width pxtorem(100px)
      border 1px solid black
      vertical-align middle
  .content
    height pxtorem(200px)
    margin-top pxtorem(15px)
    margin-bottom pxtorem(15px)
    text-align left
    position relative
    border-bottom 1px solid #ccc
    .shopimg
      height pxtorem(150px)
      width pxtorem(200px)
      margin-left pxtorem(20px)
      vertical-align middle
    div 
      /*height pxtorem(200px)*/
      display inline-block
      margin-left pxtorem(20px)
      vertical-align middle
      .name
        margin-left pxtorem(20px)
        margin-top pxtorem(20px)
        font-size pxtorem(28px)
      .mes
        height pxtorem(150px)
        p
          margin-top pxtorem(16px)
          img
            height pxtorem(20px)
            margin-left pxtorem(10px)
            vertical-align middle
          span
            vertical-align middle
          strong 
            margin-right pxtorem(40px)
        
          



</style>
