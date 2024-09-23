const SCOPES = 'openid profile email https://www.googleapis.com/auth/youtube.readonly';
const CLIENT_ID = '78497601953-1njnu8ipb1oo1tgk7g2balff63l0evrm.apps.googleusercontent.com';

function requestAccessToken2() {
  url = "https://accounts.google.com/o/oauth2/v2/auth?"
    + "scope=" + SCOPES + "&"
    + "include_granted_scopes=true&"
    + "response_type=token&"
    + "state=myyoutubeplayeroauthstate&"
    + "redirect_uri=" + window.location.origin + "&"
    + "client_id=" + CLIENT_ID;
  window.location.href = url;
}

function isOAuthRedirect() {
  params = window.location.href.split('#')[1];
  return params && params.includes('state=')
    && params.includes('access_token=') && params.includes('expires_in=')
}

function getAccessToken() {
  accessToken = window.location.href.match(/access_token=([^&]+)/)[1];
  expiresIn = window.location.href.match(/expires_in=([^&]+)/)[1];
  appData.accessToken = accessToken;
  appData.tokenExpiresAt = new Date().getTime() + expiresIn * 1000;
  history.replaceState('', '', '/');
}

function requestIdToken2(callback) {
  callback ||= function() {return;};

  url = "https://www.googleapis.com/oauth2/v3/userinfo?"
    + "access_token=" + appData.accessToken;

  fetch(url)
    .then(response => response.json())
    .then(json => {
      console.log(json);
      appData.sub = json.sub;

      callback();
    })
}
