<template>
  <div class="city">
    <my-header title="选择城市">
      <span slot="left">
            <img src="../../assets/image/home/back.png" @click="back">
      </span>  
    </my-header>
    <p>当前位置</p>
    <p ref="city">{{cityname}}</p>
    <p class="txt1">省市列表</p>
		<ul v-for="(item,index) in city">
			<li @click="backFn(index)" ref="name">{{item}}</li>
		</ul>
  </div>
</template>

<script>
import Header from "../share/header.vue";
import {mapGetters,mapActions} from "vuex"
export default {
  data () {
    return {
    	cityname:'',
      city:['黑龙江省','吉林省','辽宁省','河北省','河南省','山东省','山西省','安徽省','江西省','江苏省','浙江省','福建省','台湾省','广东省','湖南省','湖北省','海南省','云南省','贵州省','四川省','青海省','甘肃省','陕西省']
    }
  },
  methods:{
    ...mapActions([//展开mapActions
      "setCity"//在actions中定义的方法
      ]),
  	backFn :function  (index) {
      this.$store.dispatch('setCity',this.city[index]),
      this.$refs.name[index].style.backgroundColor = 'rgba(213,213,213,.8)'
  		this.$router.push('/')
  	},
    back :function (){
      this.$router.push('/')
    }
  },
  components:{
    "my-header":Header
  },
mounted: function () {
    this.cityname = this.$store.state.city
 }
}
</script>


<style  lang='stylus' scoped>
@import '../../assets/common/stylus/common.styl'
.city
    padding-top pxtorem(100px)
    background-color white
    p
      font-size pxtorem(40px)
      height pxtorem(80px)
      margin-top pxtorem(20px)
      line-height pxtorem(80px)
      text-indent 0.5rem
    .txt1
      background-color rgba(213,213,213,.8)
    ul
      font-size pxtorem(40px)
      text-indent 0.5rem
      li
        border-top 1px solid #ccc
        height pxtorem(80px)
        line-height pxtorem(80px)
</style>
