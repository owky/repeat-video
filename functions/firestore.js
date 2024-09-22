const { Firestore } = require('@google-cloud/firestore');

const firestore = new Firestore({
  projectId: process.env.GOOGLE_PROJECT_ID,
  credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT)
});
console.log(firestore);

exports.handler = async function(event, context) {
  try {
    console.log(event);

    let status = null;
    let responseBody = {};

    const match = event.path.match(/\/firestore\/(.*)$/);
    const id =  match ? match[1] : null;
    console.log("id : " + id);

    const ref = firestore.collection('users').doc(id);

    switch (event.httpMethod) {
    case 'GET':
      console.log("Method : GET");

      let doc = await ref.get();
      console.log(doc);

      if (doc.exists) {
        status = 200;
        responseBody = doc.data();
      } else {
        status = 404;
      }
      break;
    case 'POST':
      console.log("Method : POST");
      console.log(JSON.parse(event.body));

      ref.set(JSON.parse(event.body));
      status = 201;
      break;
    default:
      status = 404;
    }

    return {
      statusCode: status,
      body: JSON.stringify(responseBody)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failure' }),
    };
  }
}
