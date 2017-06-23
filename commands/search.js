exports.run = async (client, msg, [term]) => {
  let Youtube = require("youtube-node");
  let yt = new Youtube();

  yt.setKey(client.config.youtubeAPIKey);

  yt.search(term, 5, (err, res) => {
    if (err) return console.error(err);
    let send = [];
    send.push("```md");
    send.push("🎵 Search Results 🎵\n=====================\n");
    res.items.forEach((i) => {
      if (i.id.kind === "youtube#channel") {
        send.push(`Channel Name: ${i.snippet.channelTitle}`);
        return send.push(`Channel URL: https://www.youtube.com/user/${i.snippet.channelTitle}\n`);
      }
      else if (i.id.kind === "youtube#playlist") {
        send.push(`Playlist Name: ${i.snippet.title}`);
        return send.push(`Playlist Author: ${i.snippet.channelTitle}\n`);
      }
      send.push(`Video Title: ${i.snippet.title}`);
      return send.push(`Video URL: https://www.youtube.com/watch?v=${i.id.videoId}\n`);
    });
    send.push("```");
    return msg.channel.send(send.join("\n"));
  });
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: ["s"], 
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