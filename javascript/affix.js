;(function() {

	"use strict";

	function Affix(options) {

		this.options = this._extend({}, this.options);
		this._extend(this.options, options);

		this._elementParent 		= document.querySelector(this.options.selector);
		this._element				= document.querySelector(this._elementParent.dataset.affix);
		this._elementOffset 		= this._getFullOffset(this._element);
		this._elementComputedOffset = this._elementOffset - this.options.offsetTop;

		this._init();

	}

	// default options
	Affix.prototype.options = {
		selector: 		'[data-affix]',
		pinnedClass: 	'affix',
		offsetTop: 		100,
		offsetBottom: 	0,
	};

	Affix.prototype._init = function() {

		var self = this;

		this._listenScroll(function() {

			self._scrollOffset = document.body.scrollTop; // get current scroll position
			self._fixElement();

		});

	}

	Affix.prototype._fixElement = function()
	{

	    if(this._elementComputedOffset < this._scrollOffset) {

	        this._element.classList.add(this.options.pinnedClass);
	        this._element.style.top = this.options.offsetTop + 'px';

	    } else {

	        if(this._element.classList.contains(this.options.pinnedClass)) {
	            this._element.classList.remove(this.options.pinnedClass);
	        }

	    }

	}

	Affix.prototype._listenScroll = function(callback) {

		if(typeof callback === 'undefined')
			return;

		if(document.addEventListener){
				window.addEventListener('scroll', callback, false);
			} else if(document.attachEvent){
				window.attachEvent('onscroll', callback);
			} else {
				window['onscroll'] = callback;
		}

	};

	Affix.prototype._getFullOffset = function(domElement)
	{
		var pos = 0;

		while(domElement != null)
		{
			pos += domElement.offsetTop;
			domElement = domElement.offsetParent;
		}

		return pos;
	};

	Affix.prototype._extend = function(a, b) {

		for(var key in b) {
			if(b.hasOwnProperty(key)) {
				a[key] = b[key];
			}
		}

		return a;
	};

	window.Affix = function() {

		return new Affix();

	};

})();
