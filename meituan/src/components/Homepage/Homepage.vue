<template>
  <div class="home">
  	<my-nav></my-nav>
  	测试home
  <img src="http://maoyan.meituan.net/movie/videos/854x480b72a4617ae6944c6b4d7472818cf0e4b.mp4">
  </div>
</template>

<script>
import Nav from '../Nav.vue';
import axios from 'axios';

export default {
  data () {
    return {
     num:3,
     nums:1,
     num1:1,
     scor:[]
    }
  },
  created(){
    axios.get('http://xlcyq.sc2yun.com/data/data.php',{
    params: {
      file: 'https://m.maoyan.com/movie/1196171.json'}}).then
    (res =>{
      console.log(res);
    });
   
  },
  methods:{

  },
  components:{
  	'my-nav':Nav
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
