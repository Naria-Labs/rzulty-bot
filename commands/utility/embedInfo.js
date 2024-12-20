const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('embed')
		.setDescription('See someone or yourself in embed')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('set a user that you wanna embed')),

	async execute(interaction) {
		const author = interaction.member;
		const userMentioned = interaction.options.getMember('user');
		const userID = interaction.member.id;
		const userMentionedMember = interaction.option.getUsers('user');
		const userCreated = userMentioned.createdAt;
		const userTag = userMentionedMember.tag;
		const userHuman = userMentionedMember.bot;
		const userAccentCol = userMentionedMember.hexAccentColor;
		const accentCol = userMentionedMember.accentColor;
		const col = userMentionedMember.displayColor;
		const thumbnail = userMentioned.displayAvatarURL();
		//const userBanner = userMentioned.bannerURL({ dynamic: true});
		const smth = "'"

		const avatarEmbed = new EmbedBuilder()
			.setColor(0x003253) //f you discord
			.setTitle('User profile')
			.setThumbnail(`${thumbnail}`)
			.setDescription(`User ${userMentioned} profile with other infromation about it`)
			.addFields(
				{ name: 'Name', value: `<@${userMentioned}>`, inline: true},
				{ name: 'Account created', value: `${userCreated}`, inline: true},
				{ name: 'Tag', value: `${userTag}`, inline: true},
				{ name: 'Bot or not', value: `${userHuman}` },
				{ name: 'Hex of the color that user uses', value: `${userAccentCol}`, inline: true},
				{ name: 'Accent color', value: `${accentCol}`, inline: true},
			)
			//.setImage(`${userBanner}`)
			.setTimestamp()
			.setFooter({ text:`That${smth}s all folks!`, iconURL: 'https://i.ytimg.com/vi/AYZz_qYw_j4/maxresdefault.jpg'});

		await interaction.reply({ embeds: [avatarEmbed]});
	},
};