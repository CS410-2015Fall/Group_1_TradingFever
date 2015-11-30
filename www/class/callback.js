getCash = function(id){
	$.post("http://utoappia.com/Daniel/CS_410_TradingFever/getCash.php", 
		{
			avatar_id : JSON.stringify(id),
		},
		function(string) {
			return string;
	});
}

setCash = function(id, newCashAmount){
	$.post("http://utoappia.com/Daniel/CS_410_TradingFever/setCash.php", 
		{
			avatar_id : JSON.stringify(id),
			avatar_cash : newCashAmount,
		},
		function(string) {
			//console.log("update succesful");
	});
}

setNetWorth = function(id, newNetWorth, name){
	console.log('id=' + id);
	$.post("http://utoappia.com/Daniel/CS_410_TradingFever/setNetWorth.php", 
		{
			avatar_id : id,
			avatarNetWorth : newNetWorth,
			avatarName:name,
		},
		function(string) {
			console.log("netWorth update succesful");
			console.log('id=' + id);
	});
}