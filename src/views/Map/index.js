import * as d3 from 'd3';
import JSON from './getJSON'
class Map {
  constructor() {
    this.render({
      height: 800,
      width: 1000
    })

  }
  render({
    height = 500,
    width = 800,
    data = []
  }) {

    const svg = d3.select('svg')
      .attr('width', width)
      .attr('height', height)
    //删除子元素
    svg.selectAll("g").remove()
    // 定义地图投影
    const projection = d3.geoNaturalEarth1()
      .center([0, 0])
      .scale(height / 4)
      .translate([width / 2, height / 2])
    // 定义地理路径生成器
    const path = d3.geoPath()
      .projection(projection)
    // 颜色比例尺
    const color = d3.scaleOrdinal(d3.schemeCategory20)
    // 绘制路径 
    let mapPath = svg.append("g").attr("class", "map");
    let coordinate = svg.append("g").attr("class", "coordinate")
    mapPath.selectAll('path')
      .data(JSON.features)
      .enter()
      .append('path')
      .attr('fill', function (d, i) {
        return i != 11 ? color(i) : "#ffffff"
      })
      .attr('d', path)
      .on('mouseover', function (d, i) {
        d3.select(this).attr('fill', i != 11 ? 'yellow' : "#ffffff")
      })
      .on('mouseout', function (d, i) {
        d3.select(this).attr('fill', i != 11 ? color(i) : "#ffffff")
      })
    var t = d3.transition()
      .duration(1000)
      .ease(d3.easeLinear)
    var transition = d3.transition().duration(1000)
      .ease(d3.easeLinear).delay(1000)
    let xy = projection([116.388171, 39.981975])
    let xy1 = projection([-99.316685, 46.780237])
    let xy2 = projection([-49.316685, -20.780237])
    let arr = [xy, xy1, xy2]

    let s = coordinate.selectAll("circle")
      .data(arr)
      .enter()
      .append("circle")
      .attr("cx", d => d[0])
      .attr("cy", d => d[1])
      // .attr("style", "r:10")
      .attr("fill", "transparent")
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("opacity", 1)
      .attr("class", "circle-case")
    s.exit()

    // t.selectAll("circle").attr("style", "r:30").attr("opacity", 0) 
    let line = coordinate.append("line").attr("x1", xy[0]).attr("y1", xy[1]).attr("x2", xy1[0]).attr("y2", xy1[1]).attr("style", "fill:rgba(0,0,0,0);stroke-width:2").attr("stroke","url('#linears')")
  
    let Gradient = svg.append("linearGradient").attr("id", "linears")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "0%")
    Gradient.append("stop").attr("offset","0%").attr("stop-color","red")
    Gradient.append("stop").attr("offset","100%").attr("stop-color","transparent")
    // t.select(".line").attr("x1", xy[0]).attr("y1", xy[1]).attr("x2", xy1[0]).attr("y2", xy1[1]).attr("style", "fill:rgb(99,99,99);stroke-width:2").attr("strroke","url('#linear')")
    //  console.log(s.transition())
    /*  var c = coordinate.append("path").attr("class", "paths")
     c.attr("d", function () {
       var dx = xy2[0] - xy1[0],
       dy = xy2[1] - xy1[1],
       dr = Math.sqrt(dx * dx + dy * dy);
       return "M" + xy1[0] + "," + xy1[1] + "A" + dr + "," + dr + " 0 0,0 " + xy1[0] + "," + xy1[1];
     }).attr("style", "stroke:rgb(99,99,99);stroke-width:2").attr("fill", "none")

     t.selectAll(".paths").attr("d", function () {
       var dx = xy2[0] - xy1[0],
         dy = xy2[1] - xy1[1],
         dr = Math.sqrt(dx * dx + dy * dy);
       return "M" + xy2[0] + "," + xy2[1] + "A" + dr + "," + dr + " 0 0,0 " + xy1[0] + "," + xy1[1];

       
     }) 
     <line x1="750.8958735561462" x2="673.9400726089473" y1="318.56753648324565" y2="223.52999117633078" strroke="url('#linear')" fill="rgba(0,0,0,1)" style="stroke-width: 1px;"></line>
  <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="red"></stop>
    <stop offset="100%" stop-color="transparent"></stop>
  </linearGradient>
     
     
     
     
     
     
     */

  }
}
export default Map;
