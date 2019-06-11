// parameterise the URL using region codes

// remove username/password for IAM keys

'use strict';

const ENV = process.env;

// Brannoc Whetter - Added Assistant_ID EnvVar, removed Workspace_ID
module.exports = {
  wechat: {
    token: ENV.WECHAT_TOKEN,
  },
  watsonConversation: {
    username: ENV.WATSON_USERNAME,
    password: ENV.WATSON_PASSWORD,

    assistant_id: ENV.WATSON_ASSISTANT_ID,

    iam_apikey: ENV.WATSON_API_KEY,
    url: 'https://gateway-syd.watsonplatform.net/assistant/api',
    version: '2019-02-28',
  },
};
