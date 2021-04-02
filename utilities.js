const { MessageEmbed } = require('discord.js');
module.exports = {
	async clearChats(channel) {
		const fetched = await channel.messages.fetch({ limit: 8 });
		channel.bulkDelete(fetched);
		console.log('Messages deleted');
	},
	updateMembers(guild, channelID) {
		const channel = guild.channels.cache.get(channelID);
		channel.setName(`Doges: ${guild.memberCount.toLocaleString()}`);
	},
	createEmbed(title, fields, footer, image = '') {
		return new MessageEmbed()
			.setColor([193, 151, 79])
			.setAuthor(title, 'https://i.imgur.com/vz65ryG.gif')
			.addFields(fields)
			.setImage(image)
			.setFooter(footer);
	},
};