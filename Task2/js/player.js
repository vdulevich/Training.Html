function player(id) {
	var me = this;
	me.__id = id;
	me.__video = null;
	me.__playButtonLarge = null;
	me.__playButtonSmall = null;
	me.__container = null;
	me.__progress = null;
	me.__progressBar = null;
	
	me.__containerPlayCss = 'video-player--play';
	me.__containerPauseCss = 'video-player--pause';
	
	me.__playButtonLargeCss = 'play-button-large';
	me.__playButtonSmallCss = 'play-button-small';
	me.__playButtonSmallPauseCss = 'icon-font-pause';
	me.__playButtonSmallPlayCss = 'icon-font-play';
	me.__progressCss = 'video-progress';
	me.__progressBarCss = 'video-progress-bar';
	
	me.replaceClass = function(el, className, newClassName) {
		el.className = el.className.replace(className, newClassName);
	};
	
	me.removeClass = function(el, className) {
		el.className = el.className.replace(' ' + className, '');
	};
	
	me.togglePlayback = function(){
		if(me.__video.paused) {
			me.__video.play();
		} else {
			me.__video.pause();
		}
	}
};

player.prototype.init = function(){
	var me = this;
	var container = document.getElementById(me.__id);
	me.__container = container;
	me.__video = container.getElementsByTagName('video')[0];
	me.__progress = container.getElementsByClassName(me.__progressCss)[0];
	me.__progressBar = container.getElementsByClassName(me.__progressBarCss)[0];
	me.__playButtonLarge = container.getElementsByClassName(me.__playButtonLargeCss)[0];
	
	if(me.__playButtonLarge) {
		me.__playButtonLarge.addEventListener('click', function() { me.togglePlayback(); });
	}
	
	me.__playButtonSmall = container.getElementsByClassName(me.__playButtonSmallCss)[0];
	if(me.__playButtonSmall) {
		me.__playButtonSmall.addEventListener('click', function() { me.togglePlayback(); });
	}
	
	if(me.__progress) {
		me.__progress.addEventListener('click', function(e) {
			var totalWidth = this.getClientRects()[0].width,
				currentWidth = e.offsetX,
				percentWidth = currentWidth / totalWidth * 100;
			me.__video.currentTime = me.__video.duration / 100 * percentWidth;
		});
	}
	
	me.__video.addEventListener('click', function() { me.togglePlayback(); });
	me.__video.addEventListener("play", function() { 
		me.removeClass(me.__container, me.__containerPauseCss);
		me.__container.className += ' ' + me.__containerPlayCss;
	});
	
	me.__video.addEventListener("pause", function() { 
		me.removeClass(me.__container, me.__containerPlayCss);
		me.__container.className += ' ' + me.__containerPauseCss;
	});
	
	me.__video.addEventListener("timeupdate", function() { 
		if(me.__progressBar) {
			var progress = Math.floor(me.__video.currentTime) / Math.floor(me.__video.duration);
			me.__progressBar.style.width = Math.floor(progress * 100) + "%";
		}
	});

	me.__video.addEventListener("ended", function() { 
		me.removeClass(me.__container, me.__containerPlayCss);
		me.__video.pause();
		if(me.__progress) {
			me.__progressBar.style.width = '0%';
		}
	});
}


