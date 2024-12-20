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
        Board[playerX][playerY] = '<:trolldespair:1314248186352763003>';

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

        const score = new ButtonBuilder()
            .setCustomId('score')
            .setStyle(ButtonStyle.Secondary)
            .setLabel('Score')
            .setDisabled(true);

        const row = new ActionRowBuilder()
            .addComponents(left, up, down, right, score);
        
        await interaction.reply({
            content: getBoardString(),
            components: [row],

        });

        const collector = interaction.channel.createMessageComponentCollector({ time: 60000 });


        collector.on('collect', async buttonInteraction => {


            if (buttonInteraction.user.id !== interaction.user.id) {
                return buttonInteraction.reply({ content: 'This game is not for you!', ephemeral: true });
            }

            //(playerY === 0) ? left.setDisabled(true) : left.setDisabled(false);
           // (playerY === boardSize) ? right.setDisabled(true) : right.setDisabled(false);
           // (playerX === 0) ? up.setDisabled(true) : up.setDisabled(false);
            //(playerX === boardSize) ? down.setDisabled(true) : down.setDisabled(false);

            Board[playerX][playerY] = '<:space:1315336436987203716>';

            
            switch (buttonInteraction.customId) {
                case 'left':
                    (playerY > -1) ? playerY-- && left.setDisabled(false) : left.setDisabled(true);
                    break;
                case 'up':
                    (playerX > -1) ? playerX-- && up.setDisabled(false) : up.setDisabled(true);
                    break;
                case 'down':
                    (playerX < boardSize - 2) ? playerX++ && down.setDisabled(false) : down.setDisabled(true);
                    break;
                case 'right':
                    (playerY < boardSize - 2) ? playerY++ && right.setDisabled(false) : right.setDisabled(true);
                    break;
                default:
                    break;
            }



            Board[playerX][playerY] = '<:trolldespair:1314248186352763003>'; 

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
