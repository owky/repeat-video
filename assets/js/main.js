var dataManager = new DataManager();
var video_id = Object.keys(dataManager.playList).shift();
var player;

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

function switchTab(target) {
    document.getElementById("play_list").style.display = "none";
    document.getElementById("search").style.display = "none";
    document.getElementById("play_list_tab").removeAttribute("class");
    document.getElementById("search_tab").removeAttribute("class");
    document.getElementById(target).style.display = "block";
    document.getElementById(target + "_tab").setAttribute("class", "is-active");
}