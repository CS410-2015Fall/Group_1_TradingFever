<?php
	 function mkConnection() {
	 	
		$link = mysqli_connect("localhost", "cl22-tradefev", "FF!Hd/mwj", "cl22-tradefev");
	 	if (mysqli_connect_error()) {
	 		echo "Failed to connect to database";
	 		dies();
	 	}
	 	return $link;

	 }
	 
?>