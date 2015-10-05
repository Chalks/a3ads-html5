var ad = new Ad({
	fallbackHide: ['content', 'logo', 'tag', 'loremipsumdolor', 'sitamet', 'consecteturadipiscing', 'elit', 'html5faster', 'github', 'github-hover'],
	fallbackShow: ['static']
});
ad.registerScene(sceneOne, 3500);
ad.registerScene(sceneTwo, 1600);
ad.registerScene(sceneThree, 2500);
ad.onLoad(function() {
	hoverStates();
	ad.play();
});

function hoverStates() {
	var domAd = document.getElementById('ad');
	var res = document.getElementById('github');
	var resHov = document.getElementById('github-hover');
	domAd.addEventListener('mouseover', function() {
		resHov.style.visibility = "visible";
		res.style.visibility = "hidden";
	});
	domAd.addEventListener('mouseout', function() {
		res.style.visibility = "visible";
		resHov.style.visisbility = "hidden";
	});
}

function sceneOne() {
	ad.fadeIn('logo', {duration:1000, delay:0});
	ad.fadeIn('tag', {duration:1000, delay:0});

	ad.fadeIn('loremipsumdolor', {duration:1000, delay:300});
	ad.fadeIn('sitamet', {duration:1000, delay:500});
	ad.fadeIn('consecteturadipiscing', {duration:1000, delay:700});
	ad.fadeIn('elit', {duration:1000, delay:900});

	ad.moveIn('loremipsumdolor', {duration:1000, delay:300, easing:TWEEN.Easing.Back.Out, toLeft:20, toTop:70, angle:16, distance:400, append:"rotate(-16deg)"});
	ad.moveIn('sitamet', {duration:1000, delay:500, easing:TWEEN.Easing.Back.Out, toLeft:28, toTop:89, angle:16, distance:400, append:"rotate(-16deg)"});
	ad.moveIn('consecteturadipiscing', {duration:1000, delay:700, easing:TWEEN.Easing.Back.Out, toLeft:37, toTop:129, angle:16, distance:400, append:"rotate(-16deg)"});
	ad.moveIn('elit', {duration:1000, delay:900, easing:TWEEN.Easing.Back.Out, toLeft:53, toTop:144, angle:16, distance:400, append:"rotate(-16deg)"});
}

function sceneTwo() {
	ad.fadeOut('loremipsumdolor', {duration:1000, delay:300});
	ad.fadeOut('sitamet', {duration:1000, delay:500});
	ad.fadeOut('consecteturadipiscing', {duration:1000, delay:700});
	ad.fadeOut('elit', {duration:1000, delay:900});

	ad.moveIn('loremipsumdolor', {duration:1000, delay:300, easing:TWEEN.Easing.Back.In, fromLeft:20, fromTop:70, angle:196, distance:400, append:"rotate(-16deg)"});
	ad.moveIn('sitamet', {duration:1000, delay:500, easing:TWEEN.Easing.Back.In, fromLeft:28, fromTop:89, angle:196, distance:400, append:"rotate(-16deg)"});
	ad.moveIn('consecteturadipiscing', {duration:1000, delay:700, easing:TWEEN.Easing.Back.In, fromLeft:37, fromTop:129, angle:196, distance:400, append:"rotate(-16deg)"});
	ad.moveIn('elit', {duration:1000, delay:900, easing:TWEEN.Easing.Back.In, fromLeft:53, fromTop:144, angle:196, distance:400, append:"rotate(-16deg)"});
}

function sceneThree() {
	ad.fadeIn('html5faster', {duration:1000, delay:0});
	ad.moveIn('html5faster', {duration:700, delay:0, easing:TWEEN.Easing.Quintic.In, fromLeft:-22, toLeft:-26, fromTop:50, toTop:104, fromScale:2, toScale:1, append:"rotate(-16deg)"});
	ad.fadeIn('github-hover', {duration:1000, delay:0});
	ad.fadeIn('github', {duration:1000, delay:0});
}

