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

var theStocks = new Stocks();
var theAvatar = new Avatar();
var RealEstateInvestment = new RealEstate(' ');

describe('RealEstate', function() {

    describe('setting investment title', function() {
		RealEstateInvestment.setInvestmentTitle('YuWei Inc.');
        it('should show "YuWei Inc."', function() {
            expect(RealEstateInvestment.getInvestmentTitle()).toEqual('YuWei Inc.');
        });
    });
	describe('checking monthly return', function() {
		RealEstateInvestment.setMonthlyReturn(10);
        it('should be 10', function() {
            expect(RealEstateInvestment.getIncomeStatement().amount).toEqual(10);
        });
    });
	describe('setting current worth', function() {
		RealEstateInvestment.setCurrentWorth(100);
        it('should be 100', function() {
            expect(RealEstateInvestment.getCurrentWorth(0)).toEqual(100);
        });
    });
	describe('setting current worth', function() {
		RealEstateInvestment.setCurrentWorth(100);
        it('should be 100', function() {
            expect(RealEstateInvestment.getCurrentWorth(0)).toEqual(100);
        });
    });
	describe('ask whether if it is upgradeable', function() {
        it('should be true', function() {
            expect(RealEstateInvestment.upgradeable()).toEqual(true);
        });
    });
	describe('ask the upgrade cost', function() {
        it('should be true', function() {
            expect(RealEstateInvestment.upgradeCost()).toBeGreaterThan(0);
        });
    });
	describe('ask if it is sellable', function() {
        it('should be true', function() {
            expect(RealEstateInvestment.sellable()).toEqual(true);
        });
    });
	describe('ask if it needs to cleared', function() {
        it('should be never be cleared', function() {
            expect(RealEstateInvestment.needsClear()).toEqual(false);
        });
    });
	describe('check toJSON is working', function() {
		RealEstateInvestment.setInvestmentID(2);
        it('should be 2', function() {
            expect(RealEstateInvestment.toJSON().investmentID).toEqual(2);
        });
    });
	describe('check loadFromJSON is working', function() {
		var RealEstateInvestmentA = new Bitcoin('a');
		RealEstateInvestmentA.setInvestmentID(5);
		var aJSON = RealEstateInvestmentA.toJSON();
		
		var RealEstateInvestmentB = new Bitcoin('b');
		RealEstateInvestmentB.loadFromJSON(aJSON);
		
        it('should be 5', function() {
            expect(RealEstateInvestmentB.toJSON().investmentID).toEqual(5);
        });
    });
});