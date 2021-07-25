const CoinGecko = require('coingecko-api');
const { clearChats, createEmbed } = require('../utilities.js');
const CoinGeckoClient = new CoinGecko();
const axios = require('axios');

module.exports = async (client, statsChannel) => {
	const getStats = async () => {
		const geckoRequest = await CoinGeckoClient.coins.fetch('dogecash');
		const explorer = await axios.get('https://explorer.dogec.io/api/v2');
		const daemon = await axios.get('http://api.dogecash.org/api/v1/network/masternodecount');

		const priceUSD = geckoRequest['data']['market_data']['current_price']['usd'];
		const masternodes = daemon['data']['result']['enabled'];
		const dailyIncomeDOGEC = (4.32 * 1440) / masternodes;
		const dailyIncomeUSD = dailyIncomeDOGEC * priceUSD;
		const yearlyIncomeDOGEC = dailyIncomeDOGEC * 365;
		const rewardFreq = 4.32 / dailyIncomeDOGEC * 24;
		const circulatingSupply = explorer['data']['backend']['moneysupply'];
		const genesis = geckoRequest['data']['genesis_date'];
		const sinceGenesis = ((new Date()) - (new Date(genesis))) / (1000 * 3600 * 24);

		return {
			'price': priceUSD,
			'price_btc': geckoRequest['data']['market_data']['current_price']['btc'],
			'price_eth': geckoRequest['data']['market_data']['current_price']['eth'],
			'change_week': geckoRequest['data']['market_data']['price_change_percentage_7d'],
			'change_month': geckoRequest['data']['market_data']['price_change_percentage_30d'],
			'change_year': geckoRequest['data']['market_data']['price_change_percentage_1y'],
			'market_cap_usd': geckoRequest['data']['market_data']['market_cap']['usd'],
			'market_cap_btc': geckoRequest['data']['market_data']['market_cap']['btc'],
			'volume_usd': geckoRequest['data']['market_data']['total_volume']['usd'],
			'volume_btc': geckoRequest['data']['market_data']['total_volume']['btc'],
			'circulating_supply': circulatingSupply,
			'max_supply': 21000000,
			'masternodes': masternodes,
			'dailyIncomeDOGEC': dailyIncomeDOGEC,
			'dailyIncomeUSD': dailyIncomeUSD,
			'rewardFreq': `${Math.trunc(rewardFreq)}h ${(rewardFreq % 60).toFixed(0)}m`,
			'roi': `${((yearlyIncomeDOGEC / 5000) * 100).toFixed(0)}% / ${((5000 / yearlyIncomeDOGEC) * 365).toFixed(0)} days`,
			'coins_locked': `${(masternodes * 5000).toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} (${((masternodes * 5000 / circulatingSupply) * 100).toFixed(0)}%)`,
			'current_blocks': explorer['data']['backend']['blocks'],
			'genesis': `${sinceGenesis.toFixed(0)} days` };
	};

	const createMessages = async () => {

		const stats = await getStats();

		const price_fields = [{ name: 'Price (USD)', value: `$${stats['price'].toLocaleString()}`, inline: true },
			{ name: 'Price (BTC)', value: `${stats['price_btc'].toLocaleString(undefined, { minimumFractionDigits: 8 })} ฿`, inline: true },
			{ name: 'Price (ETH)', value: `${stats['price_eth'].toLocaleString(undefined, { minimumFractionDigits: 8 })} ETH`, inline: true },
			{ name: 'Change 7d', value: `${stats['change_week'].toLocaleString()}%`, inline: true },
			{ name: 'Change 30d', value: `${stats['change_month'].toLocaleString()}%`, inline: true },
			{ name: 'Change 1y', value: `${stats['change_year'].toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}%`, inline: true },
			{ name: 'Market Cap (USD)', value: `$${(stats['circulating_supply'] * stats['price']).toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`, inline: true },
			{ name: 'Market Cap (BTC)', value: `${(stats['circulating_supply'] * stats['price_btc']).toLocaleString()}฿`, inline: true },
			{ name: 'Circulating Supply', value: `${stats['circulating_supply'].toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} DOGEC`, inline: true },
			{ name: 'Volume 24h (USD)', value: `$${stats['volume_usd'].toLocaleString()}`, inline: true },
			{ name: 'Volume 24h (BTC)', value: `${stats['volume_btc'].toLocaleString()}฿`, inline: true },
			{ name: 'Max Supply', value: '21,000,000 DOGEC', inline: true }];

		const masternodes_fields = [{ name: 'Active masternodes', value: stats['masternodes'].toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: 0 }), inline: true },
			{ name: 'Masternode worth', value: `$${(5000 * stats['price']).toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`, inline: true },
			{ name: 'Masternode Collateral', value: '5,000 DOGEC', inline: true },
			{ name: 'Daily Income', value: `$${stats['dailyIncomeUSD'].toLocaleString()}\n${stats['dailyIncomeDOGEC'].toLocaleString()} DOGEC`, inline: true },
			{ name: 'Monthly Income', value: `$${(stats['dailyIncomeUSD'] * 30).toLocaleString()}\n${(stats['dailyIncomeDOGEC'] * 30).toLocaleString()} DOGEC`, inline: true },
			{ name: 'Yearly Income', value: `$${(stats['dailyIncomeUSD'] * 365).toLocaleString()}\n${(stats['dailyIncomeDOGEC'] * 365).toLocaleString()} DOGEC`, inline: true },
			{ name: 'Reward Frequency', value: `${stats['rewardFreq']}`, inline: true },
			{ name: 'ROI (annual)', value: stats['roi'], inline: true },
			{ name: 'Coins locked', value: stats['coins_locked'], inline: true }];

		const blocks_fields = [{ name: 'Current block', value: stats['current_blocks'].toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: 0 }), inline: true },
			{ name: 'Block time', value: '1m', inline: true },
			{ name: 'Genesis age', value: stats['genesis'], inline: true }];

		return {
			'price': createEmbed('DOGEC Price Information', price_fields, 'DOGEC • The Doge is Now the Master(node)'),
			'masternodes': createEmbed('DOGEC Masternode Information', masternodes_fields, 'DOGEC • The Doge is Now the Master(node)'),
			'blocks': createEmbed('DOGEC Block Information', blocks_fields, 'DOGEC • The Doge is Now the Master(node)'),
		};

	};

	const send = async () => {
		try {
			// eslint-disable-next-line no-constant-condition
			while (true) {
				const messages = await createMessages();

				await clearChats(statsChannel);

				statsChannel.send(messages['price']);

				statsChannel.send(messages['masternodes']);

				statsChannel.send(messages['blocks']);

				// wait 10 minutes before updating price again
				await new Promise(resolve => setTimeout(resolve, 600000));
			}
		}
		catch (e) {
			console.log(e);
			// keep trying
			send();
		}
	};

	send();
};