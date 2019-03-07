
var screenMaker= function(width,height) {
  return {
    width:width,
    height:height
  };
}


var screens = [screenMaker(400,300),screenMaker(500,500),screenMaker(1000,600)];



var gradesP = d3.json("grades.json");
gradesP.then(
  function(data)
  {
    screens.forEach(function(d)
    {
      drawScatter(d.width,d.height,data);
    })
  }
  ,
  function(err)
  {
    console.log(err);
  }
)

var drawScatter = function(width,height,data)
{

  var margins ={
    top:height/20,
    left:width/32,
    bottom:height/10,
    right:width/10
  };

  width = width-margins.left-margins.right;
  height = height-margins.top-margins.bottom;
  var colors = d3.scaleOrdinal(d3.schemeAccent);
  var xScale = d3.scaleLinear()
                .domain([0,20])
                .range([0,width]);
  var yScale = d3.scaleLinear()
                .domain([0,100])
                .range([height,0]);


  var svg = d3.select("body")
      .append("svg")
      .attr("width",width)
      .attr("height",height)
      .style("border","1px solid black");

  var plot = svg.append("g")
            .classed("plot",true)
            .attr("transform","translate("+margins.left+","+margins.top+")");


  var students = plot.selectAll("g")
                    .data(data)
                    .enter()
                    .append("g")
                    .attr("fill",function(d){return colors(d.name);});

  students.selectAll("circle")
          .data(function(d){return d.grades;})
          .enter()
          .append("circle")
          .attr("cx",function(d,i){return xScale(i);})
          .attr("cy",function(d){return yScale(d);})
          .attr("r",function(){return .01*width;});

  var legend = svg.append("g")
            .classed("legend",true)
            .attr("transform",function(d){
              console.log(width-margins.right);
              return "translate("+(width-margins.right)+",0)";});
  var legendLines = legend.selectAll("g")
          .data(data)
          .enter()
          .append("g")
          .classed("legendLine",true)
          .attr("transform",function(d,i){return "translate(0,"+(i*20)+")";});


  legendLines.append("rect")
            .attr("x",0)
            .attr("y",0)
            .attr("width",10)
            .attr("height",10)
            .attr("fill",function(d){return colors(d.name);});


  legendLines.append("text")
            .attr("x",0)
            .attr("y",0)
            .text(function(d,i){return d.name})
            .attr("transform","translate(15,20)");










}
