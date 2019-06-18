'use strict';

/**
 * To enable message-context middleware, you must
 * enable `express-session` middleware and `wechat-auth`
 * before this middleware.
 * ```js
 * const session = require('express-session');
 * const MemoryStore = require('memorystore')(session);
 *
 * // You can easily swipe the MemoryStore with
 * any other compatible session store
 * app.use(session({
 *     store: new MemoryStore({
 *     checkPeriod: 86400000, // prune expired entries every 24h
 *   }),
 *   resave: false,
 *   aveUninitialized: true,
 *   secret: 'keyboard cat',
 * }));
 * ```
 * @async
 * @see https://cloud.ibm.com/apidocs/assistant-v2?code=node //Brannoc Whetter - Updated Docs to AssistantV2
 * @see https://github.com/expressjs/session#compatible-session-stores
 */
module.exports = async (req, res, next) => {
  const storage = req.sessionStore;
  const getChatContext = () => new Promise((resolve, reject) => {
    storage.get(req.user, (err, session) => {
      if (err) reject(err);
      resolve(session);
    });
  });
  req.chatContext = await getChatContext();

  // console.log("The req.chatContext is: ");
  // console.log(req.chatContext);

  next();
};

// -- TODO --
// Change @see from Conversation to Watson Assistant (just documentation) | COMPLETED
// ADD Modification Comments and Author Attributions
