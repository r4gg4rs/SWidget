if(!SWidget) var SWidget = {}

SWidget.Swipe = class {
	constructor(element) {
		this.xDown = null;
		this.yDown = null;
		this.xUp = null;
		this.yUp = null;
		this.xMov = null;
		this.yMov = null;

		this.upCallback = [];
		this.downCallback = [];
		this.leftCallback = [];
		this.rightCallback = [];

		/*
		this.element = documnent.querySelector(element);
		this.element.addEventListener('touchstart')
		*/
		this.element = element;
		//this.element = $("#SWidget-Galleria-imageview");
		//this.element = $("#" + element);
		console.log(this.element);
	}

	bind() {
		var _that  = this;
		this.element.bind('touchstart',function(event) {
			this.xDown = event.touches[0].clientX;
			this.yDown = event.touches[0].clientY;
			//alert("touchstart");
		});

		this.element.bind('touchmove',function(event) {
			if(!this.xDown || ! this.yDown) return;
			var xUp = event.touches[0].clientX;
			var yUp = event.touches[0].clientY;
			var xMov = this.xDown - xUp;
			var yMov = this.yDown - yUp;

			//alert("touchmove from { x:" +this.xDown + " ,y:" + this.yDown + "} to { x:" + x +" ,y:" +y + "}");
			if(Math.abs(xMov) > Math.abs(yMov--)) {
				if(xMov > 0 ) _that.execLeft();//alert("left");
				else _that.execRight();//alert("right");
			} else {
				if(yMov > 0) this.execUp();//alert("up");
				else this.execDown();//alert("down");
			}			
			_that.xDown = null;
			_that.yDown = null;
		});

	}

	unbind() {
		this.element.unbind('touchstart');
	}

	onLeft(callback) {
		this.leftCallback.push(callback);
	}
	onRight(callback) {
		this.rightCallback.push(callback);
	}

	onUp(callback) {
		this.upCallback.push(callback);
	}

	onDown(callback) {
		this.downCallback.push(callback);
	}
	execLeft() {
		//alert("left");
		
		for(var i=0; i< this.leftCallback.length; i++) {
			this.leftCallback[i]();
		}
		
	}

	execRight() {
		//alert("right");
		
		for(var i=0; i< this.rightCallback.length; i++) {
			this.rightCallback[i]();
		}
			
	}

	execUp() {
		for(var i=0; i< this.upCallback.length; i++) {
			this.upCallback[i]();
		}	
	}

	execDown() {
		for(var i=0; i< this.downCallback.length; i++) {
			this.downCallback[i]();
		}
	}
}

//alert("SWIPE");