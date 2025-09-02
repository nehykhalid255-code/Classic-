```js
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, delay } = require('@adiwajshing/baileys');
const pino = require('pino');

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info');
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    printQRInTerminal: true,
    auth: state,
    logger: pino({ level: 'silent' }),
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;
    if(connection === 'close') {
      if(lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut) {startBot();
      } else {
        console.log('Logged out. Please delete auth_info folder and scan QR again.');
      }
    } else if(connection === 'open') {
      console.log('Connected successfully!');
    }
  });

  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if(type !== 'notify') return;
    const msg = messages[0];
    if(!msg.message || msg.key.fromMe) return;

    const sender = msg.key.remoteJid;
    const messageText = msg.message.conversation || msg.message.extendedTextMessage?.text;

    if(!messageText) return;

    if(messageText.toLowerCase() === 'ping') {
      await sock.sendMessage(sender, { text: 'Pong!' });
    } else {
      await sock.sendMessage(sender, { text: `You said: ${messageText}` });
    }
  });
}

startBot();
```

---

3. *.gitignore*  
Ignore the auth folder to protect your credentials.

```
auth_info
node_modules
```
