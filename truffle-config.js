const path = require("path");
require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // to customize your Truffle configuration!
    contracts_build_directory: path.join(__dirname, "client/src/contracts"),
    networks: {
        ropsten: {
            provider: () =>
                new HDWalletProvider(
                    process.env.MNEMONIC,
                    `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`
                ),
            gas: 8000000,
            gasPrice: 100000000000,
            network_id: 3,
            skipDryRun: true,
        },
        rinkeby: {
            provider: () =>
                new HDWalletProvider(
                    process.env.MNEMONIC,
                    `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`
                ),
            network_id: 4,
            gas: 8000000,
            gasPrice: 100000000000,
            skipDryRun: true,
        },
        development: {
            host: "localhost",
            port: 7545,
            gas: 8000000,
            network_id: "*",
        },
    },
};
