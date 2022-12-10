//access_tokenが含まれるリクエストが来たらアクセストークンを保存
let api_access_token;
if (window.location.href.match(/#access_token=.+/)) {
    api_access_token = window.location.href.split("#")[1].split("&")[0].split("=")[1];
}

class YoutubeSearchAPI {
  oauth_url = "https://accounts.google.com/o/oauth2/auth"
    + "?client_id=828562580542-6hmetuuhj9rtavsdsghp1jn16f5m97pl.apps.googleusercontent.com"
    + "&redirect_uri=https://" + location.host
    + "&response_type=token&scope=https://www.googleapis.com/auth/youtube.readonly";

  constructor() {
  }

  oauth() {
    window.location.href = this.oauth_url;
  }

  search_api(query) {
    return "https://www.googleapis.com/youtube/v3/search"
      + "?part=snippet&q=" + encodeURI(query)
      + "&access_token=" + api_access_token
  }

  search(query) {
    if (api_access_token) {
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
