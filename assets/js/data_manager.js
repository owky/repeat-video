class DataManager {
	static currentDataVersion = "1.0"

	constructor() {
		if (this.dataVersion == null || this.dataVersion < DataManager.currentDataVersion) {
			window.localStorage.clear();
			window.localStorage.setItem("data_version", DataManager.currentDataVersion);
		}
	}

	get dataVersion() {
		return window.localStorage.getItem("data_version");
	}

	get playList() {
		var data = window.localStorage.getItem("play_list");
		if (data) {
			return JSON.parse(data);
		} else {
			return {};
		}
	}

	addPlayList(vid, title, thumbnail) {
		var data = this.playList;
		data[vid] = {title: title, thumbnail: thumbnail, speed: 1};
		window.localStorage.setItem("play_list", JSON.stringify(data));
	}

	changeSpeed(vid, speed) {
		var data = this.playList;
		data[vid]['speed'] = speed;
		window.localStorage.setItem("play_list", JSON.stringify(data));
	}
}
