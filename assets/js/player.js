var video_id = 'HhZW-XZShhs';
if (location.search.match(/\?vid=.+/)) {
	video_id = location.search.split('?')[1].split('&')[0].split('=')[1];
	addHistory(video_id);
}

window.onload = function () {
	reloadHistory();
}

function getHistory () {
	data = window.localStorage.getItem("history");
	if (data) {
		return JSON.parse(data);
	} else {
		return [];
	}
}

function addHistory (video_id) {
	h = getHistory();
	if (!h.includes(video_id)) {
		h.push(video_id)
		window.localStorage.setItem("history", JSON.stringify(h));
	}
}

function reloadHistory () {
	ul = document.getElementById("history");
	while (ul.firstChild) {
		ul.removeChild(ul.firstChild);
	}
	getHistory().forEach(elm => {
		li = document.createElement('li');
		li.innerHTML = elm;
		li.setAttribute('onclick', 'changeVideo("' + elm + '")')
		ul.appendChild(li);
	})
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

function changeVideo (video_id = null) {
	if (!video_id) {
		video_id = document.getElementById("video_id").value;
	}
	player.loadVideoById(video_id);
	addHistory(video_id);
	reloadHistory();
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

var repeat = false;

function repeatOn () {
	document.getElementById("repeat-toggle").className = "has-text-primary has-text-weight-bold";
	repeat = true;
}

function repeatOff () {
	document.getElementById("repeat-toggle").className = "";
	repeat = false;
}

function toggleRepeat () {
	repeat ? repeatOff() : repeatOn() ;
}

function repeatFrom () {
	repeatOn()
	time = player.getCurrentTime();
	document.getElementById("repeatFrom").value = time.toFixed();
}

function repeatTo () {
	repeatOn();
	time = player.getCurrentTime();
	document.getElementById("repeatTo").value = time.toFixed();
}

function repeater () {
  if (!player) return;
  if (typeof player.getPlayerState != "function") return;
  if (player.getPlayerState() != 1) return;
  if (!repeat) return;

  from = parseInt(document.getElementById("repeatFrom").value)
  to = parseInt(document.getElementById("repeatTo").value)
  if (!from || !to) return;

  if (player.getCurrentTime().toFixed(0) == to) {
    player.seekTo(from);
  }
}

setInterval(repeater, 500);
