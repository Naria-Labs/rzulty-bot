const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leaderboard')
		.setDescription('Leaderboard of the top 5 players'),


	async execute(interaction) {
		//take all of the players and their scores
		//create an embed with the top 5 players and their scores
		//send the embed to the channel where the command was used

		const fs = require('fs'); 
		const scoreFile = './scores';
		//takes the file name minus .json and the score and adds it to the array
		const scores = fs.readdirSync(scoreFile).map(file => {
			const score = require(`./scores/${file}`);
			return {
				name: file.replace('.json', ''),
				score: score
			};
		});
		//sorts all of the scores from highest to lowest with the name ID
		const sortedScores = scores.sort((a, b) => b.score - a.score);

		//creates the embed
        const leaderboardEmbed = new EmbedBuilder()
            .setColor(0x003253)
            .setTitle('Leaderboard')
            .setDescription('Top 5 players')
            .addFields(
                { name: '1st', value: `${sortedScores[0].name} - ${sortedScores[0].score}` },
                { name: '2nd', value: `${sortedScores[1].name} - ${sortedScores[1].score}` },
                { name: '3rd', value: `${sortedScores[2].name} - ${sortedScores[2].score}` },
                { name: '4th', value: `${sortedScores[3].name} - ${sortedScores[3].score}` },
                { name: '5th', value: `${sortedScores[4].name} - ${sortedScores[4].score}` }
            );




        await interaction.reply({ embeds: [leaderboardEmbed] });
	},
};