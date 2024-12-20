const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');




module.exports = {
	data: new SlashCommandBuilder()
		.setName('startgame')
		.setDescription('Starts the game')
		.addIntegerOption(option =>
			option.setName('number')
				.setDescription('Set the board')
				.setMinValue(1)
				.setMaxValue(6)),


	async execute(interaction) {

		const board = interaction.options.getInteger('number');
		const Board = Array.from({ lenght: board }, () => Array(cols).fill('<:space:1315336436987203716>'));
		const left = new ButtonBuilder()
			.setCustomId('primary')
			.setLabel('left')
			.setStyle(ButtonStyle.Primary)
			.setEmoji('⬅️');
		const up = new ButtonBuilder()
			.setCustomId('primary')
			.setLabel('up')
			.setStyle(ButtonStyle.Primary)
			.setEmoji('⬆️');
		const down = new ButtonBuilder()
			.setCustomId('primary')
			.setLabel('down')
			.setStyle(ButtonStyle.Primary)
			.setEmoji('⬇️');
		const right = new ButtonBuilder()
			.setCustomId('primary')
			.setLabel('right')
			.setStyle(ButtonStyle.Primary)
			.setEmoji('➡️');
        const row = new ActionRowBuilder()
            .addComponents(left, up, down, right);

        BoardToString = Board.map(row => row.join('')).join('\n');


		await interaction.reply({
			content: [BoardToString],
            components: [row],
		});
	},
};