<template>
  <div class="home">
  	<my-nav></my-nav>
  	测试home
  </div>
</template>

<script>
import Nav from '../Nav.vue';
import axios from 'axios';

export default {
  data () {
    return {
     
    }
  },
  created(){
    // ajaxFn:function(){
      // 使用axios来请求数据
      axios.get("mock/seller.json",{
      }).then(function(res){
        console.log(res);
      });
    // }
  },
  components:{
  	'my-nav':Nav
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
