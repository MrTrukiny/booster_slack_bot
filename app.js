const { validateSlackRequest } = require('./utils/validate_slack_request');

const slackSigninSecret = process.env.SLACK_SIGNIN_SECRET;

exports.boosterBot = (event, context, callback) => {
  if (!validateSlackRequest(event, slackSigninSecret)) {
    return callback('verification failed');
  }
  const body = JSON.parse(event.body);
  switch (body.type) {
    case 'url_verification':
      callback(null, body.challenge);
      break;
    default:
      callback(null);
  }
};
