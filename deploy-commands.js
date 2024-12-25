// basic code using a lot from https://discordjs.guide
// bery basic much code

const { REST, Routes } = require('discord.js');
require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
const modulesPath = path.join(__dirname, 'modules');
const moduleFolders = fs.readdirSync(modulesPath);

for (const folder of moduleFolders) {
	const modulePath = path.join(modulesPath, folder, 'module.js');
	const importedModule = require(modulePath);
	if ('commands' in importedModule)
	{
		for (const command of importedModule.commands)
		{
			if ('data' in command && 'execute' in command) {
				commands.push(command.data.toJSON());
			} else {
				console.log(`[WARNING] A command from module ${folder} is missing a required "data" or "execute" property.`);
			}
		}
	}
}

const rest = new REST().setToken(process.env.DISCORD_TOKEN);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
			Routes.applicationCommands(process.env.CLIENT_ID),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();
