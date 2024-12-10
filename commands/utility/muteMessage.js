const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('servermute')
		.setDescription('Server mute for set ammount of time')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('Find a user that you wanna mute')
				.setRequired(true)
				)
        .addIntegerOption(option1 =>
			option1.setName('time')
                .setDescription('Time in minutes')
				.setRequired(true)
				),

	async execute(interaction) {
		const userMentioned = interaction.options.getMember('user');
		const unixTime = Math.floor((Date.now() / 1000) + 300);

		if (!userMentioned.voice.channel) {
			return interaction.reply({
				context: `${user} is not in a voice channel`,
				ephemeral: true
			});
		}

		try {
			await userMentioned.voice.setMute(true, 'You said some fucky wacky');
			await interaction.reply(`User ${userMentioned} has been server muted for saying a bad word \n cooldown time <t:${unixTime}:R>`);
		} catch (error) {
			console.error(error);
			await interaction.reply('There was an error trying to server muted the user');
		}
	},
};