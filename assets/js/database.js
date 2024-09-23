function databaseStore() {
  if(!appData.sub) return;

  url = window.location.origin +'/.netlify/functions/firestore/'+ appData.sub;

  fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(appData)
  })
    .then(response => {
      console.log("Data store : "+ response.status);
    });
}

function databaseLoad(callback) {
  if(!appData.sub) {return;}

  callback ||= function() {return;};
  url = window.location.origin +'/.netlify/functions/firestore/'+ appData.sub;

  fetch(url)
    .then(response => {
      console.log("Data load : "+ response.status);
      response.json()
        .then(json => {
          appData.playList = json.playList;
          callback();
        })
    })
}
