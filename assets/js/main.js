dataManager = new DataManager();

function switchTab(target) {
    document.getElementById("play_list").style.display = "none";
    document.getElementById("search").style.display = "none";
    document.getElementById("play_list_tab").removeAttribute("class");
    document.getElementById("search_tab").removeAttribute("class");
    document.getElementById(target).style.display = "block";
    document.getElementById(target + "_tab").setAttribute("class", "is-active");
}