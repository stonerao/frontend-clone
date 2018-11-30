<template>
  <div id="main">
    <div class="left">
      <!-- <button @click="add">添加节点</button> -->
      <!-- <button @click="addlink">添加连线</button>
      <button @click="add(1)">添加云一</button>
      <button @click="add(2)">添加云二</button>
      <button @click="add(4)">添加云三</button>
      <button @click="add(5)">添加云四</button>
      <button @click="add(3)">添加小路由器</button>
      <button @click="add(7)">添加路由器</button>
      <button @click="add(8)">添加交换机</button> -->

      <img :src="`http://ptt.stonerao.com/img/${item}.png`" alt="" v-for="item in 17" :key="item" @click="add(item)" style="height:50px;">

      <button @click="exportBtn">导出</button>
      <button @click="huifu">恢复</button>
      <button @click="deletes">删除</button>
      <button @click="linksAdd">连线</button>
      <button @click="linksAdd1">关闭连线</button>
      <div>
        x:<input type="number" v-model="x" @keyup.enter="setX"> <br> y:
        <input type="number" v-model="y" @keyup.enter="setY">
      </div>
      添加框的属性
      <div>
        <br>
        <div>
          部门： <input type="text" v-model="rectParmas.text">
        </div>
        <div>
          长度： <input type="text" v-model="rectParmas.width">
        </div>
        <div>
          高度： <input type="text" v-model="rectParmas.height">
        </div>
        <button @click="addRect">添加框</button>
        <button @click="defaultRect">恢复默认</button>
      </div>

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
      type: 4,
      _topo: null,
      curr_id: null,
      x: 0,
      y: 0,
      params: {
        links: [],
        nodes: []
      },
      show: false,
      rectParmas: {
        width: 185,
        height: 155,
        text: ""
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
    this._topo = new Topo({
      el: "#box",
      VM: this,
      type: this.type
    });
    this._topo.render(this.params);
  },
  methods: {
    defaultRect() {
      this.rectParmas = {
        width: 185,
        height: 155,
        text: ""
      };
    },
    addRect() {
      //添加背景框
      // this._topo.addRect();
      let obj = {
        id: this.max,
        class: "rect",
        height: this.rectParmas.height,
        width: this.rectParmas.width,
        text: this.rectParmas.text
      };
      this.params.nodes.push(obj);
      this._topo.render(this.params);
    },
    huifu() {
      //回复
      var data = window.localStorage.getItem("data" + this.type);
      if (!data) {
        return;
      } 
      // this._topo.render(JSON.parse(data));
      this._topo.render({"nodes":[{"id":0,"type":8,"value":"","class":"image","x":10,"y":100},{"id":1,"type":8,"value":"","class":"image","x":346,"y":150},{"id":2,"type":8,"value":"","class":"image","x":295,"y":151},{"id":3,"type":8,"value":"","class":"image","x":295,"y":56},{"id":4,"type":8,"value":"","class":"image","x":295,"y":103},{"id":5,"type":8,"value":"","class":"image","x":224,"y":103},{"id":6,"type":8,"value":"","class":"image","x":225,"y":56},{"id":7,"type":8,"value":"","class":"image","x":136,"y":100},{"id":8,"type":8,"value":"","class":"image","x":67,"y":100},{"id":9,"type":8,"value":"","class":"image","x":501,"y":272},{"id":10,"type":8,"value":"","class":"image","x":432,"y":224},{"id":11,"type":8,"value":"","class":"image","x":389,"y":186},{"id":12,"type":8,"value":"","class":"image","x":501,"y":224},{"id":13,"type":8,"value":"","class":"image","x":430,"y":150},{"id":14,"type":8,"value":"","class":"image","x":543,"y":299},{"id":15,"type":8,"value":"","class":"image","x":596,"y":299},{"id":16,"type":8,"value":"","class":"image","x":640,"y":299},{"id":17,"type":8,"value":"","class":"image","x":707,"y":299},{"id":18,"type":8,"value":"","class":"image","x":669,"y":243},{"id":19,"type":8,"value":"","class":"image","x":668,"y":202},{"id":20,"type":8,"value":"","class":"image","x":770,"y":299},{"id":21,"type":8,"value":"","class":"image","x":851,"y":244},{"id":22,"type":8,"value":"","class":"image","x":1014,"y":244},{"id":23,"type":8,"value":"","class":"image","x":926,"y":182},{"id":24,"type":8,"value":"","class":"image","x":920,"y":343},{"id":25,"type":8,"value":"","class":"image","x":854,"y":343},{"id":26,"type":8,"value":"","class":"image","x":779,"y":343},{"id":27,"type":8,"value":"","class":"image","x":680,"y":343},{"id":28,"type":8,"value":"","class":"image","x":67,"y":150}],"links":[{"target":8,"source":0},{"target":28,"source":8},{"target":7,"source":28},{"target":28,"source":0},{"target":7,"source":8,"active":false},{"target":6,"source":7},{"target":5,"source":6},{"target":4,"source":5},{"target":3,"source":4},{"target":2,"source":4},{"target":1,"source":4},{"target":1,"source":2},{"target":11,"source":1},{"target":10,"source":11},{"target":13,"source":10},{"target":12,"source":10},{"target":9,"source":10},{"target":9,"source":12},{"target":14,"source":9},{"target":15,"source":14},{"target":16,"source":15},{"target":17,"source":16},{"target":18,"source":17},{"target":16,"source":18},{"target":18,"source":19},{"target":20,"source":17},{"target":21,"source":20},{"target":23,"source":21},{"target":22,"source":21},{"target":22,"source":23},{"target":24,"source":22},{"target":25,"source":24},{"target":21,"source":25},{"target":25,"source":26},{"target":26,"source":27}]})
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
      console.log(this.params)
      let data={nodes:[],link:this.params.links}
      data.nodes=this.params.nodes.map(x=>{
      return{
        id:x.id,
        x:x.x,
        y:x.y
      }
      })
      // console.log(JSON.stringify(data))
      window.localStorage.setItem(
        "data" + this.type,
        JSON.stringify(this.params)
      );
      // console.log(this.params)
      console.log(JSON.stringify(this.params));
    },
    deletes() {
      this._topo.deletes();
    },
    add(type) {
      var val = prompt("输入参数");

      let obj = {
        id: this.max,
        type: type,
        value: val || "",
        class: "image"
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
  },
  computed: {
    max() {
      var ids = this.params.nodes.map(x => x.id);
      var max;
      if (ids.length != 0) {
        max = Math.max.apply(null, ids) + 1;
      } else {
        max = 0;
      }
      return max;
    }
  }
};
</script>

<style lang="less">
.left {
  width: 200px;
  float: left;
}
#main {
  color: #fff;
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
    left: 220px;
    right: 0;
    bottom: 0;
    top: 0;
    svg {
      border: 1px solid red;
    }
  }
}
.line-store {
  stroke: #87d8fb;
  stroke-width: 2;
  cursor: pointer;
}
.lineActive {
  stroke: red !important;
}
</style>

