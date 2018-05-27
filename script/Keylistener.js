/**
 * @author		Jani Haippo		jani.haippo@gmail.com
 * @version		27.5.2018
 **/

if(!SWidget) var SWidget = {}


/**
 * class SWidget.KeyListener
 **/
SWidget.KeyListener = class {

	/**
	 * constructor
	 * @param {JQuery-element} element
	 **/
	constructor(element) {
		this.element = element || $(window);
		this.keyDownCallbacks = [];
		this.keyUpCallbacks = [];
	}

	/**
	 * bind
	 **/
	bind() {
		var that = this;
		this.element.bind('keydown', function(event) {
			for(var i=0; i< that.keyDownCallbacks.length; i++) {
				that.keyDownCallbacks[i](event);
			}
		});

		this.element.bind('keyup',function(event) {
			for(var i=0; i<that.keyUpCallbacks.length; i++ ) {
				that.keyUpCallbacks[i](event);
			}
		});
	}

	/**
	 * onKeyDown
	 * @param {callback} callback
	 **/
	onKeydown(callback) {
		this.keyDownCallbacks.push(callback);
	}

	/**
	 * onKeyup
	 * @param {callback} callback
	 **/
	onKeyup(callback) {
		this.keyUpCallbacks.push(callback);
	}

	/**
	 * unbind 
	 **/
	unbind() {
		this.element.unbind('keydown');
		this.element.unbind('keyup');
	}
}

//alert("Keylistener");