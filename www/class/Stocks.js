var exit = 0;

var fee = 0, feeRate = 0.6, stockPrice = 0, shares = 0, securitiesGPV = 0, cash = 4000, maxLeverage = 2, netLiquidation = securitiesGPV+cash, availableFunds = maxLeverage*netLiquidation, leverage = securitiesGPV/netLiquidation;

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


setInterval(setRandom, 1000)
tick();

// feeRate
function getStocksFeeRate() {
  return feeRate;
}

function setStocksFeeRate(newFeeRate) {
  feeRate = newFeeRate;
}

// Cash
function getStocksCash() {
  return cash;
}

function setStocksCash(newCash) {
  cash = newCash;
}

function addStocksCash(newCash) {
  cash = cash + newCash;
}

function subtractStocksCash(newCash) {
  if (cash - newCash > 4000){
    cash = cash - newCash;
  }
  else{
    alert("You can't take that much money or you'll go below minimum trading account size.");
  }
}

// netLiquidation
function getStocksNetLiquidation() {
  return netLiquidation;
}

function setStocksNetLiquidation(newNetLiquidation) {
  netLiquidation = newNetLiquidation; // this should never really be used
}

// THIS UPDATES ABSOLUTELY EVERYTHING
function tick() {

  // push a new data point onto the back
  stockPrice = data[data.length-1];
  securitiesGPV = shares * stockPrice;
  netLiquidation = securitiesGPV + cash;
  leverage = securitiesGPV/netLiquidation;
  availableFunds = maxLeverage*netLiquidation;

  // blowup scenarios
  if (netLiquidation < 100*stockPrice){
    alert('You blew up your account! Do not worry-you take another "loan" from the bank of dad.')
    securitiesGPV = 0;
    shares = 0;
    leverage = 0;
    cash = 4000;
    availableFunds = 4000;
    netLiquidation = cash;
    availableFunds = maxLeverage*netLiquidation;
  }else if (leverage > maxLeverage){
    alert('You exceeded the maximum leverage of ' + maxLeverage + "! The broker won't allow you to borrow more and you were forced to sell off.")
    stockPrice = data[data.length-1];
    securitiesGPV = shares * stockPrice;
    cash = cash + securitiesGPV;
    netLiquidation = cash;
    shares = 0;
    securitiesGPV = 0;
    netLiquidation = securitiesGPV + cash;
    availableFunds = maxLeverage*netLiquidation;
    leverage = securitiesGPV/netLiquidation;
  }

  var newrand = random()*stockPrice;
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



$(document).ready(function(){
    $("#buybutton").click(function(){
      transactionFee= 100 * feeRate;
      fee = fee + transactionFee;
      transaction = 100 * stockPrice + transactionFee;
      shares = shares + 100;
      cash = cash - transaction;
      availableFunds= availableFunds - transaction;

        //$("div").animate({left: '250px'});
    });
});


$(document).ready(function(){
    $("#sellbutton").click(function(){
      if(shares >0){
        transactionFee= 100 * feeRate;
        fee = fee + transactionFee;
        transaction = 100 * stockPrice - transactionFee;
        shares = shares - 100;
        cash = cash + transaction;
        availableFunds= availableFunds + transaction;
    }else{
      alert('You are attempting to short sell. Unfortunately, the brokerage failed to locate enough shares to borrow.');
    }
    });
});

$(document).ready(function(){
    $("#outbutton").click(function(){
      subtractStocksCash(10000);
      theAvatar.addCashAmount(10000);

    });
});

$(document).ready(function(){
    $("#inbutton").click(function(){

      addStocksCash(10000);
      theAvatar.subtractCashAmount(10000);

    });
});

setInterval(showStockPrice, 200);

function showStockPrice(){
  $('#stockPrice').html('Current Stock Price: $'+ data[data.length-1].toFixed(2));
}

// Using the jQuery library
setInterval(showNetLiquidation, 200);

function showNetLiquidation(){
  $('#netLiquidation').html('Net Liquidation: $'+ netLiquidation.toFixed(2));
}

// Using the jQuery library
setInterval(showShares, 200);

function showShares(){
  $('#shares').html('Number of Shares: '+ shares);
}

// Using the jQuery library
setInterval(showSecuritiesGPV, 200);

function showSecuritiesGPV(){
  $('#securitiesGPV').html('Securities GPV: $'+ securitiesGPV.toFixed(2));
}

// Using the jQuery library
setInterval(showCash, 200);

function showCash(){
  $('#cash').html('Cash: $'+ cash.toFixed(2));
}

// Using the jQuery library
setInterval(showAvailableFunds, 200);

function showAvailableFunds(){
  $('#availableFunds').html('Available Funds: $'+ availableFunds.toFixed(2));
}

// Using the jQuery library
setInterval(showLeverage, 200);

function showLeverage(){
  $('#leverage').html('Leverage: '+ leverage.toFixed(1));
}

// Using the jQuery library
setInterval(showFees, 200);

function showFees(){
  $('#transactionFee').html('Transaction Fees Paid: $'+ fee.toFixed(2));
}