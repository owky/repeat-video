class ControllerView {
    changePlayState (state) {
        switch (state) {
            case 0:
                document.getElementById("playerStatus").className = "fas fa-2x fa-play";
                break;
            case 1:
                document.getElementById("playerStatus").className = "fas fa-2x fa-pause";
                break;
            case 2:
                document.getElementById("playerStatus").className = "fas fa-2x fa-play";
                break;
        }     
    }
}

function backToTop () {
   player.seekTo(0);
}

function backward () {
   player.seekTo(player.getCurrentTime() - 10);
}

function forward () {
   player.seekTo(player.getCurrentTime() + 10);
}

function play() {
   if (player.getPlayerState() == 1) {
       player.pauseVideo();
       document.getElementById("playerStatus").className = "fas fa-2x fa-play";
   } else {
       player.playVideo();
       document.getElementById("playerStatus").className = "fas fa-2x fa-pause";
   }
}
