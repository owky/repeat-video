//access_tokenが含まれるリクエストが来たらアクセストークンを保存
if (window.location.href.match(/#access_token=.+/)) {
    access_token = window.location.href.split("#")[1].split("&")[0].split("=")[1];
    window.localStorage.setItem("access_token", access_token);
}

function google_api_oauth() {
    client_id = "828562580542-6hmetuuhj9rtavsdsghp1jn16f5m97pl.apps.googleusercontent.com";
    redirect_uri = "https://" + location.host;
    scope = "https://www.googleapis.com/auth/youtube.readonly";
    param = "?client_id=" + client_id + "&redirect_uri=" + redirect_uri + "&response_type=token&scope=" + scope;
    window.location.href = "https://accounts.google.com/o/oauth2/auth" + param;
}

function youtube_search() {
    access_token = window.localStorage.getItem("access_token");
    if (access_token) {
        api = "https://www.googleapis.com/youtube/v3/search";
        query = encodeURI(document.getElementById("query").value);
        search_result = document.getElementById("result");
        search_result.innerHTML = "";

        fetch(api + "?part=snippet&q=" + query + "&access_token=" + access_token)
            .then(response => response.json())
            .then(json => {
                json.items.forEach (item => {
                    thumbnail_url = item["snippet"]["thumbnails"]["high"]["url"];
                    title = item["snippet"]["title"];
                    video_id = item["id"]["videoId"];

                    img = document.createElement("img")
                    img.setAttribute("src", thumbnail_url);
                    img.setAttribute("onclick", "changeVideo('" + video_id + "','" + title + "','" + thumbnail_url + "')");
                    span = document.createElement("span");
                    span.innerHTML = title;

                    p = document.createElement("p");
                    p.appendChild(img);
                    p.appendChild(span);
                    search_result.appendChild(p);
                })
            });
    }
}
