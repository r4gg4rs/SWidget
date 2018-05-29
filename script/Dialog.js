/**
 * @author	Jani Haippo		jani.haippo@gmail.com
 * @version	28.05.2018
 **/

 if(!SWidget) var SWidget = {}


/**
 * class SWidget.Dialog
 * @extends SWidget.Panel
 **/
 SWidget.Dialog = class extends SWidget.Panel {
 	/**
 	 *constructor
 	 **/
 	constructor() {
 		var el =  $("<div class ='SWidget-Dialog'></div>");
 		super(el);
 		this.titleBar = $("<div class='SWidget-Dialog-titlebar'></div>");
 		var title = $("<p> Title </p>");
 		this.closeButton = $("<input type='button' class='SWidget-Dialog-Button' id='SWidget-Dialog-closebutton'>");
 		this.titleBar.append(title);
 		this.titleBar.append(this.closeButton);
 		this.element.append(this.titleBar);
 		this.content = $("<div class='SWidget-Dialog-Content'></div>");
 		this.element.append(this.content);
 		var _that = this;

 		this.closeButton.click(function() {
 			_that.close();
 		});
 	}

 	/**
 	 * add 
 	 * @override
 	 * @param{SWidget.Element} element
 	 **/
 	add(element) {
 		this.content.append(element.HTML());
 	}

 	/**
 	 * close
 	 **/
 	close() {
 		this.element.remove();
 	}

 }