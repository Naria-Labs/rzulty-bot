const { Client, ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');




module.exports = {
	data: new SlashCommandBuilder()
		.setName('startgame')
		.setDescription('Starts the game')
		.addIntegerOption(option =>
			option.setName('number')
				.setDescription('Set the board')
				.setMinValue(1)
				.setMaxValue(8)),


	async execute(interaction) {

		const board = interaction.options.getInteger('number');
		const Board = Array.from({ length: board }, () => Array(board).fill('<:space:1315336436987203716>'));
		const cordx = Math.floor(Math.random() * board);
		const cordy = Math.floor(Math.random() * board);
		Board[cordx][cordy] = '<a:ASGawrA:755990103473651803>';
		const left = new ButtonBuilder()
			.setCustomId('left')
			.setStyle(ButtonStyle.Primary)
			.setEmoji('⬅')
			.setDisabled(false);
		const up = new ButtonBuilder()
			.setCustomId('up')
			.setStyle(ButtonStyle.Primary)
			.setEmoji('⬆')
			.setDisabled(false);
		const down = new ButtonBuilder()
			.setCustomId('down')
			.setStyle(ButtonStyle.Primary)
			.setEmoji('⬇️')
			.setDisabled(false);
		const right = new ButtonBuilder()
			.setCustomId('right')
			.setStyle(ButtonStyle.Primary)
			.setEmoji('➡️')
			.setDisabled(false);


        const row = new ActionRowBuilder()
            .addComponents(left, up, down, right);

        const BoardToString = Board.map(row => row.join('')).join('\n');

		if (interaction.ActionRowBuilder === 'left' && cordy - 1 >= 0) {
			Board[cordx][cordy] = '<:space:1315336436987203716>';
			Board[cordx][cordy - 1] = '<a:ASGawrA:755990103473651803>';
			interaction.editReply({
				BoardToString = Board.map(row => row.join('')).join('\n');
            });
		} else {
            interaction.ActionRowBuilder.setDisabled(true);
		}
		if (interaction.ActionRowBuilder === 'up' && cordx - 1 >= 0 ) {
            Board[cordx][cordy] = '<:space:1315336436987203716>';
			Board[cordx - 1][cordy] = '<a:ASGawrA:755990103473651803>';
			interaction.editReply({
				BoardToString = Board.map(row => row.join('')).join('\n');
			});
		} else {
			interaction.ActionRowBuilder.setDisabled(true);
		}
		if (interaction.ActionRowBuilder === 'down' && cordx + 1 <= cordx) {
            Board[cordx][cordy] = '<:space:1315336436987203716>';
			Board[cordx + 1][cordy] = '<a:ASGawrA:755990103473651803>';
			interaction.editReply({
				BoardToString = Board.map(row => row.join('')).join('\n');
			});
		} else {
			interaction.ActionRowBuilder.setDisabled(true);
		}
		if (interaction.ActionRowBuilder === 'right' && cordy + 1 <= cordy) {
            Board[cordx][cordy] = '<:space:1315336436987203716>';
			Board[cordx][cordy + 1] = '<a:ASGawrA:755990103473651803>';
			interaction.editReply({
				BoardToString = Board.map(row => row.join('')).join('\n');
			});
		} else {
			interaction.ActionRowBuilder.setDisabled(true);
		}



		await interaction.reply({
			content: BoardToString,
            components: [row],
		});

	},
};