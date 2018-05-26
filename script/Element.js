
if(!SWidget) var SWidget = {}


SWidget.Element = class {
	constructor(element) {
		this.element = element || $("<div></div>");
	}

	HTML() {
		return this.element;
	}
}