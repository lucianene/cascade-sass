;(function() {

	"use strict";

	/**
	 * Listen for scroll and activate menu classes
	 */
	function Scrollspy(options) {

		this.options = this._extend({}, this.options);
		this._extend(this.options, options);

		this._assignSelectors();
		this._init();

	};

	// default options
	Scrollspy.prototype.options				= {
		menuSelector: 			'[data-scrollspy]',
		menuElementSelector: 	'a',
		activeClassName: 		'active',
	};

	// cache items
	Scrollspy.prototype._menuElements			= {};
	Scrollspy.prototype._contentElements		= {};
	Scrollspy.prototype._currentContentElement	= {};
	Scrollspy.prototype._currentScrollOffset	= 0;

	Scrollspy.prototype._assignSelectors = function() {

		this._menuSelector 			= document.querySelector(this.options.menuSelector);
		this._menuElements 			= this._menuSelector.querySelectorAll(this.options.menuElementSelector);

		if(typeof this._menuElements[0] === 'undefined') return; // if no elements found, disable

		this._contentSelector 		= document.querySelector(this._menuSelector.dataset.scrollspy);

		this._contentElements 		= this._contentSelector.querySelectorAll(Array.prototype.map.call(this._menuElements, function(menuElement) {
			return menuElement.hash;
		}).toString());

		this._currentContentElement	= this._menuElements[0]; // assign default current content element

	};

	Scrollspy.prototype._init = function() {

		var self = this;

		this._addEvent(function() {

			self._currentScrollOffset = document.body.scrollTop; // get current scroll position

			self._updateCurrentContentElement();
			self._updateCurrentMenuActiveElement();

		});

	};

	Scrollspy.prototype._updateCurrentContentElement = function() {

		var i, contentElement, contentElementOffsetTop;

		for(i in this._contentElements) {
			contentElement = this._contentElements[i];

			contentElementOffsetTop = this._getFullOffset(contentElement);

			if(typeof contentElement.id !== 'undefined' && this._currentScrollOffset + 1 > contentElementOffsetTop) {
				this._currentContentElement = contentElement;
			}

		}

	};

	Scrollspy.prototype._updateCurrentMenuActiveElement = function() {

		var i, y, menuElement;

		for(i in this._menuElements) {

			menuElement = this._menuElements[i];

			if(menuElement.hash == '#'+this._currentContentElement.id) {

				// remove all active classes
				for(y in this._menuElements) {
					if(typeof this._menuElements[y].classList !== 'undefined')
						this._menuElements[y].classList.remove(this.options.activeClassName);
				}

				// add active class to the element in viewport
				menuElement.classList.add(this.options.activeClassName);

				// console.log(menuElement.parentElement.nextElementSibling);
				// console.log(menuElement.parentNode.parentNode.nodeName);

				if(menuElement.parentNode.parentNode.nodeName == 'UL') {
					if(typeof menuElement.parentNode.parentNode.parentNode.firstChild.classList !== 'undefined') {
						menuElement.parentNode.parentNode.parentNode.firstChild.classList.add(this.options.activeClassName);
					}
				}



				// console.log(this._menuElements);

				// console.log(this);

			}

		}
	};

	Scrollspy.prototype._addEvent = function(callback) {

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

	Scrollspy.prototype._getFullOffset = function(domElement)
	{
		var pos = 0;

		while(domElement != null)
		{
			pos += domElement.offsetTop;
			domElement = domElement.offsetParent;
		}

		return pos;
	};


	Scrollspy.prototype._extend = function(a, b) {

		for(var key in b) {
			if(b.hasOwnProperty(key)) {
				a[key] = b[key];
			}
		}

		return a;
	};

	window.Scrollspy = function(options) {

		return new Scrollspy(options);

	};

})();
