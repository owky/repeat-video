class YoutubeIframeAPI {
  constructor() {
    this.player = undefined;
    this.loadAPI();
  }

  loadAPI() {
    let tag = document.createElement('script');
    let firstScriptTag = document.getElementsByTagName('script')[0];
    tag.src = "https://www.youtube.com/iframe_api";
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  initPlayer() {
    this.yt_player = new YT.Player('player', {
      videoId: null,
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }

  isRepeatable() {
    if (!this.yt_player) return false;
    if (typeof this.yt_player.getPlayerState != "function") return false;
    if (this.yt_player.getPlayerState() != 1) return false;
    return true;
  }

  getCurrentTime() {
    return this.yt_player.getCurrentTime();
  }

  load(video) {
    this.yt_player.loadVideoById(video.id);
    this.yt_player.stopVideo();
  }

  play() {
    let state = this.yt_player.getPlayerState();
    if (state == 1) {
      this.yt_player.pauseVideo();
    } else {
      this.yt_player.playVideo();
    }
    return state;
  }

  backward() {
    this.yt_player.seekTo(this.yt_player.getCurrentTime() - 10);
  }

  forward() {
    this.yt_player.seekTo(this.yt_player.getCurrentTime() + 10);
  }

  seekTo(time) {
    this.yt_player.seekTo(time);
  }

  changeSpeed(speed) {
    this.yt_player.setPlaybackRate(speed);
  }
}
