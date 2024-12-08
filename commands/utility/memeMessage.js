const { SlashCommandBuilder } = require('discord.js');

const emote = interaction.options.getString();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('memeMessage')
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
		.setName('memeMessageRandom')
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