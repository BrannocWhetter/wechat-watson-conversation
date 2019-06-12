'use strict';

// eslint-disable-next-line import/no-extraneous-dependencies
const AssistantV2 = require('ibm-watson/assistant/v2');

const myModule = require('../../../app/routes/index');

const { sessionId } = myModule;

// Move to API Key

// Attach `chat` at `app.locals.chat`
module.exports = (app, config) => {
  const watsonConfig = {
    ...{
      iam_apikey: process.env.WATSON_API_KEY,

      assistant_id: process.env.WATSON_ASSISTANT_ID,

      version: '2019-02-28',
      url: 'https://gateway-syd.watsonplatform.net/assistant/api',
    },
    ...config,
  };

  const assistantV2 = new AssistantV2(watsonConfig);

  // Why don't I create sessions here instead of index? Try it out and see if it works better.

  // use JSON.stringify to send the sessionId? Since sessionId from export returns NaN at the moment... Apparently the retrieved is already an object therefore can't parse?
  console.log('SessionID from Conversation.js: %d', sessionId);

  const chat = async (text, context = null, _sessionId = sessionId) => assistantV2.message({
    assistant_id: process.env.WATSON_ASSISTANT_ID,
    session_id: _sessionId,
    input: { text, message_type: 'text' },
    context,
  });

  app.locals = { chat };
};

