import * as d3 from 'd3';
var color = d3.scaleOrdinal(d3.schemeCategory20);
class Topo {
  constructor({
    el
  } = params) {
    this.params = {}
    this.params.width = 1200;
    this.params.height = 1200;
    //添加svg
    d3.select(el).html("");
    let svg = d3.select(el).append("svg").attr("width", 1200).attr("height", 650)

    //添加link的画布
    this.links = svg.append("g").attr("class", "links")
    //添加node的画布
    this.nodes = svg.append("g").attr("class", "nodes")

  }
  render({
    nodes,
    links
  }) {
    nodes.forEach(node => {
      node.x = node.x || 0
      node.y = node.y || 0
    })
    var _this = this;
    //开始拖动
    function dragStarted(d) {
      d.x = d.x;
      d.y = d.y;
    }
    //正在拖动
    function dragged(d) {
      //赋予现在节点位置
      d.x = d3.event.x;
      d.y = d3.event.y;
      d3.select(this).attr("x", d.x).attr("y", d.y)
      //更新线条
      //在线条中找到当前节点
      links.filter(link => d.id == link.source)
      links.filter(link => d.id == link.target)
      linkUpdata()
    }
    var drag = d3.drag()
      .on("start", dragStarted)
      .on("drag", dragged)
      .on("end", null)

    this.linksNode = []
    var _node = this.nodes.selectAll("rect")
      .data(nodes)
      .enter()
      .append("rect")
      .attr("fill", (d, i) => color(i))
      .attr("width", 50)
      .attr("height", 50)
      .attr("x", (d) => {
        return d.x || 0
      })
      .attr("y", (d) => {
        return d.y || 0
      })
      .call(drag)
      .on("click", function (d) {
        if (_this.linksNode.length == 2) {
          _this.linksNode.shift()
        }
        _this.linksNode.push(d)
        //数组中是两个不相同节点即可连线
        if (_this.linksNode.length == 2) {
          if (_this.linksNode[0].id == _this.linksNode[1].id) {
            return
          }
          //点击满两个点 且点不相同
          links.push({
            target: _this.linksNode[1].id,
            source: _this.linksNode[0].id
          })
          linkUpdata().then(res => {
            _this.linksNode = []
          })

        }
      })
    async function linkUpdata() {
      //根据数组中更新线条
      _this.links.html("")
      _this._link = _this.links.selectAll("line")
        .data(links)
      _this._link.enter().append("line").attr("x1", d => {
        return nodes.filter(node => node.id == d.source)[0].x + 25
      }).attr("y1", d => {
        return nodes.filter(node => node.id == d.source)[0].y + 25
      }).attr("x2", d => {
        return nodes.filter(node => node.id == d.target)[0].x + 25
      }).attr("y2", d => {
        return nodes.filter(node => node.id == d.target)[0].y + 25
      }).attr("class", "line-store")

    }

  }
  random() {
    //生成随机坐标
    return {
      x: Math.random() * this.params.width,
      y: Math.random() * this.params.height
    }
  }


}
export default Topo;
