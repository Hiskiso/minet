
let div;
let container = document.getElementById("container");
let row = document.getElementsByClassName("row");
let btn = document.getElementById("take");
let profile_balance = document.getElementById("profile_balance");
let amount = document.getElementById("amount");
let start = document.getElementById("start");
let failscreen = document.getElementById("failscreen");
let step = 0;
const keff = [1.14 , 1.30 , 1.49 , 1.73 , 2.02 , 2.37 , 2.82 , 3.38 , 4.11 , 5.05 , 6.32 , 8.04 , 10.45 , 13.94 , 19.17 , 27.38 , 41.07 , 65,71 , 115 , 230 , 575 , 2300 ]
let balance = localStorage.getItem("currBalance");
balance = Number(balance);
profile_balance.innerHTML = "Ваш баланс : " + localStorage.getItem("currBalance")
if(localStorage.getItem("currBalance") == undefined || localStorage.getItem("currBalance") < 10 ){
    localStorage.setItem("currBalance" , 1000);
    location.reload()
}
else if(typeof localStorage.getItem("currBalance") == undefined)
{
    localStorage.setItem("currBalance" , 1000);
    location.reload()
}

function getLose(){
    failscreen.style.display = "flex";
}
start.onclick = function(){
    if(amount.value < 10){
        amount.style.border = "1px solid rgb(239, 65, 65)";
    }
    else if(amount.value > Number(localStorage.getItem("currBalance"))){
        amount.style.border = "1px solid rgb(239, 65, 65)";
    }
    else if(isNaN(amount.value)){
        amount.style.border = "1px solid rgb(239, 65, 65)";
    }
    else{
        amount.style.border = "1px solid #606c7c";
        document.getElementById('block_game').style.display = "none";
    } 
}
for (let i = 0; i < 25; i++) {
    let res = i;
    Number(res);
    res = res+1;
    div = document.createElement("div");
    div.className = "row";
    div.addEventListener('click',e => {
        if(getField.includes(res)){
            e.target.classList.add('fail')
            getLose()
            localStorage.setItem("currBalance" , balance - amount.value);

        }
        else{
            if(e.target.hasAttribute('disabled'))
            {
            }
            else{
                e.target.classList.add('sucess')
                e.target.setAttribute("disabled", "true");
                step++;
                var currentBalance = amount.value * keff[step-1];
                document.getElementById("take").style.display = "block";
                document.getElementById("step").innerHTML = "Ваши шаги : " + step;
                document.getElementById("take").innerHTML = "Забрать " + currentBalance.toFixed(0) + "р";  
            }
        }  
        btn.onclick = function(){
            localStorage.setItem("currBalance" , balance + currentBalance - amount.value);
            location.reload();
        }
    });
    container.appendChild(div);
}
const getRandom = (bombs) =>{
    var array = [];
    for (let i = 0; i < bombs; i++)
    {
        var cell = Math.floor(Math.random() * (26 - 1)) + 1;;
        array.push(cell)
    }
    return {array};
}
var getField = getRandom(3).array;

const restart = () =>{
    location.reload();
}