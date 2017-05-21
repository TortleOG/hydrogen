const Komada = require("komada");
const settings = require("./settings.json");
const client = new Komada(settings);

client.login(settings.botToken);