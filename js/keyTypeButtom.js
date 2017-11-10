var KeyTypeButtom = (
	function () {
		// var svg = null;
		function KeyTypeButtom(name, activeColor, callback) {

			this.name = name;
			this.callback = callback;
			this.svg = null;
			this.isActive = true;
			this.activeColor = activeColor;
			this.nonActiveColor = '#d1d1d1';
			this.timerTxt = null;

			this.create();
		}

		KeyTypeButtom.prototype.handleEvent = function (e) {
			switch (e.type) {
				case "click":
					this.toogle();
					break;
			}
		}

		KeyTypeButtom.prototype.create = function () {

			this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
			this.svg.setAttribute('width', '60');
			this.svg.setAttribute('height', '40');
			this.svg.setAttribute('version', '1.1');
			this.svg.setAttribute('id', this.name);

			this.timerTxt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
			this.timerTxt.setAttribute('font-size', '20');
			this.timerTxt.setAttribute('x', '30');
			this.timerTxt.setAttribute('y', '26');
			this.timerTxt.setAttribute('text-anchor', 'middle');
			this.timerTxt.setAttribute('fill', 'red');
			this.timerTxt.setAttribute('font-family', '"Open Sans", sans-serif');
			this.timerTxt.setAttribute('font-weight', '300');
			this.timerTxt.textContent = this.name;

			this.svg.appendChild(this.timerTxt);
			this.svg.addEventListener("click", this, false);
		}

		KeyTypeButtom.prototype.toogle = function () {
			if (this.callback != null) {
				this.isActive = !this.isActive;

				this.callback(this);

				if (this.isActive) {
					this.timerTxt.setAttribute('fill', this.activeColor);
				} else {
					this.timerTxt.setAttribute('fill', this.nonActiveColor);

				}
			}
		}

		KeyTypeButtom.prototype.updateColor = function (color) {
			this.activeColor = color;
			if (this.isActive) {
				this.timerTxt.setAttribute('fill', this.activeColor);
			}
		}

		return KeyTypeButtom;
	}
)();