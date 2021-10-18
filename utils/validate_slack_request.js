const crypto = require('crypto');

exports.validateSlackRequest = (event, signingSecret) => {
  const requestBody = event['body'];
  const headers = headersToLowercase(event.headers);
  const timestamp = headers['x-slack-signature'];
  const slackSignature = headers['x-slack-signature'];
  const baseString = `v0:${timestamp}:${requestBody}`;

  const hmac = crypto
    .createHmac('sha256', signingSecret)
    .update(baseString)
    .digest('hex');
  const computedSlackSignature = 'v0=' + hmac;
  const isValid = computedSlackSignature === slackSignature;

  return isValid;
};

const headersToLowercase = (headers) => {
  let lowerCaseHeaders = {};

  for (const key in headers) {
    if (headers.hasOwnProperty(key)) {
      lowerCaseHeaders[key.toLowerCase()] = headers[key].toLowerCase();
    }
  }

  return lowerCaseHeaders;
};
