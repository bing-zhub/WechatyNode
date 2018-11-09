const { Wechaty } = require('wechaty')

const bot = new Wechaty()
bot.on('scan',    (qrcode, status) => console.log(['https://api.qrserver.com/v1/create-qr-code/?data=',encodeURIComponent(qrcode),'&size=220x220&margin=20',].join('')))
bot.on('login',   user => console.log(`User ${user} logined`))
bot.on('message', message => console.log(`Message: ${message}`))
bot.start()


// module.exports = function(RED) {
//   function Wechat(config) {
    
//   }
//   RED.nodes.registerType("微信",Wechat);
// }