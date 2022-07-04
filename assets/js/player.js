var video_id = 'HhZW-XZShhs';
if (location.search.match(/\?vid=.+/)) {
	video_id = location.search.split('?')[1].split('&')[0].split('=')[1];
	setHistory();
}

window.onload = function () {
	showHistory();
}

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
	  videoId: video_id,
	  events: {
		  'onStateChange': changePlayerIcon
	  }
	});
}

function changeVideo (vid = null) {
	if (vid) video_id = vid;
	player.loadVideoById(video_id);
	if (h = getHistory()[video_id]) {
		document.getElementById("speedSlider").value = h['speed'] * 100;
		changeSpeed()
	}
	setHistory();
	showHistory();
}
