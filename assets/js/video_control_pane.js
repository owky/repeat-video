class VideoControlPane {
  constructor() {
    document.getElementById("video-control-play").addEventListener('click', this.play.bind(this));
    document.getElementById("video-control-back-to-top").addEventListener('click', this.backToTop.bind(this));
    document.getElementById("video-control-backward").addEventListener('click', this.backward.bind(this));
    document.getElementById("video-control-forward").addEventListener('click', this.forward.bind(this));
  }

  setPlayerAPI(api) {
    this.player_api = api;
  }

  change(video) {
    this.video = video;
    this.player_api.load(video);
  }

  play() {
    var state = this.player_api.play();
    if (state == 1) {
      document.getElementById("playerStatus").className = "fas fa-2x fa-play";
    } else {
      document.getElementById("playerStatus").className = "fas fa-2x fa-pause";
    }
  }

  backToTop() {
    this.player_api.backToTop();
  }

  backward() {
    this.player_api.backward();
  }

  forward() {
    this.player_api.forward();
  }
}
