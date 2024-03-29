class PlayListPane {
  constructor() {
    this.pane = document.getElementById("play-list-pane");
    this.autoPlayToggle = document.getElementById("auto-play-toggle");
    this.isAutoPlay = false;

    this.refresh();

    this.autoPlayToggle.addEventListener('click', this.toggleAutoPlay.bind(this));
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

  toggleAutoPlay() {
    if (this.isAutoPlay) {
      this.isAutoPlay = false;
      this.autoPlayToggle.className = "icon-text has-text-grey";
    } else {
      this.isAutoPlay = true;
      this.autoPlayToggle.className = "icon-text has-text-success";
    }
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
  <span class='icon overlay-on-bottom-right'>
    <i class='fas fa-lg fa-times-circle'></i>
  </span>
</div>
<header class='card-header'>
  <p class='card-header-title'>${this.video.title}</p>
</header>
`;

    card.getElementsByTagName('img')[0].addEventListener('click', this.load.bind(this));
    card.getElementsByTagName('span')[0].addEventListener('click', this.remove.bind(this));

    return card;
  }

  load() {
    videoControlPane.load(this.video);
  }

  remove() {
    if (confirm("Want to delete?")) {
      playList.remove(this.video);
      playListPane.refresh();
    }
  }
}
