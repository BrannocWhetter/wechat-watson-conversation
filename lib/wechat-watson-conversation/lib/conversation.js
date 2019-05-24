//Remove Promise requirement

'use strict';
const AssistantV2 = require('ibm-watson/assistant/v2');
const Promise = require('bluebird');

// Attach `chat` at `app.locals.chat`
module.exports = (app, config) => {
  const watsonConfig = {
    ...{
      username: process.env.WATSON_USERNAME,
      password: process.env.WATSON_PASSWORD,

      assistant_id: process.env.WATSON_ASSISTANT_ID,
      
      version: '2019-02-28',
      url: 'https://gateway-syd.watsonplatform.net/assistant/api',
    },
    ...config,
  };



  const assistantV2 = new AssistantV2(watsonConfig);

  const chat = async (text, context = null, sessionId) => message({
    assistant_id: process.env.WATSON_ASSISTANT_ID,
    session_id: sessionId,
    input: { text, message_type: 'text' },
    context,
  });

  app.locals = { chat };
};