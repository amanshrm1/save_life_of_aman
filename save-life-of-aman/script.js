var alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
var correctGuessMade = false;
var incorrect = 0;
var correct = 0;
var p1inputEl = $("#p1 .input");
var p2inputEl = $("#p2 .input");
var wrongLettersEl = $(".wrong_letters");
var gameNum = 0;
var array = [];

$("#p1 .button").on("click", function(){
	//Refresh Blanks on p1 button click
	$(".fill").html("");
	var p1input = p1inputEl.val().toUpperCase();
	//Refresh array
	array = [];
	//Refresh Win Condition
	correct = 0;
	//Refresh Pole
	incorrect = 0;
	$(".head").css("display", "none");
	$(".leftarm").css("display", "none");
	$(".body1").css("display", "none");
	$(".rightarm").css("display", "none");
	$(".body2").css("display", "none");
	$(".leftleg").css("display", "none");
	$(".rightleg").css("display", "none");
	//Refresh wrong letters
	$(".alphabet").html("");
	//Refresh P2 input
	p2inputEl.val("");

	//Add Blanks equal to string length of p1input
	for (var i = 1; i <= p1input.length; i++){ 
		$(".fill").append("<div class='blank'></div> ");
	}
	gameNum++;
});

$("#p2 .button").on("click", function(){
var p1input = p1inputEl.val().toUpperCase();
var p2input = p2inputEl.val().toUpperCase();
//Fill Blanks With Correct Guess, and keep correctGuessMade = true
  	for (var i = 0; i < p1input.length; i++){
  		if 	(p1input[i] == p2input){  
  		$(".fill .blank").eq(i).html(p2input);
  		correctGuessMade = true;
  		correct++;
  		}
  	}
  	if (correct == p1input.length){
  		alert("you win!")
  	}

  	//When incorrect guess is made
  	if 	(correctGuessMade == false){
  		incorrect++;
  	if (array.includes(p2input)){
  		alert("You already guessed this letter! A new body part has been added")
  	}	
  		else {
  			array.push(p2input);
  			$(".alphabet").show();
  			$(".alphabet").html(array); 	
  			$(".alphabet").css("text-decoration", "line-through");
  			$(".alphabet").css("letter-spacing", "8px");
  		}
  	console.log(array);
  	
  	//add body parts one by one	
  	if (incorrect == 1){
		$(".head").show(1000);
		$(".head").css("display", "inline");  		
  		}
  	if (incorrect == 2){
		$(".leftarm").show(1000);
		$(".leftarm").css("display", "inline");
		}
  	if (incorrect == 3){
		$(".body1").show(1000);
		$(".body1").css("display", "inline");  		
  		}  		
  	if (incorrect == 4){
		$(".rightarm").show(1000);
		$(".rightarm").css("display", "inline");
		}
	if (incorrect == 5){
		$(".body2").show(1000);
		$(".body2").css("display", "inline");
		}	
	if (incorrect == 6){
		$(".leftleg").show(1000);
		$(".leftleg").css("display", "inline");
		}  		
	if (incorrect == 7){
		$(".rightleg").show(1000);
		$(".rightleg").css("display", "inline");
		alert("One more incorrect guess and the man hangs!")
		}  		
  	if (incorrect > 7){
  		alert("you lose!");
  		}
}
	correctGuessMade = false;
});