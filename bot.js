const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.reply('Aleyküm Selam Knk Hoşgeldin');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'en iyi sunucu') {
    msg.reply('King Army');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'yapıncın kim') {
    msg.reply('Kim olacak ALLAH');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'seni kim yaptı') {
    msg.reply('tabiki @alidirza');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'adamsın') {
    msg.reply(' ADAM :sunglasses: ');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'turp') {
    msg.reply('turbu çok severim :robot:');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'fire in the hole') {
    msg.reply('💣 attı');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'kral+yardım') {
    msg.reply('= Komut Listesi =

[Komut hakkında bilgi için kral+yardım <komut adı>]

kral+ailemiz          :: Botun Hangi Sunucularda Olduğunu Gösterir.
kral+ban              :: İstediğiniz kişiyi banlar.
kral+davet            :: Botun davet linkini gönderir.
kral+emojiyazı        :: Mesajınızı emojiye çevirir.
kral+eval             :: Kod denemek için kullanılır.
kral+istatistik       :: Botun istatistik gösterir.
kral+kayıtol          :: Sunucuya kayıt olursunuz|Üye rolünü alırsın
kral+kick             :: İstediğiniz kişiyi sunucudan atar.
kral+kilit            :: Kanalı istediğiniz kadar süreyle kitler.
kral+kullanıcıbilgim  :: Komutu kullanan kişi hakkında bilgi verir.
kral+load             :: Yeni eklenen komutu yükler.
kral+mute             :: Sureli Susturur.
kral+kapat otoyazı    :: Otorol ile ilgili.
kral+otorolmesajkapat :: Otorol ile ilgili.
kral+otorol-ayarla    :: Sunucuya Girenlere Verilecek Olan Otorolü Ayarlar.
kral+otorolsıfırla    :: Otorol ile ilgili.
kral+ping             :: Botun pingini gösterir.
kral+reboot           :: Botu yeniden başlatır.
kral+rol-ver          :: İstediğiniz kişiyi istediğiniz rolü verir.
kral+sahip            :: Bütün sahip komutlarını verir.
kral+yavaşmod         :: İstediğiniz Kişiye sarılırsınız.
kral+sor              :: Soru sormaya yarar.
kral+stresçarkı       :: Sizin için bir stres çarkı çevirir.
kral+sunucubilgi      :: Sunucu hakkında bilgi verir.
kral+sustur           :: İstediğiniz kişiyi  susturur.
kral+temizle          :: Belirlenen miktar mesajı siler.
kral+top10            :: Botun bulunduğu en iyi ilk 10 sunucu.
kral+unban            :: İstediğiniz kişinin banını kaldırır.
kral+unload           :: İstediğiniz bir komutu devre dışı bırakır.
kral+uyar             :: İstediğiniz kişiyi uyarır.
kral+wasted           :: Etiketlediğin kişinin fotoğrafına wasted çerçevesi koyar.
kral+yardım           :: Tüm komutları gösterir.
kral+yaz              :: İstediğiniz şeyi bota yazdırır.');
  }
});
client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(process.env.BOT_TOKEN);
client.on("guildMemberAdd", async member => {
        let sayac = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
  let otorole =  JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
      let arole = otorole[member.guild.id].sayi
  let giriscikis = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));  
  let embed = new Discord.RichEmbed()
    .setTitle('Otorol Sistemi')
    .setDescription(`:loudspeaker: :inbox_tray:  @${member.user.tag}'a Otorol Verildi `)
.setColor("GREEN")
    .setFooter("Kral", client.user.avatarURL);

  if (!giriscikis[member.guild.id].kanal) {
    return;
  }

  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
    giriscikiskanali.send(`:loudspeaker: :white_check_mark: Hoşgeldin **${member.user.tag}** Rolün Başarıyla Verildi.`);
  } catch (e) { // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e)
  }

});

client.on("guildMemberAdd", async (member) => {
      let autorole =  JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
      let role = autorole[member.guild.id].sayi

      member.addRole(role)

});
