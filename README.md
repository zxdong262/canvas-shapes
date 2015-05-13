# canvas-shapes
this jquery plugin will draw simple shape moving animation in canvas.

## demo & doc

<a href="http://html5beta.com/apps/canvas-shapes.html">http://html5beta.com/apps/canvas-shapes.html</a>

## get
```bash
bower install canvas-shapes
```

## use

### reference it in html
```html
<script src="canvas-shapes.min.js">
```

### init
```html
<canvas id="ca"></canvas>
```
```javascript
$(function() {
  var options = {
    shapeCount: 20 //howmany shapes to draw
    ,timer: 100 //render animation frame for every {timer} ms
    ,step: 3 //aniamtion step px
    ,minSize: 50 //shape size min
    ,maxSize: 150 //shape size max
  }
  var shapesInst = new Shapes('#ca', options)

  //what shape you want draw, inside there are 'star', 'bubble', 'heart'
  //default methodsPool = ['star']
  shapesInst.methodsPool= ['star', 'bubble', 'heart']

  //start animation
  shapesInst.start()

  //stop
  shapesInst.stop()

  //visit src/canvas-shapes.js for more instance method 

  //you can extend shape draw method by 
  Shapes.prototype.build_shape_your_shape_name = function(){
    //...
  }
  Shapes.prototype.draw_your_shape_name = function(){
    //...
  }

  //visit src/canvas-shapes.js for example

})
```

## test
```bash
git clone https://github.com/zxdong262/canvas-shapes.git
cd angular-pagenav
npm install
bower install
gulp test
```

## LICENCE

MIT

