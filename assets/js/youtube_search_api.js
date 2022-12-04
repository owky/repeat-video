//access_tokenが含まれるリクエストが来たらアクセストークンを保存
var api_access_token;
if (window.location.href.match(/#access_token=.+/)) {
    api_access_token = window.location.href.split("#")[1].split("&")[0].split("=")[1];
}

class YoutubeSearchAPI {
  constructor() {
    document.getElementById("youtube-api-oauth").addEventListener('click', this.oauth.bind(this));
  }

  oauth() {
    var client_id = "828562580542-6hmetuuhj9rtavsdsghp1jn16f5m97pl.apps.googleusercontent.com";
    var redirect_uri = "https://" + location.host;
    var scope = "https://www.googleapis.com/auth/youtube.readonly";
    var param = "?client_id=" + client_id + "&redirect_uri=" + redirect_uri + "&response_type=token&scope=" + scope;
    window.location.href = "https://accounts.google.com/o/oauth2/auth" + param;
  }

  search() {
    console.log("search : " + api_access_token);
    if (api_access_token) {
      var api = "https://www.googleapis.com/youtube/v3/search";
      var query = encodeURI(document.getElementById("query").value);

      fetch(api + "?part=snippet&q=" + query + "&access_token=" + api_access_token)
        .then(response => response.json())
        .then(json => {
          var result = json.items.map(item => new Video(
              item["id"]["videoId"],
              item["snippet"]["title"],
              item["snippet"]["thumbnails"]["high"]["url"]
          ));
          searchPane.show(result);
        })
    }
  }
}
