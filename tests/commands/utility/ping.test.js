const { SlashCommandBuilder } = require('discord.js');
const ping = require('utility/ping.js');

const mockInteraction = {
	reply: jest.fn(),
}

test('Respond', () => {
	ping.execute(mockInteraction);

	let calls = mockInteraction.reply.mock.calls;

	expect(calls.length).toBe(1);
	expect(calls[0].length).toBe(1);
	expect(calls[0][0]).toBe('Pong!');
})