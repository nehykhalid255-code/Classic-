```js
module.exports = async (sock, jid, ms = 1000) => {
  await sock.sendPresenceUpdate('composing', jid);
  await new Promise(resolve => setTimeout(resolve, ms));
  await sock.sendPresenceUpdate('paused', jid);
};
``
