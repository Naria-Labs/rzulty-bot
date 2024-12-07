const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const { AttachmentBuilder } = require('discord.js');
const { InteractionContextType } = require('discord.js');
const { PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rimage') //everything with small letter
		.setDescription('Responds with a random image')
		.addStringOption(option =>
			option.setName('tags')
                .setDescription('Search of the tags that are in the image generator (all are sfw)')
				.setRequired(true)
				.addChoices(
					{ name: 'waifu', value: 'waifu' },
					{ name: 'neko', value: 'neko' },
					{ name: 'dance', value: 'dance' },
					{ name: 'wink', value: 'wink' },
				)),
	




	async execute(interaction) {

		const tags = interaction.options.getString('tags');
		const image1 = `https://api.waifu.pics/sfw/${tags}`;
		const parseData = await fetch(image1);
		const image = parseData.url

		const Embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Random Image')
			.setImage(image)
			.setTimestamp()
			.setFooter({ text: `Powered api.waifu.pics || ${tags}`});

		await interaction.reply({ embeds: [Embed]});
	},
};