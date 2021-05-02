
function showHide() {
  let readMoreDiv = document.getElementById("readmore");
  if (readMoreDiv.style.display === "block") {
    readMoreDiv.style.display = "none";
  } else {
    readMoreDiv.style.display = "block";
  }
}
function userStats() {
  let userStatsDiv = document.getElementById("userstats");
  if (userStatsDiv.style.display === "block") {
    userStatsDiv.style.display = "none";
  } else {
    userStatsDiv.style.display = "block";
  }
}

function getRating() {
  let userRating = parseInt(prompt("Rate this subgenre (from 1 to 5 stars)"));
  if (userRating>5 || userRating<1 || isNaN(userRating)){
    alert("Try again with a number between 1 and 5!");
  }
  else{
    $("#rating").html("You gave a rating of: ");
    for (let i=0; i < userRating; i++){
        $("#rating").append("<i class='yellow star icon'></i>");
    }
  }
}

$(".delgame").click(() => confirm('Really delete this game?'))
$(".delcategory").click(() => confirm('Really delete this category?'))
