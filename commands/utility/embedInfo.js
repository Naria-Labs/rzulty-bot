const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('embed')
		.setDescription('See someone or yourself in embed')
		.addStringOption(option =>
			option.setName('user')
				.setDescription('set a user that you wanna embed')),

	async execute(interaction) {
		const author = interaction.member;
		const userMentioned = interaction.options.getMember('user');
		const userID = interaction.member.id;
		const userCreated = userMentioned.createdAt;
		const userTag = userMentioned.tag;
		const userHuman = userMentioned.bot;
		const userAccentCol = userMentioned.hexAccentColor;
		const accentColor = userMentioned.accentColor;
		const userBanner = userMentioned.bannerURL({ dynamic: true});
		const smth = "'"

		const avatarEmbed = new MessageEmbed()
			.setColor(`${accentColor}`)
			.setTitle(`User ${userMentioned} profile`)
			.setThumbnail(`${userMentioned.avatarURL({ dynamic: true})}`)
			.setDescription(`User ${userMentioned} profile with other infromation about it`)
			.addFields(
				{ name: 'Name' value: `${userID}`, inline: true}
				{ name: 'Account created' value: `${userCreated}`, inline: true}
				{ name: 'Tag' value: `${userTag}`, inline: true}
				{ name: 'Bot or not' value: `${userHuman}` }
				{ name: 'Hex of the color that user uses' value: `${userAccentCol}`, inline: true}
				{ name: 'Accent color' value: `${accentColor}`, inline: true}
			)
			.setImage(`${userBanner}`)
			.setTimestamp()
			.setFooter({ text:`That${smth}s all folks!`, iconURL: 'https://i.ytimg.com/vi/AYZz_qYw_j4/maxresdefault.jpg'});

		await interaction.author.sent(avatarEmbed);
	},
};