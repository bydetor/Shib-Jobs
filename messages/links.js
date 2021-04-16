const { clearChats, createEmbed } = require('../utilities.js');
module.exports = async (client, linksChannel) => {
	try {
		await clearChats(linksChannel);

		const officialLinks = [
			{ name: 'DOGEC Links', value: '[Website](https://dogec.io)\n[Explorer](https://explorer.dogec.io)\n[Wallet](https://github.com/dogecash/dogecash/releases)\n[Android wallet](https://play.google.com/store/apps/details?id=app.flitsnode.flits)\n[iOS wallet](https://apps.apple.com/us/app/flits/id1460563713)\n[Rewards calculator](https://dogecash.org/rewards/)', inline: true },
			{ name: 'Social Media', value: '[Twitter](https://twitter.com/dogecashcoin/)\n[BitcoinTalk](https://bitcointalk.org/index.php?topic=5134905.0)\n[Discord](https://discord.gg/kHNKKYeBVS)\n[Telegram](https://t.me/dogecashcoin)\n[Github](https://github.com/dogecash)\n[Reddit](https://www.reddit.com/r/DogeCash)', inline: true },
			{ name: 'Exchanges', value: '[Stakecube](https://stakecube.net/)\n[Stex](https://www.stex.com/)', inline: true },
		];

		const notOfficialLinks = [
			{ name: 'Statistics & Monitoring', value: '[Coinmarketcap](https://coinmarketcap.com/currencies/dogecash/)\n[Masternodes online](https://masternodes.online/currencies/DOGEC/)\n[Coingecko](https://www.coingecko.com/en/coins/dogecash)\n[Livecoinwatch](https://livecoinwatch.com/price/DogeCash-DOGEC)', inline: true },
			{ name: 'Masternode Hosting', value: '[Flits](http://flitswallet.app/)\n[Stakecube](https://stakecube.net/)\n[PecuniaPlatform](https://pecuniaplatform.io/)\n[Nodehub](https://nodehub.io/)\n[Posmn](https://www.posmn.com/)', inline: true },
			{ name: 'Shared Hosting', value: '[GTM](https://mn.gtmcoin.io/shared-mn)', inline: true },
		];

		const officialLinksMessage = createEmbed('Official Links', officialLinks, 'DOGEC • The Doge is Now the Master(node)');
		const notOfficialLinksMessage = createEmbed('3rd Party Links', notOfficialLinks, 'DOGEC • The Doge is Now the Master(node)');

		linksChannel.send(officialLinksMessage);
		linksChannel.send(notOfficialLinksMessage);
	}
	catch (e) {
		console.log(e);
	}
};