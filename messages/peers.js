const { createEmbed } = require("../utilities.js");
const axios = require("axios");

module.exports = async (client, channel) => {
  try {
    const peers = (
      await axios.get("http://api.dogecash.org/api/v1/network/peers")
    )["data"]["result"];
    let textpeers = "";

    for (let i = 0; i < peers.length; i++) {
      textpeers = textpeers + `addnode=${peers[i]}\n`;
      if (i >= 10) {
        break;
      }
    }

    const peersEmbed = [
      // eslint-disable-next-line quotes
      {
        name: "Add these lines to your dogecash.conf file:",
        value: "```" + textpeers + "```",
        inline: false,
      },
    ];

    const peerMessage = createEmbed(
      "FILTERED AND REAL-TIME NON-FORKING PEERS!",
      peersEmbed,
    );

    channel.send(peerMessage);
  } catch (e) {
    console.log(e);
  }
};
