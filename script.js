// Selecting all required elements
const selectBox = document.querySelector(".select-box"),
selectXBtn = selectBox.querySelector(".playerX"),
selectOBtn = selectBox.querySelector(".playerO"),
playBoard = document.querySelector(".play-board"),
allBox = document.querySelectorAll("section span"),
resultBox = document.querySelector(".result-box"),
wonText = resultBox.querySelector(".won-text"),
replayBtn = resultBox.querySelector("button"),
players = document.querySelector(".players");


window.onload = () => { //once window is loaded
    for (let i = 0; i < allBox.length; i++) { //add onclick attribute in all available section's spans
        allBox[i].setAttribute("onclick","clickedBox(this)");
        
    }
}
selectXBtn.onclick = () => {
    selectBox.classList.add("hide");   //hide the slect box when playerX button is clicked
    playBoard.classList.add("show");   //show the playboard when playerX button is clicked
}
selectOBtn.onclick = () => {
    selectBox.classList.add("hide");   //hide the slect box when playerO button is clicked
    playBoard.classList.add("show");   //show the playboard when playerO button is clicked
    players.setAttribute("class","players active player");  //adding three class names in player element
}

let playerXIcon = "fas fa-times",   //class name of fontawesome cross icon
playerOIcon = "far fa-circle",   //class name of fontawesome circle icon
playerSign = "X",   //suppose player will be X
runBot = true;  //setting runBot to true as default

//user click function
function clickedBox(element){
    if(players.classList.contains("player")){ //if players element has conatined .player
        //if player will be O then we'll change the sign
        playerSign = "O"; 
        element.innerHTML = `<i class="${playerOIcon}"></i>`;   //adding circle icon tag inside user clicked element
        players.classList.remove("active");
        element.setAttribute("id", playerSign);
    }else{
        element.innerHTML = `<i class="${playerXIcon}"></i>`;   //adding cross icon tag inside user clicked element
        element.setAttribute("id", playerSign);
        players.classList.add("active");
    }
    selectWinner(); //calling function
    element.style.pointerEvents = "none"; //once user selects any box then that box can't be selected again
    playBoard.style.pointerEvents = "none";
    let randomDelayTime = ((Math.random() * 1000) + 200).toFixed(); //generating random time delay so bot will delay randomly to select box
    setTimeout(()=>{
        bot(runBot);  //calling bot function
    },randomDelayTime); //passing random delay time
}

//bot click function
function bot(){
    let array = []; //creating empty array...we'll store unselected box index in this array
    if(runBot){
        //first change the playerSign...so if user has X value in id then bot will have O
        playerSign = "O";
        for (let i = 0; i < allBox.length; i++) {
            if(allBox[i].childElementCount == 0){ //if span has no any child element
                array.push(i); //inserting unclicked or unselected boxes inside array means that span has no children
            }
        }
        let randomBox = array[Math.floor(Math.random() * array.length)]; //getting random index from array so bot will select random unselected box
        if(array.length > 0){
            if(players.classList.contains("player")){ //if players element has conatined .player
                //if user is O then the box id value will be X
                playerSign = "X";
                allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;   //adding cross icon tag inside user clicked element
                allBox[randomBox].setAttribute("id", playerSign);
                players.classList.add("active");
            }else{
                allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;   //adding circle icon tag inside user clicked element
                players.classList.remove("active");
                allBox[randomBox].setAttribute("id", playerSign);
            }
            selectWinner();
        }
        allBox[randomBox].style.pointerEvents = "none"; //once bot select any box then user can't select or click on that box
        playBoard.style.pointerEvents = "auto";
        playerSign = "X";
    }
}

//selecting the winner
function getIdVal(classname){
    return document.querySelector(".box" + classname).id;  //returning id name
}

function checkIdSign(val1, val2, val3, sign){
    if(getIdVal(val1) == sign && getClass(val2) == sign && getClass(val3) == sign){
        return true;
    }
}
function selectWinner(){ //if one combination of them is matched then select the winner
    if(
        checkIdSign(1,2,3,playerSign) ||
        checkIdSign(4,5,6,playerSign) ||
        checkIdSign(7,8,9,playerSign) ||
        checkIdSign(1,4,7,playerSign) ||
        checkIdSign(2,5,8,playerSign) ||
        checkIdSign(3,6,9,playerSign) ||
        checkIdSign(1,5,9,playerSign) ||
        checkIdSign(3,5,7,playerSign)
    ){
        //once match won by someone then stop the bot
        runBot = false;
        bot(runBot);
        setTimeout(()=>{ //we'll delay to show result box
            resultBox.classList.add("show");
            playBoard.classList.remove("show");
        },700); //700 ms delay
        wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`
    }else{
        //if match has drawn
        //first we'll check all id...if all span has id and no one won the game then we'll draw the game
        if(
            getIdVal(1) != "" && getIdVal(2) != "" && getIdVal(3) != "" && getIdVal(4) != "" && getIdVal(5) != "" && getIdVal(6) != "" && getIdVal(7) != "" && getIdVal(8) != "" && getIdVal(9) != ""
        ){
            runBot = false;
            bot(runBot);
            setTimeout(()=>{ //we'll delay to show result box
                resultBox.classList.add("show");
                playBoard.classList.remove("show");
            },700); //700 ms delay
            wonText.textContent = "Match has been drawn!";
        }
    }
}
replayBtn.onclick = () => {
    window.location.reload();
}
