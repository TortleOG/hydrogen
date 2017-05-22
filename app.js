const Komada = require("komada");
const settings = require("./settings.json");
const client = new Komada.Client(settings);

client.queue = {};

client.login(settings.botToken);