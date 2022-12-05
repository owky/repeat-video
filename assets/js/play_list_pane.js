class PlayListPane {
  constructor() {
    this.pane = document.getElementById("play-list-pane")
    this.refresh();
  }

  add(video) {
    var card = new VideoCard(video).create();
		this.pane.appendChild(card);
  }

  refresh() {
    this.pane.innerHTML = "";
    playList.forEach((video) => {
      var card = new VideoCard(video).create();
      this.pane.appendChild(card);
    });
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

    // remove-icon
    var remove_span = document.createElement('span');
    remove_span.setAttribute('class', 'icon overlay-on-bottom-right');
    var remove_icon = document.createElement('i');
    remove_icon.setAttribute('class', 'fas fa-2x fa-times-circle');
    remove_span.appendChild(remove_icon);

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

    cardHeader.appendChild(remove_span);

		// card
		var card = document.createElement('div');
		card.setAttribute('class', 'card');
		card.appendChild(cardImage);
		card.appendChild(cardHeader);

    // add event
    img.addEventListener('click', this.change.bind(this));
    remove_span.addEventListener('click', this.removee.bind(this));

    return card;
  }

  change() {
    videoControlPane.change(this.video);
  }

  removee() {
    playList.remove(this.video);
    playListPane.refresh();
  }
}
