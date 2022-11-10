
let div;
let container = document.getElementById("container");
let row = document.getElementsByClassName("row");
let btn = document.getElementById("take");
let profile_balance = document.getElementById("profile_balance");
let bombsEl = document.getElementById("bombs");
let amount = document.getElementById("amount");
let start = document.getElementById("start");
let failscreen = document.getElementById("failscreen");
let step = 0;
let allFields = []
let BobsFilelds = []
const keff = [1.14, 1.30, 1.49, 1.73, 2.02, 2.37, 2.82, 3.38, 4.11, 5.05, 6.32, 8.04, 10.45, 13.94, 19.17, 27.38, 41.07, 65, 71, 115, 230, 575, 2300]
let balance = localStorage.getItem("currBalance");
balance = Number(balance);

let isHack = false 
let clicks = 0
profile_balance.addEventListener("click",e=>{
    if (clicks >= 10) {
        toggleHack(allFields)
        profile_balance.innerText ="Злом очка.."
    }
    clicks++
})

function toggleHack(array){
   array.map((el)=>{
    if(BobsFilelds.includes(el.id)){
        el.el.classList.add('fail-hack')
    } else {
        el.el.classList.add('sucess-hack')
    }
   })
}

profile_balance.innerText = "Ваш баланс : " + localStorage.getItem("currBalance")
if (localStorage.getItem("currBalance") == undefined || localStorage.getItem("currBalance") < 10) {
    localStorage.setItem("currBalance", 1000);
    location.reload()
}
else if (typeof localStorage.getItem("currBalance") == undefined) {
    localStorage.setItem("currBalance", 1000);
    location.reload()
}


const bombs = (bombs) => {
    var array = [];
let bumbs = (bombs <= 0?1:bombs > 24 ? 24 : bombs)
    for (let i = 0; i < bumbs; i++) {
        var cell = Math.floor(Math.random() * (25 - 1)) + 1;

        if (!array.includes(cell)) {
            array.push(cell)
        } else i--
    }
    return { array }
}

function play() {
    const amountValue = amount.value || 10
    let bombsCount = bombsEl.value || 1
    let getField = bombs(bombsCount).array
    BobsFilelds = getField
    
    function getLose(e) {
        e.target.classList.add('fail')
        failscreen.style.display = "flex";
        localStorage.setItem("currBalance", balance - amountValue);
        
        
    }
   

    for (let i = 0; i < 25; i++) {
        div = document.createElement("div");
        div.className = "row";
        div.addEventListener('click', e => {
            e.target.classList.remove('fail-hack')
            e.target.classList.remove('sucess-hack')
            if (getField.includes(i)) {
               
                getLose(e)
               

            }
            else {
                if (!e.target.hasAttribute('disabled')) {
                    e.target.classList.add('sucess')
                    e.target.setAttribute("disabled", "true");
                    step++;
                    var currentBalance = Math.round(amountValue * ((step - 24) / (24 - 1) * (20 - 1) + 20) * ((bombsCount - 24) / (24 - 1) * (500 - 1) + 500));
                    document.getElementById("take").style.display = "block";
                    document.getElementById("step").innerHTML = "Ваши шаги : " + step;
                    document.getElementById("take").innerHTML = "Забрать " + currentBalance + "р";
                }
            }
            btn.onclick = function () {
                localStorage.setItem("currBalance", balance + currentBalance - Number(bombsCount));
                location.reload();
            }
        });

        allFields.push({el:div, id: i})

        container.appendChild(div);
    }



}

start.onclick = function () {

    
    if (amount.value < 10) {
        amount.style.border = "1px solid rgb(239, 65, 65)";
    }
    else if (amount.value > balance) {
        amount.style.border = "1px solid rgb(239, 65, 65)";
    }
    else if (isNaN(amount.value)) {
        amount.style.border = "1px solid rgb(239, 65, 65)";
    }
    else {
        amount.style.border = "1px solid #606c7c";
        document.getElementById('block_game').style.display = "none";
        start.disabled = true
        play()
    }
    
  
}




// (1 - 100) / (100 - 0) * (255 - 0) + 255
const restart = () => {
    location.reload();
}
