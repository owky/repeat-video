class TabPane {
  constructor() {
    this.search_tab = document.getElementById("search-tab");
    this.search_pane = document.getElementById("search-pane");
    this.play_list_tab = document.getElementById("play-list-tab");
    this.play_list_pane = document.getElementById("play-list-pane");

    document.getElementById("play-list-tab").addEventListener('click', this.playList.bind(this));
    document.getElementById("search-tab").addEventListener('click', this.search.bind(this));
  }

  playList() {
    this.search_pane.style.display = "none";
    this.search_tab.removeAttribute("class");
    this.play_list_pane.style.display = "block";
    this.play_list_tab.setAttribute("class", "is-active");
  }

  search() {
    this.play_list_pane.style.display = "none";
    this.play_list_tab.removeAttribute("class");
    this.search_pane.style.display = "block";
    this.search_tab.setAttribute("class", "is-active");
  }
}
