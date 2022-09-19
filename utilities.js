const { MessageEmbed } = require('discord.js');
module.exports = {
	async clearChats(channel) {
		const fetched = await channel.messages.fetch({ limit: 8 });
		channel.bulkDelete(fetched);
		console.log('Messages deleted');
	},
	updateMembers(guild, channelID) {
		const channel = guild.channels.cache.get(channelID);
		channel.setName(`Members: ${guild.memberCount.toLocaleString()}`);
	},
	createEmbed(title, fields, footer, image = '') {
		return new MessageEmbed()
			.setColor([33, 107, 235])
			.setAuthor(title, 'https://media.discordapp.net/attachments/942616146086068285/1021362288902537216/bot-2.png')
			.addFields(fields)
			.setImage(image)
			.setFooter(footer);
	},
};