exports.boosterBot = (event, context, callback) => {
  const body = JSON.parse(event.body);
  switch (body.type) {
    case 'url_verification':
      callback(null, body.challenge);
      break;
    default:
      callback(null);
  }
};
