class VideoControlPane {
  constructor() {
    this.repeat = false;
    this.repeat_from_field = document.getElementById("repeat-from");
    this.repeat_to_field = document.getElementById("repeat-to");
    this.player_state_icon = document.getElementById("player-state");
    this.speed_label = document.getElementById("speed");
    this.repeat_toggle = document.getElementById("repeat-toggle");

    let events = {
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
    for (let id in events) {
      document.getElementById(id).addEventListener('click', events[id].bind(this));
    }

    setInterval(this.repeater.bind(this), 500);
  }

  setPlayerAPI(api) {
    this.player_api = api;
  }

  getRepeatFrom() {
    return parseInt(this.repeat_from_field.value);
  }

  getRepeatTo() {
    return parseInt(this.repeat_to_field.value);
  }


  load(video) {
    this.video = video;
    this.player_api.load(video);
    this.changeSpeed(video.speed);
    this.player_state_icon.className = "fas fa-2x fa-play";
    this.repeat_from_field.value = this.video.from;
    this.repeat_to_field.value = this.video.to;
  }

  play() {
    if (this.player_api.play() == 1) {
      this.player_state_icon.className = "fas fa-2x fa-play";
    } else {
      this.player_state_icon.className = "fas fa-2x fa-pause";
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
	  this.speed_label.innerHTML = speed.toFixed(2);
	  this.player_api.changeSpeed(speed);
    this.video.speed = speed;
    playList.save();
  }

  repeatOn () {
	  this.repeat_toggle.className = "has-text-primary has-text-weight-bold";
	  this.repeat = true;
  }

  repeatOff () {
	  this.repeat_toggle.className = "";
	  this.repeat = false;
  }

  toggleRepeat () {
	  this.repeat ? this.repeatOff() : this.repeatOn() ;
  }

  repeatFrom () {
	  this.repeatOn()
    let time = this.player_api.getCurrentTime().toFixed();
	  this.repeat_from_field.value = time;
    this.video.from = time;
    playList.save();
  }

  repeatTo () {
	  this.repeatOn();
    let time = this.player_api.getCurrentTime().toFixed();
	  this.repeat_to_field.value = time;
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
