<template>
  <Header/>
  <router-view></router-view>
</template>

<script>
import Header from './components/Header.vue'
export default {
    data() {
        return {
            count: 0,
            name: ""
        };
    },
    components: { Header }
}
</script>

<style>
button{
  font-size: 2rem;
  padding: 1rem 3rem;
  background-color: crimson;
  border-radius: 16px;
  border: none;
  color: aliceblue;
}
p{
  font-size: 9 rem;
}
</style>