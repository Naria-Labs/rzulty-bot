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
                .setDescription('Search of the tags that are in the image generator')
				.setRequired(true)
				.addChoices(
					{ name: 'Public', value: 'public' },
					{ name: 'sfw', value: 'SFW' },
					{ name: 'Functional', value: 'Functional' },
					{ name: 'Source', value: 'Source' },
				)),

	async execute(interaction) {
        const tags = interaction.options.getString('tags');
		const image1 = `https://pic.re/image/${tags}`;
		const image2 = `?random=${Date.now()}`; //in Typescript it was needed to be `` instead of ''
		const image = image1 + image2;

		const Embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Random Image')
			.setImage(image)
			.setTimestamp()
			.setFooter({ text: `Powered by/pic.re || ${tags}`});

		await interaction.reply({ embeds: [Embed]});
	},
};