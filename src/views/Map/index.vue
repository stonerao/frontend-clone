<template>
  <div>
    <svg></svg>
  </div>
</template>

<script>
import Index from "./index";
export default {
  data() {
    return {
      map: null
    };
  },
  mounted() {
    this.map = new Index(); 
    console.log(Math.sqrt(Math.pow(100,2)+Math.pow(180,2)))
  }
};
</script>

<style lang="less">
.circle-case {
  r: 5;
  animation-name: myfirst;
  animation-duration: 0.7s;
  animation-timing-function: linear;
  // animation-delay: 2s;
  animation-iteration-count: infinite;
  // animation-direction: alternate;
  animation-play-state: running;
  // fill:red;
}
@keyframes myfirst {
  0% {
    r: 5;
    opacity:1
  }
  100% {
    r: 20;
    opacity:0
  }
}
</style>
