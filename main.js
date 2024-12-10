
const ethers = require('ethers');
const {FusionSDK, FusionOrder} = require('@1inch/fusion-sdk');
const realityETH = require('./realityETHFunctions');
const OrderRegister = require('./orderRegister');
const { transactionBatcher } = require('./utils');

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL); // trusted RPC provider
const testnetProvider = new ethers.JsonRpcProvider(process.env.TESTNET_RPC_URL); // for broadcasting test transactions

const ethersProviderConnector = {
    ethCall: async (address, data) => {
        return await provider.call({
            to: address,
            data: data
        })
    },

    signTypedData: async (address, typedData) => {
        return null; // we don't need this for a gnosis safe
    }
}

const sdk = new FusionSDK({
    url: 'https://api.1inch.dev/fusion',
    network: 1,
    blockchainProvider: ethersProviderConnector,
    authKey: process.env.DEVPORTAL_API_KEY
})



const moduleAddress = '0xa62D2a75eb39C12e908e9F6BF50f189641692F2E';
const safeAddress = '0x7951c7ef839e26F63DA87a42C9a87986507f1c07';
const safeMultisend = '0x8D29bE29923b68abfDD21e541b9374737B49cdAD';
const REALITYETH_3_0 = '0x5b7dD1E86623548AF054A4985F7fc8Ccbb554E2c'
const LIMIT_ORDER_PROTOCOL_ADDRESS = '0x111111125421ca6dc452d289314280a0f8842a65';
const chainId = 1n;

const reality = new realityETH(moduleAddress, chainId, ethersProviderConnector);
const register = new OrderRegister();


const USDC_ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"authorizer","type":"address"},{"indexed":true,"internalType":"bytes32","name":"nonce","type":"bytes32"}],"name":"AuthorizationCanceled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"authorizer","type":"address"},{"indexed":true,"internalType":"bytes32","name":"nonce","type":"bytes32"}],"name":"AuthorizationUsed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_account","type":"address"}],"name":"Blacklisted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newBlacklister","type":"address"}],"name":"BlacklisterChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"burner","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newMasterMinter","type":"address"}],"name":"MasterMinterChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"minter","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"minter","type":"address"},{"indexed":false,"internalType":"uint256","name":"minterAllowedAmount","type":"uint256"}],"name":"MinterConfigured","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"oldMinter","type":"address"}],"name":"MinterRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":false,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newAddress","type":"address"}],"name":"PauserChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newRescuer","type":"address"}],"name":"RescuerChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_account","type":"address"}],"name":"UnBlacklisted","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"inputs":[],"name":"CANCEL_AUTHORIZATION_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"RECEIVE_WITH_AUTHORIZATION_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TRANSFER_WITH_AUTHORIZATION_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"authorizer","type":"address"},{"internalType":"bytes32","name":"nonce","type":"bytes32"}],"name":"authorizationState","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"blacklist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"blacklister","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"authorizer","type":"address"},{"internalType":"bytes32","name":"nonce","type":"bytes32"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"cancelAuthorization","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"authorizer","type":"address"},{"internalType":"bytes32","name":"nonce","type":"bytes32"},{"internalType":"bytes","name":"signature","type":"bytes"}],"name":"cancelAuthorization","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"minter","type":"address"},{"internalType":"uint256","name":"minterAllowedAmount","type":"uint256"}],"name":"configureMinter","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"currency","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"decrement","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"increment","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"tokenName","type":"string"},{"internalType":"string","name":"tokenSymbol","type":"string"},{"internalType":"string","name":"tokenCurrency","type":"string"},{"internalType":"uint8","name":"tokenDecimals","type":"uint8"},{"internalType":"address","name":"newMasterMinter","type":"address"},{"internalType":"address","name":"newPauser","type":"address"},{"internalType":"address","name":"newBlacklister","type":"address"},{"internalType":"address","name":"newOwner","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"newName","type":"string"}],"name":"initializeV2","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"lostAndFound","type":"address"}],"name":"initializeV2_1","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"accountsToBlacklist","type":"address[]"},{"internalType":"string","name":"newSymbol","type":"string"}],"name":"initializeV2_2","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"isBlacklisted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isMinter","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"masterMinter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"minter","type":"address"}],"name":"minterAllowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pauser","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bytes","name":"signature","type":"bytes"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"validAfter","type":"uint256"},{"internalType":"uint256","name":"validBefore","type":"uint256"},{"internalType":"bytes32","name":"nonce","type":"bytes32"},{"internalType":"bytes","name":"signature","type":"bytes"}],"name":"receiveWithAuthorization","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"validAfter","type":"uint256"},{"internalType":"uint256","name":"validBefore","type":"uint256"},{"internalType":"bytes32","name":"nonce","type":"bytes32"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"receiveWithAuthorization","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"minter","type":"address"}],"name":"removeMinter","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"tokenContract","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"rescueERC20","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rescuer","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"validAfter","type":"uint256"},{"internalType":"uint256","name":"validBefore","type":"uint256"},{"internalType":"bytes32","name":"nonce","type":"bytes32"},{"internalType":"bytes","name":"signature","type":"bytes"}],"name":"transferWithAuthorization","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"validAfter","type":"uint256"},{"internalType":"uint256","name":"validBefore","type":"uint256"},{"internalType":"bytes32","name":"nonce","type":"bytes32"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"transferWithAuthorization","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"unBlacklist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newBlacklister","type":"address"}],"name":"updateBlacklister","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newMasterMinter","type":"address"}],"name":"updateMasterMinter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newPauser","type":"address"}],"name":"updatePauser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newRescuer","type":"address"}],"name":"updateRescuer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"}];
const USDC_IFACE = new ethers.Interface(USDC_ABI);
const SAFE_ORDER_BUILDER_ABI = [{"inputs":[{"internalType":"contract IOrderMixin","name":"limitOrderProtocol","type":"address"},{"internalType":"contract IOrderRegistrator","name":"orderRegistrator","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"MathOverflowedMulDiv","type":"error"},{"inputs":[],"name":"StaleOraclePrice","type":"error"},{"inputs":[{"components":[{"internalType":"uint256","name":"salt","type":"uint256"},{"internalType":"Address","name":"maker","type":"uint256"},{"internalType":"Address","name":"receiver","type":"uint256"},{"internalType":"Address","name":"makerAsset","type":"uint256"},{"internalType":"Address","name":"takerAsset","type":"uint256"},{"internalType":"uint256","name":"makingAmount","type":"uint256"},{"internalType":"uint256","name":"takingAmount","type":"uint256"},{"internalType":"MakerTraits","name":"makerTraits","type":"uint256"}],"internalType":"struct IOrderMixin.Order","name":"order","type":"tuple"},{"internalType":"bytes","name":"extension","type":"bytes"},{"components":[{"internalType":"contract AggregatorV3Interface","name":"oracle","type":"address"},{"internalType":"uint256","name":"originalAnswer","type":"uint256"},{"internalType":"uint256","name":"ttl","type":"uint256"}],"internalType":"struct SafeOrderBuilder.OracleQueryParams","name":"makerAssetOracleParams","type":"tuple"},{"components":[{"internalType":"contract AggregatorV3Interface","name":"oracle","type":"address"},{"internalType":"uint256","name":"originalAnswer","type":"uint256"},{"internalType":"uint256","name":"ttl","type":"uint256"}],"internalType":"struct SafeOrderBuilder.OracleQueryParams","name":"takerAssetOracleParams","type":"tuple"}],"name":"buildAndSignOrder","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const SAFE_ORDER_BUILDER_ADDRESS = '0x370De82413251A9d204DCEAB50dB2d7ec3Bd1769';
const SafeOrderBuilderIface = new ethers.Interface(SAFE_ORDER_BUILDER_ABI);



const proposalId = 'x'; // set by snapshot, here for testing

const orderDelay = 864000n; // 10 days
// 8 days is 691200n or 0xbdd80

const params = {
    walletAddress: safeAddress,
    orderExpirationDelay: orderDelay,
    fromTokenAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC
    toTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', // ETH
    amount: '100000000', // 100 USDC
}


const { order } = await sdk.createOrder(params);

// console.log(order);

const build = order.build();
const extension = order.extension.encode();
const signature = '0x' // should be null for approved hashes

const orderHash = order.getOrderHash();

const transactionBatch = [
    {  
        to: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        data: USDC_IFACE.encodeFunctionData('approve', [LIMIT_ORDER_PROTOCOL_ADDRESS, '100000000']),
        value: '0x00',
        operation: 0,
        nonce: 0
    },
    {
        to: SAFE_ORDER_BUILDER_ADDRESS,
        data: SafeOrderBuilderIface.encodeFunctionData('buildAndSignOrder', 
            [build, extension, {
                oracle: '0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6', // USDC to USD
                originalAnswer: await provider.send('eth_call', [{to: '0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6', data: '0x50d25bcd'}]), // call latestAnswer()
                ttl: 86400n // 1 day
            }, {
                oracle: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419', // ETH to USD
                originalAnswer: await provider.send('eth_call', [{to: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419', data: '0x50d25bcd'}]), // call latestAnswer()
                ttl: 3600n // 1 hour
            }]
        ),
        value: '0x00',
        operation: 1,
        nonce: 0
    }
]

const formattedBatch = transactionBatch.map((tx, index) => {
    // Create a new object for each transaction with the required format
    let formattedTx = {
        to: tx.to,
        operation: tx.operation.toString(), // Ensure operation is a string
        value: BigInt(tx.value).toString(), // Ensure value is a string
        data: tx.data
    };

    return formattedTx;
});

console.log('-- Snapshot consumable data --')
console.log(JSON.stringify(formattedBatch, null, 4)); // data usable by Snapshot

console.log('-- Everything else after this point is handled under the hood by snapshot --');

// a transaction batch with safe multisend is used to execute the proposal in 1 transaction instead of requiring multiple
const batch = {
    to: safeMultisend,
    value: 0,
    data: transactionBatcher(transactionBatch),
    operation: 1,  // delegatecall
    nonce: 0
}

const batchTxHash = await reality.calcTransactionHash(chainId, moduleAddress, batch);

console.log('-- Batch Transaction --');
console.log(batch);
console.log(batchTxHash);

/* STEP 1 */ 
// we'll need to build the proposal question
const question = {
    to: moduleAddress,
    data: reality.buildProposalQuestion(proposalId, [batchTxHash])
}

console.log('-- Question --');
console.log(question);

/* STEP 2 */
// we'll need to compute the question data and build the calldata for an answer
const questionData = await reality.getQuestionId(proposalId, [batchTxHash], 0);
const answer = {
    to: REALITYETH_3_0,
    data: reality.buildTransactionForAnswer(
        questionData, 
        '0x0000000000000000000000000000000000000000000000000000000000000001', // 1 for yes
        '0x000000000000000000000000000000000000000000000000016345785d8a0000' // previous bond, 0.1 ETH in this case
    ),
    value: '100000000000000000'
}


console.log('-- Answer --');
console.log(answer);

console.log('-- evm_increaseTime --');
console.log('0xba234'); // 7 days

/* STEP 3 */
// once 6 days have passed, execute the proposal
const txn = {
    to: moduleAddress,
    data: reality.buildExecuteProposalWithIndex(proposalId, [batchTxHash], batch.to, batch.value, batch.data, batch.operation, batch.nonce)
}

console.log('-- Execute Proposal --');
console.log(txn);
