const Base = require('./base.js');

var usernames = {};
var numUsers = 0;

module.exports = class extends Base {
  indexAction() {
    return this.display('websocket_index');
  }
  openAction(self) {
    this.broadcast('joined', '加入成功!');
  }
  adduserAction() {
    var username = this.wsData.username;
    usernames[username] = username;
    ++numUsers;
    this.emit('login', {
      numUsers: numUsers
    });
    this.broadcast('userjoin', {
      username: username,
      numUsers: numUsers
    });
  }
  closeAction() {
    var wsData = this.wsData;
    if (wsData.username) {
      delete usernames[wsData.username];
      --numUsers;
      this.broadcast('userleft', {
        username: wsData.username,
        numUsers: numUsers
      });
    }
  }
  chatAction() {
    var wsData = this.wsData;
    this.broadcast('chat', {
      username: wsData.username,
      message: wsData.content
    });
  }
  typingAction() {
    var wsData = this.wsData;
    this.broadcast('typing', {
      username: wsData.username
    });
  }
  stoptypingAction() {
    var wsData = this.wsData;
    this.broadcast('stoptyping', {
      username: wsData.username
    });
  }

  // testAction() {
  //   // console.log('data', this.data);
  //   // console.log('cookie:test', this.cookie('think_locale'))
  //   this.emit('hello', { name: 'test' });
  // }
  // closeAction() {
  //   // this.ctx.res.statusCode = 200;
  //   this.body = 'test';
  // }
};
