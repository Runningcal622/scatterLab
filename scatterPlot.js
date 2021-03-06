
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
    top:50,
    left:50,
    bottom:50,
    right:80
  };

  width = width+margins.left+margins.right;
  height = height+margins.top+margins.bottom;


  var colors = d3.scaleOrdinal(d3.schemeSet2);
  var xScale = d3.scaleLinear()
                .domain([0,20])
                .range([0,width-margins.left-margins.right]);
  var yScale = d3.scaleLinear()
                .domain([0,100])
                .range([height,0]);


  var svg = d3.select("body")
      .append("svg")
      .attr("width",width)
      .attr("height",height);

  var plot = svg.append("g")
            .classed("plot",true)
            .attr("transform","translate("+(.1*width)+","+(.1 *height)+")"+" scale(.8,.8)");


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
              return "translate("+(20+width-margins.right)+","+(.5*height)+")";});

  var legendLines = legend.selectAll("g")
          .data(data)
          .enter()
          .append("g")
          .classed("legendLine",true)
          .attr("transform",function(d,i){return "translate(0,"+((i*20))+")";});


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
            .attr("transform","translate(15,10)");

    var xAxis = d3.axisBottom(xScale)
    .tickValues([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]);

    svg.append("g").classed("xAxis",true)
        .call(xAxis)
        .attr("transform","translate("+(.1*width)+","+(height-.7*margins.top)+")"+" scale(.8,.8)");;
    var yAxis = d3.axisLeft(yScale);
    svg.append("g").classed("yAxis",true)
        .call(yAxis)
        .attr("transform","translate("+(.1*width-.3*margins.left)+","+(.1 *height)+")"+" scale(.8,.8)");;

  d3.select("body").append("br");








}
