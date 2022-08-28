var playList = new PlayList();
var player;
var currentVideo = null
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
	  videoId: null,
	  events: {
		  'onReady': playerIsReady,
		  'onStateChange': playerStateChanged,
		  'onPlaybackRateChange': playbackRateChanged
	  }
	});
}

function playerIsReady () {
	changeVideo(playList.first.vid)
}

function playerStateChanged (event) {
	state = event.data
	controllerView.changePlayState(state)
	switch (state) {
		case 0:
			//playVideo(playList.next);
	}
}

function playbackRateChanged (event) {
	playList.current.playbackRate = event.data;
	playList.save();
}

function changeVideo (vid) {
	player.loadVideoById(vid);
	playList.current = playList.getVideoById(vid);
	document.getElementById("speedSlider").value = playList.current.playbackRate * 100;
	changeSpeed()
}

function switchTab(target) {
    document.getElementById("play_list").style.display = "none";
    document.getElementById("search").style.display = "none";
    document.getElementById("play_list_tab").removeAttribute("class");
    document.getElementById("search_tab").removeAttribute("class");
    document.getElementById(target).style.display = "block";
    document.getElementById(target + "_tab").setAttribute("class", "is-active");
}

function addPlayList(vid, title, thumbnail) {
	playList.push(new Video({'vid': vid, 'title': title, 'thumbnail': thumbnail}));
	playList.save();
	changeVideo(vid);
}