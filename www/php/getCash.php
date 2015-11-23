<?php
	header('Access-Control-Allow-Origin: *');
	
	include 'mkConnection.php';
	$avatarID = $_POST['avatar_id'];
	
	$link = mkConnection();
	
	$query = 'SELECT * FROM `avatars` WHERE avatar_id = "'.$avatarID.'"';
	$result = mysqli_query($link, $query);
	
	$row = mysqli_fetch_array($result);
	echo $row['avatar_cash'];
?>