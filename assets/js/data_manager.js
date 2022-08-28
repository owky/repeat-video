currentDataVersion = "1.0"
dataVersion = window.localStorage.getItem("data_version");
if (dataVersion == null || dataVersion < currentDataVersion) {
	window.localStorage.clear();
	window.localStorage.setItem("data_version", DataManager.currentDataVersion);
}

class PlayList extends Array {
	constructor () {
		super();
		this.current = null;
		let data = JSON.parse(window.localStorage.getItem("play_list"));
		if (data) {
			for (let key in data) {
				this.push(new Video({
					'vid': key,
					'title': data[key]['title'],
					'thumbnail': data[key]['thumbnail'],
					'speed': data[key]['speed']
				}));
			}
			this.current = this[0];
		}
	}

	get first () {
		if (this.length > 0) {
			return this[0];
		} else {
			return new Video();
		}
	}

	getVideoById (vid) {
		return this.find ( video => video.vid == vid);
	}

	save () {
		var raw = {};
		for (let v of this) {
			raw[v.vid] = {'title': v.title, 'thumbnail': v.thumbnail, 'speed': v.playbackRate};
		}
		window.localStorage.setItem('play_list', JSON.stringify(raw));
	}
}

class Video {
	constructor (hash={}) {
		this.vid = hash['vid'];
		this.title = hash['title'];
		this.thumbnail = hash['thumbnail'];
		this.playbackRate = hash['speed'];
	}
}