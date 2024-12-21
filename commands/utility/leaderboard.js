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
        //takes the directory of the files and reads them
        //where filename is id of the user
        //inside the file is the score of the user
        const files = fs.readdirSync(scoreFile);
        //creates an array of objects
        const scores = [];
        //for each file in the directory
        for (const file of files) {
            //reads the file
            const data = fs.readFileSync(`${scoreFile}/${file}`);
            //parses the data
            const scoreData = JSON.parse(data);
            //pushes the data to the array
            scores.push({ id: file, score: scoreData.score });
        }
        //sorts the scores
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