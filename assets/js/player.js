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
	  events: {
		  'onStateChange': changePlayerIcon
	  }
	});
}

function changePlayerIcon (event) {
	switch (event.data) {
		case 0:
			document.getElementById("playerStatus").className = "fas fa-2x fa-play";
			break;
		case 1:
			document.getElementById("playerStatus").className = "fas fa-2x fa-pause";
			break;
		case 2:
			document.getElementById("playerStatus").className = "fas fa-2x fa-play";
			break;
	}
}

function backToTop () {
	player.seekTo(0);
}

function backward () {
	player.seekTo(player.getCurrentTime() - 10);
}

function forward () {
	player.seekTo(player.getCurrentTime() + 10);
}

function play() {
	if (player.getPlayerState() == 1) {
		player.pauseVideo();
		document.getElementById("playerStatus").className = "fas fa-2x fa-play";
	} else {
		player.playVideo();
		document.getElementById("playerStatus").className = "fas fa-2x fa-pause";
	}
}

function changeVideo () {
	player.loadVideoById(document.getElementById("video_id").value)
}

function changeSpeed () {
	speed = document.getElementById("speedSlider").value / 100;
	document.getElementById("speed").innerHTML = speed.toFixed(2);
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

function repeatFrom () {
  time = player.getCurrentTime();
  document.getElementById("repeatFrom").value = time.toFixed();
}

function repeatTo () {
  time = player.getCurrentTime();
  document.getElementById("repeatTo").value = time.toFixed();
}

function repeater () {
  if (!player) return;
  if (typeof player.getPlayerState != "function") return;
  if (player.getPlayerState() != 1) return;

  from = parseInt(document.getElementById("repeatFrom").value)
  to = parseInt(document.getElementById("repeatTo").value)
  if (!from || !to) return;

  if (player.getCurrentTime().toFixed(0) == to) {
    player.seekTo(from);
  }
}

setInterval(repeater, 500);
