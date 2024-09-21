const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';
const CLIENT_ID = '78497601953-ku5qkb7bc9t00irnui7ofjvgh3ecjh4r.apps.googleusercontent.com';

class YoutubeSearchAPI {
  constructor() {
    this.accessToken = null;
    this.tokenExpiresAt = null;
  }

  oauth() {
    google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: (response) => {
        this.access_token = response.access_token;
        this.tokenExpiresAt = new Date().getTime() + response.expires_in * 1000;
        this.search(document.getElementById("query").value);
      }
    }).requestAccessToken();
  }

  isTokenExpired() {
    return new Date().getTime() > this.tokenExpiresAt;
  }

  search_api(query) {
    return "https://www.googleapis.com/youtube/v3/search"
      + "?part=snippet&q=" + encodeURI(query)
      + "&access_token=" + this.access_token
  }

  search(query) {
    if (!this.access_token || this.isTokenExpired()) {
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
