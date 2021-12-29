function getHistory () {
	data = window.localStorage.getItem("history");
	if (data) {
		return JSON.parse(data);
	} else {
		return [];
	}
}

function addHistory (video_id) {
	h = getHistory();
	if (!h.includes(video_id)) {
		h.push(video_id)
		window.localStorage.setItem("history", JSON.stringify(h));
	}
}

function reloadHistory () {
	div = document.getElementById("history");
	while (div.firstChild) {
		div.removeChild(div.firstChild);
	}
	getHistory().forEach(elm => {
		img = document.createElement('img');
        img.setAttribute('src', 'http://img.youtube.com/vi/' + elm + '/default.jpg');
        img.setAttribute('hspace', '5');
		img.setAttribute('onclick', 'changeVideo("' + elm + '")')
		div.appendChild(img);
	})
}
