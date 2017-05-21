exports.run = async (client, msg) => {
  if (client.queue[msg.guild.id] === undefined) return msg.channel.send(`:x: ${msg.author} | There are no currently queued songs. Add some with \`${msg.guild.conf.prefix}add\` first.`);
  let send = [];
  client.queue[msg.guild.id].songs.forEach((song, i) => {
    send.push(`${i+1}. ${song.title} - Requested by ${song.requestor}`);
  });
  msg.channel.send(`__**${msg.guild.name}'s Music Queue:**__ Currently **${send.length}** songs queued ${(send.length > 15 ? "*[Only next 15 shown]*" : "")}\n\`\`\`${send.slice(0,15).join("\n")}\`\`\``);
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: ["p"], 
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  requiredModules: [],
  cooldown: 5
};

exports.help = {
  name: "queue",
  description: "Displays the currently queued songs.",
  usage: "",
  usageDelim: "",
  extendedHelp: "",
};