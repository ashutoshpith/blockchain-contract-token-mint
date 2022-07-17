require('@nomiclabs/hardhat-ethers');

module.exports = {
    solidity: "0.8.4",
       networks: {
          rinkeby: {
           url: 'https://rinkeby.infura.io/v3/a4ec2dca292849b5b5f7075fdec338ff',
             accounts: { mnemonic: 'egg arrange family slab develop flock maple comfort bleak wheat motion inmate' },
           },
         },
  };