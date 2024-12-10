const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('serverdeafen')
		.setDescription('Server mute for set ammount of time')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('Find a user that you wanna mute')
				.setRequired(true)
		),

	execute(interaction) {
		const userMentioned = interaction.options.getUser('user');
		userMentioned.setMute(true, 'You did fucky wacky');
	},
};