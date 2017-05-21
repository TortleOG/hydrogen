const Komada = require("komada");
const settings = require("./settings.json");
const client = new Komada(settings);

client.queue = {};

client.login(settings.botToken);