function databaseStore() {
  if(!appData.sub) return;

  url = window.location.origin +'/.netlify/functions/firestore/'+ appData.sub;

  fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(appData)
  })
    .then(response => {
      console.log("database function response : " + response.status);
    });
}
