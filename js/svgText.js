var SVGText = (
	function () {
		// var svg = null;
		function SVGText(name) {

			this.name = name;
			this.svg = null;
			this.color = 'white';
			this.stroke = '#d1d1d1';
			this.timerTxt = null;

			this.create();
		}

		SVGText.prototype.create = function () {

			this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
			this.svg.setAttribute('width', '150');
			this.svg.setAttribute('height', '200');
			this.svg.setAttribute('version', '1.1');
			this.svg.setAttribute('id', this.name);
			this.svg.style.position = 'absolute';
			this.svg.style.top = 80 + 'px';
			this.svg.style.left = 300 + 'px';

			this.timerTxt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
			this.timerTxt.setAttribute('font-size', '130');
			this.timerTxt.setAttribute('x', '80');
			this.timerTxt.setAttribute('y', '160');
			this.timerTxt.setAttribute('text-anchor', 'middle');
			this.timerTxt.setAttribute('fill', this.color);
			this.timerTxt.setAttribute('font-family', '"Oswald", sans-serif');
			this.timerTxt.setAttribute('font-weight', '800');
			this.timerTxt.setAttribute('stroke', this.stroke);
			this.timerTxt.setAttribute('stroke-width', 3);
			this.timerTxt.setAttribute('stroke-linejoin', 'round');
			this.timerTxt.textContent = this.name;
			this.svg.appendChild(this.timerTxt);

		}

		SVGText.prototype.updateStroke = function (type, stroke, xpos) {
			this.stroke = stroke;
			this.name = type;
			this.timerTxt.textContent = this.name;
			this.timerTxt.setAttribute('stroke', this.stroke);
			this.svg.style.left = xpos + 'px';
		}

		return SVGText;
	}
)();