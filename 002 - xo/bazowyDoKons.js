
////////////////////////////////////////////////////////////////STARA SEKCJA////////////////////////////////
// const wrap =  document.getElementById('game');
// let komputerGra = false;
// let plansza;
// let human ='O';
// let computer = 'X';
// let tura = 0;
// const kombinacje =[
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 4, 8],
//     [6, 4, 2],
//     [2, 5, 8],
//     [1, 4, 7],
//     [0, 3, 6]
// ];
//
// const cells = document.querySelectorAll('.cell');  //pobieranie do array
//
// function startGame() { //tworzenie funkcji startującej grę
//     document.querySelector("#endgame").removeAttribute('show');
//     document.querySelector('#selectSym').setAttribute('show', true);
//     gameObj.refresh();
// }
//
// function komputerMaGrac() {
//     let checkBox = document.querySelector(".computerPlay");
//     komputerGra = checkBox.checked === true;
// }
//
// function selectSym(sym) {
//     human = sym;
//     computer = sym ==='O' ? 'X' :'O';
//     tura = human ==='X'? 1 : 2; //1-x, 2-o
//     plansza = Array.from(Array(9).keys());
//     if ((computer === 'X')&& (komputerGra===true)) {
//         turn(bestSpot(),computer);
//     }
//     document.querySelector('#selectSym').removeAttribute('show');
//     over = false;
// }
//
// function checkWin(board, player) {
//     let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []); //concat - połączenie
//     let gameWon = null;
//     for (let [index, win] of kombinacje.entries()) { //for each
//         if (win.every(elem => plays.indexOf(elem) > -1)) {
//             gameWon = {index: index, player: player};
//             break;
//         }
//     }
//     return gameWon;
// }
//
// function gameOver(gameWon){
//     for (let index of kombinacje[gameWon.index]) {
//         document.getElementById(index).style.backgroundColor =
//             gameWon.player === human ? "blue" : "red";
//     }
//     over = true;
//     declareWinner(gameWon.player === human ? "Gratuluję wygranej" : "Przegrana");
// }
//
// function declareWinner(who) {//wyświetla nam jakie jest zakończenie gry
//     const dd = document.querySelector("#endgame");
//     dd.setAttribute('show', true);
//     dd.innerText = who;
// }
//
// function emptySquares() {// odfiltrowanie pustych pol od zajetych
//     return plansza.filter((elm, i) => i === elm);
// }
//
// // ruch automatyczny komputera
// function bestSpot(){
//     let dostepneMiejsca = emptySquares(plansza);// zebranie wolnych miejsc
//     let move;   // zmienna dla ruchu losowego komputera
//
//     let repeat = false;
//     do {
//         move = Math.floor(Math.random() * plansza.length);// funkcja rand losuje miedzy 0 a 8 czyli długość naszych pól
//         for (let i = 0; i < dostepneMiejsca.length; i++) {
//             repeat = dostepneMiejsca[i] === move;//skrócony zapis if else - jeżeli wylosowana liczba jest równa wartości wolnego pola mamy miejsce dla znaku komputera
//         }
//     } while (!repeat);
//     return move;// zwracamy nasz wybór
//
// }
//
// function sprawdzPola() {//sprawdzenie dostepności wolnych pól
//     if (emptySquares().length === 0){
//         for (cell of cells) {
//             cell.style.backgroundColor = "green";
//         }
//         declareWinner("remis");//jeśli wolene pola sie skończyły i nie ma wygranej X/O to remis
//         return true;
//     }
//     return false;
// }
