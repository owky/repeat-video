class YoutubeIframeAPI {
  constructor() {
    this.player = undefined;
    this.loadAPI();
  }

  loadAPI() {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  initPlayer(video) {
    var video_id = video ? video.id : null;
    this.yt_player = new YT.Player('player', {
      videoId: video_id,
      events: { }
    });
  }

  load(video) {
    this.yt_player.loadVideoById(video.id);
  }

  play() {
    console.log("play api");
    var state = this.yt_player.getPlayerState();
    if (state == 1) {
      this.yt_player.pauseVideo();
    } else {
      this.yt_player.playVideo();
    }
    return state;
  }

  backToTop() {
    this.yt_player.seekTo(0);
  }

  backward() {
    this.yt_player.seekTo(this.yt_player.getCurrentTime() - 10);
  }

  forward() {
    this.yt_player.seekTo(this.yt_player.getCurrentTime() + 10);
  }
}
