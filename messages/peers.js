const { createEmbed } = require('../utilities.js');
const axios = require('axios');

module.exports = async (client, channel) => {
	try {
		const peers = (await axios.get('http://api.dogecash.org/api/v1/network/peers'))['data']['result'];
		let textpeers = '';

		for (const peer of peers) {
			textpeers = textpeers +
                `addnode=${peer}\n`;
		}

		const peersEmbed = [
			// eslint-disable-next-line quotes
			{ name: 'Add these lines to your dogecash.conf file:', value: "```" + textpeers + "```", inline: false },
		];

		const peerMessage = createEmbed('FILTERED AND REAL-TIME NON-FORKING PEERS!', peersEmbed, 'DOGEC • The Doge is Now the Master(node)');

		channel.send(peerMessage);
	}
	catch (e) {
		console.log(e);
	}
};