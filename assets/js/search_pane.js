class SearchPane {
  constructor() {
    this.result_pane = document.getElementById("result");

    document.getElementById("youtube-api-search").addEventListener('click', this.search.bind(this));
  }

  search() {
    youtubeSearchApi.search();
  }

  show(result) {
    this.result_pane.innerHTML = "";
    result.forEach(video => {
      this.result_pane.appendChild(new ResultCard(video).create());
    });
  }
}

class ResultCard {
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
    img.addEventListener('click', this.play.bind(this));

    return card;
  }

  play() {
    playList.add(this.video);
    videoControlPane.change(this.video);
  }
}
