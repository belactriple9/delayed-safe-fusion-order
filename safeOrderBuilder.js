


class SafeOrderBuilder {
    

    buildAndSignOrder(order, extension, makerAssetOracleParams, takerAssetOracleParams) {
        return this.SafeOrderBuilderIface.encodeFunctionData('buildAndSignOrder', [order, extension, makerAssetOracleParams, takerAssetOracleParams]);
    }
}