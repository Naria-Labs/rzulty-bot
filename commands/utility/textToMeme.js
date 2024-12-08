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
			if (text[i] === ' ' || ',' || '.') {
				text[i] = '';}
        }
		for (let i = 0; i < text.length; i++) {
			text[i] = `:regional_indicator_${text[i]}:`;
		}
		let arrayString = text.join('');
		await interaction.reply(`${arrayString}`);
	},
};