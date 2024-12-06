export const SAFE_TRANSACTION_EIP712 = {
    Transaction: [
      { name: 'to', type: 'address' },
      { name: 'value', type: 'uint256' },
      { name: 'data', type: 'bytes' },
      { name: 'operation', type: 'uint8' },
      { name: 'nonce', type: 'uint256' }
    ]
  };  
  
