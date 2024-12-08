const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mememessage')
		.setDescription('Make your message more fun or cringe')
		.addStringOption(option =>
			option.setName('emote')
				.setDescription('text to emotes')),


	async execute(interaction) {
        
		await interaction.reply('Pong!');
	},
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mememessagerandom')
		.setDescription('Make your message more fun or cringe')
		.addStringOption(option =>
			option.setName('randomEmote')
				.setDescription('random emote')),


	async execute(interaction) {
		const emote = interaction.options.getString('randomEmote');
		const meme = ["🔥🔥🔥💯💯💯🗣️🗣️🗣️", "💀💀💀", "🔥🔥🔥", "🗣️🗣️🗣️🔥🔥🔥🔥🔥🔥", "🙏🙏😭😭", "💯💯💯", "☝️", "🙏🙏🗣🗣🗣🔊🔊🔊🔊🔊"];
		const number = meme.length;
		const random = Math.floor(Math.random() * length);

		await interaction.reply(`${emote} ${meme[random]}`);
	},
};