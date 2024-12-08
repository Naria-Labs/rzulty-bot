const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mmessage')
		.setDescription('Make your message more fun or cringe')
		.addStringOption(option =>
			option.setName('emote')
				.setDescription('text to emotes')),


	async execute(interaction) {
		const emote = interaction.options.getString('emote');
		const str = emote.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
		const str1 = str.replace(/[^a-zA-Z0-9\s]/g, "").toLowerCase();
		const text = str1.split('');
		for (let i = 0; i < text.length; i++) {
			if ( text[i] == '.' || text[i] == ',') {
				text.splice(i, 1);
				i--;
			}
		}
        const textArray = str1.split('').map(char => {
            switch (char) {
                case ' ':
                    return ':space:';
                case '1':
                    return ':one:';
                case '2':
                    return ':two:';
                case '3':
                    return ':three:';
                case '4':
                    return ':four:';
                case '5':
                    return ':five:';
                case '6':
                    return ':six:';
                case '7':
                    return ':seven:';
                case '8':
                    return ':eight:';
                case '9':
                    return ':nine:';
                case '0':
                    return ':zero:';
                default:
                    return `:regional_indicator_${char}:`;
            }
        });

		const arrayString = textArray.join('');
		await interaction.reply(`${arrayString}`);
	},
};