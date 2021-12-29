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
	ul = document.getElementById("history");
	while (ul.firstChild) {
		ul.removeChild(ul.firstChild);
	}
	getHistory().forEach(elm => {
		li = document.createElement('li');
		li.innerHTML = elm;
		li.setAttribute('onclick', 'changeVideo("' + elm + '")')
		ul.appendChild(li);
	})
}
