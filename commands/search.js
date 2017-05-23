exports.run = async (client, msg, [term]) => {
  let Youtube = require("youtube-node");
  let yt = new Youtube();

  yt.setKey(client.config.youtubeAPIKey);

  yt.search(term, 1, (err, res) => {
    if (err) {
      console.error(err);
    }
    else {
      // console.log(JSON.stringify(res, null, 2));
      let send = [];
      let baseURL = "https://www.youtube.com/watch?v=";
      send.push("```md");
      send.push("Search Results\n");
      send.push(`Video Title: ${res.items[0].snippet.title}`);
      send.push(`Video URL = ${baseURL}${res.items[0].id.videoId}`);
      send.push("```");
      return msg.channel.send(send.join("\n"));
    }
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