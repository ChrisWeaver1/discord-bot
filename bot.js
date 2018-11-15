const Discord = require('discord.js');
const config = require('./config');
const router = require('./helpers/router');
const client = new Discord.Client();
const ytdl = require('ytdl-core');

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {

	var message = msg.content.split(' ');
	let prefix = message.shift();

	if (!config.prefixs.includes(prefix)) return;
	
	router(message, msg, client, (response) => {
		if (response.send == 'reply') {
			msg.reply(response.message);
		}
		else if (response.send == 'send') {
			msg.channel.send(response.message);
		}
		else {
			msg.reply(response.message);
		}
	});
});

client.login(config.token);