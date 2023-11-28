let id = 0; 

for (let i = 0; i < 3; i++) {
    document.getElementById('table').innerHTML += `<tr class="border-solid border-4" id="row${i}">`;
    for (let j = 0; j < 3; j++) {
        document.getElementById(`row${i}`).innerHTML += `<td class="border-solid border-white bg-[#97affd] border-4 w-28 h-28 text-[60px] font-bold p-2" onclick="addData(this)" data-id="${j}" id="${id}"></td>`;
        id++;
    }
    document.getElementById('table').innerHTML += `</tr>`;
}

let player1 = null;
let player2 = null;
let turn = 0;
let win = null;

const patten = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
let player1arr = [];
let player2arr = [];

function getdata(e) {
    if (player1 == null) {
        player1 = e.value;
        e.style.backgroundColor = "#f5d600"
        document.getElementById("player1").innerHTML = e.value;
    } else if (player2 == null && player1 != e.value) {
        player2 = e.value;
        document.getElementById("player2").innerHTML = e.value;
        e.style.backgroundColor = "#ff5768";
    }
}

function isSubset(array1, array2) {
    let incCount = 0;

    for (let ele of array2) {
        if (array1.indexOf(ele) !== -1) {
            incCount++;
        }
    }
    console.log("inCount : ",incCount);
    return incCount >= 3 ? true : false;
}

function addData(e) {
    if (player1 != null && player2 != null) {
        if (turn % 2 == 0 && turn != 9) {
            e.innerHTML = player1;
            e.style.backgroundColor = "#f5d600"
            player1arr.push(parseInt(e.id));
            winner(e);
            turn++;
            document.getElementById(e.id).style.pointerEvents = "none";
        } else if (turn % 2 != 0 && turn != 9) {
            e.innerHTML = player2;
            e.style.backgroundColor = "#ff5768"
            player2arr.push(parseInt(e.id));
            winner(e);
            turn++;
            document.getElementById(e.id).style.pointerEvents = "none";
        }
    }
    else {
        document.getElementById('alert').style.visibility = "visible";
        setTimeout(() => {
            document.getElementById('alert').style.visibility = "hidden";
        }, 3000);
    }
}

function winner(e) {
    for (let index = 0; index < patten.length; index++) {
        if (turn % 2 == 0) {
            
            
            if (isSubset(player1arr, patten[index]) == true) {
                win = player1;
                // console.log("Turn :",turn);
                // console.log("Player1arr :",player1arr);
                // console.log("patten :",patten[index]);
                // console.log("Winner :",win);
                console.log(isSubset(player1arr,patten[index]));
                document.getElementById('box').style.visibility = "visible";
            }
            else if (turn == 8 && win == null) {
                
                matchdrow();
                console.log(isSubset(player1arr,patten[index]));
                console.log(turn);
            }
        }
        else if (turn % 2 != 0) {
            if (isSubset(player2arr, patten[index]) == true) {
                win = player2;
                document.getElementById('box1').style.visibility = "visible";
            }
        }
    }
}

function matchdrow() {
    document.getElementById("drowbox").style.visibility = "visible";
}
function nextGame() {
    document.getElementById('box').style.visibility = "hidden";
    window.location.reload();
}