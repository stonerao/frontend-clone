<template>
  <div id="main">
    <div style="height:200px">
      <!-- <button @click="add">添加节点</button> -->
      <!-- <button @click="addlink">添加连线</button>
      <button @click="add(1)">添加云一</button>
      <button @click="add(2)">添加云二</button>
      <button @click="add(4)">添加云三</button>
      <button @click="add(5)">添加云四</button>
      <button @click="add(3)">添加小路由器</button>
      <button @click="add(7)">添加路由器</button>
      <button @click="add(8)">添加交换机</button> -->

      <img :src="`http://ptt.stonerao.com/images/${item}.png`" alt="" v-for="item in 23" :key="item" @click="add(item)" style="height:80px;">

      <button @click="exportBtn">导出</button>
      <button @click="huifu">恢复</button>
      <button @click="deletes">删除</button>
      <button @click="linksAdd">连线</button>
      <button @click="linksAdd1">关闭连线</button>

    </div>
    <div class="box" id="box">

    </div>
    <div>
      x:<input type="number" v-model="x" @keyup.enter="setX"> <br> y:
      <input type="number" v-model="y" @keyup.enter="setY">
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
      type: 3,
      _topo: null,
      curr_id: null,
      x: 0,
      y: 0,
      params:{
        links:[],
        nodes:[]
      }
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
  watch: {},
  mounted() {
    console.log(d3)
    this._topo = new Topo({
      el: "#box",
      VM: this,
      type: this.type
    });
    this._topo.render(this.params);
  },
  methods: {
    huifu() {
      //回复
      var data = window.localStorage.getItem("data" + this.type);
      if (!data) {
        return;
      }
      this._topo.render(JSON.parse(data));
    },
    setX(val) {
      this.params.nodes.forEach(x => {
        if (x.id == this.curr_id) {
          x.x = parseInt(this.x);
        }
      });
      this._topo.render(this.params);
    },
    setY() {
      this.params.nodes.forEach(x => {
        if (x.id == this.curr_id) {
          x.y = parseInt(this.y);
        }
      });
      this._topo.render(this.params);
    },
    exportBtn() {
      // this._topo.export()
      window.localStorage.setItem(
        "data" + this.type,
        JSON.stringify(this.params)
      );
      console.log(JSON.stringify(this.params));
    },
    deletes() {
      this._topo.deletes();
    },
    add(type) {
      var val = prompt("输入参数");
      var ids = this.params.nodes.map(x => x.id);
      var max;
      if (ids.length != 0) {
        max = Math.max.apply(null, ids) + 1;
      } else {
        max = 0;
      }

      let obj = {
        id: max,
        type: type,
        value: val || ""
      };
      if (type == 6 || type == 20 || type == 21 || type == 22) {
        let b = confirm("字体是否在下");
        if (b) {
          obj.bottom = b;
        } else {
          obj.top = true;
        }
      }
      this.params.nodes.push(obj);
      this._topo.render(this.params);
    },
    linksAdd() {
      this._topo.addlink();
    },
    linksAdd1() {
      this._topo.overLINK();
    }
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
  background: #020610;
  .box {
    g {
      cursor: pointer;
    }
    position: absolute;
    left: 40px;
    right: 0;
    bottom: 0;
    top: 280px;
    svg {
      border: 1px solid red;
      text {
        fill: #fff;
        font-size: 12px;
      }
    }
  }
}
.line-store {
  stroke: rgb(99, 99, 99);
  stroke-width: 2;
  cursor: pointer;
}
.lineActive {
  stroke: red !important;
}
</style>

