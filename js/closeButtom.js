var CloseButtom = (
	function () {
		// var svg = null;
		function CloseButtom(name, color, callback) {

			this.name = name;
			this.color = color;
			this.callback = callback;

			this.svg = null;
			this.path = null;
			this.polyline = null;
			this.points = '10.8,15.4 20.8,25.4 30.9,15.4';
			this.pathData = 'M40.5,20.9v16.1 M1.5,20.9v16.1 M40.5,21c0-10.7-8.7-19.5-19.5-19.5C10.2,1.5,1.5,10.2,1.5,21';

			this.create();
			this.svg.addEventListener("click", this, false);
		}

		CloseButtom.prototype.handleEvent = function (e) {
			switch (e.type) {
				case "click":
					this.toogle();
					break;
				case "touchstart":
					this.name;
					break;
			}
		}

		CloseButtom.prototype.create = function (pathData) {

			var container = document.getElementById('buttons_container');
			this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
			this.svg.setAttribute('width', '42');
			this.svg.setAttribute('height', '40');
			this.svg.setAttribute('version', '1.1');
			this.svg.setAttribute('id', this.name);
			// this.svg.style.left = '500px';
			// this.svg.style.marginRight = '10px';
			this.svg.style.position = 'absolute';
			container.appendChild(this.svg);

			this.polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
			this.polyline.setAttribute('points', this.points);
			this.polyline.setAttribute('fill', 'none');
			this.polyline.setAttribute('stroke', this.color);
			this.polyline.setAttribute('stroke-width', 3);
			this.polyline.setAttribute('stroke-linecap', 'round');
			this.polyline.setAttribute('stroke-linejoin', 'round');
			this.polyline.setAttribute('stroke-miterlimit', 10);
			this.svg.appendChild(this.polyline);

			this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
			this.path.setAttribute('fill', 'none');
			this.path.setAttribute('stroke', this.color);
			this.path.setAttribute('stroke-width', '3');
			this.path.setAttribute('d', this.pathData);
			this.svg.appendChild(this.path);

		}

		CloseButtom.prototype.toogle = function () {
			if (this.callback != null) {
				this.callback();
			}

		}

		CloseButtom.prototype.updateColor = function (color, xpos, ypos) {
			this.color = color;
			this.path.setAttribute('stroke', this.color);
			this.polyline.setAttribute('stroke', this.color);
			this.svg.style.left = xpos + 'px';
			this.svg.style.top = ypos + 'px';
		}

		return CloseButtom;
	}
)();