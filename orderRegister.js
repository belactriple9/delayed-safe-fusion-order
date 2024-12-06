const ethers = require('ethers'); 

class OrderRegister {

    ORDER_REGISTER_ABI = [{"inputs":[{"internalType":"contract IOrderMixin","name":"limitOrderProtocol","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"BadSignature","type":"error"},{"anonymous":false,"inputs":[{"components":[{"internalType":"uint256","name":"salt","type":"uint256"},{"internalType":"Address","name":"maker","type":"uint256"},{"internalType":"Address","name":"receiver","type":"uint256"},{"internalType":"Address","name":"makerAsset","type":"uint256"},{"internalType":"Address","name":"takerAsset","type":"uint256"},{"internalType":"uint256","name":"makingAmount","type":"uint256"},{"internalType":"uint256","name":"takingAmount","type":"uint256"},{"internalType":"MakerTraits","name":"makerTraits","type":"uint256"}],"indexed":false,"internalType":"struct IOrderMixin.Order","name":"order","type":"tuple"},{"indexed":false,"internalType":"bytes","name":"extension","type":"bytes"},{"indexed":false,"internalType":"bytes","name":"signature","type":"bytes"}],"name":"OrderRegistered","type":"event"},{"inputs":[{"components":[{"internalType":"uint256","name":"salt","type":"uint256"},{"internalType":"Address","name":"maker","type":"uint256"},{"internalType":"Address","name":"receiver","type":"uint256"},{"internalType":"Address","name":"makerAsset","type":"uint256"},{"internalType":"Address","name":"takerAsset","type":"uint256"},{"internalType":"uint256","name":"makingAmount","type":"uint256"},{"internalType":"uint256","name":"takingAmount","type":"uint256"},{"internalType":"MakerTraits","name":"makerTraits","type":"uint256"}],"internalType":"struct IOrderMixin.Order","name":"order","type":"tuple"},{"internalType":"bytes","name":"extension","type":"bytes"},{"internalType":"bytes","name":"signature","type":"bytes"}],"name":"registerOrder","outputs":[],"stateMutability":"nonpayable","type":"function"}];
    ORDER_REGISTER_ADDRESS = '0x2339f78e2Ec15C47Cf042F2460C532C0D7ff1CCE';
    OrderRegisterIface = new ethers.Interface(this.ORDER_REGISTER_ABI);    
    
    constructor() {
        
    }

    getOrderRegisterCalldata(order, extension, signature) {
        return this.OrderRegisterIface.encodeFunctionData('registerOrder', [order, extension, signature]);
    }


}

module.exports = OrderRegister;