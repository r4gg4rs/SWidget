/**
 * @author		Jani Haippo		jani.haippo@gmail.com
 * @version		26.5.2018
 **/


if(!SWidget) var SWidget = {}

/**
 * SWidget.Element - element base class
 **/
SWidget.Element = class {
	/**
	 * constructor
	 * @param {JQuery-element} element
	 **/
	constructor(element) {
		this.element = element || $("<div></div>");
	}

	/**
	 * HTML 
	 * @return {JQuery-element} return JQuery element
	 **/
	HTML() {
		return this.element;
	}
}