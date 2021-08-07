const tipBtns = document.querySelectorAll('.SelectTip-gridContainer__grid-item');
const inpBill = document.getElementById('dateBill');
inpBill.placeholder = "0.0";

tipBtns.forEach(btn => {
    btn.addEventListener('click', handleClick);
});

function handleClick(event){
    tipBtns.forEach(btn => {
        //clear active state
        btn.classList.remove('btn-active');
        //set active state 
        if(event.target.innerHTML == btn.innerHTML){
            btn.classList.add('btn-active');
            tipValue = parseFloat(btn.innerHTML)/100;
            console.log(btn.innerHTML);
        }
    });

    //clear custom tip
    // tipCustom.value = '';

    // calculateTip();

    //console.log(tipValue);
}