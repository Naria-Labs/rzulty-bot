const { SlashCommandBuilder } = require('discord.js');

const fs = require('node:fs');
const path = require('node:path');

const commands = [];
const foldersPath = path.join(process.cwd(), 'commands');
const commandFolders = fs.readdirSync(foldersPath);

let commandModules = [];

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		commandModules.push([file, command]);
	}
}

test.each(commandModules)(
	'Valid command definition: %s',
	(_, commandModule) => {
		expect(commandModule.data).toBeDefined();
		expect(commandModule.data).toBeInstanceOf(SlashCommandBuilder);
		expect(commandModule.execute).toBeDefined();
		expect(commandModule.execute).toBeInstanceOf(Function);
	}
);