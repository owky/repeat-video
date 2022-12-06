class PlayListPane {
  constructor() {
    this.pane = document.getElementById("play-list-pane")
    this.refresh();
  }

  add(video) {
		this.pane.appendChild(new VideoCard(video).create());
  }

  refresh() {
    this.pane.innerHTML = "";
    playList.forEach((video) => {
      this.pane.appendChild(new VideoCard(video).create());
    });
  }
}

class VideoCard {
  constructor(video) {
    this.video = video;
  }

  create() {
		let card = document.createElement('div');
		card.setAttribute('class', 'card');
    card.innerHTML = `
<div class='card-image'>
  <figure class='image is-4by3'>
    <img src='${this.video.thumbnail}'></img>
  </figure>
</div>
<header class='card-header'>
  <p class='card-header-title'>${this.video.title}</p>
  <span class='icon overlay-on-bottom-right'>
    <i class='fas fa-2x fa-times-circle'></i>
  </span>
</header>
`;

    card.getElementsByTagName('img')[0].addEventListener('click', this.load.bind(this));
    card.getElementsByTagName('span')[0].addEventListener('click', this.removee.bind(this));

    return card;
  }

  load() {
    videoControlPane.load(this.video);
  }

  removee() {
    playList.remove(this.video);
    playListPane.refresh();
  }
}
