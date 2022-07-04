function getHistory () {
	data = window.localStorage.getItem("history");
	if (data) {
		return JSON.parse(data);
	} else {
		return {};
	}
}

function setHistory () {
	h = getHistory()
	h[video_id] = {speed: getSpeed()};
	window.localStorage.setItem("history", JSON.stringify(h));
}

function showHistory () {
	div = document.getElementById("history");
	div.innerHTML = ""
	for (vid in getHistory()) {
		img = document.createElement('img');
		img.setAttribute('src', 'http://img.youtube.com/vi/' + vid + '/default.jpg');
		img.setAttribute('hspace', '5');
		img.setAttribute('onclick', 'changeVideo("' + vid + '")');
		div.appendChild(img);
	}
}
