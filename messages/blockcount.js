const { createEmbed } = require("../utilities.js");
const axios = require("axios");

module.exports = async (client, channel) => {
  try {
    const blockcount = (
      await axios.get("http://api.dogecash.org/api/v1/network/blockcount")
    )["data"]["result"];

    const peersEmbed = [
      // eslint-disable-next-line quotes
      {
        name: "Latest block according to Shib Jobs:",
        value: "```" + blockcount + "```",
        inline: false,
      },
    ];

    const peerMessage = createEmbed(
      "BLOCKCOUNT",
      peersEmbed,
      "DOGEC • The Doge is Now the Master(node)"
    );

    channel.send(peerMessage);
  } catch (e) {
    console.log(e);
  }
};
