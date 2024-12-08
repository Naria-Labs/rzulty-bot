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
			if (text[i] == ' ' || text[i] == '.' || text[i] == ',') {
				text.splice(i, 1);
				i--;
			}
		}
		for (let i = 0; i < text.length; i++) {
			if (Math.floor(Math.random() * 2) == '0') {
				text[i] = `:regional_indicator_${text[i]}:`;
			} else text[i] = `:${text[i]}:`;
		}
		let arrayString = text.join('');
		await interaction.reply(`${arrayString}`);
	},
};