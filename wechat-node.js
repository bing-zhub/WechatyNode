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
      
      if(config.loginUserOnly === "true"){
        if(sender.id === currentUser.id)
          node.send(retMsg)
      }else{
        node.send(retMsg)
      }
      
    }
    
    const bot = Wechaty.instance({name: 'node-red-bot'})
    
    bot.on('scan', onScan)
    bot.on('login', onLogin)
    bot.on('logout', onLogout)
    bot.on('message', onMessage)
    
    bot.start()
    .then(() => console.log('Wechat Bot Started.'))
    .catch(e => console.error(e))
    
    node.on("close", function(){
      bot.logout()
    })
  }
  RED.nodes.registerType("wechat",Wechat);
}