const gameFunctionality = (() => {
    const winningSequences = 
    [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2]
    ]
    const X_TURN = 'X';
    const CIRCLE_TURN = 'Circle';
    let turn = false;
    const cell = document.querySelectorAll('[data-cell]');
    const gameboard = document.querySelector('.gameboard');
    const winningMessage = document.querySelector('.winning-message');
    const winningMessageText = document.querySelector('.winning-message-text');
    const restartButton = document.querySelector('.restart');

    const addListeners = () => {
        cell.forEach((cell) =>{
            cell.addEventListener('click', markCell, {once: true});
        });
    }
    const markCell = (event) =>{
        const clickedCell = event.target;
        clickedCell.classList.add(turn ? X_TURN : CIRCLE_TURN);
        const winner = checkWinner();
        if(winner){
            console.log(`${winner} is the winner!`);
            endGame(`${winner} is the winner!`);
        }
        else if(checkDraw()){
            endGame('Draw!');
        }
        else{
        swapTurn();
        addHover();
        }
    }
    const swapTurn = () =>{
        turn = !turn;
    }

    addListeners();

    //Check winner. Check to see if sequence is in winningSequences. If so, check if all have X or Circle class.
    
    const checkWinner = () => {
        for(let i = 0; i < winningSequences.length; i++){
            const [a,b,c] = winningSequences[i];
            if(cell[a].classList.contains(X_TURN)&&
            cell[b].classList.contains(X_TURN)&&
            cell[c].classList.contains(X_TURN)){
                return X_TURN;
            }
            else if(cell[a].classList.contains(CIRCLE_TURN)&&
            cell[b].classList.contains(CIRCLE_TURN)&&
            cell[c].classList.contains(CIRCLE_TURN)){
                return CIRCLE_TURN;
            }
        }
    }
    
    checkWinner();

    const checkDraw = () => {
        let i = 0;
        cell.forEach((cell) =>{
            if(cell.classList.contains(X_TURN) || cell.classList.contains(CIRCLE_TURN)){
                i++;
            }
        });
        return i == cell.length;
        }

    const endGame = (message) => {
        winningMessage.classList.add('show');
        winningMessageText.innerHTML = `${message}`;
    }

    const addHover = () => {
        gameboard.classList.remove(X_TURN);
        gameboard.classList.remove(CIRCLE_TURN);
        if(turn){
            gameboard.classList.add(X_TURN);
        }
        else{
            gameboard.classList.add(CIRCLE_TURN);
        }
    }
    addHover();

    const restart = () =>{
        restartButton.addEventListener('click', restart);
        winningMessage.classList.remove('show');
        cell.forEach((cell) =>{
            cell.classList.remove(X_TURN);
            cell.classList.remove(CIRCLE_TURN);
        });
        addListeners();
    }
    restart();

})();