var exit = 0;

var fee = 0, feeRate = 0.6, stockPrice = 0, shares = 0, securitiesGPV = 0, cash = 20000, availableFunds = 20000, maxLeverage = 2, netLiquidation = securitiesGPV+cash, leverage = securitiesGPV/netLiquidation;

var n = 11, random = d3.random.normal(1, 0.2), data = d3.range(n).map(random);

var margin = {top: 20, right: 20, bottom: 20, left: 40},
    width = 400 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

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
    .attr("height", height + margin.top + margin.bottom)
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

// THIS UPDATES ABSOLUTELY EVERYTHING
function tick() {

  // push a new data point onto the back
  stockPrice = data[data.length-1];
  securitiesGPV = shares * stockPrice;
  netLiquidation = securitiesGPV + cash;
  leverage = securitiesGPV/netLiquidation;

  //blowup scenario
  if (netLiquidation < 0){
    alert('You blew up your account! Do not worry-you take another "loan" from the bank of dad.')
    securitiesGPV = 0;
    shares = 0;
    leverage = 0;
    cash = 20000;
    availableFunds = 20000;
    netLiquidation = cash;
  }else if (leverage > maxLeverage){
    alert('You exceeded the maximum leverage of ' + maxLeverage + "! The broker won't allow you to borrow more and you were forced to sell off.")
    stockPrice = data[data.length-1];
    securitiesGPV = shares * stockPrice;
    cash = cash + securitiesGPV;
    securitiesGPV = 0;
    netLiquidation = securitiesGPV + cash;
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
    random = d3.random.normal(0.95, 0.15);
  }else if (data[data.length-1]<6){
    console.log('case 2');
    random = d3.random.normal(1.1, 0.08);
  }else if (Math.random() > 0.5){
  console.log('case 3')
  random = d3.random.normal(1.04, 0.08);
  }else{
    console.log('case 4');
    random = d3.random.normal(0.98, 0.15);
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
  $('#leverage').html('Leverage: '+ leverage);
}

// Using the jQuery library
setInterval(showFees, 200);

function showFees(){
  $('#transactionFee').html('Transaction Fee Paid: $'+ fee.toFixed(2));
}