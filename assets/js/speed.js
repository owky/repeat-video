function changeSpeed () {
	speed = document.getElementById("speedSlider").value / 100;
	document.getElementById("speed").innerHTML = speed.toFixed(2);
	player.setPlaybackRate(speed);
}

function speedUp () {
	document.getElementById("speedSlider").stepUp();
	changeSpeed();
}

function speedDown () {
	document.getElementById("speedSlider").stepDown();
	changeSpeed();
}

function getSpeed () {
	return document.getElementById("speedSlider").value / 100;
}