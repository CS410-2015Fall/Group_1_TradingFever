describe('avatar', function() {

	var theAvatar = new Avatar();

    describe('check ID', function() {
        it('should report correct initial ID', function() {
            expect(theAvatar.getID()).toEqual(null);
        });
        it('should report correct ID', function() {
            theAvatar.setID(48927123);
            expect(theAvatar.getID()).toEqual(48927123);
        });
    });
	
    describe('check name', function() {
        it('should report correct initial name', function() {
            expect(theAvatar.getName()).toEqual();
        });
        it('should report correct name', function() {
            theAvatar.setName('Tom Riddle');
            expect(theAvatar.getName()).toEqual('Tom Riddle');
        });
    });

    describe('check cash', function() {
        it('should report correct initial cash', function() {
            expect(theAvatar.getCashAmount()).toEqual(0);
        });
        it('should report correct cash', function() {
            theAvatar.setCashAmount(5000);
            expect(theAvatar.getCashAmount()).toEqual(5000);
        });
    });

    describe('check rage', function() {
        it('should report correct initial rage', function() {
            expect(theAvatar.getRage()).toEqual(0);
        });
        it('should report correct rage', function() {
            theAvatar.setRage(5000);
            expect(theAvatar.getRage()).toEqual(5000);
        });
    });

    describe('check networth', function() {
        it('should report correct networth', function() {
        	expect(theAvatar.getNetWorth()).toEqual(9000);
        });
    });

	describe('check toJSON', function() {
        it('should report correct JSON (int)', function() {
        	expect(theAvatar.toJSON().id).toEqual(48927123);
        });
        it('should report correct JSON (string)', function() {
        	expect(theAvatar.toJSON().name).toEqual("Tom Riddle");
        });
        it('should report correct JSON (array)', function() {
        	expect(theAvatar.toJSON().investments).toEqual([]);
        });
    });

    describe('check list of investments', function() {
        it('should report correct initial list of investments', function() {
            expect(theAvatar.getInvestmentList().length).toEqual(0);
        });
        it('should report correct modified list of investments', function() {
        	var investment1 = new Investment();
        	var investment2 = new Investment();
        	var listOfInvestments = [investment1, investment2];
            theAvatar.setInvestmentList(listOfInvestments);
            expect(theAvatar.getInvestmentList().length).toEqual(2);
        });
    });
    
    describe('check facebook ID', function() {
        it('should report correct initial facebook ID', function() {
            expect(theAvatar.getFacebookID()).toEqual(0);
        });
        it('should report correct facebook ID', function() {
            theAvatar.setFacebookID(48927123);
            expect(theAvatar.getFacebookID()).toEqual(48927123);
        });
    });
})

describe('avatar makes investments', function() {

	var theAvatar = new Avatar();

	var startUp = new StartUp();

	theAvatar.setCashAmount(100000);

    describe('check investment', function() {
        it('add investment instance', function() {
            theAvatar.addInvestmentInstance(startUp);
            expect(theAvatar.getInvestmentList().length).toEqual(1);
        });
        it('get investment instance by ID', function() {
            expect(theAvatar.getInvestmentInstanceByID(0).investmentType).toEqual("StartUp");
        });
        it('upgrade investment from level 0 to level 1', function() {
        	theAvatar.upgradeInvestment(theAvatar.getInvestmentInstanceByID(0));
        	expect(theAvatar.getInvestmentInstanceByID(0).currentLevel).toEqual(1);
        });
        it('upgrade investment from level 1 to level 2', function() {
        	theAvatar.upgradeInvestment(theAvatar.getInvestmentInstanceByID(0));
        	expect(theAvatar.getInvestmentInstanceByID(0).currentLevel).toEqual(2);
        });
        it('remove investment instance by ID', function() {
        	theAvatar.removeInvestmentInstanceByID(0);
        	expect(theAvatar.getInvestmentList().length).toEqual(0);
        });
    });
})