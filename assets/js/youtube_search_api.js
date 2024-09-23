//const SCOPES = 'openid profile email https://www.googleapis.com/auth/youtube.readonly';
//const CLIENT_ID = '78497601953-ku5qkb7bc9t00irnui7ofjvgh3ecjh4r.apps.googleusercontent.com';
const GOOGLE_API_USER_INFO_URL = 'https://www.googleapis.com/oauth2/v3/userinfo'

function requestAccessToken(callback) {
  console.log("request access token");
  callback ||= function(){return;};

  google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: (response) => {
      appData.accessToken = response.access_token;
      appData.tokenExpiresAt = new Date().getTime() + response.expires_in * 1000;

      callback();
    }
  }).requestAccessToken();
}

function requestIdToken(callback) {
  console.log("request id token");
  callback ||= function(){return;};

  url = GOOGLE_API_USER_INFO_URL + "?access_token=" + appData.accessToken;

  fetch(url)
    .then(response => response.json())
    .then(json => {
      appData.sub = json.sub;

      callback();
    })
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
