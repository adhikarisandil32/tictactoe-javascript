//I bet this code can be done in simpler fashion. Because i wanted to do it by not rewriting entire code but by editing previously written code for 2 player mode. That's why it seems very lengthy.

$ = document.querySelectorAll(".box");
let click = 1;
let text = [];
let gameOver = false;
let count = 1;
let random_position;
let tempText = [];

for(i = 0; i < 9; i++){
    $[i].addEventListener("click", mainFunction);
}

document.getElementsByClassName("reset-button-container")[0].addEventListener("click", reset);

function reset(){
    click = 1;
    text = [];
    gameOver = false;
    count = 1;
    for (i = 0; i < 9; i++){
        $[i].innerText = "";
    }
    document.getElementsByClassName("win-message")[0].innerText = "";
    random_position;
    tempText = [];
}

function mainFunction(){
    boxClicked = this.classList[1];

    //valueAlreadyExists(parameter) is a function that checks if a clicked square already contains some value
    if (valueAlreadyExists(boxClicked) == true){
        if(gameOver == false){
            alert("Value Already Exists! Please Click Different Square!!");
        }
    }
    else if (valueAlreadyExists(boxClicked) == false){

        if (gameOver != true){

            if (checkForTurn(click) == "O"){
                //extract the innerText of every box class into a variable
                for(i = 1; i <= 9; i++){
                    tempText[i] = $[i-1].innerText;
                }
                
                random_position = Math.floor(Math.random()*9 + 1);

                
                //create loop until it finds a random position that is blank
                while(tempText[random_position] != ""){
                    random_position = Math.floor(Math.random()*9 + 1);
                }
                
                //and then assign "O" to that position
                tempText[random_position] = "O";

                //after that, display the whole tictactoe box
                for(i = 1; i <= 9; i++){
                    $[i-1].innerText = tempText[i];
                }
                turn = "O"; //specially required for win message
                click += 1; //stores number of clicks on empty squares
            }
            else{
                //similar to that of 2 player mode
                turn = checkForTurn(click);
                this.innerText = turn;
                click += 1; //stores number of clicks on empty squares

                //automate the computer's turn whenever click is even
                
            }
        }
    }
    //check for win
    if (checkForWin() == true){
        //display win message
        if (count == 1){ //if alert is used instead of below phrase, every click after win, still alerts, which should not be happening
            document.getElementsByClassName("win-message")[0].innerText = "Player "+turn+" Wins";
            count += 1;
        }
    }

    //if click is equal to 9 and there is no win, the game is drawn as well
    if(click == 10){ // try click == 9, try and draw a game and see
        gameOver = true;
        document.getElementsByClassName("win-message")[0].innerText = "Game Drawn";
    }
}

//returns true if value already exists else returns false
function valueAlreadyExists(value){
    if (document.getElementsByClassName(value)[0].innerText == ""){
        return false;
    }
    else{
        return true;
    }
}

//if x is odd, it's player's turn else it's computer's turn
function checkForTurn(x){
    if (x % 2 == 0){
        return "O";
    }
    else{
        return "X";
    }
}

//returns true if win else returns false
function checkForWin(){
    for (i=1; i<=9; i++){
        text[i] = $[i-1].innerText;
    }
    if ((text[1] == text[2]) && (text[2] == text[3]) && text[1] != ""){
        gameOver = true;
        return true;
    }
    else if ((text[4] == text[5]) && (text[5] == text[6]) && text[4] != ""){
        gameOver = true;
        return true;
    }
    else if ((text[7] == text[8]) && (text[8] == text[9]) && text[7] != ""){
        gameOver = true;
        return true;
    }
    else if ((text[1] == text[4]) && (text[4] == text[7]) && text[1] != ""){
        gameOver = true;
        return true;
    }
    else if ((text[2] == text[5]) && (text[5] == text[8]) && text[2] != ""){
        gameOver = true;
        return true;
    }
    else if (((text[3] == text[6]) && (text[6] == text[9]) && text[3] != "")){
        gameOver = true;
        return true;
    }
    else if ((text[1] == text[5]) && (text[5] == text[9]) && text[1] != ""){
        gameOver = true;
        return true;
    }
    else if ((text[3] == text[5]) && (text[5] == text[7]) && text[3] != ""){
        gameOver = true;
        return true;
    }
    else{
        return false;
    }
}