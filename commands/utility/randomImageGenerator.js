const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const { AttachmentBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rimage') //everything with small letter
		.setDescription('Responds with a random image'),

	async execute(interaction) {
		const image = new AttachmentBuilder(`https://placewaifu.com/image/200?random=${Date.now()}`); //in Typescript it was needed to be `` instead of ''

		const Embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Random Image')
			.setImage(`attachment:https://placewaifu.com/image/200?random=${Date.now()}`)
			.setTimestamp()
			.setFooter({ text: 'Powered by placewaifu.com'});

		await interaction.reply({ embeds: [Embed], files: [image] });
	},
};