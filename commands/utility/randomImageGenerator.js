const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rImage')
		.setDescription('Responds with a random image'),

	async execute(interaction) {
        const image = 'https://placewaifu.com/image/200?random=${Date.now()}'; //in Typescript it was needed to be `` instead of ''

		await interaction.reply(image);
	},
};