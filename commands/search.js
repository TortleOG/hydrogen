exports.run = async (client, msg, [term]) => {
  let Youtube = require("youtube-node");
  let yt = new Youtube();

  yt.setKey(client.config.youtubeAPIKey);

  yt.search(term, 5, (err, res) => {
    if (err) {
      return console.error(err);
    }
    let send = [];
    let baseURL = "https://www.youtube.com/watch?v=";
    send.push("```md");
    send.push("🎵 Search Results 🎵\n=====================\n");
    res.items.forEach((i) => {
      send.push(`Video Title: ${i.snippet.title}`);
      send.push(`Video URL = ${baseURL}${i.id.videoId}\n`);
    });
    send.push("```");
    return msg.channel.send(send.join("\n"));
  });
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: ["p"], 
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  requiredModules: ["youtube-node"],
  cooldown: 5
};

exports.help = {
  name: "search",
  description: "Searches Youtube for your term.",
  usage: "<term:str>",
  usageDelim: "",
  extendedHelp: "",
};