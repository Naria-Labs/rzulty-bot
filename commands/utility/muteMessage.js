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

	async execute(interaction) {
		const userMentioned = interaction.options.getMember('user');
		if (!userMentioned) {
			return interaction.reply('User not found');
		}
		if (!userMentioned.voice.channel) {
            return interaction.reply('User is not in a voice channel');
		}


		await userMentioned.voice.setMute(true, 'You said some fucky wacky');
        await interaction.reply(`User ${userMentioned} has been server muted for saying a bad word`);
	},
};