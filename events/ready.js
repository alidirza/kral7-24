const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

module.exports = client => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Aktif, Komutlar yüklendi!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: ${client.user.username} ismi ile giriş yapıldı!`);
  client.user.setStatus("online");
   var oyun = [
        "💪 7/24 Aktif!",  
        "💡 kral+davet | Botumuzu ekleyin",
        "👨"+ client.users.size +" Kullanıcı!",
        "🌍"+client.guilds.size+" Sunucuda Hizmet!",
        "kral+yardım 🔥 + kral+davet 🔥 + kral+otorol"
    ];

    setInterval(function() {

        var random = Math.floor(Math.random()*(oyun.length-0+1)+0);

        client.user.setGame(oyun[random], "https://www.twitch.tv/gamer_ailesi");
        }, 2 * 2500);
}
