const APP_ID = "MyYoutubePlayer";
const SCOPES = 'openid profile email https://www.googleapis.com/auth/youtube.readonly';
const CLIENT_ID = '78497601953-ku5qkb7bc9t00irnui7ofjvgh3ecjh4r.apps.googleusercontent.com';

function store() {
  localStorage.setItem(APP_ID, JSON.stringify(data));
  databaseStore();
}

class YoutubeSearchAPI {
  constructor() {
  }

  oauth() {
    google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: (response) => {
        appData.accessToken = response.access_token;
        appData.tokenExpiresAt = new Date().getTime() + response.expires_in * 1000;
        store();

        fetch("https://www.googleapis.com/oauth2/v3/userinfo?access_token=" + appData.accessToken)
          .then(response => response.json())
          .then(json => {
            appData.sub = json.sub;
            store();
          })

        this.search(document.getElementById("query").value);
      }
    }).requestAccessToken();
  }

  isTokenExpired() {
    return new Date().getTime() > appData.tokenExpiresAt;
  }

  search_api(query) {
    return "https://www.googleapis.com/youtube/v3/search"
      + "?part=snippet&q=" + encodeURI(query)
      + "&access_token=" + appData.accessToken
  }

  search(query) {
    if (!appData.accessToken || this.isTokenExpired()) {
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
