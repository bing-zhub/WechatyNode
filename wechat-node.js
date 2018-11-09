const { Wechaty } = require('wechaty')

module.exports = function(RED) {
  function Wechat(config) {
    var node = this;
    RED.nodes.createNode(node, config);
    var currentUser = null

    function onScan (qrcode, status) {
      require('qrcode-terminal').generate(qrcode, { small: true })  // show qrcode on console
      const qrcodeImageUrl = [
        'https://api.qrserver.com/v1/create-qr-code/?data=',
        encodeURIComponent(qrcode),
      ].join('')
    
      console.log(qrcodeImageUrl)
    }
    
    function onLogin (user) {
      currentUser = user;
    }
    
    function onLogout(user) {
      console.log(`${user} logout`)
    }
    
    async function onMessage (msg) {
      sender = msg.from();
      if(sender.id === currentUser.id){
        var retMsg = {
          payload:{
            sender: {
              id: sender.id,
              friend: sender.payload.friend,
              alias: sender.payload.alias,
              gender: sender.payload.gender===1?"男":"女",
              province: sender.payload.province,
              city: sender.payload.city,
              signature: sender.payload.signature,
            },
            msg: msg.text()
          }
        }
        node.send(retMsg)
      }
    }
    
    const bot = new Wechaty()
    
    bot.on('scan', onScan)
    bot.on('login', onLogin)
    bot.on('logout', onLogout)
    bot.on('message', onMessage)
    
    bot.start()
    .then(() => console.log('Starter Bot Started.'))
    .catch(e => console.error(e))
    
  }
  RED.nodes.registerType("wechat",Wechat);
}