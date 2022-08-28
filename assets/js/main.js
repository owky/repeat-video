var playList = new PlayList();
var player;
var controllerView = new ControllerView();

window.onload = function () {
    // YouTube iFrame APIのロード
	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	showPlayList();
}

function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
	  videoId: playList.first.vid,
	  events: {
		  'onStateChange': playerStateChanged
	  }
	});
}

function playerStateChanged (event) {
	state = event.data
	controllerView.changePlayState(state)
	switch (state) {
		case 0:
			//playVideo(playList.next);
	}
}

function changeVideo (vid, title, thumbnail_url) {
	player.loadVideoById(vid);
	if (h = playList.find(elm => elm.vid == vid)) {
		document.getElementById("speedSlider").value = h['speed'] * 100;
		changeSpeed()
	}
}

function switchTab(target) {
    document.getElementById("play_list").style.display = "none";
    document.getElementById("search").style.display = "none";
    document.getElementById("play_list_tab").removeAttribute("class");
    document.getElementById("search_tab").removeAttribute("class");
    document.getElementById(target).style.display = "block";
    document.getElementById(target + "_tab").setAttribute("class", "is-active");
}