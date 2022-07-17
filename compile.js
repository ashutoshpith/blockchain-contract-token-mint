const path = require('path');
const fs = require('fs');
const solc = require('solc');
 
const inboxPath = path.resolve(__dirname, 'contracts', 'AdaptiveCode.sol');
const source = fs.readFileSync(inboxPath, 'utf8');
 
const input = {
  language: 'Solidity',
  sources: {
    'AdaptiveCode.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

console.log("her e", JSON.parse(solc.compile(JSON.stringify(input))));
 
// module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
//   'AdaptiveCode.sol'
// ].AdaptiveCode;