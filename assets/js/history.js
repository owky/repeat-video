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
		card.setAttribute('class', 'card');
		card.appendChild(cardImage);
		card.appendChild(cardHeader);

		list.appendChild(card);
	}
}