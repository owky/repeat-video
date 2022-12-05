class Video {
  constructor(obj) {
    this.id = obj.id ? obj.id : null;
    this.title = obj.title ? obj.title : "No title.";
    this.thumbnail = obj.thumbnail ? obj.thumbnail : "";
    this.speed = obj.speed ? obj.speed : 1;
    this.from = obj.from ? obj.from : null;
    this.to = obj.to ? obj.to : null;
  }
}
