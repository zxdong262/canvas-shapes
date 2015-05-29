
describe('canvas-shapes', function () {

	var sandboxEl

	beforeEach(function() {
		sandboxEl = $('<div>').attr('id', 'sandbox').appendTo($('body'))
	})

	afterEach(function() {
		sandboxEl.remove()
	})

	var templates = {
		'default': {
			element: '<canvas id="ca" width="500" height="600"></canvas>'
		}
	}

	function compileDirective(template, locals) {
		template = templates[template]
		var element = $(template.element).appendTo(sandboxEl)
		return jQuery(element[0])
	}

	// Tests

	describe('basic function', function () {

		it('inst.start', function() {
			var elm = compileDirective('default')
			,id = elm.prop('id')
			,inst = new Shapes('#' + id, {})
			inst.start()
			expect(inst.shapes.length).to.equal(20)
		})

		it('inst.pushShape', function() {
			var elm = compileDirective('default')
			,id = elm.prop('id')
			,inst = new Shapes('#' + id, {})
			inst.start()
			inst.pushShape({}, ['star'])
			expect(inst.opts.shapeCount).to.equal(21)
		})

		it('inst.popShape', function() {
			var elm = compileDirective('default')
			,id = elm.prop('id')
			,inst = new Shapes('#' + id, {})
			inst.start()
			inst.popShape(4)
			expect(inst.opts.shapeCount).to.equal(16)
		})

	})

	describe('shapes', function () {

		it('star', function() {
			var elm = compileDirective('default')
			,id = elm.prop('id')
			,inst = new Shapes('#' + id, {})
			inst.methodsPool = ['star']
			inst.start()
			expect(inst.shapes.length).to.equal(20)
			expect(inst.shapes[0].type).to.equal('star')
		})

		it('heart', function() {
			var elm = compileDirective('default')
			,id = elm.prop('id')
			,inst = new Shapes('#' + id, {})
			inst.methodsPool = ['heart']
			inst.start()
			expect(inst.shapes.length).to.equal(20)
			expect(inst.shapes[0].type).to.equal('heart')
		})

		it('bubble', function() {
			var elm = compileDirective('default')
			,id = elm.prop('id')
			,inst = new Shapes('#' + id, {})
			inst.methodsPool = ['bubble']
			inst.start()
			expect(inst.shapes.length).to.equal(20)
			expect(inst.shapes[0].type).to.equal('bubble')
		})

		it('light', function() {
			var elm = compileDirective('default')
			,id = elm.prop('id')
			,inst = new Shapes('#' + id, {})
			inst.methodsPool = ['light']
			inst.start()
			expect(inst.shapes.length).to.equal(20)
			expect(inst.shapes[0].type).to.equal('light')
		})

		it('balloon', function() {
			var elm = compileDirective('default')
			,id = elm.prop('id')
			,inst = new Shapes('#' + id, {})
			inst.methodsPool = ['balloon']
			inst.start()
			expect(inst.shapes.length).to.equal(20)
			expect(inst.shapes[0].type).to.equal('balloon')
		})

	})

	describe('shapes to text', function () {

		it('inst.buildPosArrayFromText', function() {
			var elm = compileDirective('default')
			,id = elm.prop('id')
			,inst = new Shapes('#' + id, {})
			inst.methodsPool = ['star']
			inst.start()
			var data = inst.buildPosArrayFromText('t')
			console.log(data)
			console.log(data.length)


			expect(inst.shapes.length).to.equal(20)
		})

	})

})
