const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const { AttachmentBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rimage') //everything with small letter
		.setDescription('Responds with a random image'),

	async execute(interaction) {
		const image = `https://pic.re/image?random=${Date.now()}`; //in Typescript it was needed to be `` instead of ''

		const Embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Random Image')
			.setImage(image)
			.setTimestamp()
			.setFooter({ text: 'Powered by/pic.re || sfw'});

		await interaction.reply({ embeds: [Embed]});
	},
};