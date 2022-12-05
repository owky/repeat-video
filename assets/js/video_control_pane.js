class VideoControlPane {
  constructor() {
    var event_target = {
      "video-control-play": this.play,
      "video-control-back-to-top": this.backToTop,
      "video-control-backward": this.backward,
      "video-control-forward": this.forward,
      "video-control-speed-down": this.speedDown,
      "video-control-speed-up": this.speedUp,
      "repeat-toggle": this.toggleRepeat,
      "video-control-repeat-from": this.repeatFrom,
      "video-control-repeat-to": this.repeatTo
    }
    for(const [k,v] of Object.entries(event_target)) {
      document.getElementById(k).addEventListener('click', v.bind(this));
    }

    this.repeat = false;
    setInterval(this.repeater.bind(this), 500);
  }

  setPlayerAPI(api) {
    this.player_api = api;
  }

  getRepeatFrom() {
    return parseInt(document.getElementById("repeatFrom").value);
  }

  getRepeatTo() {
    return parseInt(document.getElementById("repeatTo").value);
  }


  load(video) {
    this.video = video;
    this.player_api.load(video);
    this.changeSpeed(video.speed);
    document.getElementById("playerStatus").className = "fas fa-2x fa-play";
    document.getElementById("repeatFrom").value = this.video.from;
    document.getElementById("repeatTo").value = this.video.to;
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

  speedDown() {
    this.changeSpeed(this.video.speed <= 0 ? 0 : this.video.speed - 0.05);
  }

  speedUp() {
	  this.changeSpeed(this.video.speed >= 1.0 ? 1.0 : this.video.speed + 0.05);
  }

  changeSpeed(speed) {
	  document.getElementById("speed").innerHTML = speed.toFixed(2);
	  this.player_api.changeSpeed(speed);
    this.video.speed = speed;
    playList.save();
  }

  repeatOn () {
	  document.getElementById("repeat-toggle").className = "has-text-primary has-text-weight-bold";
	  this.repeat = true;
  }

  repeatOff () {
	  document.getElementById("repeat-toggle").className = "";
	  this.repeat = false;
  }

  toggleRepeat () {
	  this.repeat ? this.repeatOff() : this.repeatOn() ;
  }

  repeatFrom () {
	  this.repeatOn()
    var time = this.player_api.getCurrentTime().toFixed();
	  document.getElementById("repeatFrom").value = time;
    this.video.from = time;
    playList.save();
  }

  repeatTo () {
	  this.repeatOn();
    var time = this.player_api.getCurrentTime().toFixed();
	  document.getElementById("repeatTo").value = time;
    this.video.to = time;
    playList.save();
  }

  repeater () {
    if (!this.player_api) return;
    if (!(this.player_api.isRepeatable())) return;
    if (!this.repeat) return;
    if (!this.getRepeatFrom() || !this.getRepeatTo()) return;

    if (this.player_api.getCurrentTime().toFixed(0) == this.getRepeatTo()) {
      this.player_api.seekTo(this.getRepeatFrom());
    }
  }
}
