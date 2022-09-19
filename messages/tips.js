const { createEmbed } = require('../utilities.js');
module.exports = async (client, problemsChannel) => {
	try {
		const syncTip = [
			// eslint-disable-next-line quotes
			{ name: 'Follow these steps:', value: `
            **1.** Go inside your DogeCash data folder:
			Windows: \`\`\`%AppData%/dogecashcore\`\`\`
			Mac: \`\`\`~/Library/Application Support/dogecash\`\`\`
			Linux: \`\`\`~/.dogecash/\`\`\`
            **2.** Open your dogecash.conf file and add the lines from this [file](https://www.dropbox.com/s/s0pdil1rehsy4fu/peers.txt) at the end
            **3.** Start your wallet and wait a few minutes.`, inline: false },
		];

		const syncMessage = createEmbed('HAVING PROBLEMS SYNCING YOUR WALLET?', syncTip, 'DOGEC • The Doge is Now the Master(node)');

		const bootstrapTip = [
			// eslint-disable-next-line quotes
			{ name: 'Follow these steps:', value: `
            **1.** Go inside your DogeCash data folder (locations in the previous message)
            **2.** Delete these folders if present:
			\`\`\`blocks, chainstate, spork, zerocoin, database\`\`\`
            **3.** Delete these files: 
			\`\`\`budget.dat, db.log, feeestimates.dat, mncache.dat, mnpayments.dat, peers.dat\`\`\`
            **4.** Download the bootstrap [here](https://www.dropbox.com/s/s4vy92sczk9c10s/blocks_n_chains.tar.gz?dl=1)
            **5.** Extract the data into the DogeCash DATA folder
            **6.** Start your wallet.
            `, inline: false },
		];

		const bootstrapMessage = createEmbed('DO YOU WANT TO INSTANTLY SYNC YOUR WALLET?', bootstrapTip, 'DOGEC • The Doge is Now the Master(node)');

		problemsChannel.send(syncMessage);
		problemsChannel.send(bootstrapMessage);
	}
	catch (e) {
		console.log(e);
	}
};