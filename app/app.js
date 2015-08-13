'use strict';
var paper,
    area,
    lx = 0,
    ly = 0,
    ox = 0,
    oy = 0,
    moveFnc = function(dx, dy) {
      lx = dx + ox;
      ly = dy + oy;
      this.transform('t' + lx + ',' + ly);
    },
    startFnc = function() {},
    endFnc = function() {
      ox = lx;
      oy = ly;
    };

var createPaper = function(){
  var height = window.innerHeight * 0.85,
      top = window.innerHeight * 0.15,
      width = window.innerWidth,
      pathArray,
      drawingBox,
      start = function () {
        pathArray = new Array();
      },
      move = function (dx, dy) {
        if (pathArray.length == 0) {
          pathArray[0] = ["M",this.ox,this.oy];
          drawingBox = paper.path(pathArray);
          drawingBox.attr({stroke: "#FF0000","stroke-width": 3});
        }
        else{
          pathArray[pathArray.length] = ["L",this.ox,this.oy];
        }
            
        drawingBox.attr({path: pathArray});
      },
      up = function() {};


  paper = Raphael(0, top, width, height);

  area = createRectangle(0, 0, '#000000', '#000000', width, height);

  area.mousemove(function (event) {
        var evt = event;
        var IE = document.all?true:false;
        var x, y;
        if (IE) {
            x = evt.clientX + document.body.scrollLeft +
                document.documentElement.scrollLeft;
            y = evt.clientY + document.body.scrollTop +
                document.documentElement.scrollTop;
        }
        else {
            x = evt.pageX;
            y = evt.pageY;
        }
        
        // subtract paper coords on page
        this.ox = x - 10;
        this.oy = y - 10;
  });
    
  area.drag(move, start, up);
};

var createElement = function(){
  var type = $('#type').val(),
      left = $('#left').val(),
      top = $('#top').val(),
      color = $('#color').val(),
      edge = $('#edge').val(),
      radius = $('#radius').val(),
      width = $('#width').val(),
      height = $('#height').val();

  if(type === 'Circle'){
    createCircle(left, top, color, edge, radius);
  }
  else if(type === 'Rectangle'){
    createRectangle(left, top, color, edge, width, height, true);
  }
};

var createRectangle = function(left, top, color, edge, width, height, drag){
  var rectangle;

  left = left === '' || left === undefined ? 30 : left;
  top = top === '' || top === undefined ? 100 : top;
  width = width || 100;
  height = height || 60;
  drag = drag || false;

  rectangle = paper.rect(left, top, width, height);
  
  rectangle.attr("fill", color);

  rectangle.attr("stroke", edge);

  if(drag){
    rectangle.drag(moveFnc, startFnc, endFnc);
  }

  return rectangle;
}

var createCircle = function(left, top, color, edge, radius){
  var circle;

  left = left || 30;
  top = top || 100;
  radius = radius || 30;

  circle = paper.circle(left, top, radius)
  
  circle.attr("fill", color);

  circle.attr("stroke", edge);

  circle.drag(moveFnc, startFnc, endFnc);

  return circle;
}

createPaper();

$('#color, #edge')
  .css('backgroundColor', '#FF0000');

$('button').on('click', function(e){
  e.preventDefault();

  createElement();
});

$('#color, #edge').change(function() {
    $(this)
      .css(
          'backgroundColor',
          $(this)
            .find('option:selected')
            .css('backgroundColor')
      );
});

$('#type').change(function() {
  if($(this).val() === 'Circle'){
    $('.circle').css('display', 'inline-block');
    $('.rectangle').css('display', 'none');
  }
  else
  {
    $('.circle').css('display', 'none');
    $('.rectangle').css('display', 'inline-block');
  }
});

$('.circle').css('display', 'inline-block');
$('.rectangle').css('display', 'none');


/*circle.click(function(){
  var left = circle.attr('cx');
  console.log(left);

  if(left + 50 > 320){
    circle.attr('cx', 0);
  }
  else{
    circle.attr('cx', left + 50);
  }
});

var ;
  
  


paper.forEach(function(el){
  console.log(el);
});*/