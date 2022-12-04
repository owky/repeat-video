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

  save() {
    window.localStorage.setItem('play_list', JSON.stringify(this));
  }

  load() {
    JSON.parse(window.localStorage.getItem('play_list')).forEach((elm) => {
      this.push(elm);
    });
  }
}
