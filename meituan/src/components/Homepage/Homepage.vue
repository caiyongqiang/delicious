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
    
  },
  components:{
  	'my-nav':Nav
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
