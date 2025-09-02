js
module.exports = {
  name: 'menu',
  run: async (sock, msg) => {
    await sock.sendMessage(msg.key.remoteJid, {
      text: '🤖 *Classic Nehy Bot Menu*\n\n📌 .menu\n📌 .ping\n📌 .help'
    });
  },
};
