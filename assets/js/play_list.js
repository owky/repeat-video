class PlayList extends Array {
  constructor() {
    super();
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
    appData.playList = this;
    store();
  }

  load() {
    if (!JSON.parse(localStorage.getItem(APP_ID))) return;

    JSON.parse(localStorage.getItem(APP_ID)).playList.forEach((obj) => {
      this.push(new Video(obj));
    });
  }

  nextOf(video) {
    let currentIndex = this.indexOf(video);
    if (currentIndex == this.length) {
      return undefined;
    } else {
      return this.at(currentIndex + 1);
    }
  }
}
