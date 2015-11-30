var investment = new Investment();

describe('investment', function() {
    describe('check ID', function() {
        it('should report correct initial ID', function() {
            expect(investment.getInvestmentID()).toEqual(-1);
        });
        it('should report correct ID', function() {
            investment.setInvestmentID(48927123);
            expect(investment.getInvestmentID()).toEqual(48927123);
        });
    });
	
    describe('check type', function() {
        it('should report correct initial type', function() {
            expect(investment.getInvestmentType()).toEqual('');
        });
        it('should report correct type', function() {
            investment.setInvestmentType('Magical Object');
            expect(investment.getInvestmentType()).toEqual('Magical Object');
        });
    });

    describe('check title', function() {
        it('should report correct initial title', function() {
            expect(investment.getInvestmentTitle()).toEqual('');
        });
        it('should report correct title', function() {
            investment.setInvestmentTitle("Sorcerer Stone");
            expect(investment.getInvestmentTitle()).toEqual("Sorcerer Stone");
        });
    });

    describe('check description', function() {
        it('should report correct initial description', function() {
        	expect(investment.getDescription()).toEqual('');
        });
        it('should report correct description', function() {
            investment.setDescription("It's magical!");
            expect(investment.getDescription()).toEqual("It's magical!");
        });
    });

    describe('check current level', function() {
        it('should report correct initial level', function() {
            expect(investment.getCurrentLevel()).toEqual(0);
        });
        it('should report correct current level', function() {
            investment.setCurrentLevel(3);
            expect(investment.getCurrentLevel()).toEqual(3);
        });
    });

    describe('check last time cashed', function() {
        it('should report correct last time cashed', function() {
            expect(investment.getLastCashedTime()).toEqual(0);
        });
        it('should report correct set last time cashed', function() {
            investment.setLastCashedTime(3);
            expect(investment.getLastCashedTime()).toEqual(3);
        });
    });

    describe('check img url', function() {
        it('should report correct default img url', function() {
            expect(investment.getImgURL()).toEqual('img/noImg.png');
        });
        it('should report correct customized img url', function() {
            investment.setImgURL('img/Img.png');
            expect(investment.getImgURL()).toEqual('img/Img.png');
        });
    });
})