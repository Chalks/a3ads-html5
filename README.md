# Introducing a3ads-html5
There is a dearth of information about what HTML5 ads are, and how they can be created.  This is a small library used for creating simple HTML5 ads suitable for publication on DoubleClick networks and is the lowest weight solution I've found.  It depends on the [Tween library](https://github.com/tweenjs/tween.js/) maintained by [sole](https://github.com/sole).

##Usage

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

##Options
###`Ad(opts)`:
**`fallbackHide`**  
*default: `[]`*  
This is an array of id strings listing all elements in your ad that you want to be **hidden** if the browser does not support this library.  

**`fallbackShow`**  
*default: `[]`*  
This is an array of id strings listing all elements in your ad that you want to be **shown** if the browser does not support this library.  

**`loops`**  
*default: `1`*  
This is the number of times the ad should loop.  Anything less than 0 will loop infinitely.

*example*:  
```html
<div id="fallback-logo"></div>
<div id="big-moving-logo"></div>
```
```javascript
var ad = new Ad({fallbackHide: ['big-moving-logo']});
```



