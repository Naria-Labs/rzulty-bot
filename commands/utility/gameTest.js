const { Client, ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('startgame')
        .setDescription('Starts the game')
        .addIntegerOption(option =>
            option.setName('number')
                .setDescription('Set the board')
                .setMinValue(1)
                .setMaxValue(8)
        ),

    async execute(interaction) {
        const boardSize = interaction.options.getInteger('number');
        let Board = Array.from({ length: boardSize }, () => Array(boardSize).fill('<:space:1315336436987203716>'));

        let playerX = Math.floor(Math.random() * boardSize);
        let playerY = Math.floor(Math.random() * boardSize);
        Board[playerX][playerY] = '<a:ASGawrA:755990103473651803>';

        const getBoardString = () => Board.map(row => row.join('')).join('\n');

        const left = new ButtonBuilder()
            .setCustomId('left')
            .setStyle(ButtonStyle.Primary)
            .setEmoji('⬅');

        const up = new ButtonBuilder()
            .setCustomId('up')
            .setStyle(ButtonStyle.Primary)
            .setEmoji('⬆');

        const down = new ButtonBuilder()
            .setCustomId('down')
            .setStyle(ButtonStyle.Primary)
            .setEmoji('⬇️');

        const right = new ButtonBuilder()
            .setCustomId('right')
            .setStyle(ButtonStyle.Primary)
            .setEmoji('➡️');

        const row = new ActionRowBuilder()
            .addComponents(left, up, down, right);

        await interaction.reply({
            content: getBoardString(),
            components: [row],
        });

        const collector = interaction.channel.createMessageComponentCollector({ time: 60000 });

        collector.on('collect', async buttonInteraction => {
            if (buttonInteraction.user.id !== interaction.user.id) {
                return buttonInteraction.reply({ content: 'This game is not for you!', ephemeral: true });
            }

            Board[playerX][playerY] = '<:space:1315336436987203716>';

            switch (buttonInteraction.customId) {
                case 'left':
                    if (playerY > 0) playerY--;
                    break;
                case 'up':
                    if (playerX > 0) playerX--;
                    break;
                case 'down':
                    if (playerX < boardSize - 1) playerX++;
                    break;
                case 'right':
                    if (playerY < boardSize - 1) playerY++;
                    break;
                default:
                    break;
            }

            Board[playerX][playerY] = '<a:ASGawrA:755990103473651803>'; 

            await buttonInteraction.update({
                content: getBoardString(),
                components: [row],
            });
        });

        collector.on('end', () => {
            left.setDisabled(true);
            up.setDisabled(true);
            down.setDisabled(true);
            right.setDisabled(true);

            interaction.editReply({
                content: 'Game over!',
                components: [row],
            });
        });
    },
};
