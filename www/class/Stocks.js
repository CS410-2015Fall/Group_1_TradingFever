
function Stocks(){

var fee = 0, feeRate = 0.6, stockPrice = 0, shares = 0, securitiesGPV = 0, cash = 2000, maxLeverage = 2, netLiquidation = securitiesGPV+cash, availableFunds = maxLeverage*netLiquidation, leverage = securitiesGPV/netLiquidation, stocksReturn = 0, avgPurchasePrice = 0;

// fee
this.getStocksFee = function(){
  return fee;
}

this.setStocksFee = function(newFee){
  fee = newFee;
}

// feeRate
this.getStocksFeeRate = function() {
  return feeRate;
}

this.setStocksFeeRate = function(newFeeRate) {
  feeRate = newFeeRate;
}

// stockPrice
this.getStocksStockPrice = function(){
  return stockPrice;
}

this.setStocksStockPrice = function(newStockPrice){
  stockPrice = newStockPrice;
}

// shares
this.getStocksShares = function(){
  return shares;
}

this.setStocksShares = function(newShares){
  shares = newShares;
}

// securitiesGPV
this.getStocksSecuritiesGPV = function(){
  return securitiesGPV;
}

this.setStocksSecuritiesGPV = function(newSecuritiesGPV){
  securitiesGPV = newSecuritiesGPV;
}

// Cash
this.getStocksCash = function() {
  return cash;
}

this.setStocksCash = function(newCash) {
  cash = newCash;
}

this.addStocksCash = function(newCash) {
  cash = cash + newCash;
}

this.subtractStocksCash = function(transferSize) {
	var transferredCash = 0;
  if (cash - transferSize >= 0 ){
    cash = cash - transferSize;
	transferredCash = transferSize;
  }
  else{
    alert("You can't take that much money or you'll go below minimum trading account size.");
  }
  return transferredCash;
}

// maxLeverage
this.getStocksMaxLeverage = function(){
  return maxLeverage;
}

this.setStocksMaxLeverage = function(newMaxLeverage){
  maxLeverage = newMaxLeverage;
}

// netLiquidation
this.getStocksNetLiquidation = function() {
  return netLiquidation;
}

this.setStocksNetLiquidation = function(newNetLiquidation) {
  netLiquidation = newNetLiquidation; 
}

// availableFunds
this.getStocksAvailableFunds = function(){
  return availableFunds;
}

this.setStocksAvailableFunds = function(newAvailableFunds){
  availableFunds = newAvailableFunds;
}

// leverage
this.getStocksLeverage = function(){
  return leverage;
}

this.setStocksLeverage = function(newLeverage){
  leverage = newLeverage;
}

// stock returns
this.getStocksReturn = function(){
  return stocksReturn;
}

this.setStocksReturn = function(newStocksReturn){
  stocksReturn = newStocksReturn;
}

// average purchase price
this.getAvgPurchasePrice = function(){
  return avgPurchasePrice;
}

this.setAvgPurchasePrice = function(newAvgPurchasePrice){
  avgPurchasePrice = newAvgPurchasePrice;
}

// show variables
this.showStockPrice = function(){
  $('#stockPrice').html('Current Stock Price: $'+ data[data.length-1].toFixed(2));
  //console.log('updated stock price');
}

this.showNetLiquidation = function(){
  $('#netLiquidation').html('Net Liquidation: $'+ netLiquidation.toFixed(2));
}

this.showShares = function(){
  $('#shares').html('Number of Shares: '+ shares);
}

this.showSecuritiesGPV = function(){
  $('#securitiesGPV').html('Securities GPV: $'+ securitiesGPV.toFixed(2));
}

this.showCash = function(){
  $('#cash').html('Trading Cash: $'+ cash.toFixed(2));
}

this.showAvailableFunds = function(){
  $('#availableFunds').html('Available Funds: $'+ availableFunds.toFixed(2));
}

this.showLeverage = function(){
  $('#leverage').html('Leverage: '+ leverage.toFixed(1));
}

this.showFees = function(){
  $('#transactionFee').html('Transaction Fees Paid: $'+ fee.toFixed(2));
}

this.showStocksReturn = function(){
  if (theStocks.getStocksShares() > 0){
  $('#showReturn').html('Return on current shares: '+ Math.floor(stocksReturn * 100) + '%');
  }else
  $('#showReturn').html('Return on current shares: 0 %');
}

this.toJSON = function(){
	var toReturn = {
		'numShare':shares,
		'tradingCash':this.getStocksCash(),
		'transactionFeePaid':this.getStocksFee(),
		'securitiesGPV':securitiesGPV,
		'avgPurchasePrice':this.getAvgPurchasePrice()
	}
	return toReturn;
}
this.loadFromJSONString = function(aJSONString){
	console.log('aJSONString: ' + aJSONString);
	var aJSON = JSON.parse(aJSONString);
	shares = aJSON.numShare;
	this.setStocksCash(aJSON.tradingCash);
	fee = aJSON.transactionFeePaid;
	avgPurchasePrice = aJSON.avgPurchasePrice;
}
}