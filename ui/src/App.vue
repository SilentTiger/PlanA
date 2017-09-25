<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import './assets/normalize.css';

export default {
  name: 'app'
}
</script>

<style>
@import './assets/normalize';
html,body {
  height: 100%;
  width: 100%;
  background-color: #000;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
