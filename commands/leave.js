exports.run = async (client, msg) => {
  const voiceChannel = msg.member.voiceChannel;
  if (!voiceChannel || voiceChannel.type !== "voice") return msg.channel.send(`:x: ${msg.author} | I could't leave your channel. Please connect to the voice channel first.`);
  voiceChannel.leave();
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
  name: "leave",
  description: "Leaves the channel you are currently in.",
  usage: "",
  usageDelim: "",
  extendedHelp: "",
};