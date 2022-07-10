var video_id = 'HhZW-XZShhs';

window.onload = function () {
	showPlayList();
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

function changeVideo (vid, title, thumbnail_url) {
	if (vid) video_id = vid;
	player.loadVideoById(video_id);
	if (h = dataManager.playList[video_id]) {
		document.getElementById("speedSlider").value = h['speed'] * 100;
		changeSpeed()
	}
	dataManager.addPlayList(video_id, title, thumbnail_url);
	showPlayList();
}
