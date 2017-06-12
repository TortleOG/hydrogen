exports.run = (client) => {
  const pkg = require("../package.json");
  const settings = require("../settings.json");
  let date = new Date().toLocaleDateString();
  let time = new Date().toLocaleTimeString();
  let log = async (message) => {
    await client.channels.get("287972594622267393").send(message);
    return client.user.setGame(`${settings.prefix}help | v${pkg.version}`);
  };

  let bootup = [
    "```xl",
    "BOOT TIME STATISTICS",
    `• Booted   : ${date} @ ${time}`,
    `• Users	: ${client.users.size}`,
    `• Servers  : ${client.guilds.size}`,
    `• Channels : ${client.channels.size}`,
    "```"
  ];
  log(bootup);
};