# Introducing a3ads-html5
There is a dearth of information about what HTML5 ads are, and how they can be created.  This is a small library used for creating simple HTML5 ads suitable for publication on DoubleClick networks and is the lowest weight solution I've found.  It depends on the [Tween library](https://github.com/tweenjs/tween.js/) maintained by [sole](https://github.com/sole).

##Setup
**1. Include the javascript**
```html
<script src="js/Tween.js"></script>
<script src="js/a3ads.js"></script>
```

**2. Create the ad and decide when it will play**
```javascript
var ad = new Ad({
	fallbackHide: [], //explained below
	fallbackShow: []
});
ad.onLoad(function() {
	ad.play();
});
```

**3. Create your scene(s)**
```javascript
function sceneOne() {
	Ad.fadeIn('logo', {duration:1000, delay:0});
	Ad.moveIn('logo', {duration:1000, delay:0, easing:TWEEN.Easing.Quadratic.Out, toLeft:-4, toTop:-25, angle:107, distance:150, append:"rotate(-17deg)"});
	//...
}
```

**4. Register your scene(s)**
```javascript
ad.registerScene(sceneOne, 1500);
//...
```

**5. That's it!**

##Usage (setting everything up)
###`Ad(Object)`:
**required**, used to initialize the ad.

(optional) **`fallbackHide`** *default: `[]`*  
This is an array of id strings listing all elements in your ad that you want to be **hidden** if the browser does not support this library.  

(optional) **`fallbackShow`** *default: `[]`*  
This is an array of id strings listing all elements in your ad that you want to be **shown** if the browser does not support this library.  

(optional) **`loops`** *default: `1`*  
This is the number of times the ad should loop.  Anything less than 1 will loop infinitely.

*example*:  
```html
<div id="fallback-logo"></div>
<div id="big-moving-logo"></div>
```
```javascript
var adInstance = new Ad({
	fallbackHide: ['big-moving-logo'],
	fallbackShow: ['fallback-logo'],
	loops: 2
});
```

###`adInstance.onLoad(callback)`:
**required**, you must call this function as it performs compatibility checks.  You must provide a callback function.  If you want the ad to play on page load, the following is recommended.

*example*:  
```javascript
adInstance.onLoad(function() {
	adInstance.play();
});
```

###`adInstance.registerScene(scene, duration)`:
**required**, if you don't register at least one scene, nothing happens.  Why would you do that?  Scenes can be any function.  Duration can be any number that setTimeout accepts.

*example*:  
```javascript
adInstance.registerScene(function() { /* do stuff */ }, 1500);
```

##Usage (moving things around)
###`adInstance.hide(domId)`:
Just hides stuff with CSS instantly.  Nothing complicated, but could be extended to hide in fancier ways.

###`adInstance.moveIn(domId, options)`:
This is the meat of the library.  It allows you to move objects around pretty dynamically using CSS3 Transform.

*options*:  
(required) **`duration`** *default: `n/a`*  
How long the movement will last in milliseconds.

(required) **`delay`** *default: `n/a`*  
How long before the movement beings in milliseconds.

(required\*) **`fromLeft`** *default: `n/a`*  
Any number.  'px' will be appended.  The position this element should start at relative to the left side of the ad.

(required\*) **`fromTop`** *default: `n/a`*  
Any number.  'px' will be appended.  The position this element should start at relative to the top side of the ad.

(required\*) **`toLeft`** *default: `n/a`*  
Any number.  'px' will be appended.  The position this element should end at relative to the left side of the ad.

(required\*) **`toTop`** *default: `n/a`*  
Any number.  'px' will be appended.  The position this element should end at relative to the top side of the ad.

(optional\*) **`angle`** *default: `n/a`*  
Any number in degrees.

(optional\*) **`distance`** *default: `n/a`*  
Any number.

\* **Note**, while fromTop/Left and toTop/Left are required, you can get `moveIn` to calculate their corresponding pair by providing `angle` and `distance`.  Therefore, the following minimum required options:  
```javascript
adInstance.moveIn('id', {duration:500, delay:0, fromLeft:0, fromTop:0, toLeft:8.51, toTop:8.51});
```
OR
```javascript
adInstance.moveIn('id', {duration:500, delay:0, fromLeft:0, fromTop:0, angle:45, distance:10});
```
OR
```javascript
adInstance.moveIn('id', {duration:500, delay:0, toLeft:8.51, toTop:8.51, angle:45, distance:10})
```
are all roughly identical.

(optional) **`fromScale`** *default: `1`*  
Scale to start at (both X and Y scale), 1 is 100%.

(optional) **`toScale`** *default: `1`*  
Scale to end at (both X and Y scale), 1 is 100%.

(optional) **`easing`** *default: `TWEEN.Easing.Quadratic.Out`*  
Any easing function provided by the TWEEN library.

(optional) **`append`** *default: ``*  
What string to append to the CSS3 Transform.  I found it useful to append `rotate(17deg)` in one of my ads that didn't rotate during movement, but did need to stay rotated while moving.


###`adInstance.fadeIn(domId, options)`:

###`adInstance.fadeOut(domId, options)`:







