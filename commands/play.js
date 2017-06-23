exports.run = async (client, msg) => {
  const yt = require("ytdl-core");
  if (client.queue[msg.guild.id] === undefined) return msg.channel.send(`:x: ${msg.author} | Please add songs to the queue first.`);
  if (!msg.guild.voiceConnection) {
    const voiceChannel = msg.member.voiceChannel;
    if (!voiceChannel || voiceChannel.type !== "voice") return msg.channel.send(`:x: ${msg.author} | I could't join your channel. Please connect to a voice channel first.`);
    voiceChannel.join();
  }
  if (client.queue[msg.guild.id].playing) return msg.channel.send(`:x: ${msg.author} | Already playing.`);

  let dispatcher;
  client.queue[msg.guild.id].playing = true;

  console.log(client.queue);

  const play = async (song) => {
    console.log(song);
    if (song === undefined) {
      await msg.channel.send("**Queue is empty. Leaving channel...**");
      client.queue[msg.guild.id].playing = false;
      msg.member.voiceChannel.leave();
    }
    msg.channel.send(`Playing **${song.title}** as requested by: **${song.requester}**.`);
    dispatcher = msg.guild.voiceConnection.playStream(yt(song.url, {audioonly: true}), {passes: client.config.passes});
    
    // Create collector for playing specfic commands
    let collector = msg.channel.createMessageCollector(m => m);
    collector.on("collect", async (m) => {
      if (m.content.startsWith(msg.guild.conf.prefix + "pause")) {
        await msg.channel.send(":pause_button: Player is paused.");
        return dispatcher.pause();
      }
      else if (m.content.startsWith(msg.guild.conf.prefix + "resume")) {
        await msg.channel.send(":arrow_forward: Player has been resumed.");
        return dispatcher.resume();
      }
      else if (m.content.startsWith(msg.guild.conf.prefix + "skip")) {
        await msg.channel.send(":white_check_mark: | Song skipped.");
        return dispatcher.end();
      }
      else if (m.content.startsWith(msg.guild.conf.prefix + "volume")) {
        let amount = parseInt(m.content.split(" ")[1]);
        if (amount < 0) return msg.channel.send(`:x: ${msg.author} | Volume cannot be negative.`);
        else if (amount > 100) return msg.channel.send(`:x: ${msg.author} | Volume cannot be greater than 100.`);
        if (Math.round(dispatcher.volume*50) <= 0) return msg.channel.send(`**Volume: ${Math.round(dispatcher.volume*50)}%**`);
        dispatcher.setVolume(amount / 50);
      }
      else if (m.content.startsWith(msg.guild.conf.prefix + "time")) {
        msg.channel.send(`**Time: ${Math.floor(dispatcher.time / 60000)}:${Math.floor((dispatcher.time % 60000)/1000) <10 ? '0'+Math.floor((dispatcher.time % 60000)/1000) : Math.floor((dispatcher.time % 60000)/1000)}**`);
      }
    });
    dispatcher.on("end", () => {
      collector.stop();
      setTimeout(() => play(client.queue[msg.guild.id].songs.shift()), 100);
    });
    dispatcher.on("error", async err => {
      await msg.channel.send("Error: " + err);
      collector.stop();
      play(client.queue[msg.guild.id].songs.shift());
    });
  };
  play(client.queue[msg.guild.id].songs.shift());
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
  name: "play",
  description: "Plays the currently queued song.",
  usage: "",
  usageDelim: "",
  extendedHelp: "",
};