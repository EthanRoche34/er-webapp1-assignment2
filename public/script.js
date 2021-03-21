
function showHide() {
  let readMoreDiv = document.getElementById("readmore");
  if (readMoreDiv.style.display === "block") {
    readMoreDiv.style.display = "none";
  } else {
    readMoreDiv.style.display = "block";
  }
}
function welcomeUser() {
  let username = prompt("What's your name?");
  let welcomeUserDiv = document.getElementById("welcomeuser");
  welcomeUserDiv.style.display = "block";
  document.getElementById("welcomeuser").innerHTML =
    "<p> Hello, " +
    username +
    ", We hope you enjoy this app! Click this message to close it.</p>";
  welcomeUserDiv.style.cursor = "pointer";
}

function hideWelcome() {
  let welcomeUserDiv = document.getElementById("welcomeuser");
  if (welcomeUserDiv.style.display === "block") {
    welcomeUserDiv.style.display = "none";
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

$(function(){  //Based on code from https://www.codexworld.com/add-datepicker-to-input-field-jquery-ui/
  $("#datepicker").datepicker({
      dateFormat: "MM d, yy", 
      changeMonth: true,
      changeYear: true,
      yearRange: "-40:+40"
  });
});
