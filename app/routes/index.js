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

  // need to change payload of chat to correctly access message values etc.
  const payload = await chat(message.Content, chatContext, sessionId);

  const { text } = payload.output.generic[0];

  const storage = req.sessionStore;
  // storage.set(req.user, context); // save session ID here
  storage.set(req.user, payload.context); // Saves the context to storage
  storage.set(req.user, sessionId); // Saves the session ID to storage

  const response = reply.text(message.ToUserName, message.FromUserName, text);
  res.set('Content-Type', 'text/xml');
  res.send(response);
});

module.exports = router;
