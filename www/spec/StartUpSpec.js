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
var StartUpInvestment = new StartUp(' ');

describe('StartUp', function() {

    describe('setting investment title', function() {
		StartUpInvestment.setInvestmentTitle('YuWei Inc.');
        it('should show "YuWei Inc."', function() {
            expect(StartUpInvestment.getInvestmentTitle()).toEqual('YuWei Inc.');
        });
    });
	describe('checking monthly return', function() {
		StartUpInvestment.setMonthlyReturn(10);
        it('should be 10', function() {
            expect(StartUpInvestment.getIncomeStatement().amount).toEqual(10);
        });
    });
	describe('setting current worth', function() {
		StartUpInvestment.setCurrentWorth(100);
        it('should be 100', function() {
            expect(StartUpInvestment.getCurrentWorth(0)).toEqual(100);
        });
    });
	describe('setting current worth', function() {
		StartUpInvestment.setCurrentWorth(100);
        it('should be 100', function() {
            expect(StartUpInvestment.getCurrentWorth(0)).toEqual(100);
        });
    });
	describe('ask whether if it is upgradeable', function() {
        it('should be true', function() {
            expect(StartUpInvestment.upgradeable()).toEqual(true);
        });
    });
	describe('ask the upgrade cost', function() {
        it('should be true', function() {
            expect(StartUpInvestment.upgradeCost()).toBeGreaterThan(0);
        });
    });
	describe('ask if it is sellable', function() {
        it('should be true', function() {
            expect(StartUpInvestment.sellable()).toEqual(true);
        });
    });
	describe('ask if it needs to cleared', function() {
        it('should be never be cleared', function() {
            expect(StartUpInvestment.needsClear()).toEqual(false);
        });
    });
	describe('check toJSON is working', function() {
		StartUpInvestment.setInvestmentID(2);
        it('should be 2', function() {
            expect(StartUpInvestment.toJSON().investmentID).toEqual(2);
        });
    });
	describe('check loadFromJSON is working', function() {
		var StartUpInvestmentA = new Bitcoin('a');
		StartUpInvestmentA.setInvestmentID(5);
		var aJSON = StartUpInvestmentA.toJSON();
		
		var StartUpInvestmentB = new Bitcoin('b');
		StartUpInvestmentB.loadFromJSON(aJSON);
		
        it('should be 5', function() {
            expect(StartUpInvestmentB.toJSON().investmentID).toEqual(5);
        });
    });
});