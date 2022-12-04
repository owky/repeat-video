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
    this.yt_player = new YT.Player('player', {
      videoId: video.id,
      events: { }
    });
  }

  load(video) {
    console.log(this.yt_player);
    this.yt_player.loadVideoById(video.id);
  }

  play() {
    var state = this.yt_player.getPlayerState();
    if (this.state == 1) {
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
