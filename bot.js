const Discord = require('discord.js')
const fs = require('node:fs')
const path = require('node:path')
const { Client, Collection,EmbedBuilder , Events, GatewayIntentBits, ActionRowBuilder,ModalBuilder, TextInputBuilder, TextInputStyle} = require('discord.js');
require('dotenv').config()


const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,] });
client.commands = new Discord.Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

client.once('ready', () => {
    console.log('Bot is online');
});
client.login(token)