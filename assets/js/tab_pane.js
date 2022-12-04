class TabPane {
  constructor() {
    document.getElementById("play-list-tab").addEventListener('click', this.playList.bind(this));
    document.getElementById("search-tab").addEventListener('click', this.search.bind(this));
  }

  playList() {
    document.getElementById("search-pane").style.display = "none";
    document.getElementById("search-tab").removeAttribute("class");
    document.getElementById("play-list-pane").style.display = "block";
    document.getElementById("play-list-tab").setAttribute("class", "is-active");
  }

  search() {
    document.getElementById("play-list-pane").style.display = "none";
    document.getElementById("play-list-tab").removeAttribute("class");
    document.getElementById("search-pane").style.display = "block";
    document.getElementById("search-tab").setAttribute("class", "is-active");
  }
}
