import * as d3 from 'd3';
var color = d3.scaleOrdinal(d3.schemeCategory20);
class Topo {
  constructor({
    el,
    VM,
    type
  } = params) {
    this.params = {}
    this.params.width = 1320;
    this.params.height = 506;
    this._VM = VM,
      this._type = type
    //添加svg
    d3.select(el).html("");
    let svg = d3.select(el).append("svg").attr("width", this.params.width).attr("height", this.params.height)
    //添加link的画布
    this.links = svg.append("g").attr("class", "links")
    //添加node的画布
    this.nodes = svg.append("g").attr("class", "nodes")
    this._data = {}
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
      setXY(d)
      _this.curr_id = d.id
      d.x = d.x;
      d.y = d.y;
    }
    this.nodes.selectAll("g").remove()
    this.links.selectAll("line").remove()

    function typeRreturn(type) {
      var width, height;
      if (type == "4" || type == "5") {
        width = 51
      } else if (type == "1" || type == "2") {
        width = 54
      } else if (type == "3" || type == "8") {
        width = 15
      } else if (type == "7") {
        width = 34
      } else {
        width = 40
      }
      if (type == "4" || type == "5") {
        height = 36
      } else if (type == "1" || type == "2") {
        height = 40
      } else if (type == "3" || type == "8") {
        height = 15
      } else if (type == "7") {
        height = 34
      } else {
        height = 40
      }
      return {
        height: height,
        width: width
      }
    }
    //正在拖动
    function dragged(d) {
      setXY(d)

      //赋予现在节点位置  
      d.x = d3.event.x;
      d.y = d3.event.y;
      // d3.select(this).attr("x", d.x).attr("y", d.y)
      d3.select(this).attr("transform", "translate(" + d.x + "," + d.y + ")")
      //更新线条
      //在线条中找到当前节点
      links.filter(link => d.id == link.source)
      links.filter(link => d.id == link.target)
      linkUpdata()
    }
    var drags = d3.drag()
      .on("start", dragStarted)
      .on("drag", dragged)
      .on("end", function (d) {
        _this.export()
        return null
      })
    //是否可以连线
    this.is_link = false

    function setXY(d) {
      _this._VM.x = d.x
      _this._VM.y = d.y
    }
    this.linksNode = []
    this._data.node = nodes;
    this._data.link = links;
    var _node = this.nodes.selectAll("g")
      .data(nodes)
      .enter()
      .append("g")
      .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")"
      })
      .attr("class", function (d) {
        return "g_node" + d.id
      })
      .call(drags)
      .on("click", function (d) {
        _this.curr_id = d.id
        _this._VM.curr_id = d.id
        setXY(d)
        if (_this.is_link == false) {
          return
        }
        if (d.class == "rect") {
          _this.linksNode = []
          return
        }
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
      }).on("dblclick", function (d) {
        var val = prompt("输入当前网段",d.ip||"")
        if(val){ 
          d.ip = val;
        }
      })
    //添加
    _node.each(function (d) { 
      switch (d.class) {
        case "rect":
          let gs = d3.select(this)
          let box = d3.select(".g_node" + d.id).node().getBBox()
          // gs.append("text").text(d.text)
          //   .attr("dominant-baseline", "middle")
          //   .attr("text-anchor", "middle")
          //   .attr("x", function () {
          //     return d.width/2
          //   }).attr("y", function () {
          //     return  d.height/2
          //   }).attr("fill", "#2e425a")
          //   .attr("font-size", "34px")
          //   .attr("font-weight", "bold")
          gs.append("rect").attr("fill", "rgba(135,216,251,0.1)")
            .attr("width", d.width)
            .attr("height", d.height)
            .attr("stroke", "#568ca7")
            .attr("stroke-width", 1)
            .attr("stroke-dasharray", 2) 
          break;
        case "image":
          d3.select(this).append("image").attr("xlink:href", function (d) {
            return "http://ptt.stonerao.com/img/" + d.type + ".png"
          }).attr("height", function (d) {
            if (d.type == 10) {
              return 30
            } else if (d.type == 2) {
              return 16
            } else if (d.type == 1) {
              return 28
            } else if (d.type == 5) {
              return 28
            } else {
              return 30
            }
          })
          break;
        default:
          ;
      }
      return
      d3.select(this).append("image").attr("xlink:href", function (d) {
        return "http://ptt.stonerao.com/img/" + d.type + ".png"
      }).attr("width", function (d) {
        if (_this._type == 2) {
          if (d.type == 6) {
            return 124
          } else if (d.type == 5) {
            return 20
          } else if (d.type == 1) {
            return 20
          }

        } else if (_this.type == 3) {
          if (d.type == 22) {
            return 225
          }
        }
      })
    })
    // //给节点添加字体
    // _node.append("text").text(function (d) {
    //     let box = d3.select(".g_node" + d.id).node().getBBox()
    //     return d.value
    //   }).attr("x", function (d) {
    //     let box = d3.select(".g_node" + d.id).node().getBBox()
    //     return box.width / 2
    //   })
    //   .attr("y", function (d) {
    //     let box = d3.select(".g_node" + d.id).node().getBBox()
    //     return d.bottom == true ? box.height - 16 : d.top == true ? 16 : box.height / 2
    //   }).attr("text-anchor", "middle")

    /* .append("rect")
    .attr("fill", (d, i) => color(i))
    .attr("width", 50)
    .attr("height", 50) */
    async function linkUpdata() {
      //根据数组中更新线条
      _this.links.html("")
      _this._link = _this.links.selectAll("line")
        .data(links)
      _this._link.enter().append("line").attr("x1", function (d) {
        let n = nodes.filter(node => node.id == d.source)[0]
        let box = d3.select(".g_node" + n.id).node().getBBox()
        return n.x + box.width / 2
      }).attr("y1", d => {
        let n = nodes.filter(node => node.id == d.source)[0]
        let box = d3.select(".g_node" + n.id).node().getBBox()
        return n.y + box.height / 2
      }).attr("x2", d => {
        let n = nodes.filter(node => node.id == d.target)[0]
        let box = d3.select(".g_node" + n.id).node().getBBox()
        return n.x + box.width / 2
      }).attr("y2", d => {
        let n = nodes.filter(node => node.id == d.target)[0]
        let box = d3.select(".g_node" + n.id).node().getBBox()
        return n.y + box.height / 2
      }).attr("class", "line-store").on("click", function (d) {
        d.active = !d.active
        d3.select(this).classed("lineActive", d.active)
      }).classed("lineActive", d => d.active)
    }
    linkUpdata()
    _this._VM.params = {
      nodes: nodes,
      links: links
    }
  }
  random() {
    //生成随机坐标
    return {
      x: Math.random() * this.params.width,
      y: Math.random() * this.params.height
    }
  }
  export () {}
  deletes() {
    this._VM.params.nodes = this._VM.params.nodes.filter(x => x.id != this.curr_id)
    this._VM.params.links = this._VM.params.links.filter(x => x.target != this.curr_id && x.source != this.curr_id)
    this.render(this._VM.params)
  }
  addlink() {
    this.is_link = true
  }
  overLINK() {
    this.is_link = false
  }
  addRect() {

  }

}
export default Topo;
