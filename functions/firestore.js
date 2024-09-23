const { Firestore } = require('@google-cloud/firestore');

const firestore = new Firestore({
  projectId: process.env.GOOGLE_PROJECT_ID,
  credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT)
});

exports.handler = async function(event, context) {
  try {
    let status = null;
    let responseBody = {};

    const match = event.path.match(/\/firestore\/(.*)$/);
    const id =  match ? match[1] : null;
    const ref = firestore.collection('users').doc(id);

    switch (event.httpMethod) {
    case 'GET':
      let doc = await ref.get();

      if (doc.exists) {
        status = 200;
        responseBody = doc.data();
      } else {
        status = 404;
      }
      break;
    case 'POST':
      ref.update(JSON.parse(event.body));
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
