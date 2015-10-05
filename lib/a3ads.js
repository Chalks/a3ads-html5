// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel
(function() { var lastTime = 0; var vendors = ['ms', 'moz', 'webkit', 'o']; for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) { window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame']; window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame']; } if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element) { var currTime = new Date().getTime(); var timeToCall = Math.max(0, 16 - (currTime - lastTime)); var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall); lastTime = currTime + timeToCall; return id; }; if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) { clearTimeout(id); }; }());

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#Polyfill
// recommended polyfill for bind if not present
(function() {if (!Function.prototype.bind) { Function.prototype.bind = function(oThis) { if (typeof this !== 'function') { throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable'); } var aArgs   = Array.prototype.slice.call(arguments, 1), fToBind = this, fNOP    = function() {}, fBound  = function() { return fToBind.apply(this instanceof fNOP ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments))); }; if (this.prototype) { fNOP.prototype = this.prototype; } fBound.prototype = new fNOP(); return fBound; }; } }());

function Ad(opts) {
	opts = opts != undefined ? opts : {};
	this.fallbackHide = opts.fallbackHide != undefined ? opts.fallbackHide : [];
	this.fallbackShow = opts.fallbackShow != undefined ? opts.fallbackShow : [];
	this.loops = opts.loops != undefined ? opts.loops : 1;
	this.scenes = [];
	this.currentScene = 0;
	this.loopCount = 0;
	this.played = false;
}

Ad.prototype.animate = function() {
	requestAnimationFrame(this.animate.bind(this));
	TWEEN.update();
}

Ad.prototype.onLoad = function(callback) {
	var self = this;
	document.addEventListener('DOMContentLoaded', function() {
		self.played = !self.isCompatible()
		callback();
	}, false);
}

Ad.prototype.isCompatible = function() {
	var opacity = false;
	if('opacity' in document.documentElement.style || 'filter' in document.documentElement.style) {
		opacity = true;
	}
	var transform = false;
	if('transform' in document.documentElement.style
		|| '-ms-transform' in document.documentElement.style
		|| '-webkit-transform' in document.documentElement.style) {
		transform = true;
	}
	var compatible = opacity && transform;

	if(!compatible) {
		for(var i = 0; i < this.fallbackHide.length; i++) {
			document.getElementById(this.fallbackHide[i]).style.display = "none";
		}
		for(var i = 0; i < this.fallbackShow.length; i++) {
			document.getElementById(this.fallbackShow[i]).style.display = "block";
		}
	}
	return compatible;
}

Ad.prototype.registerScene = function(scene, duration) {
	this.scenes.push({'scene':scene, 'duration':duration});
}

Ad.prototype.play = function() {
	if(!this.played) {
		this.played = true;
		this.animate();
		if(this.scenes.length > 0) {
			this.nextScene();
		}
	}
}

Ad.prototype.nextScene = function() {
	var self = this;
	self.scenes[this.currentScene].scene();
	setTimeout(function() {
		// increment the scene location
		self.currentScene++;
		// increment loop count if we've done all the scenes once
		self.loopCount = self.currentScene == self.scenes.length ? self.loopCount + 1 : self.loopCount;
		// loop currentScene back to 0 if we haven't done the required number of loops
		self.currentScene = self.loopCount != self.loops ? self.currentScene % self.scenes.length : self.currentScene;
		// play the next scene if we haven't reached the end
		if(self.currentScene != self.scenes.length) {
			self.nextScene();
		}
	}, self.scenes[self.currentScene].duration);
}

Ad.hide = function(domId) {
	var el = document.getElementById(domId);
	el.style.display = "none";
};

/*
* required:
*   fromLeft, fromTop, angle, distance ||
*   toLeft, toTop, angle, distance ||
*   fromLeft, fromTop, toLeft, toTop
*
* options:
*   fromScale, default 1
*   toScale, default 1
*   append, default ''
*   easing, default TWEEN.Easing.Quadratic.Out
*/
Ad.moveIn = function(domId, opts) {
	if(opts.angle != undefined && opts.distance != undefined) {
		if(opts.fromLeft == undefined && opts.fromTop == undefined) {
			opts.fromLeft = opts.toLeft + opts.distance * Math.cos(opts.angle * Math.PI / 180);
			opts.fromTop = opts.toTop - opts.distance * Math.sin(opts.angle * Math.PI / 180);
		} else if(opts.toLeft == undefined && opts.toRight == undefined) {
			opts.toLeft = opts.fromLeft + opts.distance * Math.cos(opts.angle * Math.PI / 180);
			opts.toTop = opts.fromTop - opts.distance * Math.sin(opts.angle * Math.PI / 180);
		}
	}
	opts.fromScale = opts.fromScale != undefined ? opts.fromScale : 1;
	opts.toScale = opts.toScale != undefined ? opts.toScale : 1;
	opts.append = opts.append != undefined ? opts.append : '';
	opts.easing = opts.easing != undefined ? opts.easing : TWEEN.Easing.Quadratic.Out;

	var el = document.getElementById(domId);
	var tween = new TWEEN.Tween( { l:opts.fromLeft, t:opts.fromTop, scale:opts.fromScale })
		.to({l:opts.toLeft, t:opts.toTop, scale:opts.toScale}, opts.duration)
		.easing(opts.easing)
		.onUpdate(function() {
			el.style.transform = 'scale(' + this.scale + ', ' + this.scale + ') translate(' + this.l + 'px, ' + this.t + 'px)' + opts.append;
			el.style.msTransform = 'scale(' + this.scale + ', ' + this.scale + ') translate(' + this.l + 'px, ' + this.t + 'px)' + opts.append;
			el.style.webkitTransform = 'scale(' + this.scale + ', ' + this.scale + ') translate(' + this.l + 'px, ' + this.t + 'px)' + opts.append;
		})
		.delay(opts.delay)
		.start();
	return tween;
};

Ad.fadeIn = function(domId, opts) {
	opts.easing = opts.easing != undefined ? opts.easing : TWEEN.Easing.Linear.None;
	var el = document.getElementById(domId);
	var tween = new TWEEN.Tween( { opa: 0 })
		.to({opa:1}, opts.duration)
		.easing(opts.easing)
		.onUpdate(function() {
			el.style.opacity = this.opa;
			el.style.filter = 'alpha(opacity=' + parseInt(this.opa * 100)+ ')';
		})
		.delay(opts.delay)
		.start();
	return tween;
}

Ad.fadeOut = function(domId, opts) {
	opts.easing = opts.easing != undefined ? opts.easing : TWEEN.Easing.Linear.None;
	var el = document.getElementById(domId);
	var tween = new TWEEN.Tween( { opa:1 })
		.to({opa:0}, opts.duration)
		.easing(opts.easing)
		.onUpdate(function() {
			el.style.opacity = this.opa;
			el.style.filter = 'alpha(opacity=' + parseInt(this.opa * 100)+ ')';
		})
		.delay(opts.delay)
		.start();
	return tween;
}

