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


  var express = require('express');
  var app = express();
  const sessionId = app.get('/', function(req, res){
    const { sessionId } = req.query.sessionId;
    res.send(sessionId);
  });
  //const storage = req.sessionStore;
  //const sessionId = storage.get(req.sessionId);
  const message = assistantV2.message({assistant_id: process.env.WATSON_ASSISTANT_ID, session_id: sessionId});

  const chat = async (text, context = null, sessionId = null) => message({
    assistant_id: process.env.WATSON_ASSISTANT_ID,
    session_id: sessionId,
    input: { text, message_type: 'text' },
    context,
  });

  app.locals = { chat };
};

// -- Extra/Old Content --

 //const message = Promise.promisify(conversationV1.message, { context: conversationV1 }); //OLD VERSION, Promisify no longer needed.

 //Testing new message API system 
 /* TEST ONE
 const message = assistantV2.message({assistant_id: process.env.WATSON_ASSISTANT_ID, session_id: sessionId,  input: {
    'message_type': 'text',
    'text': 'Hello'
    }
});
*/

  /* TEST TWO
  const message = assistantV2.message(
    {
      input: { text: "Hello" },
      assistant_id: process.env.WATSON_ASSISTANT_ID,
      session_id: Storage.sessionId,
    },
    function(err, response) {
      if (err) {
        console.error(err);
      } else {
        console.log(JSON.stringify(response, null, 2));
      }
    }
  );
  */

  //Pull information from storage
  //const storage = req.sessionStore;
  //const sessionId = storage.get(req.sessionId);
