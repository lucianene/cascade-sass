;(function(window) {

	"use strict";

	function Modal(options) {

		var modalWindow, modalContent;

		this.options = this._extend({}, this.options);
		this._extend(this.options, options);

		this._init();
		this._show();

	}

	Modal.prototype.options = {
		windowHtml: 		'',
		contentHtml: 		'Hello!',
		windowClass: 		'modal__window',
		contentClass: 		'modal__content',
		enableAnimations: 	true,
		showAnimation: 		'bounceIn',
		dismissAnimation: 	'zoomOut',
		animationDuration: 	400
	};

	Modal.prototype._isOpen = false;

	Modal.prototype._init = function() {

		this._ui_modalWindow();
		this._ui_modalContent();

		this._events();

	};

	Modal.prototype._ui_modalWindow = function() {

		this.modalWindow = document.createElement('div');
		this.modalWindow.innerHTML = this.options.windowHtml;
		this.modalWindow.className = this.options.windowClass;

		document.body.appendChild(this.modalWindow);

	};

	Modal.prototype._ui_modalContent = function() {

		this.modalContent = document.createElement('div');
		this.modalContent.innerHTML = this.options.contentHtml;
		this.modalContent.className = this.options.contentClass;
		this.modalContent.style.animationDuration = this.options.animationDuration +'ms';

		if(this.options.enableAnimations) {
			this.modalContent.className += ' animated';
		}

		this.modalWindow.appendChild(this.modalContent);

	};

	Modal.prototype._show = function() {

		this._isOpen = true; // register as open

		if(this.options.enableAnimations) {
			this.modalContent.className += ' ' + this.options.showAnimation;
		}

		document.body.appendChild(this.modalWindow);

	};

	Modal.prototype._dismiss = function() {

		var self = this;

		this._isOpen = false;

		if(this.options.enableAnimations) {
			this.modalContent.className += ' ' + this.options.dismissAnimation;
		}

		setTimeout(function() {
			document.body.removeChild(self.modalWindow);
		}, this.options.animationDuration / 2);

	};

	Modal.prototype._events = function() {

		this._close_on_overlay_click_event();
		this._close_on_button_click_event();
		this._close_on_escapekey_event();

	};

	Modal.prototype._close_on_overlay_click_event = function() {

		var self = this;

		this.modalWindow.onclick = function(e) {
			if(e.target.classList[0] == self.options.windowClass) {
				self._dismiss();
			}
		};

	};

	Modal.prototype._close_on_button_click_event = function() {

		var self 		= this,
			btn_close = this.modalWindow.querySelector('.modal__close');

		// dismiss on .modal__close click
		if(btn_close !== null) {
			btn_close.onclick = function(e) {
				e.preventDefault();
				self._dismiss();
			};
		}

	};

	Modal.prototype._close_on_escapekey_event = function() {

		var self = this;

		window.onkeydown = function(e) {
			if(self._isOpen && e.keyCode == 27) {
				self._dismiss();
			}
		};

	};

	Modal.prototype._extend = function(a, b) {

		for(var key in b) {
			if(b.hasOwnProperty(key)) {
				a[key] = b[key];
			}
		}

		return a;
	};

	window.Modal = function(options) {

		return new Modal(options);

	};

})(window);
