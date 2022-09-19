const { createEmbed } = require('../utilities.js');
module.exports = async (client, linksChannel) => {
	try {
		const rules = [
			{ name: 'DogeCash Server Rules:', value: '1. Be respectful to each other.\n \n2. Do not spam / FUD.\n \n3. Usage of excessive extreme inappropriate language is prohibited.\n \n4. Do not mention users/roles without proper reason.\n \n5. Do not DM Server Members without their approval.\n \n6. Strictly prohibited posting NSFW content.\n \n7. Any kind of advertising will result in a warning followed by a ban.\n \n8. Post content in the correct channels.\n \n***Any violation of the [Discord Terms of Service](https://discord.com/terms) or [Community Guidelines](https://discord.com/guidelines) will result in immediate banning and possibly be reported to discord.***', inline: false },
		];

		const faqsMessage = createEmbed('PLEASE READ BEFORE GOING ANY FURTHER', rules, 'As of • 02/04/2021', 'https://media.discordapp.net/attachments/942616146086068285/1021354309964808253/image.png');

		linksChannel.send(faqsMessage);
	}
	catch (e) {
		console.log(e);
	}
};