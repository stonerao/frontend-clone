import {
  data
} from './data.js'
import * as d3 from 'd3'
var color = d3.scaleOrdinal(d3.schemeCategory20);
class Func {
  constructor() {
    this.params = {}
    this.params.datas = data.datas;
    //先得出一共多少排
    this.params.max = d3.max(this.params.datas.map(x => x.screenY + 1))
    this.render()
  }
  render() {
    const boxSize = 30
  this.svg  = d3.select("#main").append("svg").attr("width", 414).attr("height", 736).attr("style", "border:1px solid #aaa;")
   
    const YMAX = new Array(this.params.max)
    let yG = this.svg.append("g");
    yG.selectAll("text").data(YMAX).enter().append("text").text(function (d, i) {
      return i + 1
    }).attr("y", function (d, i) {
      return i * boxSize;

    })
   
    function dragstarted(d) {
      console.log(d)
    }

    function dragged(d) {
      console.log(d)
    }

    function dragended(d) {
      console.log(d)
    }
    //看台height
    let kan = 100;
    yG.attr("transform", `translate(${(0-yG.node().getBBox().x)},${(0-yG.node().getBBox().y+kan)})`)
    let seatG = this.svg.append("g").call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended))
    console.log(this.params.datas)
    let seatArr = this.params.datas.map(x => {
      return {
        name: x.name,
        id: x.id,
        x: x.screenX * boxSize,
        y: x.screenY * boxSize
      }
    })
    seatG.selectAll("rect").data(seatArr).enter().append("rect").attr("x", function (d) {
      return d.x + (boxSize - 20) / 2
    }).attr("y", function (d) {
      return d.y + (boxSize - 20) / 2
    }).attr("fill", function () {
      return color(1)
    }).attr("width", 20).attr("height", 20)
    let seatPadding = {
      left: 30
    }
    seatG.attr("transform", `translate(${(0-seatG.node().getBBox().x+seatPadding.left)},${(0-seatG.node().getBBox().y+kan)})`)
    var zoom = d3.zoom().on("zoom",function(d){
      // console.log(d3.event.transform)
      console.log(d3.event.transform)
      seatG.attr("transform", d3.event.transform);
    })
     this.svg.call(zoom)
  }
}
export default Func;
