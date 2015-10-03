function player(id) {
	var me = this;
	me.__id = id;
	me.__video = null;
	me.__playButtonLarge = null;
	me.__playButtonSmall = null;
	me.__container = null;
	me.__progress = null;
	
	me.__containerPlayCss = 'video-player--play';
	me.__playButtonLargeCss = 'play-button-large';
	me.__playButtonSmallCss = 'play-button-small';
	me.__playButtonSmallPauseCss = 'icon-font-pause';
	me.__playButtonSmallPlayCss = 'icon-font-play';
	me.__progressCss = 'video-progress-bar';
	
	me.replaceClass = function(el, className, newClassName) {
		el.className = el.className.replace(className, newClassName);
	};
	me.togglePlayback = function(){
		if(me.__video.paused) {
			me.play();
		} else {
			me.pause();
		}
	}
	me.play = function(){
		me.__container.className += ' ' + me.__containerPlayCss;
		me.__playButtonSmall.className = me.__playButtonSmall.className.replace(me.__playButtonSmallPlayCss, me.__playButtonSmallPauseCss);
		me.__video.play();
	};
	
	me.pause = function(){
		me.replaceClass(this.__container, me.__containerPlayCss, '');
		me.__playButtonSmall.className = me.__playButtonSmall.className.replace(me.__playButtonSmallPauseCss, me.__playButtonSmallPlayCss);
		me.__video.pause();
	};
};

player.prototype.init = function(){
	var me = this;
	var container = document.getElementById(me.__id);
	me.__container = container;
	me.__video = container.getElementsByTagName('video')[0];
	me.__progress = container.getElementsByClassName(me.__progressCss)[0];
	me.__playButtonLarge = container.getElementsByClassName(me.__playButtonLargeCss)[0];
	me.__playButtonSmall = container.getElementsByClassName(me.__playButtonSmallCss)[0];
	me.__playButtonLarge.addEventListener('click', function() { me.togglePlayback(); });
	me.__playButtonSmall.addEventListener('click', function() { me.togglePlayback(); });
	me.__video.addEventListener('click', function() { me.togglePlayback(); });
	me.__video.addEventListener("timeupdate", function() { 
		var progress = Math.floor(me.__video.currentTime) / Math.floor(me.__video.duration);
    	me.__progress.style.width = Math.floor(progress * 100) + "%";
	});
	me.__video.addEventListener("ended", function() { me.pause(); me.__progress.style.width = '0%'; });
}


