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
  }

  play() {
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

  seekTo(time) {
    this.yt_player.seekTo(time);
  }

  changeSpeed(speed) {
    this.yt_player.setPlaybackRate(speed);
  }
}
