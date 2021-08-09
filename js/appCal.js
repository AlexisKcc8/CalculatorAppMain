


const errorMsg = document.querySelector('.textZero');

//--------------------------------INPUTS---------------------------
//input bill
const inpBill = document.getElementById('dateBill');
//input custom
const inpCustom = document.getElementById('custom');
//input people
const inpPeople = document.getElementById('numberPeople');
//-----------------------------------------------------------------

//botones de porcentaje
const tipBtns = document.querySelectorAll('.SelectTip-gridContainer__grid-item');

//boton de reset
const btnReset = document.querySelector('.btn-reset')

//---------------------------SHOW RESULTS---------------------------
//contenedores de los resultados
const result_AmountTip = document.querySelector('.content-amout__result')
const result_Total = document.querySelector('.content-totalPerson__result')
//-----------------------------------------------------------------


inpBill.placeholder = "0.0";
result_AmountTip.textContent = `$${0.0}`;
result_Total.textContent = `$${0.0}`;

let billValue = 0.0; //default value
let tipValue = 1; //default value -> 15% button is active
let peopleValue = 1;

inpPeople.placeholder = peopleValue;
inpPeople.value = peopleValue;


function validateFloat(s){
    var rgx = /^[0-9]*\.?[0-9]*$/;
    return s.match(rgx);
}

function validateInt(s){
    var rgx = /^[0-9]*$/;
    return s.match(rgx);
}

inpBill.addEventListener('input', ()=>{
    if (inpBill.value.includes(',')){
        inpBill.value = inpBill.value.replace(',', '.');
    }

    if(!validateFloat(inpBill.value)){
        inpBill.value = inpBill.value.substring(0, inpBill.value.length-1);
    }
    billValue = parseFloat(inpBill.value);
    AmountTip();
});
inpCustom.addEventListener('input', ()=>{
    if(!validateInt(inpCustom.value)){
        inpCustom.value = inpCustom.value.substring(0, inpCustom.value.length-1);
    }
    
    tipValue = parseFloat(inpCustom.value);

    //remove active state from buttons
    tipBtns.forEach(btn => {
        btn.classList.remove('btn-active');
    });

    if(inpCustom.value !== ''){
        AmountTip();
    }
});

inpPeople.addEventListener('input',()=>{
    if(!validateInt(inpPeople.value)){
        inpPeople.value = inpPeople.value.substring(0, inpPeople.value.length-1);
    }

    peopleValue = parseFloat(inpPeople.value);

    if(peopleValue <= 0){
        errorMsg.style.display = "inline-block";
        setTimeout(function(){
            errorMsg.style.display = "none";
        }, 3000);
    }

    AmountTip();
});

tipBtns.forEach(btn => {
    btn.addEventListener('click', ()=>{
        tipBtns.forEach(btn => {
            //clear active state
            btn.classList.remove('btn-active');
            //set active state 
            if(event.target.innerHTML == btn.innerHTML){
                btn.classList.add('btn-active');
                tipValue = parseFloat(btn.innerHTML);
                let ejemplo = "5%";
                console.log(ejemplo);
                console.log(parseFloat(ejemplo));
                console.log(tipValue)
            }
        });
        //clear custom tip
        inpCustom.value = '';

        AmountTip();
    });
});


btnReset.addEventListener('click', ()=>{
    result_AmountTip.textContent = `$${0.0}`;
    result_Total.textContent = `$${0.0}`;

    inpPeople.value = 1;
    inpBill.value = '';
    inpCustom.value = '';
})

function AmountTip(){
    let tip = ((billValue * tipValue)/100)/peopleValue;
    let total = (billValue/peopleValue) + tip;
    result_AmountTip.textContent = `$${tip.toFixed(2)}`;
    result_Total.textContent = `$${total.toFixed(2)}`;
}