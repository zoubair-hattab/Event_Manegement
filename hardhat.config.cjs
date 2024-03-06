require('@nomicfoundation/hardhat-toolbox');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.10',
  networks: {
    polygon_mumbai: {
      url: 'https://rpc.ankr.com/polygon_mumbai',
      accounts: [`privite key`],
    },
  },
};
