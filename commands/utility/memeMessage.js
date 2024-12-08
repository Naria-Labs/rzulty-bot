const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mmessage')
		.setDescription('Make your message more fun or cringe')
		.addStringOption(option =>
			option.setName('emote')
				.setDescription('text to emotes')),


	async execute(interaction) {
		const emote = interaction.options.getString('emote');
		const str = emote.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
		const text = str.split('');
		for (let i = 0; i < text.length; i++) {
			text[i] = text[i].toLowerCase();
			if (text[i] === ' ' || ',' || '.')
				i++;
        }
		for (let i = 0; i < text.length; i++) {
            text[i] = `:${text[i]}:`;
		}
		let arrayString = text.join('');
		await interaction.reply(`${arrayString}`);
	},
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mgenrandom')
		.setDescription('Make your message more fun or cringe')
		.addStringOption(option =>
			option.setName('randomemote')
				.setDescription('random emote')),


	async execute(interaction) {
		const emote = interaction.options.getString('randomemote');
		const meme = ["🔥🔥🔥💯💯💯🗣️🗣️🗣️", "💀💀💀", "🔥🔥🔥", "🗣️🗣️🗣️🔥🔥🔥🔥🔥🔥", "🙏🙏😭😭", "💯💯💯", "☝️", "🙏🙏🗣🗣🗣🔊🔊🔊🔊🔊"];
		const number = meme.length;
		const random = Math.floor(Math.random() * meme.length);

		await interaction.reply(`${emote} ${meme[random]}`);
	},
};