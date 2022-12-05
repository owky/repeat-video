class PlayList extends Array {
  constructor() {
    super();
    this.load();
  }

  add(video) {
    this.push(video);
    playListPane.add(video);
    this.save();
  }

  remove(video) {
    this.splice(this.indexOf(video), 1);
    this.save();
  }

  save() {
    window.localStorage.setItem('play_list', JSON.stringify(this));
  }

  load() {
    JSON.parse(window.localStorage.getItem('play_list')).forEach((obj) => {
      this.push(new Video(obj));
    });
  }
}
