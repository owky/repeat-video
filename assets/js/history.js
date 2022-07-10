function showPlayList() {
	list = document.getElementById("play_list");
	list.innerHTML = ""
	playList = dataManager.playList;
	for (key in playList) {
		vid = key;
		title = playList[key]['title'];
		thumbnail = playList[key]['thumbnail'];

		// card-image
		cardImage = document.createElement('div');
		cardImage.setAttribute('class', 'card-image');
		figure = document.createElement('figure');
		figure.setAttribute('class', 'image is-4by3');
		img = document.createElement('img');
		img.setAttribute('src', thumbnail);
		img.setAttribute('onclick', 'changeVideo("' + vid + '","' + title + '","' + thumbnail + '")');
		cardImage.appendChild(figure);
		figure.appendChild(img);

		// card-header
		cardHeader = document.createElement('header');
		cardHeader.setAttribute('class', 'card-header');
		p = document.createElement('p');
		p.setAttribute('class', 'card-header-title');
		p.innerHTML = title;
		cardHeader.appendChild(p);

		// card
		card = document.createElement('div');
		card.setAttribute('class', 'tile is-child card');
		card.appendChild(cardImage);
		card.appendChild(cardHeader);

		// tile
		tile = document.createElement('div');
		tile.setAttribute('class', 'tile is-parent is-3');
		tile.appendChild(card);

		list.appendChild(tile);
	}
}

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