const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const { AttachmentBuilder } = require('discord.js');
const { InteractionContextType } = require('discord.js');
const { PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rimage') //everything with small letter
		.setDescription('Responds with a random waifu image')
		.addSubcommandGroup((group) =>
			group
				.setName('sfw')
				.setDescription('SFW Images')
				.addSubcommand((subcommand) =>
					subcommand
						.setName('tags')
						.setDescription('Search of the tags that are in the image generator')
						.addStringOption(option =>
							option.setName('tags')
								.setDescription('Search of the tags that are in the image generator (all are sfw)')
								.addChoices(
									{ name: 'waifu', value: 'waifu' },
									{ name: 'neko', value: 'neko' },
									{ name: 'dance', value: 'dance' },
									{ name: 'wink', value: 'wink' },
								)
								.setRequired(true)
								
						)

			),
		)
		.addSubcommandGroup((group) =>
			group
				.setName('nsfw')
				.setDescription('NSFW Images')
				.addSubcommand((subcommand) =>
					subcommand
						.setName('tags')
						.setDescription('Search of the tags that are in the image generator')
						.addStringOption(option =>
							option.setName('tags')
								.setDescription('Search of the tags that are in the image generator (all are sfw)')
								.addChoices(
									{ name: 'waifu', value: 'waifu' },
									{ name: 'neko', value: 'neko' },
									{ name: 'trap', value: 'trap' },
									{ name: 'bj', value: 'blowjob' },
								)
								.setRequired(true)
								
						)
			),
		),

	async execute(interaction) {

		const tags = interaction.options.getString('tags');
		const response = await fetch(`https://api.waifu.pics/${horny}/${tags}`);
		const parseData = await response.json();
		const image = parseData.url;

		const Embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Random Image')
			.setImage(image)
			.setTimestamp()
			.setFooter({ text: `Powered api.waifu.pics || ${tags}`});

		await interaction.reply({ embeds: [Embed]});
	},
};