/**
 * canvas-shapes
 * @version v1.0.1 - 2015-05-14
 * @link http://html5beta.com/apps/canvas-shapes.html
 * @author ZHAO Xudong (zxdong@gmail.com)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
;(function(window, document, undefined) {
function Shapes(id, opts) {
	var defaults = {
		shapeCount: 20
		,timer: 100
		,step: 3
		,minSize: 50
		,maxSize: 150
	}
	,th = this
	,wrap = $(id)

	$.extend(th, {
		wrap: wrap
		,ctx: wrap[0].getContext('2d')
		,width: wrap.width()
		,height: wrap.height()
		,timerHandle: false
		,shapes: []
		,methodsPool: ['star']
		,opts: $.extend(defaults, opts)
		,actionCount: 0
	})

}

Shapes.prototype.start = function(count) {
	this.buildShapes(count)
	this.animate()

}

Shapes.prototype.animate = function() {

	this.loop()

}

Shapes.prototype.renderShapes = function() {

	var th = this
	,shapes = th.shapes

	th.clearShapes()

	for(var i = 0, len = shapes.length;i < len;i ++) {
		var obj = shapes[i]
		,type = obj.type
		th['draw_' + type](obj)
	}
	
}

Shapes.prototype.loop = function() {

	var th = this
	this.renderShapes()
	this.move()
	this.timerHandle = setTimeout(function() {
		th.loop()
	}, this.opts.timer)
	
}

Shapes.prototype.move = function() {

	var th = this
	,shapes = th.shapes
	,step = th.opts.step
	,res = []

	for(var i = 0, len = shapes.length;i < len;i ++) {
		var pos = shapes[i]
		,ratio = pos.directionY / pos.directionX
		,step = th.opts.step
		,r = pos.r

		var tx = pos.x + pos.directionX * step
		,ty = pos.y + pos.directionY * step
		,ex = tx > pos.r? tx - (th.width - pos.r) : pos.r - tx
		,ey = ty > pos.r? ty - (th.height - pos.r) : pos.r - ty
		,disx = 0
		,disy = 0

		if(ex > 0 && ey > 0) {
			if(ex > ey) {
				ty = ty > pos.r? th.height - pos.r: r
				disy = ty - pos.y
				disx = disy / pos.directionY * pos.directionX
				tx = pos.x + disx
				pos.directionY = - pos.directionY
			}
			else {
				tx = tx > pos.r? th.width - pos.r: r
				disx = tx - pos.x
				disy = disx / pos.directionX * pos.directionY
				ty = pos.y + disy
				pos.directionX = - pos.directionX
			}
			
			
		}

		else if(ex > 0) {
			tx = tx > pos.r? th.width - pos.r: r
			disx = tx - pos.x
			disy = disx / pos.directionX * pos.directionY
			ty = pos.y + disy
			pos.directionX = - pos.directionX
		}

		else if(ey > 0) {
			ty = ty > pos.r? th.height - pos.r: r
			disy = ty - pos.y
			disx = disy / pos.directionY * pos.directionX
			tx = pos.x + disx
			pos.directionY = - pos.directionY
		}

		pos.x = tx
		pos.y = ty

		res.push(pos)
	}

	th.shapes = res

}

Shapes.prototype.buildShapes = function(count, typesPool) {
	var th = this
	,_count = count || th.opts.shapeCount
	,methodsPool = typesPool || th.methodsPool
	,len = methodsPool.length
	,r

	for(var i = 0;i < _count;i ++) {
		r = Math.floor(Math.random() * len)
		th.shapes.push(th.buildShape(methodsPool[r]))
	}

}

Shapes.prototype.buildShape = function(type) {

	return this['build_shape_' + type]()

}

Shapes.prototype.popShape = function(count) {
	var len = this.shapes.length
	,_count = len < count?len:count
	_count = len - _count
	this.shapes = this.shapes.slice(0, _count)
	this.opts.shapeCount = this.opts.shapeCount - count
}

Shapes.prototype.pushShape = function(obj, typesPool) {
	var th = this
	,methodsPool = typesPool || th.methodsPool
	,len = methodsPool.length
	,r = Math.floor(Math.random() * len)


	th.shapes.push(
		$.extend(
			th.buildShape(methodsPool[r])
			,obj
		)
	)

	this.opts.shapeCount ++
}

Shapes.prototype.stop = function() {
	clearTimeout(this.timerHandle)
	this.clearShapes()
}

Shapes.prototype.clearShapes = function() {
	this.ctx.clearRect(0, 0, this.width, this.height)
}

//bubble
Shapes.prototype.build_shape_bubble = function() {
	var th = this
	,opts = th.opts
	,size = Math.floor(Math.random() * (opts.maxSize - opts.minSize)) + opts.minSize
	,s2 = size * 2
	,xx = th.width > s2 ? th.width : s2 + 1
	,yy = th.height > s2 ? th.height : s2 + 1
	,x = size + Math.floor(Math.random() * (xx - s2))
	,y = size + Math.floor(Math.random() * (yy - s2))
	,directionX = (Math.floor(Math.random() * 7) - 3) / 3
	,directionY = (Math.floor(Math.random() * 7) - 3) / 3
	,colorPool = [
		'rgba(156,183,52,.25)'
		,'rgba(227,163,26,.25)'
		,'rgba(217,84,56,.25)'
		,'rgba(4,80,150,.25)'
		,'rgba(122,24,105,.25)'
	]
	,clen = colorPool.length
	,cr = Math.floor(Math.random() * clen)

	var obj = {
		x: x
		,y: y
		,r: size
		,directionX: directionX
		,directionY: directionY
		,type: 'bubble'
		,strokeStyle: colorPool[cr]
	}

	return obj

}
Shapes.prototype.draw_bubble = function(pos) {
	var ctx = this.ctx
	ctx.beginPath()
	ctx.fillStyle = pos.fillStyle
	ctx.arc(pos.x, pos.y, pos.r, 0, Math.PI * 2, true)
	ctx.fill()
	ctx.closePath()
}

//light
Shapes.prototype.draw_light = function(pos) {
	var ctx = this.ctx
	ctx.beginPath()
	ctx.moveTo(10, 10)
	ctx.lineTo(pos.x, pos.y)
	ctx.strokeStyle = pos.strokeStyle
	ctx.stroke()
	ctx.closePath()
}
Shapes.prototype.build_shape_light = function() {

	var th = this
	,opts = th.opts
	,size = Math.floor(Math.random() * (opts.maxSize - opts.minSize)) + opts.minSize
	,s2 = size * 2
	,xx = th.width > s2 ? th.width : s2 + 1
	,yy = th.height > s2 ? th.height : s2 + 1
	,x = size + Math.floor(Math.random() * (xx - s2))
	,y = size + Math.floor(Math.random() * (yy - s2))
	,directionX = (Math.floor(Math.random() * 7) - 3) / 3
	,directionY = (Math.floor(Math.random() * 7) - 3) / 3
	,colorPool = [
		'rgba(156,183,52,.25)'
		,'rgba(227,163,26,.25)'
		,'rgba(217,84,56,.25)'
		,'rgba(4,80,150,.25)'
		,'rgba(122,24,105,.25)'
	]
	,clen = colorPool.length
	,cr = Math.floor(Math.random() * clen)

	var obj = {
		x: x
		,y: y
		,r: size
		,directionX: directionX
		,directionY: directionY
		,type: 'light'
		,strokeStyle: colorPool[cr]
	}

	return obj

}

//heart from https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes
Shapes.prototype.build_shape_heart = function() {
	var th = this
	,opts = th.opts
	,size = Math.floor(Math.random() * (opts.maxSize - opts.minSize)) + opts.minSize
	,s2 = size * 2
	,xx = th.width > s2 ? th.width : s2 + 1
	,yy = th.height > s2 ? th.height : s2 + 1
	,x = size + Math.floor(Math.random() * (xx - s2))
	,y = size + Math.floor(Math.random() * (yy - s2))
	,directionX = Math.random() * 2 - 1
	,directionY = Math.random() * 2 - 1

	var obj = {
		x: x
		,y: y
		,r: size
		,directionX: directionX
		,directionY: directionY
		,type: 'heart'
		,fillStyle: 'rgba(207,13,31,.25)'
	}

	return obj

}
Shapes.prototype.draw_heart = function(pos) {
	
	var th = this
	,ctx = th.ctx
	,ratio = pos.r / 75
	,x = pos.x
	,y = pos.y
	,bx = x - pos.r
	,by = y - pos.r

	ctx.beginPath()
	ctx.fillStyle = pos.fillStyle
	ctx.moveTo(bx + 75 * ratio, by + 40 * ratio)
	ctx.bezierCurveTo(bx + 75 * ratio, by + 37 * ratio, bx + 70 * ratio, by + 25 * ratio, bx + 50 * ratio, by + 25 * ratio)
	ctx.bezierCurveTo(bx + 20 * ratio, by + 25 * ratio, bx + 20 * ratio, by + 62.5 * ratio, bx + 20 * ratio, by + 62.5 * ratio)
	ctx.bezierCurveTo(bx + 20 * ratio, by + 80 * ratio, bx + 40 * ratio, by + 102 * ratio, bx + 75 * ratio, by + 120 * ratio)
	ctx.bezierCurveTo(bx + 110 * ratio, by + 102 * ratio, bx + 130 * ratio, by + 80 * ratio, bx + 130 * ratio, by + 62.5 * ratio)
	ctx.bezierCurveTo(bx + 130 * ratio, by + 62.5 * ratio, bx + 130 * ratio, by + 25 * ratio, bx + 100 * ratio, by + 25 * ratio)
	ctx.bezierCurveTo(bx + 85 * ratio, by + 25 * ratio, bx + 75 * ratio, by + 37 * ratio, bx + 75 * ratio, by + 40 * ratio)
	ctx.fill()
	ctx.closePath()
}

//star from http://stackoverflow.com/questions/25837158/how-to-draw-a-star-by-using-canvas-html5
Shapes.prototype.build_shape_star = function() {
	var th = this
	,opts = th.opts
	,size = Math.floor(Math.random() * (opts.maxSize - opts.minSize)) + opts.minSize
	,s2 = size * 2
	,xx = th.width > s2 ? th.width : s2 + 1
	,yy = th.height > s2 ? th.height : s2 + 1
	,x = size + Math.floor(Math.random() * (xx - s2))
	,y = size + Math.floor(Math.random() * (yy - s2))
	,directionX = Math.random() * 2 - 1
	,directionY = Math.random() * 2 - 1
	//,fill = Math.random() > .5 ? true : false
	,spike = 5 + Math.floor(Math.random() * 5)
	,colorPool = [
		'rgba(156,183,52,.25)'
		,'rgba(227,163,26,.25)'
		,'rgba(217,84,56,.25)'
		,'rgba(4,80,150,.25)'
		,'rgba(122,24,105,.25)'
	]
	,clen = colorPool.length
	,cr = Math.floor(Math.random() * clen)

	var obj = {
		x: x
		,y: y
		,r: size
		,outerR: size
		,innerR: size / 2
		,spike: spike
		,directionX: directionX
		,directionY: directionY
		,type: 'star'
	}

	if(spike === 5) obj.fillStyle = 'rgba(207,13,31,.25)'
	else obj.strokeStyle = colorPool[cr]

	return obj

}
Shapes.prototype.draw_star = function(pos) {
	var rot = Math.PI/2*3
	,cx = pos.x
	,cy = pos.y
	,spike = pos.spike
	,step = Math.PI/spike
	,th = this
	,ctx = th.ctx
	,outerRadius = pos.outerR
	,innerRadius = pos.innerR
	,x
	,y

	if(pos.strokeStyle) ctx.strokeStyle = pos.strokeStyle
	else ctx.fillStyle = pos.fillStyle
	ctx.beginPath()
	ctx.moveTo(cx, cy - outerRadius)
	for(i = 0;i < spike;i ++) {
		x = cx + Math.cos(rot) * outerRadius
		y = cy + Math.sin(rot) * outerRadius
		ctx.lineTo(x, y)
		rot += step

		x = cx + Math.cos(rot) * innerRadius
		y = cy + Math.sin(rot) * innerRadius
		ctx.lineTo(x, y)
		rot += step
	}
	ctx.lineTo(cx, cy - outerRadius)

	if(pos.strokeStyle) ctx.stroke()
	else ctx.fill()
	ctx.closePath()
}

window.Shapes = Shapes
})(window, document);
