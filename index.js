const config = require('./config.json');
const { Client } = require('discord.js');
const client = new Client();
const { updateMembers } = require('./utilities.js');
const statsMessages = require('./messages/stats');
const linksMessages = require('./messages/links');
const faqsMessages = require('./messages/faqs');
const rulesMessages = require('./messages/rules');
const tipsMessages = require('./messages/tips');
const financialMessages = require('./messages/financial');

client.on('ready', async () => {
	console.log('Bot Now connected!');
	console.log('Bot status: ', client.user.presence.status);

	const statsChannel = client.channels.cache.get(config.stats_channel_id);
	const linksChannel = client.channels.cache.get(config.links_channel_id);
	const faqsChannel = client.channels.cache.get(config.faqs_channel_id);
	const rulesChannel = client.channels.cache.get(config.rules_channel_id);
	const tipsChannel = client.channels.cache.get(config.tips_channel_id);
	const financialChannel = client.channels.cache.get(config.financial_status_channel_id);
	const membersChannelID = config.members_channel_id;
	const guild = client.guilds.cache.get(config.server_id);

	// send and keep stats updated
	statsMessages(client, statsChannel);
	// send links
	linksMessages(client, linksChannel);
	// send faqs
	faqsMessages(client, faqsChannel);
	// send rules
	rulesMessages(client, rulesChannel);
	// send tips
	tipsMessages(client, tipsChannel);
	// send financial message
	financialMessages(client, financialChannel);

	// update doges
	client.on('guildMemberAdd', (member) => updateMembers(member.guild, membersChannelID));
	client.on('guildMemberRemove', (member) => updateMembers(member.guild, membersChannelID));
	updateMembers(guild, membersChannelID);
});

const token = config.token;
client.login(token);