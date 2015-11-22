<?php
	header('Access-Control-Allow-Origin: *');
	
	include 'mkConnection.php';
	$avatarID = $_POST['avatar_id'];
	$avatarCash = $_POST['avatar_cash'];
	
	$link = mkConnection();
	
	
	$query = 'UPDATE `avatars` SET avatar_cash="'.$avatarCash.'" WHERE avatar_id="'.$avatarID.'"';
    mysqli_query($link, $query);
    

	$query = 'SELECT * FROM `avatars` WHERE avatar_id = "'.$avatarID.'"';
	$result = mysqli_query($link, $query);
	
	$row = mysqli_fetch_array($result);
	echo $row['avatar_cash'];
?>