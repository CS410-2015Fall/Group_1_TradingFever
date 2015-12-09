var exit = 0;

var n = 51, random = d3.random.normal(1.2, 0.2), data = d3.range(n).map(random), minAccount = 1000, invSize = 100;

historicalStockPrice = JSON.parse(localStorage.getItem("historicalStockPrice"));
if (historicalStockPrice === null) {
	// do nothing
} else {
	data = historicalStockPrice;
}

// absolute sizing
/*var margin = {top: 20, right: 20, bottom: 20, left: 40},
    width = 400 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;*/

// relative sizing
var currentWindowHeight = $(window).height();
var currentWindowWidth = $(window).width();

// relative sizing
var margin = {top: 20, right: 20, bottom: 20, left: 40},
    width = currentWindowWidth*0.8 - margin.left - margin.right,
    height = currentWindowHeight*0.5 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .domain([0, n - 1])
    .range([0, width]);

var y = d3.scale.linear()
    .domain([0, 40])
    .range([height, 0]);

var line = d3.svg.line()
    .x(function(d, i) { return x(i); })
    .y(function(d, i) { return y(d); });

var svg = d3.select("#stocks").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.left + margin.right)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("defs").append("clipPath")
    .attr("id", "clip")
  .append("rect")
    .attr("width", width)
    .attr("height", height);

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + y(0) + ")")
    .call(d3.svg.axis().scale(x).orient("bottom"));

svg.append("g")
    .attr("class", "y axis")
    .call(d3.svg.axis().scale(y).orient("left"));

var path = svg.append("g")
    .attr("clip-path", "url(#clip)")
  .append("path")
    .datum(data)
    .attr("class", "line")
    .attr("d", line);

// THIS UPDATES ABSOLUTELY EVERYTHING
function tick() {


  // push a new data point onto the back
  theStocks.setStocksStockPrice(data[data.length-1]);

  // calculate variables
  theStocks.setStocksSecuritiesGPV(theStocks.getStocksShares() * theStocks.getStocksStockPrice());
  theStocks.setStocksNetLiquidation(theStocks.getStocksSecuritiesGPV() + theStocks.getStocksCash());
  theStocks.setStocksLeverage(theStocks.getStocksSecuritiesGPV()/theStocks.getStocksNetLiquidation());
  theStocks.setStocksAvailableFunds(theStocks.getStocksMaxLeverage() * theStocks.getStocksNetLiquidation());

  // calculate return
  if (theStocks.getStocksShares()>0){
  theStocks.setStocksReturn((data[data.length-1]-theStocks.getAvgPurchasePrice())/theStocks.getAvgPurchasePrice());
  }else{
    theStocks.setStocksReturn(0);
  } 

  // blowup scenarios
  if (theStocks.getStocksNetLiquidation() < minAccount){

    swal({title: "Blown Account!", text: "Investment Advisor Kato says: \nGrats, you blew up your account! Don't worry-you can always take another loan from the bank of Dad.",  
      imageUrl: "img/advisor.jpg",   
      showCancelButton: true,   
      confirmButtonColor: "#DD6B55",   
      confirmButtonText: "He's gonna rage...",   closeOnConfirm: false });

    theStocks.setStocksSecuritiesGPV(0);
    theStocks.setStocksShares(0);
    theStocks.setStocksLeverage(0);
    theStocks.setStocksCash(4000);
    theStocks.setStocksAvailableFunds(4000);
    theStocks.setStocksNetLiquidation(theStocks.getStocksCash());
    theStocks.setStocksAvailableFunds(theStocks.getStocksMaxLeverage()*theStocks.getStocksNetLiquidation());
  }else if (theStocks.getStocksLeverage() > theStocks.getStocksMaxLeverage()){
    
    swal({title: "Leverage Exceeded!", text: 'Investment Advisor Kato says: \nDude, you just exceeded the maximum leverage of ' + theStocks.getStocksMaxLeverage() + "! The broker liquidated your entire account! Stop using so much margin!",   
      imageUrl: "img/advisor.jpg",
      showCancelButton: true,   
      confirmButtonColor: "#DD6B55",   
      confirmButtonText: "Fine.",   closeOnConfirm: false });

    theStocks.setStocksStockPrice(data[data.length-1]);
    theStocks.setStocksSecuritiesGPV(theStocks.getStocksShares() * theStocks.getStocksStockPrice());
    theStocks.setStocksCash(theStocks.getStocksCash() + theStocks.getStocksSecuritiesGPV());
    theStocks.setStocksNetLiquidation(theStocks.getStocksCash());
    theStocks.setStocksShares(0);
    theStocks.setStocksSecuritiesGPV(0);
    theStocks.setStocksNetLiquidation(theStocks.getStocksSecuritiesGPV() + theStocks.getStocksCash());
    theStocks.setStocksAvailableFunds(theStocks.getStocksMaxLeverage() * theStocks.getStocksNetLiquidation());
    theStocks.setStocksLeverage(theStocks.getStocksSecuritiesGPV() / theStocks.getStocksNetLiquidation());

  }

  var newrand = random()*theStocks.getStocksStockPrice();
  var exit = 0;

  data.push(newrand);

  // redraw the line, and slide it to the left
  path
      .attr("d", line)
      .attr("transform", null)
    .transition()
      .duration(200)
      .ease("linear")
      .attr("transform", "translate(" + x(-1) + ",0)")
      .each("end", tick);

  // pop the old data point off the front
  data.shift();
  localStorage.setItem('historicalStockPrice',JSON.stringify(data));
}

// Using the jQuery library
setInterval(theStocks.showNetLiquidation, 200);
setInterval(theStocks.showShares, 200);
setInterval(theStocks.showSecuritiesGPV, 200);
setInterval(theStocks.showAvailableFunds, 200);
setInterval(theStocks.showLeverage, 200);
setInterval(theStocks.showCash, 200);
setInterval(theStocks.showStocksReturn, 200);
setInterval(theStocks.showFees, 200);
setInterval(setReturnColour, 200);
setInterval(setRandom, 1000);


tick();

$(document).ready(function(){
    $("#buybutton").click(function(){
      buyStock();
        //$("div").animate({left: '250px'});
    });
});

function buyStock(){
      invSize = getInvestmentSize();
      transactionFee= invSize * theStocks.getStocksFeeRate();
      theStocks.setStocksFee(theStocks.getStocksFee() + transactionFee);
      transaction = invSize * theStocks.getStocksStockPrice() + transactionFee;
      theStocks.setStocksShares(theStocks.getStocksShares() + invSize);
      if (theStocks.getStocksShares() > 0){
        theStocks.setAvgPurchasePrice((theStocks.getAvgPurchasePrice()*(theStocks.getStocksShares()-invSize) + theStocks.getStocksStockPrice()*invSize)/(theStocks.getStocksShares()));
      }else{
        theStocks.setAvgPurchasePrice(0);
      }
      theStocks.setStocksCash(theStocks.getStocksCash() - transaction);
      theStocks.setStocksAvailableFunds(theStocks.getStocksAvailableFunds() - transaction);
}


$(document).ready(function(){
    $("#sellbutton").click(function(){
		sellStock(); 
    });
});

function sellStock(){
      invSize = getInvestmentSize();
      if(theStocks.getStocksShares() >=invSize){
        
        transactionFee= invSize * theStocks.getStocksFeeRate();
        theStocks.setStocksFee(theStocks.getStocksFee() + transactionFee);
        transaction = invSize * theStocks.getStocksStockPrice() - transactionFee;
        theStocks.setStocksShares(theStocks.getStocksShares() - invSize);
        theStocks.setStocksCash(theStocks.getStocksCash() + transaction);
        theStocks.setStocksAvailableFunds(theStocks.getStocksAvailableFunds() + transaction);
    }else{
      sweetAlert('You are attempting to short sell. Unfortunately, the brokerage failed to locate enough shares to borrow.');
    }
}

// handles the RNG
function setRandom() {
  if (data[data.length-1]>25){
    random = d3.random.normal(0.96, 0.20);
  }else if (data[data.length-1]<7){
    random = d3.random.normal(1.03, 0.08);
  }else if (Math.random() > 0.5){
  random = d3.random.normal(1.01, 0.06);
  }else{
    random = d3.random.normal(0.99, 0.20);
  }
}

// handles kato the advisor
function advisorPopUp(){
  swal({title: "", 
      text: "Investment Advisor Kato says: \nThere are two ways to make money in this game: trading stocks and making totally legitimate investments. As your financial advisor, I recommend trading with 100 shares at first. Investments generate money passively! However, they can fail and you'll lose a level in that investment. If you see a string of successful investments, it could mean a disaster is looming..",  
          imageUrl: "img/advisor.jpg",  
          showCancelButton: true,   
          confirmButtonColor: "#DD6B55",   
          confirmButtonText: "Acknowledged",   closeOnConfirm: false });
}

function advisorStockPrice(){
  swal({title: "What's stock price?", 
      text: "Investment Advisor Kato says: \nThat's the price of the stock at any given time, duh.",  
          imageUrl: "img/advisor.jpg",  
          showCancelButton: true,   
          confirmButtonColor: "#DD6B55",   
          confirmButtonText: "Acknowledged",   closeOnConfirm: false });
}

function advisorNetLiquidation(){
  swal({title: "What's net liquidation?", 
      text: "Investment Advisor Kato says: \nNet liquidation is how much your trading account is worth, if you liquidated (sold) everything.",  
          imageUrl: "img/advisor.jpg",  
          showCancelButton: true,   
          confirmButtonColor: "#DD6B55",   
          confirmButtonText: "Acknowledged",   closeOnConfirm: false });
}

function advisorNumberOfShares(){
  swal({title: "What's number of shares?", 
      text: "Investment Advisor Kato says: \nThat's how many shares you own!",  
          imageUrl: "img/advisor.jpg",  
          showCancelButton: true,   
          confirmButtonColor: "#DD6B55",   
          confirmButtonText: "Acknowledged",   closeOnConfirm: false });
}

function advisorSecuritiesGPV(){
  swal({title: "What's securities GPV?", 
      text: "Investment Advisor Kato says: \nSecurities Gross Position Value is how much your current shares are worth.",  
          imageUrl: "img/advisor.jpg",  
          showCancelButton: true,   
          confirmButtonColor: "#DD6B55",   
          confirmButtonText: "Acknowledged",   closeOnConfirm: false });
}

function advisorTradingCash(){
  swal({title: "What's trading cash?", 
      text: "Investment Advisor Kato says: \nTrading cash is how much actual cash you have in this account.",  
          imageUrl: "img/advisor.jpg",  
          showCancelButton: true,   
          confirmButtonColor: "#DD6B55",   
          confirmButtonText: "Acknowledged",   closeOnConfirm: false });
}

function advisorAvailableFunds(){
  swal({title: "What's available funds?", 
      text: "Investment Advisor Kato says: \nAvailable cash is how much money you can still buy stocks with, in other words, your cash plus whatever the brokerage is willing to lend you.",  
          imageUrl: "img/advisor.jpg",  
          showCancelButton: true,   
          confirmButtonColor: "#DD6B55",   
          confirmButtonText: "Acknowledged",   closeOnConfirm: false });
}

function advisorLeverage(){
  swal({title: "What's leverage?", 
      text: "Investment Advisor Kato says: \nLeverage is the ratio of money you can trade with, in relation to your actual worth. By default this is 2, so the brokerage will lend you as much money as you have, effectively doubling your purchasing power. Don't borrow too much, though! If you exceed this bad things will happen!",  
          imageUrl: "img/advisor.jpg",  
          showCancelButton: true,   
          confirmButtonColor: "#DD6B55",   
          confirmButtonText: "Acknowledged",   closeOnConfirm: false });
}

function advisorTransactionFeesPaid(){
  swal({title: "What's transaction fees paid?", 
      text: "Investment Advisor Kato says: \nYou didn't think trading would be free, did you? Every buy/sell transaction costs money! Luckily I negotiated a pretty sweet deal with your brokerage in terms of fees. I swear, I'm not taking a cut!",  
          imageUrl: "img/advisor.jpg",  
          showCancelButton: true,   
          confirmButtonColor: "#DD6B55",   
          confirmButtonText: "Alright...",   closeOnConfirm: false });
}
// end of advisor

// handles the return
function setReturnColour() {
  if (theStocks.getStocksReturn() > 0){
    document.getElementById("showReturn").style.color = "#00FF00";
  }
  else{
    document.getElementById("showReturn").style.color = "#FF0000";
  }   
}

// buttons
$(document).ready(function(){
    $("#outbutton").click(function(){
      var transferredAmount = theStocks.subtractStocksCash(getTransferSize());
      theAvatar.setCashAmount(theAvatar.getCashAmount()+transferredAmount);

    });
});

$(document).ready(function(){
    $("#inbutton").click(function(){
		if(theAvatar.getCashAmount() > getTransferSize()){
			theStocks.addStocksCash(getTransferSize());
			theAvatar.setCashAmount(theAvatar.getCashAmount()-getTransferSize());
		}
    });
});

setInterval(theStocks.showStockPrice, 200);
