function overlay() {
  el = document.getElementById("investment1");
  el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
}

function invest() {
	var node = document.getElementById('invested');
	node.innerHTML('<p>some dynamic htmllllllllll</p>');
}