/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

theStocks = new Stocks();
theAvatar = new Avatar();

// stocks
describe('stocks', function() {

    describe('variables', function() {
        it('should report correct variables', function() {
            expect(theStocks.getStocksFee()).toEqual(0);
            expect(theStocks.getStocksFeeRate()).toEqual(0.6);
            expect(theStocks.getStocksStockPrice()).toEqual(0);
            expect(theStocks.getStocksShares()).toEqual(0);
            expect(theStocks.getStocksSecuritiesGPV()).toEqual(0);
            expect(theStocks.getStocksCash()).toEqual(4000);
            expect(theStocks.getStocksMaxLeverage()).toEqual(2);
            expect(theStocks.getStocksNetLiquidation()).toEqual(theStocks.getStocksSecuritiesGPV()+theStocks.getStocksCash());
            expect(theStocks.getStocksAvailableFunds()).toEqual(theStocks.getStocksMaxLeverage()*theStocks.getStocksNetLiquidation());
            expect(theStocks.getStocksLeverage()).toEqual(theStocks.getStocksSecuritiesGPV()/theStocks.getStocksNetLiquidation());
            expect(theStocks.getAvgPurchasePrice()).toEqual(0);
        });
    });
});