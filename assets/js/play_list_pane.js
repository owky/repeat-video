class PlayListPane {
  constructor() {
    this.pane = document.getElementById("play-list-pane")

    playList.forEach((video) => {
      var card = new VideoCard(video).create();
      this.pane.appendChild(card);
    });
  }

  add(video) {
    var card = new VideoCard(video).create();
		this.pane.appendChild(card);
  }
}

class VideoCard {
  constructor(video) {
    this.video = video;
  }

  create() {
    var vid = this.video.id;
		var title = this.video.title;
		var thumbnail = this.video.thumbnail;

		// card-image
		var cardImage = document.createElement('div');
		cardImage.setAttribute('class', 'card-image');
		var figure = document.createElement('figure');
		figure.setAttribute('class', 'image is-4by3');
		var img = document.createElement('img');
		img.setAttribute('src', thumbnail);
		cardImage.appendChild(figure);
		figure.appendChild(img);

		// card-header
		var cardHeader = document.createElement('header');
		cardHeader.setAttribute('class', 'card-header');
		var p = document.createElement('p');
		p.setAttribute('class', 'card-header-title');
		p.innerHTML = title;
		cardHeader.appendChild(p);

		// card
		var card = document.createElement('div');
		card.setAttribute('class', 'card');
		card.appendChild(cardImage);
		card.appendChild(cardHeader);

    // add event
    img.addEventListener('click', this.change.bind(this));

    return card;
  }

  change() {
    videoControlPane.change(this.video);
  }
}
