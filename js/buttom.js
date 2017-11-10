var Buttom = (
	function () {
		// var svg = null;
		function Buttom(name, type, callback) {

			this.name = name;
			this.type = type;
			this.callback = callback;
			this.svg = null;
			this.path = null;
			this.path2 = null;
			this.isActive = false;
			this.activeColor = 'white';
			this.nonActiveColor = 'white';

			this.playPathData = 'M29.8,53.8c13.2,0,24-10.8,24-24s-10.8-24-24-24c-13.2,0-24,10.8-24,24S16.5,53.8,29.8,53.8z M21.8,20.8 c0-0.3,0.2-0.7,0.5-0.9c0.3-0.2,0.7-0.2,1,0l18,9c0.3,0.2,0.6,0.5,0.6,0.9s-0.2,0.7-0.6,0.9l-18,9c-0.1,0.1-0.3,0.1-0.4,0.1 c-0.2,0-0.4,0-0.5-0.1c-0.3-0.2-0.5-0.5-0.5-0.9V20.8z';
			this.pausePathData = 'M29.8,53.8c13.2,0,24-10.8,24-24s-10.8-24-24-24c-13.2,0-24,10.8-24,24S16.5,53.8,29.8,53.8z M19.8,20.8 c0-0.6,0.4-1,1-1h6c0.6,0,1,0.4,1,1v18c0,0.6-0.4,1-1,1h-6c-0.6,0-1-0.4-1-1V20.8z M31.8,38.8v-18c0-0.6,0.4-1,1-1h6 c0.6,0,1,0.4,1,1v18c0,0.6-0.4,1-1,1h-6C32.2,39.8,31.8,39.3,31.8,38.8z';
			this.timerPathData = 'M29.8,53.8c13.2,0,24-10.8,24-24s-10.8-24-24-24c-13.2,0-24,10.8-24,24S16.5,53.8,29.8,53.8z';
			this.notesPathData = 'M29.6,5.9c-13.2,0-24,10.8-24,24s10.8,24,24,24c13.2,0,24-10.8,24-24S42.9,5.9,29.6,5.9z M39,34.9 c0,2.4-2.3,4.5-4.7,4.5c-2.5,0-4.7-2-4.7-4.4s2-4.4,4.5-4.4h2v-7.6l-10,4.2v12.3c0,2.4-2.1,4.4-4.4,4.4c-2.5,0-4.4-2.1-4.4-4.6 s2-4.7,4.5-4.7H24V22.1c0-0.2,0.1-0.4,0.3-0.5L37.9,16c0.2-0.1,0.5,0,0.6,0c0.1,0.1,0.5,0.2,0.5,0.4V34.9z';
			this.listPathData = 'M29.5,5.9c-13.2,0-24,10.8-24,24s10.8,24,24,24s24-10.8,24-24S42.8,5.9,29.5,5.9z M20.9,41.7 c-1.6,0-2.9-1.3-2.9-2.9s1.3-2.9,2.9-2.9c1.6,0,2.9,1.3,2.9,2.9S22.5,41.7,20.9,41.7z M20.9,33.4c-1.6,0-2.9-1.3-2.9-2.9 s1.3-2.9,2.9-2.9c1.6,0,2.9,1.3,2.9,2.9S22.5,33.4,20.9,33.4z M20.9,25.1c-1.6,0-2.9-1.3-2.9-2.9s1.3-2.9,2.9-2.9 c1.6,0,2.9,1.3,2.9,2.9S22.5,25.1,20.9,25.1z M39.2,40.5H27.3c-1,0-1.8-0.8-1.8-2s0.8-2,1.8-2h11.9c1,0,1.8,0.8,1.8,2 S40.2,40.5,39.2,40.5z M39.2,32.5H27.3c-1,0-1.8-0.8-1.8-2c0-1.2,0.8-2,1.8-2h11.9c1,0,1.8,0.8,1.8,2C41,31.7,40.2,32.5,39.2,32.5z M39.2,24.5H27.3c-1,0-1.8-0.8-1.8-2s0.8-2,1.8-2h11.9c1,0,1.8,0.8,1.8,2S40.2,24.5,39.2,24.5z';
			this.resetPathData = 'M29.8,5.7c-13.2,0-24,10.8-24,24s10.8,24,24,24c13.2,0,24-10.8,24-24S43,5.7,29.8,5.7z M29.7,43.1 c-1.1,0-2-0.9-2-2s0.9-2,2-2c5.2,0,9.4-4.2,9.4-9.4s-4.2-9.4-9.4-9.4c-5.2,0-9.4,4.2-9.4,9.4h2.9c0.6,0,1.2,0.5,1.4,1 c0.2,0.6,0.1,1.2-0.3,1.7l-4.6,4.7c-0.3,0.3-0.7,0.4-1.1,0.4s-0.8-0.2-1.1-0.5L13,32.4c-0.4-0.4-0.6-1.1-0.3-1.7 c0.2-0.6,0.8-1,1.4-1h2.4c0-7.4,6-13.4,13.4-13.4c7.4,0,13.4,6,13.4,13.4S37.1,43.1,29.7,43.1z';
			this.path2Data = 'M30,58.5c15.7,0,28.5-12.8,28.5-28.5S45.7,1.5,30,1.5C14.3,1.5,1.5,14.3,1.5,30S14.3,58.5,30,58.5z';

			this.timerTxt = null;

			switch (this.type) {
				case 'play':
					this.create(this.playPathData);
					break;
				case 'timer':
					this.create(this.timerPathData);
					this.createText();
					break;
				case 'notes':
					this.create(this.notesPathData);
					break;
				case 'list':
					this.create(this.listPathData);
					break;
				case 'reset':
					this.create(this.resetPathData);
					break;
				default:
					break;
			}

			this.svg.addEventListener("click", this, false);
		}

		Buttom.prototype.handleEvent = function (e) {
			switch (e.type) {
				case "click":
					this.toogle();
					break;
				case "touchstart":
					this.name;
					break;
			}
		}

		Buttom.prototype.create = function (pathData) {

			var container = document.getElementById('buttons_container');
			this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
			this.svg.setAttribute('width', '60');
			this.svg.setAttribute('height', '60');
			this.svg.setAttribute('version', '1.1');
			this.svg.setAttribute('id', this.name);
			this.svg.style.left = '500px';
			this.svg.style.marginRight = '10px';
			this.svg.style.textAlign = 'center';
			container.appendChild(this.svg);

			this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
			this.path.setAttribute('fill', this.nonActiveColor);
			this.path.setAttribute('d', pathData);
			this.svg.appendChild(this.path);

			this.path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
			this.path2.setAttribute('fill', 'none');
			this.path2.setAttribute('stroke', this.nonActiveColor);
			this.path2.setAttribute('stroke-width', '3');
			this.path2.setAttribute('d', this.path2Data);
			this.svg.appendChild(this.path2);

		}

		Buttom.prototype.toogle = function () {
			if (this.callback != null) {
				this.isActive = !this.isActive;


				this.callback();


				if (this.isActive) {
					this.path.setAttribute('fill', this.activeColor);
				} else {
					this.path.setAttribute('fill', this.nonActiveColor);
				}

				TweenMax.to(this.path, 0.05, {
					ease: Power0.easeNone,
					onComplete: this.resize,
					onCompleteParams: [this],
					scale: 0.75,
					transformOrigin: "50% 50%"
				});

				switch (this.type) {
					case 'play':
						if (this.isActive) {
							this.path.setAttribute('d', this.pausePathData);
						} else {
							this.path.setAttribute('d', this.playPathData);
						}
						break;
					case 'timer':

						break;
					case 'notes':

						break;
					case 'list':

						break;
					default:
						break;
				}
			}
		}

		Buttom.prototype.resize = function (buttom) {
			TweenMax.to(buttom.path, 0.1, {
				ease: Power0.easeNone,
				scale: 1,
				transformOrigin: "50% 50%"
			});
		}

		Buttom.prototype.createText = function () {
			this.timerTxt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
			this.timerTxt.setAttribute('font-size', '35');
			this.timerTxt.setAttribute('x', '30');
			this.timerTxt.setAttribute('y', '42');
			this.timerTxt.setAttribute('text-anchor', 'middle');
			this.timerTxt.setAttribute('font-family', '"Open Sans Condensed", sans-serif');
			//this.timerTxt.setAttribute('stroke', 'black')
			this.svg.appendChild(this.timerTxt);
		}

		Buttom.prototype.updateText = function (text, color) {
			this.timerTxt.textContent = '' + text;
			this.timerTxt.setAttribute('fill', color);
		}

		return Buttom;
	}
)();