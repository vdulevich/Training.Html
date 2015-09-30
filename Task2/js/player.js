function player(id) {
	this.__id = id;
	this.__video = null;
	this.__playbutton = null;
};

player.prototype.init = function(){
	var container = document.getElementById(this.__id);
	this.__video = container.getElementsByTagName('video')[0];
	this.__playbutton = container.getElementsByClassName('video-play-button')[0];
	this.__playbutton.addEventListener('click', this.onPlayClick.bind(this));
}

player.prototype.onPlayClick = function(){
	this.togglePlayback();
}

player.prototype.togglePlayback = function(){
	if(this.__video.paused) {
		this.__video.play();
		
	} else {
		this.__video.pause();
	}
	this.__playbutton.classList.toggle('icon-font-play');
	this.__playbutton.classList.toggle('icon-font-pause');
}

