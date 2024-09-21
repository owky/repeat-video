const APP_ID = "MyYoutubePlayer";
const SCOPES = 'openid profile email https://www.googleapis.com/auth/youtube.readonly';
const CLIENT_ID = '78497601953-ku5qkb7bc9t00irnui7ofjvgh3ecjh4r.apps.googleusercontent.com';

function store() {
  localStorage.setItem(APP_ID, JSON.stringify(data));
}

function load() {
  return JSON.parse(localStorage.getItem(APP_ID)) || {};
}

let data = load();

class YoutubeSearchAPI {
  constructor() {
  }

  oauth() {
    google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: (response) => {
        data.accessToken = response.access_token;
        data.tokenExpiresAt = new Date().getTime() + response.expires_in * 1000;
        store();

        fetch("https://www.googleapis.com/oauth2/v3/userinfo?access_token=" + data.accessToken)
          .then(response => response.json())
          .then(json => {
            data.sub = json.sub;
            store();
          })

        this.search(document.getElementById("query").value);
      }
    }).requestAccessToken();
  }

  isTokenExpired() {
    return new Date().getTime() > data.tokenExpiresAt;
  }

  search_api(query) {
    return "https://www.googleapis.com/youtube/v3/search"
      + "?part=snippet&q=" + encodeURI(query)
      + "&access_token=" + data.accessToken
  }

  search(query) {
    if (!data.accessToken || this.isTokenExpired()) {
      this.oauth();
    } else {
      fetch(this.search_api(query))
        .then(response => response.json())
        .then(json => {
          let result = json.items.map(item => new Video({
            "id": item["id"]["videoId"],
            "title": item["snippet"]["title"],
            "thumbnail": item["snippet"]["thumbnails"]["high"]["url"]
          }));
          searchPane.show(result);
        })
    }
  }
}
