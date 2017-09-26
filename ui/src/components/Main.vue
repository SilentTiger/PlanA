<template>
  <div class="main unselectable">
    <h1 @transitionend="transitionEnd" :class="{show:showTransition}">Shadow Talk</h1>
    <div class="startContainer">
      <button v-show="showStart" @click="btnStartClick">Start</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'main',
  data () {
    return {
      showTransition: false,
      showStart: false
    }
  },
  methods: {
    transitionEnd () {
      this.showStart = true
    },
    btnStartClick () {
      this.$router.push('login')
    }
  },
  created () {
    setTimeout(() => {
      this.showTransition = true
    }, 0)
  }
}
</script>

<style scoped>
.main {
  text-align: center;
}
h1 {
  font-weight: 800;
  font-size: 86px;
  color: #000;
  text-shadow: 10px 10px 35px #000;
}
.show{
  transition: text-shadow 2s ease-in-out;
  text-shadow: 10px 10px 35px #444;
}
.startContainer{
  position: absolute;
  bottom: 120px;
  width: 100%;
}
button{
  background-color: transparent;
  border: #444 solid 1px;
  border-radius: 3px;
  color: #444;
  font-size: 32px;
  padding: 5px 25px;
  outline: none;
}
button:active{
  text-shadow: 0 0 5px #444;
  box-shadow: 0 0 5px #444;
}
</style>
