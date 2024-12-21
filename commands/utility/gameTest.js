const { Client, ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('startgame')
        .setDescription('Starts the game')
        .addIntegerOption(option =>
            option.setName('number')
                .setDescription('Set the board size')
                .setMinValue(1)
                .setMaxValue(8)
        ),

    async execute(interaction) {
        const boardSize = interaction.options.getInteger('number');
        let Board = Array.from({ length: boardSize }, () => Array(boardSize).fill('<:space:1315336436987203716>'));

        let playerX = Math.floor(Math.random() * boardSize);
        let playerY = Math.floor(Math.random() * boardSize);

        let pointX = Math.floor(Math.random() * boardSize);
        let pointY = Math.floor(Math.random() * boardSize);

        Board[pointX][pointY] = '<:yippee:1314224420566339615>';
        Board[playerX][playerY] = '<:trolldespair:1314248186352763003>';

        let scoreValue = 0;

        const getBoardString = () => Board.map(row => row.join('')).join('\n');
        const updateScoreButton = () => score.setLabel(`Score: ${scoreValue}`);

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

        const score = new ButtonBuilder()
            .setCustomId('score')
            .setStyle(ButtonStyle.Secondary)
            .setLabel('Score: 0')
            .setDisabled(true);

        const time = new ButtonBuilder()
            .setCustomId('time')
            .setStyle(ButtonStyle.Secondary)
            .setLabel('Time: 0')
            .setDisabled(true);

        const row = new ActionRowBuilder()
            .addComponents(left, up, down, right, score);


        const time = new ActionRowBuilder()
            .addComponents(time);
               
        await interaction.reply({
            content: getBoardString(),
            components: [row],
            components: [time],
        });

        const collector = interaction.channel.createMessageComponentCollector({ time: 60000 });

        timeRemaining(60);

        const stopWatch = timeRemaining => {
            stopWatch.setLabel(`Time: ${timeRemaining}`);
            if (timeRemaining === 0) collector.stop();
        }

        setInterval(() => timeRemaining(timeRemaining - 1), 1000);

        const checkPosition = () => {
            if (playerX === pointX && playerY === pointY) {
                pointX = Math.floor(Math.random() * boardSize);
                pointY = Math.floor(Math.random() * boardSize);
                scoreValue++;
            }
        };
        const updateButtons = () => {
            left.setDisabled(playerY === 0);
            up.setDisabled(playerX === 0);
            down.setDisabled(playerX === boardSize - 1);
            right.setDisabled(playerY === boardSize - 1);
        };

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

            
            //scoreValue++; //change it later for a a smth that is not incrementing the score every time you move
            checkPosition();
            updateScoreButton();
            updateButtons();

            Board[playerX][playerY] = '<:trolldespair:1314248186352763003>';
            Board[pointX][pointY] = '<:yippee:1314224420566339615>';

            await buttonInteraction.update({
                content: getBoardString(),
                components: [row],
                components: [time],
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
