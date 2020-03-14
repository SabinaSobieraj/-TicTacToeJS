let over = true;
let imieGraczaInput;
let komputerGra = false;
let plansza;
let human ='N';
let computer = 'X';
let tura = 0;
let cells;
let graczPierwszy;
let graczDrugi;
let graczegraja;
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

let GameObj = function (){
    this.selectSym();

};

GameObj.prototype = {

    selectSym: function(sym){
        human = sym;
        computer = sym ==='O' ? 'X' :'O';
        tura = human ==='X'? 1 : 2; //1-x, 2-o
        if(!komputerGra && graczegraja )this.wpiszgraczy();
        if (human ==='O'|| human ==='X'){
            document.querySelector('#selectSym').removeAttribute('show');
            this.createPlane();
        }
        plansza = Array.from(Array(9).keys());//utworzenie pustej planszy 9 elementowej ?
        if ((computer === 'X')&& (komputerGra===true)) {
            this.turn(this.bestSpot(),computer);
        }
        over = false;
    },

    wpiszgraczy: function(){
        graczPierwszy = document.getElementById('pl-0').value;
        graczDrugi = document.getElementById('pl-1').value;
    },

    komputerMaGrac: function(){
        let checkBoxComp = document.querySelector(".computerPlay");
        let checkBoxPlayer = document.querySelector(".humanPlay");


        checkBoxPlayer.checked = !checkBoxComp.checked;

        komputerGra = checkBoxComp.checked;
        graczegraja = checkBoxPlayer.checked;
        this.imieGracza();
    },

    graczeMajaGrac: function(){
        let checkBoxComp = document.querySelector(".computerPlay");
        let checkBoxPlayer = document.querySelector(".humanPlay");


        checkBoxComp.checked = !checkBoxPlayer.checked;

        komputerGra = checkBoxComp.checked;
        graczegraja = checkBoxPlayer.checked;
        this.imieGracza();
    },

    imieGracza: function(){
        const wrappl =  document.getElementById('gracze');
        console.log(imieGraczaInput);
        console.log(komputerGra);
        if ((imieGraczaInput === undefined )|| !komputerGra){
            for (let i = 0, intro; i < 2; i++) {
                intro = document.createElement("input");
                intro.id = 'pl-'+i;
                intro.setAttribute("class", "inputpl");
                intro.setAttribute("value", "Imie Gracza " + i);
                wrappl.append(intro);
                // intro.addEventListener('click', this.nextTurnClick, false);
            }

            imieGraczaInput = document.querySelectorAll('.inputpl');
            wrappl.object = this;
        }else {
            if (!(imieGraczaInput === undefined )){
                for (let i = 0, ii=imieGraczaInput.length; i < ii; i++) {
                    imieGraczaInput[i].remove();
                }
            }
        }
    },

    bestSpot: function(){
        let dostepneMiejsca = this.emptySquares(plansza);// zebranie wolnych miejsc
        let move;   // zmienna dla ruchu losowego komputera

        let repeat = false;
        do {
            move = Math.floor(Math.random() * plansza.length);// funkcja rand losuje miedzy 0 a 8 czyli długość naszych pól
            for (let i = 0; i < dostepneMiejsca.length; i++) {
                repeat = dostepneMiejsca[i] === move;//skrócony zapis if else - jeżeli wylosowana liczba jest równa wartości wolnego pola mamy miejsce dla znaku komputera
            }
        } while (!repeat);
        return move;// zwracamy nasz wybór

    },

    createPlane: function(){
        const wrap =  document.getElementById('game');
        for(let i = 0, intro; i<9; i++){
            intro = document.createElement("div");
            intro.id = i;
            intro.setAttribute("class","cell");
            wrap.append(intro);
            intro.addEventListener('click', this.nextTurnClick, false);
        }
        cells = document.querySelectorAll('.cell');
        wrap.object = this;
    },

    refresh: function(){
        if (!(cells === undefined )){
            for (let i = 0, ii=cells.length; i < ii; i++) {
            cells[i].innerText = '';
            cells[i].remove();
            }
        }

        if(!(imieGraczaInput === undefined)){
            for (let i = 0, ii=imieGraczaInput.length; i < ii; i++) {
                imieGraczaInput[i].innerText = '';
                imieGraczaInput[i].remove();
            }
        }

        plansza = 0;
        let checkBoxComp = document.querySelector(".computerPlay");
        let checkBoxPlayer = document.querySelector(".humanPlay");

        checkBoxPlayer.checked = false;
        checkBoxComp.checked = false;
    },

    turn: function (squareId, player) {
        plansza[squareId] = player; // wstawienie użytkownika w pole wybrane
        document.getElementById(squareId).innerText = player; // wpisanie textu X/O
        let gameWon = this.checkWin(plansza, player);// spr czy nastąpiła wygrana
        if (gameWon) this.gameOver(gameWon);// spr czy dalej można grać
        this.sprawdzPola();
    },

    checkWin: function(board, player){
        let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []); //concat - połączenie
        let gameWon = null;
        for (let [index, win] of kombinacje.entries()) { //for each
            if (win.every(elem => plays.indexOf(elem) > -1)) {
                gameWon = {index: index, player: player};
                break;
            }
        }
        return gameWon;
    },

    gameOver: function (gameWon) {
        for (let index of kombinacje[gameWon.index]) {
            document.getElementById(index).style.backgroundColor =
                gameWon.player === human ? "blue" : "red";
        }
        over = true;
        this.declareWinner(gameWon.player === human ? "Gratuluję wygranej" : "Przegrana");
    },

    sprawdzPola: function () {
        if (this.emptySquares().length === 0){
            for (let cell of cells) {
                cell.style.backgroundColor = "green";
            }
            this.declareWinner("remis");//jeśli wolene pola sie skończyły i nie ma wygranej X/O to remis
            return true;
        }
        return false;
    },

    emptySquares: function () {
        return plansza.filter((elm, i) => i === elm);
    },

    startGame: function () {
        document.querySelector("#endgame").removeAttribute('show');
        document.querySelector('#selectSym').setAttribute('show', true);
        this.refresh();
    },

    nextTurnClick: function (event){
        if(over) return;
        const elemId = event.target.id;
        if (typeof plansza[elemId] ==='number') { //element planszy
            if(komputerGra === true){// opcja automatyczna komputer gra
                gameObj.turn(elemId, human);
                if (!gameObj.checkWin(plansza, human) && !gameObj.sprawdzPola()){
                    gameObj.turn(gameObj.bestSpot(), computer);
                }
            }else {//opcja 2 użytkowników manualna
                let player = tura === 1 ? 'X' : 'O'; // player jest równy x jeżeli tura jest równa 1 a jesli nie to kółko
                tura = player === 'X' ? 2 : 1;
                gameObj.turn(elemId, player); // w turze miejsce kliknięcia i player
                if (!gameObj.checkWin(plansza, player) && !gameObj.sprawdzPola()){
                    gameObj.turn(elemId, player);
                }
            }
        }
    },

    declareWinner: function (who) {
        who2 = who === 'remis' ? '': graczPierwszy;
        const dd = document.querySelector("#endgame");
        dd.setAttribute('show', true);
        dd.innerText = who + "\n" + who2 ;
    }

};

const gameObj = new GameObj();