exports.run = async (client, msg, [url]) => {
  const yt = require("ytdl-core");
  if (!url) return msg.channel.send(`:x: ${msg.author} | You must add a YouTube video url, or id after ${msg.guild.conf.prefix}add.`);
  yt.getInfo(url, (err, info) => {
    if (err) return msg.channel.send(`:x: ${msg.author} | Invalid YouTube Link: ${err}`);
    if (!client.queue.hasOwnProperty(msg.guild.id)) client.queue[msg.guild.id] = {}, client.queue[msg.guild.id].playing = false, client.queue[msg.guild.id].songs = [];
    client.queue[msg.guild.id].songs.push({url: url, title: info.title, requester: msg.author.tag});
    msg.channel.send(`:white_check_mark: Added **${info.title}** to the queue.`);
  });
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: ["p"], 
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  requiredModules: ["ytdl-core"],
  cooldown: 5
};

exports.help = {
  name: "add",
  description: "Adds songs to the queue.",
  usage: "<url:str>",
  usageDelim: "",
  extendedHelp: "",
};