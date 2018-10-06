    var wordList = [
        "bat","bruce","wayne","robin","superhero","comic","catwomen","taliaalgul",
        "joker","batgirl","penguin","gotham","gordon","alfred","twoface","pennyworth",
        "redwood","spolier","batwing","harold","nightrunner","lucius","fox","knight",
        "azrael","huntress","riddler","onyx","deadshot","bane","manhunter","jason",
        "blood","gun","shield","wildcat","madison","julie","vickie","ivy","poison","selina",
        "ghul","darkknight","arkham","Agatha", "alan","catherine","thomas","ethan","iman",
        "harvey","harrie","scarecrow","ninja","shot","dead","stealth","fast","fight","kyodaiken"
    ];

    var gameMode = false;
    var guessWord = "";

    /* Selects a random word from the wordList Array */ 
    function generateRandomWord() {
        return wordList[randInt(wordList.length)];
    }

    function randInt(lessThan) {
        return Math.floor(Math.random() * lessThan);
    }

    var divWord =  document.getElementById("div-word");
    var btnStartGame = document.getElementById('btn-start-game');
    var btnIntroYes = document.getElementById('btn-abt-yes');
    var container = document.getElementById("question-1");
    var btnIntroNo = document.getElementById("btn-abt-no");
    var audioElement = document.getElementById("audio");
    var winsVal =  document.getElementById("div-wins-val");
    var winsText =  document.getElementById("div-wins-text");
    var entKeyTxt =  document.getElementById("div-entered-keys");
    var entKeyVal =  document.getElementById("div-entered-keys-val");

    var totalWin = 0;
    var trackWin = [];
    var entKeyArray=[];

    btnIntroYes.onclick = function(e){
        audioElement.play();
        container.innerHTML=" You are Brave !! Let's Play - Start Your Guess";
        btnIntroYes.style.visibility = "hidden";
        btnIntroNo.innerHTML = "Cancel";
        divWord.innerHTML ="";
        entKeyArray = [];
        entKeyVal.innerHTML="";

        winsVal.innerHTML=totalWin;
        winsText.innerHTML="Wins : "

        guessWord = generateRandomWord();
        console.log(guessWord);
        for(i=0;i < guessWord.length;i++){
            trackWin.push(0);
            var div = document.createElement("div");
            div.textContent = "_";
            div.setAttribute("class", "p-2 ");
            div.setAttribute("id",("word-"+i));
            div.style.color = "rgb(221, 191, 23)";
            divWord.appendChild(div);
        }
        gameMode = true;
    }

    btnIntroNo.onclick = function(e){
        btnIntroYes.style.visibility = "hidden"; 
        btnIntroNo.style.visibility = "hidden"; 
        container.innerHTML="Come Back when you are ready to play !!";
        divWord.innerHTML ="";
        winsVal.innerHTML="";
        winsText.innerHTML=""
        audioElement.pause();
    }

    document.onkeyup = function (event){
        if(gameMode === true){
            console.log(trackWin);
            var userGuess = event.key;
            if(guessWord.indexOf(userGuess) === -1){
                console.log("wrong Alphabet");
                entKeyArray.push(userGuess);

                console.log(entKeyArray);
                entKeyTxt.innerHTML = "Key's Tried : "; 
                entKeyVal.innerHTML="";
                for(i=0;i < entKeyArray.length;i++){
                    var div2 = document.createElement("div");
                    div2.textContent = entKeyArray[i];
                    div2.setAttribute("class", "p-2 ");
                    div2.setAttribute("id",("key"+i));
                    div2.style.color = "rgb(221, 191, 23)";
                    entKeyVal.appendChild(div2);
                }
                //Update the user typed word list
            } else{
                for(i=0;i < guessWord.length;i++){
                    if(userGuess === guessWord[i]){
                        console.log('alphabet is at :' + i);
                        var word =  document.getElementById(("word-"+i));
                        word.textContent = userGuess;
                        trackWin[i] = 1;
                    }
                }
                if(trackWin.indexOf(0) === -1){
                    console.log('You Win'); 
                    btnIntroYes.style.visibility = "initial";
                    btnIntroYes.innerHTML = "Play again";
                    container.innerHTML="Good Job !! Ready for another one ??"
                    gameMode = false;
                    trackWin = [];
                    totalWin++;
                    winsVal.innerHTML=totalWin;
                    
                }
            }     
        };
    }

