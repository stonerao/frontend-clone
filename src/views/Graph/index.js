import * as d3 from 'd3'
var color = d3.scaleOrdinal(d3.schemeCategory20);
class Graph {
  constructor(params) {
    let obj = {
      params: "123",
      data: {
        num: 1
      }
    }
    let {
      data: color = num
    } = obj
    console.log(color)
  }

}
class Extend_Graph extends Graph {
  constructor(params) {
    super()
    this.params = params;
  }
  line(params) {
    //取出有用数据
    let {
      data,
      xAxis,
      id,
      width,
      height
    } = params;
    //生成折线图
    if (!id) {
      console.error("not id");
      return
    }
    let padding = params.padding || {
      left: 30,
      top: 30,
      bottom: 30,
      right: 30
    }
    //设置宽高
    let svg = d3.select(id).attr("width", width || 400).attr("height", height || 300);
    svg.selectAll("g").remove()
    //添加线条
    let g = svg.append("g").attr("class", "svg-line").attr("width", width || 400).attr("height", height || 300)
    //比例尺
    let min = d3.min(data);
    let max = d3.max(data);
    let xScale = d3.scaleLinear().domain([0, xAxis.data.length - 1]).range([0, width - padding.left - 10]);
    let yScale = d3.scaleLinear().domain([max, min]).range([0, height - padding.bottom - 20]);
    //生成线条
    let line = d3.line().x(function (d, i) {
      return xScale(i)
    }).y(function (d) {
      return yScale(d)
    })
    //添加左侧刻度
    svg.append("g").attr("transform", "translate(30," + 20 + ")").call(d3.axisLeft(yScale))
    //添加下侧刻度尺  
    let lineTicks = d3.axisBottom(xScale) //设置刻度尺为下侧
      .ticks(xAxis.data.length) //设置刻度尺的长度
      .tickFormat(function (d, i) {
        return xAxis.data[i]
      }) //自定义刻度尺的内容
    svg.append("g").attr("transform", "translate(30," + (height - padding.bottom) + ")")
      .call(lineTicks)
    //添加线
    var lineGenerator = g.append("path")
      .datum(data)
      .attr("transform", "translate(" + padding.left + "," + 20 + ")")
      .attr("fill", 'none')
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);
  }
  force(params) {
    let {
      data,
      id,
      width = 1000,
      height = 500
    } = params;
    let svg = d3.select(id).attr("width", width).attr("height", height)
    svg.selectAll("g").remove()


    //创建动力
    var repelForce = d3.forceManyBody().strength(-1000).distanceMax(1000).distanceMin(0);
    //创建力导向图
    let simulation = d3
      .forceSimulation()
      .force("link", d3.forceLink().id(function (d) {
        return d.id;
      }))
      .force("manyBody", repelForce)
      .force("center", d3.forceCenter(width / 2, height / 2)) //重力
      .force("charge", d3.forceManyBody().strength(-30)) //引力
      .force("collide", d3.forceCollide(30)) //碰撞力
      .on("tick", ticked); //运动
    //生成node link节点
    let main = svg.append("g")
    let link = main.append("g").attr("class", "links").selectAll("g")
    let node = main.append("g").selectAll("g")
    //注册缩放平移事件
    let zoom = d3.zoom().on("zoom", d => {
      main.attr("transform", d3.event.transform);
    })
    svg.call(zoom) 
    function dragstarted(d) {
      if (!d3.event.active) {
        simulation.alphaTarget(0.1).restart();
        // simulation.alpha(0.1).restart();
      }
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragended(d) {
      if (!d3.event.active) {
        simulation.alphaTarget(0);
      }
      d.fx = null;
      d.fy = null;
    }
    node = node.data(data.nodes, function (d) {
      return d.id
    })
    link = link.data(data.links, function (d) {
      return d.source.id + "-" + d.target.id;
    });
    link = link.data(data.links)
    //清楚以前的数据
    node.exit().remove()
    link.exit().remove()
    let node_g = node.enter().append("g").call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended))
    let link_g = link.enter().append("g").attr("class", "link1")
    let all_node = node_g.append("circle").attr("r", 10).attr("fill", function (d, i) {
      return color(i)
    });
    all_node.append("title").text(function () {
      return
    })
    node = node_g.merge(node)
    let all_link = link_g.append("line").attr("stroke-width", function (d) {
      return 2;
    }).attr("stroke", function () {
      return color(1)
    })
    link = link_g.merge(link);
    //动力 ticks事件
    function ticked() {
      all_link
        .attr("x1", function (d) {
          return d.source.x;
        })
        .attr("y1", function (d) {
          return d.source.y;
        })
        .attr("x2", function (d) {
          return d.target.x;
        })
        .attr("y2", function (d) {
          return d.target.y;
        });
      node.attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      });
    }
    //生成力导向图
    simulation.nodes(data.nodes);
    simulation.force("link").links(data.links).distance(100)
    simulation.alpha(0.3).restart();
     
  }

}
export default Extend_Graph;
