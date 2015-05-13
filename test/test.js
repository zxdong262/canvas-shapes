
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

		it('basic', function() {
			var elm = compileDirective('default')
			,id = elm.prop('id')
			,inst = new Shapes('#' + id, {})
			inst.start()
			expect(inst.shapes.length).to.equal(20)
		})

	})

	

})
