var repeat = false;

function repeatOn () {
	document.getElementById("repeat-toggle").className = "has-text-primary has-text-weight-bold";
	repeat = true;
}

function repeatOff () {
	document.getElementById("repeat-toggle").className = "";
	repeat = false;
}

function toggleRepeat () {
	repeat ? repeatOff() : repeatOn() ;
}

function repeatFrom () {
	repeatOn()
	time = player.getCurrentTime();
	document.getElementById("repeatFrom").value = time.toFixed();
}

function repeatTo () {
	repeatOn();
	time = player.getCurrentTime();
	document.getElementById("repeatTo").value = time.toFixed();
}

function repeater () {
  if (!player) return;
  if (typeof player.getPlayerState != "function") return;
  if (player.getPlayerState() != 1) return;
  if (!repeat) return;

  from = parseInt(document.getElementById("repeatFrom").value)
  to = parseInt(document.getElementById("repeatTo").value)
  if (!from || !to) return;

  if (player.getCurrentTime().toFixed(0) == to) {
    player.seekTo(from);
  }
}

setInterval(repeater, 500);
