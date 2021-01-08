console.log('test')
const nodeAbi = require('node-abi');
console.log(nodeAbi.getAbi('14.15.4', 'node'));
// '51'
console.log(nodeAbi.getAbi('11.1.1', 'electron'));
