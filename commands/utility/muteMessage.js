const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('serverdeafen')
		.setDescription('Server mute for set ammount of time'),

	async execute(interaction) {
		const userMentioned = interaction.mentions.members.first();
		await userMentioned.setMute(true, 'You did fucky wacky');
	},
};