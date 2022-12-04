class VideoControlPane {
  constructor() {
    var event_target = {
      "video-control-play": this.play,
      "video-control-back-to-top": this.backToTop,
      "video-control-backward": this.backward,
      "video-control-forward": this.forward,
      "video-control-speed-down": this.speedDown,
      "video-control-speed-up": this.speedUp,
      "video-control-speed-slider": this.changeSpeed
    }
    for(const [k,v] of Object.entries(event_target)) {
      document.getElementById(k).addEventListener('click', v.bind(this));
    }
  }

  setPlayerAPI(api) {
    this.player_api = api;
  }

  change(video) {
    this.video = video;
    this.player_api.load(video);
    document.getElementById("playerStatus").className = "fas fa-2x fa-pause";
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

  getSpeed() {
	  return document.getElementById("video-control-speed-slider").value / 100;
  }

  speedDown() {
	  document.getElementById("video-control-speed-slider").stepDown();
	  this.changeSpeed();
  }

  speedUp() {
	  document.getElementById("video-control-speed-slider").stepUp();
	  this.changeSpeed();
  }

  changeSpeed() {
	  document.getElementById("speed").innerHTML = this.getSpeed().toFixed(2);
	  this.player_api.changeSpeed(this.getSpeed());
  }
}
