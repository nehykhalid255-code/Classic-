```js
module.exports = async (sock, jid, ms = 1500) => {
  await sock.sendPresenceUpdate('recording', jid);
  await new Promise(resolve => setTimeout(resolve, ms));
  await sock.sendPresenceUpdate('paused', jid);
};
``
