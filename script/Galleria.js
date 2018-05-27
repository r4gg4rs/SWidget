/**
 * @author		Jani Haippo		jani.haippo@gmail.com
 * @version		26.5.2018
 **/


/**
 * class Swidget.Galleria
 * @extends SWidget.Panel
 **/
SWidget.Galleria = class extends SWidget.Panel {
	
	/**
	* constructor
	**/
	constructor() {
		var e = $("<div class='SWidget-Galleria'></div>");
		super(e);
		this.image_wiew = $("<div id='SWidget-Galleria-imageview'></div>");
		this.element.append(this.image_wiew);

		this.images = [];
		this.selectedIndex;
		this.swipe = new SWidget.Swipe(this.image_wiew);
		this.keylistener = new SWidget.KeyListener()
		var _that = this;
		this.swipe.onLeft(function(){
		 _that.next();
		 _that.image_wiew.append("<p> Left </p>");

		} );
		this.swipe.onRight(function(){ _that.prev();} )
		this.swipe.bind();
		this.keylistener.onKeydown(function(event) {
//			console.log(event.which);
			if(event.which == '37') _that.prev();
			if(event.which == '39') _that.next();
			if(event.which == '27') _that.close();
		});
		//this.keylistener.bind();
		this.isActive = false;
	}


	/**
	 * add
	 * @param {html} image
	 **/
	add(image) {
		this.images.push(image);
		this.element.append(image);
	}


	/**
	 * init
	 **/
	init() {
		var _that = this;
		$(".SWidget-Galleria-thumball-wrapper").each(function(index) {
			$(this).click(function() {
				_that.open(index);
			});
		});
	}

	loadFromArray(files,info) {
		for(var i=0; i< files.length; i++) {
			var img_wrapper = $("<div class='SWidget-Galleria-thumball-wrapper");
			var img = $("<img src='"+ files[i]+"' class='SWidget-Galleria-thumball'></div>");
			img_wrapper.append(img);
			if(info[i]) {
				var inf = $("<small> Kuvaaja:"+ info[i].kuvaaja +"</small>");
				img_wrapper.append(inf);
			} 
			this.images.push(img_wrapper);
		}
	}


	/**
	 * loadFromJsonFile
	 * @param {String} filename
	 **/
	loadFromJsonFile(filename) {
		var _that = this;
		var json_file = $.getJSON("SMC2018-galleria.json",function(result) {
			_that.loadFromJson(result);
		});

	}


	/**
	 *  loadFromJson
	 * @param{json} json - json file
	 **/
	loadFromJson(json) {
		var files = json.images;

		for(var i=0; i< files.length; i++) {
			var elem = files[i];

			var img_wrapper = $("<div class='SWidget-Galleria-thumball-wrapper'></div>");
			var img_src = elem.src;
			var img  =$("<img src='" + img_src +"' class='SWidget-Galleria-thumball'>");
			img_wrapper.append(img);
			this.add(img_wrapper);
			if(elem.photographer) {
				var info = $("<small> Kuvaaja: " + elem.photographer + "</small>");
				img_wrapper.append(info);
				
			}		

		}
		this.init();
	}


	/**
	 * next - next image
	 **/
	next() {

		if(this.selectedIndex + 1 < this.images.length) {
			this.showImage(this.selectedIndex +1);
		} else {
			this.showImage(0);
		}
	}	

	/**
	 * prev - previous image
	 **/
	prev() {
		if(this.selectedIndex -1 >= 0) {
			this.showImage(this.selectedIndex -1);
		} else {
			this.showImage(this.images.length -1);
		}
	}

	/**
	 * showImage
	 * @param{int} index
	 **/
	showImage(index) {
		if(index <= this.images.length) {
			$("html,body").scrollTop(10); 
			this.selectedIndex = index;
			var img = this.images[index].clone();
			img.addClass("SWidget-Galleria-selected-image");
			img.removeClass("SWidget-Galleria-thumball-wrapper");
			this.image_wiew.empty();
			var width = img.outerWidth();

			var closeButton =$("<p id='close-button' class='SWidget-Galleria-button'>X</p>");
			var prevButton = $("<p id='prev-button' class='SWidget-Galleria-button'>&#10094;</p>");
			var nextButton = $("<p id='next-button' class='SWidget-Galleria-button'>&#10095;</p>");
			var _that = this;
			closeButton.click(function() {
				_that.close();
			});
			nextButton.click(function() {
				_that.next();
			})
			prevButton.click(function(){
				_that.prev();
			})
			this.image_wiew.append(img);
			this.image_wiew.append(closeButton);
			this.image_wiew.append(prevButton);
			this.image_wiew.append(nextButton);
		}
	}


	/** 
	 * open
	 **/
	open(index) {
		this.isActive = true;
		this.swipe.bind();
		this.keylistener.bind();
		this.showImage(index);
	}

	/**
	 * close
	 **/
	close() {
		this.isActive = false;
		this.image_wiew.empty();
	
		this.swipe.unbind();
		this.keylistener.unbind();
	}


}
