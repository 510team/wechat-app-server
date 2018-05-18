const socketio = require('think-websocket-socket.io');

module.exports = {
  type: 'socket.io',
  'socket.io': {
    handle: socketio,
    messages: {
      open: 'websocket/open',
      close: 'websocket/close',
      chat: 'websocket/chat',
      typing: 'websocket/typing',
      stoptyping: 'websocket/stoptyping',
      adduser: 'websocket/adduser'
    }
  }
};
