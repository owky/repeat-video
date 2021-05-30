var video_id = 'HhZW-XZShhs';
if (location.search.match(/\?vid=.+/)) {
	video_id = location.search.split('?')[1].split('&')[0].split('=')[1];
}

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
	  videoId: video_id,
	  events: {}
	});
}

function backToTop () {
	player.seekTo(0);
}

function changeVideo () {
	player.loadVideoById(document.getElementById("video_id").value)
}

function changeSpeed () {
	speed = document.getElementById("speedSlider").value / 100;
	document.getElementById("speed").innerHTML = speed.toFixed(1);
	player.setPlaybackRate(speed);
}

function speedUp () {
	document.getElementById("speedSlider").stepUp();
	changeSpeed();
}

function speedDown () {
	document.getElementById("speedSlider").stepDown();
	changeSpeed();
}
