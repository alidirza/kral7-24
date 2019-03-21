const Discord = require('discord.js');


exports.run = function(client, message) {
const embed = new Discord.RichEmbed()
.setColor('RANDOM')
.setTitle('» Komut Grupları')
.setTimestamp()
.addField('» Eğlence Komutları', 'f?eğlence')
.addField('» Moderatör Komutları', 'f?moderatör')
.addField('» Genel Komutlar', 'f?genel')
.addField('» Ekstra Komutlar', 'f?ekstra')
.addField('» Nsfw Komutları', 'f?nsfw')
.setFooter('© 2018 Fredux', client.user.avatarURL)
.setTimestamp()
.setThumbnail(client.user.avatarURL)
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: [], 
  permLevel: 0 
};

exports.help = {
  name: 'yardım',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım'
};
