class Video {
  constructor(obj) {
    this.id = whichever_exists(obj.id, null);
    this.title = whichever_exists(obj.title, "No title.");
    this.thumbnail = whichever_exists(obj.thumbnail, "");
    this.speed = whichever_exists(obj.speed, 1);
    this.from = whichever_exists(obj.from, null);
    this.to = whichever_exists(obj.from, null);
  }
}
