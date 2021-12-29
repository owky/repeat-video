var video_id = 'HhZW-XZShhs';
if (location.search.match(/\?vid=.+/)) {
	video_id = location.search.split('?')[1].split('&')[0].split('=')[1];
	addHistory(video_id);
}

window.onload = function () {
	reloadHistory();
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

function changeVideo (video_id = null) {
	if (!video_id) {
		video_id = document.getElementById("video_id").value;
	}
	player.loadVideoById(video_id);
	addHistory(video_id);
	reloadHistory();
}
