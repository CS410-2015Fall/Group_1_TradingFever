var exit = 0;

var n = 51, random = d3.random.normal(1.2, 0.2), data = d3.range(n).map(random);

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
    .domain([0, 20])
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
  if (theStocks.getStocksNetLiquidation() < 100* theStocks.getStocksStockPrice()){
    alert('You blew up your account! Do not worry-you take another "loan" from the bank of dad.')
    theStocks.setStocksSecuritiesGPV(0);
    theStocks.setStocksShares(0);
    theStocks.setStocksLeverage(0);
    theStocks.setStocksCash(4000);
    theStocks.setStocksAvailableFunds(4000);
    theStocks.setStocksNetLiquidation(theStocks.getStocksCash());
    theStocks.setStocksAvailableFunds(theStocks.getStocksMaxLeverage()*theStocks.getStocksNetLiquidation());
  }else if (theStocks.getStocksLeverage() > theStocks.getStocksMaxLeverage()){
    alert('You exceeded the maximum leverage of ' + theStocks.getStocksMaxLeverage() + "! The broker won't allow you to borrow more and you were forced to sell off.")
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

}


// Using the jQuery library
setInterval(theStocks.showNetLiquidation, 200);
setInterval(theStocks.showShares, 200);
setInterval(theStocks.showSecuritiesGPV, 200);
setInterval(theStocks.showAvailableFunds, 200);
setInterval(theStocks.showLeverage, 200);
setInterval(theStocks.showCash, 200);
setInterval(theStocks.showStocksReturn, 200);
setInterval(setReturnColour, 200);
setInterval(setRandom, 1000);


tick();

$(document).ready(function(){
    $("#buybutton").click(function(){
      
      transactionFee= 100 * theStocks.getStocksFeeRate();
      theStocks.setStocksFee(theStocks.getStocksFee() + transactionFee);
      transaction = 100 * theStocks.getStocksStockPrice() + transactionFee;
      theStocks.setStocksShares(theStocks.getStocksShares() + 100);
      if (theStocks.getStocksShares() > 0){
        theStocks.setAvgPurchasePrice((theStocks.getAvgPurchasePrice()*theStocks.getStocksShares() + theStocks.getStocksStockPrice()*100)/(theStocks.getStocksShares() + 100));
      }else{
        theStocks.setAvgPurchasePrice(0);
      }
      theStocks.setStocksCash(theStocks.getStocksCash() - transaction);
      theStocks.setStocksAvailableFunds(theStocks.getStocksAvailableFunds() - transaction);


        //$("div").animate({left: '250px'});
    });
});


$(document).ready(function(){
    $("#sellbutton").click(function(){
      if(theStocks.getStocksShares() >0){
        
        transactionFee= 100 * theStocks.getStocksFeeRate();
        theStocks.setStocksFee(theStocks.getStocksFee() + transactionFee);
        transaction = 100 * theStocks.getStocksStockPrice() - transactionFee;
        theStocks.setStocksShares(theStocks.getStocksShares() - 100);
        if (theStocks.getStocksShares() > 0){
          theStocks.setAvgPurchasePrice((theStocks.getAvgPurchasePrice()*theStocks.getStocksShares() - theStocks.getStocksStockPrice()*100)/(theStocks.getStocksShares() - 100));
        }else{
        theStocks.setAvgPurchasePrice(0);
        }
        theStocks.setStocksCash(theStocks.getStocksCash() + transaction);
        theStocks.setStocksAvailableFunds(theStocks.getStocksAvailableFunds() + transaction);
    }else{
      alert('You are attempting to short sell. Unfortunately, the brokerage failed to locate enough shares to borrow.');
    }
    });
});


// handles the RNG
function setRandom() {
  if (data[data.length-1]>12){
    console.log('case 1');
    random = d3.random.normal(0.97, 0.15);
  }else if (data[data.length-1]<4){
    console.log('case 2');
    random = d3.random.normal(1.04, 0.05);
  }else if (Math.random() > 0.5){
  console.log('case 3')
  random = d3.random.normal(1.015, 0.04);
  }else{
    console.log('case 4');
    random = d3.random.normal(0.99, 0.15);
  }
}

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
      theStocks.subtractStocksCash(10000);
      theAvatar.setCashAmount(theAvatar.getCashAmount()+10000);

    });
});

$(document).ready(function(){
    $("#inbutton").click(function(){
		theStocks.addStocksCash(10000);
		theAvatar.setCashAmount(theAvatar.getCashAmount()-10000);
    });
});

setInterval(theStocks.showStockPrice(), 200);