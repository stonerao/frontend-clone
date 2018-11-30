<template>
  <div class="drag">
    <div class="left">
      <div v-for="item in 10" :key="item" draggable="true" @dragstart="drag" :id="item">
        {{item}}
      </div>
    </div>
    <div class="right" @drop="drop" @dragover="allowDrop" id="box">
      <div :id="item.id" v-for="(item,index) in items" :key="index" :style="{'left':item.x+'px','top':item.y+'px'}">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      client: {
        height: 0,
        width: 0
      }
    };
  },
  methods: {
    drop(ev) {
      if (!ev.dataTransfer.getData("OBJ")) return;
      let data = JSON.parse(ev.dataTransfer.getData("OBJ"));
      let x = ev.offsetX - data.offset.x > 0 ? ev.offsetX - data.offset.x : 0;
      let y = ev.offsetY - data.offset.y > 0 ? ev.offsetY - data.offset.y : 0; 
      if(y+100>this.client.height){
        y = this.client.height-100
      }
      if(x+100>this.client.width){
        x = this.client.width-100
      }
      
      console.log(y+100)
      console.log(this.client.height)
      this.items.push({
        x: x,
        y: y,
        id: data.id
      });
    },
    drag(ev) {
      //   ev.preventDefault();
      let offset = {
        x: ev.offsetX,
        y: ev.offsetY
      }; 
      var data = ev.dataTransfer.setData(
        "OBJ",
        JSON.stringify({
          offset,
          id: ev.target.id
        })
      );
    },
    allowDrop(ev) {
      ev.preventDefault();
    }
  },
  mounted() {
    let box = document.getElementById("box");
    this.client.height = box.clientHeight;
    this.client.width = box.clientWidth;
  }
};
</script>
<style lang="less" scoped>
.drag {
  display: flex;
}
.left {
  flex: 1;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  > div {
     height: 100px;
    width: 100px;
    line-height: 100px; 
    text-align: center;
    margin: 10px 0;
    user-select: none;
    cursor: pointer;
    box-shadow: 0 0 0 1px #000;
  }
}
.right {
  flex: 5;
  height: 500px;
  box-shadow: 0 0 0 1px #000;
  position: relative;
  > div {
    background: #ccc;
    position: absolute;
    height: 100px;
    width: 100px;
  }
}
</style>
