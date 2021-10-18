const { WebClient } = require('@slack/web-api');

const { validateSlackRequest } = require('./utils/validate_slack_request');
const nhtsaAPI = require('./apis/nhtsa_api');
const {
  validateVinNumber,
  formatVehicleInfo,
} = require('./utils/vehicle_utils');

const slackSigninSecret = process.env.SLACK_SIGNIN_SECRET;
const slackToken = process.env.SLACK_TOKEN;
const slackClient = new WebClient(slackToken);

exports.boosterBot = (event, _context, callback) => {
  // First we validate that new messages is coming from Slack and from booster_bot.
  if (!validateSlackRequest(event, slackSigninSecret)) {
    return callback('verification failed');
  }

  const body = JSON.parse(event.body);
  switch (body.type) {
    // This verification is mandotary from Slack implementation.
    case 'url_verification':
      callback(null, body.challenge);
      break;
    case 'event_callback':
      handleRequest(body, callback);
      break;
    default:
      callback(null);
  }
};

const handleRequest = (body, callback) => {
  switch (body.event.type) {
    case 'app_mention':
      handleAppMention(body, callback);
      break;
    default:
      callback(null);
  }
};

const handleAppMention = (body, callback) => {
  const { channel, text, user } = body.event;

  // Log message received from user for future debugging.
  console.info(`Got message from user ${user}: ${text}`);

  (async () => {
    try {
      if (text.match('VIN')) {
        // eslint-disable-next-line no-unused-vars
        const [_vin, vinNumber, formatType] = text.toUpperCase().split(':');

        // Run validation firts and throw an error if VIN number is incorrect.
        validateVinNumber(vinNumber);

        // Get Vehicle info from NHTSA API.
        const vehicleInfo = await nhtsaAPI.getVehicleInfo(vinNumber);

        // Select only required fields and format bot response.
        const vehicle = formatVehicleInfo(vehicleInfo, formatType);

        // Send Vehicle information to user.
        await slackClient.chat.postMessage({
          channel,
          text: vehicle,
        });
        return callback(null);
      } else {
        // If user does not send VIN, bot sends message explaining how to use its functionality.
        await slackClient.chat.postMessage({
          channel,
          text:
            `Hello <@${user}>! :tada:\n` +
            'If you want to request some vehicle information, send me a *VIN* number like this:\n' +
            "`VIN:<VIN_NUMBER>:<RESPONSE_TYPE['json' | 'string']>`.\n" +
            "Response type is optional, default is 'string'.\n" +
            'Example: `VIN:JH4DB1650MS013392:string`.',
        });
        return callback(null);
      }
    } catch (error) {
      // Log error for debugging purposes. Maybe we could use a logger.
      console.error(error);
      slackClient.chat
        .postMessage({
          channel,
          text:
            error?.message ||
            'There was a problem getting car info. Try again later.',
        })
        .then(() => {
          callback(null);
        });
    }
  })();
};
