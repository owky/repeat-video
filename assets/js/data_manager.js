static currentDataVersion = "1.0"
var dataVersion = window.localStorage.getItem("data_version");
if (dataVersion == null || dataVersion < currentDataVersion) {
	window.localStorage.clear();
	window.localStorage.setItem("data_version", DataManager.currentDataVersion);
}

class PlayList extends Array {
	constructor () {
		super();
		let data = JSON.parse(window.localStorage.getItem("play_list"));
		if (data) {
			for (let key in data) {
				this.push(new Video(key, data[key]));
			}
		}
	}

	get first () {
		if (this.length > 0) {
			return this[0];
		} else {
			return new Video();
		}
	}
}

class Video {
	constructor (vid, data) {
		this.vid = vid;
		if (data) {
			this.title = data['title'];
			this.thumbnail = data['thumbnail'];
			this.speed = data['speed'];
		}
	}
}