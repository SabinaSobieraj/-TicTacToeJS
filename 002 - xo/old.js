// let over = true; // PRZEPISANA W 1 LINII KODU KONSTRUKTOR
//
// const wrap = document.createElement('DIV');
// wrap.id ='game';
// document.body.appendChild(wrap);
//
// LINIA 9 KODU W KONSTRUKTOR DO 20
// const wrap =  document.getElementById('game');
// for(let i = 0, intro; i<9; i++){
//     intro = document.createElement("div");
//     intro.id = i;
//     intro.setAttribute("class","cell");
//     wrap.append(intro);
//     intro.addEventListener('click', turnClick, false);
}

let komputerGra = false;
let plansza;
let human ='O';
let computer = 'X';
let tura = 0;
const kombinacje =[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [6, 4, 2],
    [2, 5, 8],
    [1, 4, 7],
    [0, 3, 6]
];

//LINIA 17 KODU W KONSTRUKTOR DO 26
// const cells = document.querySelectorAll('.cell');  //pobieranie do array
//
// function startGame() { //tworzenie funkcji startującej grę
//     document.querySelector("#endgame").removeAttribute('show');
//     document.querySelector('#selectSym').setAttribute('show', true);
//     for (let i = 0; i < cells.length; i++) {
//         cells[i].innerText = '';
//         cells[i].style.removeProperty('background-color'); //zmiana koloru
//     }
// }

function komputerMaGrac() {
    var checkBox = document.querySelector(".computerPlay");
    komputerGra = checkBox.checked === true;
}

// ?- lub/albo - wyrażenie warunkowe

function selectSym(sym) {
    human = sym;
    computer = sym ==='O' ? 'X' :'O';
    tura = human ==='X'? 1 : 2; //1-x, 2-o
    plansza = Array.from(Array(9).keys());
    if ((computer === 'X')&& (komputerGra===true)) {
        turn(bestSpot(),computer);
    }
    document.querySelector('#selectSym').removeAttribute('show');
    over = false;
}

// LINIA 27 KODU W KONSTRUKTOR DO 46
// function turnClick(event) {
//     if(over) return;
//     const elemId = event.target.id;
//     if (typeof plansza[elemId] ==='number') { //element planszy
//         if(komputerGra === true){// opcja automatyczna komputer gra
//                 turn(elemId, human);
//                 if (!checkWin(plansza, human) && !sprawdzPola()){
//                     turn(bestSpot(), computer);
//                 }
//         }else {//opcja 2 użytkowników manualna
//             let player = tura === 1 ? 'X' : 'O'; // player jest równy x jeżeli tura jest równa 1 a jesli nie to kółko
//             tura = player === 'X' ? 2 : 1;
//             turn(elemId, player); // w turze miejsce kliknięcia i player
//             if (!checkWin(plansza, player) && !sprawdzPola()){
//                 turn(elemId, player);
//             }
//         }
//     }
// }

// LINIA 47 KODU W KONSTRUKTOR DO 53
// function turn(squareId, player) {
//     plansza[squareId] = player; // wstawienie użytkownika w pole wybrane
//     document.getElementById(squareId).innerText = player; // wpisanie textu X/O
//     let gameWon = checkWin(plansza, player);// spr czy nastąpiła wygrana
//     if (gameWon) gameOver(gameWon);// spr czy dalej można grać
//     sprawdzPola();
// }

function checkWin(board, player) {
    let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []); //concat - połączenie
    let gameWon = null;
    for (let [index, win] of kombinacje.entries()) { //for each
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = {index: index, player: player};
            break;
        }
    }
    return gameWon;
}

function gameOver(gameWon){
    for (let index of kombinacje[gameWon.index]) {
        document.getElementById(index).style.backgroundColor =
            gameWon.player === human ? "blue" : "red";
    }
    over = true;
    declareWinner(gameWon.player === human ? "Gratuluję wygranej" : "Przegrana");
}

function declareWinner(who) {//wyświetla nam jakie jest zakończenie gry
    const dd = document.querySelector("#endgame");
    dd.setAttribute('show', true);
    dd.innerText = who;
}

function emptySquares() {// odfiltrowanie pustych pol od zajetych
    return plansza.filter((elm, i) => i === elm);
}

// ruch automatyczny komputera
function bestSpot(){
    let dostepneMiejsca = emptySquares(plansza);// zebranie wolnych miejsc
    let move;   // zmienna dla ruchu losowego komputera

    let repeat = false;
    do {
        move = Math.floor(Math.random() * plansza.length);// funkcja rand losuje miedzy 0 a 8 czyli długość naszych pól
        for (let i = 0; i < dostepneMiejsca.length; i++) {
            repeat = dostepneMiejsca[i] === move;//skrócony zapis if else - jeżeli wylosowana liczba jest równa wartości wolnego pola mamy miejsce dla znaku komputera
        }
    } while (!repeat);
    return move;// zwracamy nasz wybór

}

function sprawdzPola() {//sprawdzenie dostepności wolnych pól
    if (emptySquares().length === 0){
        for (cell of cells) {
            cell.style.backgroundColor = "green";
        }
        declareWinner("remis");//jeśli wolene pola sie skończyły i nie ma wygranej X/O to remis
        return true;
    }
    return false;
}