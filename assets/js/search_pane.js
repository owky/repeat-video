class SearchPane {
  constructor() {
    this.result_pane = document.getElementById("result");

    document.getElementById("youtube-api-oauth").addEventListener('click', this.oauth.bind(this));
    document.getElementById("youtube-api-search").addEventListener('click', this.search.bind(this));
  }

  oauth() {
    youtubeSearchApi.oauth();
  }

  search() {
    youtubeSearchApi.search(document.getElementById("query").value);
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
    let card = document.createElement('div');
    card.setAttribute('class', 'card');
    card.innerHTML = `
<div class='card-image'>
  <figure class='image is4by3'>
    <img src='${this.video.thumbnail}'></img>
  </figure>
</div>
<header class='card-header'>
  <p class='card-header-title'>${this.video.title}</p>
</header>
`;

    card.getElementsByTagName('img')[0].addEventListener('click', this.play.bind(this));

    return card;
  }

  play() {
    playList.add(this.video);
    videoControlPane.load(this.video);
  }
}
