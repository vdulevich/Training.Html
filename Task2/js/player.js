function player(id) {
	var me = this;
	me.__id = id;
	me.__video = null;
	me.__playButtonLarge = null;
	me.__container = null;
	me.__containerPauseCss = 'video-player--pause';
	me.__playButtonLargeCss = 'play-button-large';
	me.replaceClass = function(el, className, newClassName) {
		el.className = el.className.replace(className, newClassName);
	};
};

player.prototype.init = function(){
	var me = this;
	var container = document.getElementById(me.__id);
	me.__container = container;
	me.__video = container.getElementsByTagName('video')[0];
	me.__playButtonLarge = container.getElementsByClassName(me.__playButtonLargeCss)[0];
	me.__playButtonLarge.addEventListener('click', me.togglePlayback.bind(me));
	me.__video.addEventListener('click', me.togglePlayback.bind(me));
}

player.prototype.togglePlayback = function(){
	if(this.__video.paused) {
		this.__container.className += ' ' + this.__containerPauseCss;
	} else {
		this.replaceClass(this.__container, this.__containerPauseCss, '');
	}
	this.__video.paused ? this.__video.play(): this.__video.pause();
}


