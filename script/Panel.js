/**
 * @author 		Jani Haippo		jani.haippo@gmail.com
 * @version		29.05.2018
 **/

/**
 * @class SWidget.Panel
 * @extends Swidget.Element
 **/
SWidget.Panel = class extends SWidget.Element {
	/** 
	 * constructor
	 **/
	constructor(element) {
		var e = element || $("<div class='SWidget-Panel></div>");
		super(e);
	}

	/**
	 * add 
	 * @param{SWidget.Element} element
	 **/
	 add(element) {
	 	this.element.append(element.HTML());
	 }
}