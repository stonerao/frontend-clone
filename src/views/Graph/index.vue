<template>
    <div> 
      <!--   <svg id="box"></svg> -->
        <svg id="force"></svg>        
    </div>
</template>

<script>
import Grpah from "./index.js";
export default {
  data() {
    return {
      Grpah: null
    };
  },
  mounted() {
    this.Grpah = new Grpah();
   /*  this.Grpah.line({
      id: "#box",
      data: [4, 2, 3, 2, 5, 6, 1],
      width: 500,
      height: 300,
      xAxis: {
        data: ["周1", "周2", "周3", "周4", "周5", "周6", "周日"]
      }
    }); */
    //
    var forceData = {
      links: [
        {
          source: 1,
          target: 2
        }
      ],
      nodes: [
        {
          id: 1,
          name: "主机"
        },
        {
          id: 2,
          name: "CPU"
        }
      ]
    };
    let graph = this.Grpah.force({
      id: "#force",
      
      width: 1000,
      height: 500
    });
    graph.restar(forceData)
    
  }
};
</script>

<style>
#box {
  margin-left: 20px;
}
</style>
