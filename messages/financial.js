const { createEmbed } = require('../utilities.js');
module.exports = async (client, financialChannel) => {
	try {
		const financial_message = [
			{ name: 'Joining our Patreon', value: 'Patreon is the most direct way to support DogeCash. You can contribute with as much as $1/mo and cancel anytime.\n\n Additionally, you\'ll get a fancy **Discord & Telegram rank**, as well as **priority support** and access to all DogeCash updates. \n\n[**Join now!**](http://patreon.dogec.io/)\n', inline: false },
			{ name: 'Sharing and using our referral links', value: 'You can use any of our referral links to support DogeCash development:\n[Stakecube](https://stakecube.dogec.io/)\n[Stex](https://stex.dogec.io/)\n[Flits](https://flits.dogec.io/)', inline: false },
			{ name: 'Volunteering!', value: 'As a community-driven project, there’s a lot of good to do and we could use your help. Ask!\n', inline: false },
		];

		const financialMessage = createEmbed('HOW TO SUPPORT DOGECASH?', financial_message, 'We\'ll be posting a report from all the referral links every month, plus the global financial status of DogeCash.');

		financialChannel.send(financialMessage);
	}
	catch (e) {
		console.log(e);
	}
};