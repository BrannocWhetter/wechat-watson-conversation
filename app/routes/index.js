'use strict';

// ADDED FOR TEST
const AssistantV2 = require('ibm-watson/assistant/v2');

const Router = require('express-async-router').AsyncRouter;
const { reply } = require('node-weixin-message');

const router = Router();

// GET /
// Verify server avaliablility
router.get('/', (req, res) => {
  const { echostr } = req.query;
  res.send(echostr);
});

// POST /
// Handler all incoming message from wechat
router.post('/', async (req, res) => {
  const { message, chatContext } = req;
  const { chat } = req.app.locals;

  // TODO GOES HERE

  const service = new AssistantV2({
    iam_apikey: process.env.WATSON_API_KEY, version: '2019-02-28', url: 'https://gateway-syd.watsonplatform.net/assistant/api',
  });

  // eslint-disable-next-line no-shadow
  const { session_id: sessionId } = await service.createSession({ assistant_id: process.env.WATSON_ASSISTANT_ID });

  console.log(sessionId);

  // console.log('SessionID from Index.js: %d', sessionIdObj);

  const { output: { text }, context } = await chat(message.Content, chatContext, sessionId);

  const storage = req.sessionStore;
  // storage.set(req.user, context); // save session ID here
  storage.set(req.user, context); // Saves the context to storage
  storage.set(req.user, sessionId); // Saves the session ID to storage

  const response = reply.text(message.ToUserName, message.FromUserName, text[0]);
  res.set('Content-Type', 'text/xml');
  res.send(response);

  // Export sessionId variable to access in conversation.js
  exports.sessionId = sessionId;
});

module.exports = router;

/*

  // TODO
  // 1. try to retrieve `session_id` for the incoming user
  // 2.1. If DNE, use the code below to create a new session, then persist with session storage
  // 2.2. If exist, retrieve the session_id
  // 3. Use the `chat` method to send text to watson assistant
  // check what exactly the `createSession` return, since we just need to sessionId, not the entire respond body.
  // const session = await constservice.createSession({
  //   assistant_id: process.env.WATSON_ASSISTANT_ID
  // });

*/

