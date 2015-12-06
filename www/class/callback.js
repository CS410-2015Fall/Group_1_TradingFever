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
	});
}

setNetWorth = function(id, newNetWorth, name){
	$.post("http://utoappia.com/Daniel/CS_410_TradingFever/setNetWorth.php", 
		{
			avatar_id : id,
			avatarNetWorth : newNetWorth,
			avatarName:name,
		},
		function(string) {
	});
}
getLeaderData = function(){
	$.post("http://utoappia.com/Daniel/CS_410_TradingFever/getTopNetWorth.php",{'stuff':"lol"},
		function(stringData) {
			refreshLeaderBoard(JSON.parse(stringData));
	});
}