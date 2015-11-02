function overlay() {
  el = document.getElementById("investment1");
  el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
}

function invest() {
	location.reload();
	var node = document.getElementById('investmentPage');
	node.innerHTML('<p>some dynamic htmllllllllll</p>');
}