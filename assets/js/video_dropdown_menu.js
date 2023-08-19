class VideoDropdownMenu {
  constructor() {
    this.dropdown_menu = document.getElementById("video-dropdown-menu");

    this.refresh();

    document.getElementById('video-dropdown-button').addEventListener('click', this.toggleMenu.bind(this));
  }

  refresh () {
    this.dropdown_menu.innerHTML = "";
    playList.forEach((video) => {
      let menuItem = new VideoMenuItem(video).create();
      menuItem.addEventListener('click', this.toggleMenu.bind(this));
      this.dropdown_menu.appendChild(menuItem);
    });
  }

  toggleMenu () {
    if (this.dropdown_menu.style.display == "block") {
      this.dropdown_menu.style.display = 'none';
    } else {
      this.dropdown_menu.style.display = 'block';
    }
  }
}

class VideoMenuItem {
  constructor(video) {
    this.video = video;
  }
  
  create() {
    let div = document.createElement('div');
    div.setAttribute('class', 'dropdown-content');
    div.setAttribute('style', 'padding-left: 5px; padding-right: 5px;');
    div.innerHTML = `
    <nav class='level is-mobile'>
      <div class='level-left'>
        <div class='level-item'>
          <p class='image is-32x32 is-16by9'>
            <img src='${this.video.thumbnail}'>
          </p>
        </div>
        <div class='level-item'>
          <strong>${this.video.title}</strong>
        </div>
      </div>
    </nav>
    `;

    div.addEventListener('click', this.load.bind(this));
    return div;
  }
  
  load() {
    videoControlPane.load(this.video);
    window.scroll({top: 0, behavior: 'smooth'});
  }
}