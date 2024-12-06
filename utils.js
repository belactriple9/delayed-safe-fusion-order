
const ethers = require('ethers');
const pad = (str, length) => str.padStart(length, '0');

const multisendIface = new ethers.Interface([{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":false,"inputs":[{"internalType":"bytes","name":"transactions","type":"bytes"}],"name":"multiSend","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]);

export function transactionBatcher(safeTransactions) {

    // Encoded transactions. Each transaction is encoded as a packed bytes of 
    // operation as a uint8 with 0 for a call or 1 for a delegatecall (=> 1 byte)
    // to as a address (=> 20 bytes)
    // value as a uint256 (=> 32 bytes)
    // data length as a uint256 (=> 32 bytes)
    // data as bytes. see abi.encodePacked for more information on packed encoding

    let transaction = '';

    for (let i = 0; i < safeTransactions.length; i++) {
        const tx = safeTransactions[i];
        const operation = BigInt(tx.operation).toString(16).padStart(2, '0');
        const to = tx.to.toLowerCase().replace(/^0x/, ''); // Ensure the address is lowercased and without '0x'
        const paddedTo = pad(to, 40); // 20 bytes = 40 hex characters
        const value = BigInt(tx.value).toString(16);
        const paddedValue = pad(value, 64); // 32 bytes = 64 hex characters

        const data = tx.data.replace(/^0x/, ''); // Remove '0x'
        const dataLength = BigInt(data.length / 2).toString(16); // Convert length in bytes to hex
        const paddedDataLength = pad(dataLength, 64); // 32 bytes = 64 hex characters
        const paddedData = data;

        const transactionPart = operation + paddedTo + paddedValue + paddedDataLength + paddedData;
        transaction += transactionPart;

    }
    
    return multisendIface.encodeFunctionData('multiSend',  ['0x' + transaction]);

}