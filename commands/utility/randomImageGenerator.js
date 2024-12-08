const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const { AttachmentBuilder } = require('discord.js');
const { InteractionContextType } = require('discord.js');
const { PermissionFlagsBits } = require('discord.js');

const groupDescriptions = {
	'sfw': 'SFW Images',
	'nsfw': 'NSFW Images',
}

const tagsOptionDescriptions = {
	'sfw': 'Search of the tags that are in the image generator (all are SFW)',
	'nsfw': 'Search of the tags that are in the image generator (all are NSFW)',
}

const tagsOptionChoices = {
	'sfw': [
		{ name: 'waifu', value: 'waifu' },
		{ name: 'neko', value: 'neko' },
		{ name: 'dance', value: 'dance' },
		{ name: 'wink', value: 'wink' },
	],
	'nsfw': [
		{ name: 'waifu', value: 'waifu' },
		{ name: 'neko', value: 'neko' },
		{ name: 'trap', value: 'trap' },
		{ name: 'bj', value: 'blowjob' },
	]
}

function makeSubgroup(name) {
return (group) => 
	group
		.setName(name)
		.setDescription(groupDescriptions[name])
		.addSubcommand((subcommand) =>
			subcommand
				.setName('tags')
				.setDescription('Search of the tags that are in the image generator')
				.addStringOption(option =>
					option.setName('tags')
						.setDescription(tagsOptionDescriptions[name])
						.addChoices(tagsOptionChoices[name])
				.setRequired(true)
			)
		)
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rimage') //everything with small letter
		.setDescription('Responds with a random waifu image')
		.addSubcommandGroup(makeSubgroup('nsfw'))
		.addSubcommandGroup(makeSubgroup('sfw')),

	async execute(interaction) {
        const horny = interaction.options.getSubcommandGroup();
		const tags = interaction.options.getString('tags');
		const response = await fetch(`https://api.waifu.pics/${horny}/${tags}`);
		const parseData = await response.json();
		const image = parseData.url;

		const Embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle(`Random Image ${horny}`)
			.setImage(image)
			.setTimestamp()
			.setFooter({ text: `Powered api.waifu.pics || ${tags}`});

		await interaction.reply({ embeds: [Embed]});
	},
};