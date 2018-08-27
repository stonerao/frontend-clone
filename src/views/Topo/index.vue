<template>
    <div id="main">
         <div>
             <button @click="add">添加节点</button>
             <button @click="addlink">添加连线</button>
         </div> 
         <div class="box" id="box">

         </div>
    </div>
</template>

<script>
import Topo from "./index.js";
import * as d3 from "d3";
export default {
  data() {
    return {
      items: [],
      params: {
        links: [],
        nodes: []
      },
      _topo: null
    };
  },
  created() {
    var color = d3.scaleOrdinal(d3.schemeCategory20);
    for (let i = 0; i < 20; i++) {
      this.items.push({
        id: i,
        color: color(i)
      });
    }
  },
  mounted() {
    this._topo = new Topo({
      el: "#box"
    });
    this._topo.render(this.params);
  },
  methods: {
    add() {
      this.params.nodes.push({
        id: this.params.nodes.length
      });
      this._topo.render(this.params);
    },
    addlink() {}
  }
};
</script>
<style lang="less">
#main {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #efefef;
  .box {
    position: absolute;
    left: 40px;
    right: 0;
    bottom: 0;
    top: 40px;
  }
}
.line-store {
  stroke: rgb(99, 99, 99);
  stroke-width: 2;
}
</style>

