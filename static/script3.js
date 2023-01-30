

// Default Calci

function default_calci() {

    let calcis_btns = {1:'ba',2:'bb',3:'bc',4:'bd',5:'be'}

    try {
        var calci = JSON.parse(localStorage.getItem('calci'));
        // console.log(calci);
    }
    catch(err) {
        console.log(err.message)
    }

    if (calci) {
        // console.log(calci, ' from Local Storage');
        document.getElementById(calcis_btns[calci]).click();
    }
    else {
        calci = 1;
        document.getElementById(calcis_btns[calci]).click();
        // console.log(calcis_btns[calci])
    }
}



// Date and Time:

function startTime() {
    
    const today = new Date();
    let d = today.getDate();
    let mon = today.getMonth();
    let y = today.getFullYear();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    h = checkTime(h);
    m = checkTime(m);
    s = checkTime(s);

    mon = checkMonth(mon);
    d = checkDate(d);
    // t = timer();

    // In JavaScript, the First January is number 0 , that's why add 1 to month

    document.getElementById('date').innerHTML =  `${d}-${mon}-${y}`;
    // document.getElementById('date_today').value =  `${y}-${mon+1}-${d}`;
    document.getElementById('time_hours').innerHTML = `${h}`;
    document.getElementById('time_minutes').innerHTML = `${m}`;
    document.getElementById('time_seconds').innerHTML = `${s}`;

    // document.getElementById('tx1').innerHTML = `00:00:${t}`;

    // setTimeout(startTime, 0); //The setTimeout() method calls a function after a number of milliseconds.
    // 1 second = 1000 milliseconds.
//     The setTimeout() is executed only once.
// If you need repeated executions, use setInterval() instead.
    // setInterval(startTime, 0); 
    setTimeout(() => startTime(), 1000);
// Use the clearTimeout() method to prevent the function from starting.
}

function checkTime(i) {
    // i = i + 1;
    if (i < 10) {i = "0"+i};
    return i;
}

function checkMonth(i) {
    i = i + 1;
    if (i < 10) {i = "0"+i};
    return i;
}

function checkDate(i) {
if (i < 10) {i = "0" + i}; 
return i;
}

function checkt(i) {
    return i;
}

function timer() {
for (let j = 0; j <10; j++){
    return j;
    // j = j;
}
return j;
}



// Calendar

let currentDate = new Date();
currentMonth = currentDate.getMonth();
currentYear = currentDate.getFullYear();

const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
const months_dict = { 'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5, 'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11 };

icons = document.querySelectorAll('.icons');
// var previous = document.getElementById('previous');
// var next = document.getElementById('next');
month_ele = document.getElementById('month');
year_ele = document.getElementById('year');
ul = document.querySelector(".days");



function calendar() {
    document.getElementById('calendar').style.display = 'block';
    document.querySelector('.calendar_icon').classList.add('active');

    // document.getElementById('calendar_icon').style.background = 'white';

    let lastdateofPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
    let lastdateofCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    let firstdayofCurrentMonth = new Date(currentYear, currentMonth, 1).getDay();
    let lastdayofPrevMonth = new Date(currentYear, currentMonth, lastdateofCurrentMonth).getDay();
    
    let today = currentDate.getDate();

    // console.log(lastdayofPrevMonth)
    // console.log(month_ele.innerHTML)
    // console.log(months[currentMonth])

    lihtml = '';

    for (let i = firstdayofCurrentMonth; i > 0; i--) {
        // console.log(i)
        lihtml += `<li class='inactive'>${lastdateofPrevMonth - i + 1}</li>`;
    }
    
    for (let i = 1; i <= lastdateofCurrentMonth; i++) {
        if (i === today && (currentMonth===new Date().getMonth()) && (currentYear===new Date().getFullYear())) {
            lihtml += `<li class='active'>${i}</li>`;
        }
        else {
            lihtml += `<li>${i}</li>`;
        }
    }


    for (let i = lastdayofPrevMonth; i < 6; i++) {
        // console.log(i)
        lihtml += `<li class='inactive'>${i-lastdayofPrevMonth + 1}</li>`;
    }

    ul.innerHTML = lihtml

    month_ele.value = months[currentMonth];
    // month_ele.innerHTML = months[currentMonth];
    year_ele.innerHTML = currentYear;
}

icons.forEach(icon => {
    icon.addEventListener('click', () => {
        // console.log(icon.id);
        // console.log(currentMonth);
        // if (currentMonth == 11 && icon.id === 'next') {
        //     currentMonth = 0
        //     calendar();
        // }
        // else if (currentMonth == 0 && icon.id === 'previous') {
        //     currentMonth = 11
        //     calendar();
        // }
        currentMonth = icon.id === 'next' ? currentMonth + 1 : currentMonth - 1;
            
        if (currentMonth < 0 || currentMonth > 11) {
            let currentDate = new Date(currentYear,currentMonth);
            currentMonth = currentDate.getMonth();
            currentYear = currentDate.getFullYear();
            // currentMonth = 0
            // calendar();
        }
        // else if (currentMonth == 0 && icon.id === 'previous') {
        //     currentMonth = 11
        //     calendar();
        // }
        // else {
        // }
        calendar();

    })
})


function month_change() {
    month = document.getElementById('month').value;
    // console.log(month);
    currentMonth = months_dict[month];
    // console.log(currentMonth)
    calendar();
}


function calendar_close() {
    document.getElementById('calendar').style.display = 'none';
    document.querySelector('.calendar_icon').classList.remove('active');
}


//Make the DIV element draggagle:

dragElement(document.getElementById("calendar"));
// dragElement(document.getElementById("basic_calculator"));

function dragElement(elmnt) {
    elmnt.style.transition = 'none';
    elmnt.style.animation = 'none';
    // elmnt.style.right = '0';
    // right:0;

    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    // if (document.getElementById(elmnt.id + "header")) {
    //     // if present, the header is where you move the DIV from:
    //     document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;

    if (document.getElementById(elmnt.id)) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id).onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}




// Dark Mode


function dark(){
    var ele = document.querySelector(':root');
    var toggleswitch = document.getElementById("dark-cb").checked;
    var label = document.getElementById("dark-container");

    // Know the value of variable defined in CSS

    // var eles = getComputedStyle(ele);
    // const co1 = eles.getPropertyValue('--primary-color')
    // const co2 = eles.getPropertyValue('--secondary-color')
    // console.log(co1,co2)

    if (toggleswitch == true) {
        // ele.style.setProperty('--darkicon',"url('images/sun.svg')");
        // label.style.backgroundPosition = "left";
        // ele.style.setProperty('--sun-moon',"url('images/moon.svg')");
        try {
            primary_color = JSON.parse(localStorage.getItem('--primary-color'));
        }
        catch (err) {
            console.log(err.message)
        }

        if (primary_color) {
            primary_color = primary_color;
        }
        else {
            primary_color = 'black';
        }

        ele.style.setProperty('--darkicon', "url('./Assets/sun.svg')");
        label.style.backgroundPosition = "left";
    
        ele.style.setProperty('--primary-color',primary_color);
        ele.style.setProperty('--secondary-color', "white");
        ele.style.setProperty('--cagrtable', "#26412f");
        ele.style.setProperty('--compoundtable', "#034242");
        ele.style.setProperty('--emitable', "#2d3a54");
            
        ele.style.setProperty("--dark-ball", '#1f85f2');

        ele.style.setProperty("--nav-background", '#012135');
        ele.style.setProperty("--nav-a-hover", '#a6d6f4');        
    }

    else {
        // ele.style.setProperty('--sidenav', "#e1f1e5");

        ele.style.setProperty('--darkicon',"url('./Assets/moon.svg')");
        label.style.backgroundPosition = "right";
        // ele.style.setProperty('--sun-moon',"url('images/sun.svg')");
        ele.style.setProperty('--primary-color',"white");
        ele.style.setProperty('--secondary-color',"black");
        ele.style.setProperty('--cagrtable', "#e1f1e5");
        ele.style.setProperty('--compoundtable', "#c9e3f3");
        ele.style.setProperty('--emitable', "#d8e1fa");

        ele.style.setProperty("--dark-ball", '#1f85f2');


        ele.style.setProperty("--nav-background", '#a6d6f4');
        ele.style.setProperty("--nav-a-hover", '#012135');
    }
    
}


// function dark() {
//     // var element = document.body;
//     // element.classList.toggle("dark");
    
//     var cb_dark = document.getElementById('dark-cb').checked;
//     var ele = document.querySelector(':root');

//     if (cb_dark == true) {
//         ele.style.setProperty("--primary-color", 'black');
//         // ele.style.setProperty("--primary-color", '#012135');
//         ele.style.setProperty("--secondary-color", 'white');
//         ele.style.setProperty("--dark-ball", '#1f85f2');
//         ele.style.setProperty("--symbol-border", '#077dc7');
//         ele.style.setProperty("--theme", '#077dc7');
//         ele.style.setProperty("--nav-background", '#012135');
//         ele.style.setProperty("--nav-a-hover", '#a6d6f4');
//     }
//     else {
//         ele.style.setProperty("--primary-color", 'white');
//         // ele.style.setProperty("--secondary-color", '#012135');
//         ele.style.setProperty("--secondary-color", 'black');
//         ele.style.setProperty("--dark-ball", '#1f85f2');
//         ele.style.setProperty("--symbol-border", '#02263d');
//         ele.style.setProperty("--theme", '#02263d');
//         ele.style.setProperty("--nav-background", '#a6d6f4');
//         ele.style.setProperty("--nav-a-hover", '#012135');
//     }

//     // console.log(cb_dark)
// }


// Pin and Unpin:

function pin_and_unpin_(pin,id) {
    // console.log(pin)
    var pin_and_unpin = document.getElementById(pin);
    // console.log(pin_and_unpin)
    var src = pin_and_unpin.src.split('/').slice(-1)[0];
    var ele = document.getElementById(id);

    if (id == 'nav') {
        if (src == 'push_pin_unfilled.svg') {
            // console.log('unfilled')
            pin_and_unpin.src = '../static/Assets/push_pin_filled.svg';

            // var current_width = ele.offsetWidth;
            // console.log(current_width)

            // ele.style.width = `${current_width}px`;

            // document.body.style.marginLeft = '150px';
            document.getElementsByTagName('footer')[0].style.left='270px';
            // console.log(foot)
            
            ele.style.width = '250px';
            ele.style.alignItems = 'flex-end';
       
            spans = ele.getElementsByTagName('span');
        
            for (let i = 0; i < spans.length; i++) {
                spans[i].style.visibility = 'visible';
                spans[i].style.display = 'flex';
            }

            // console.log('a d', a)
            // document.querySelectorAll('span').style.display='flex';
        }
        else {
            pin_and_unpin.src = '../static/Assets/push_pin_unfilled.svg';

            var current_width = ele.offsetWidth;
            // console.log(current_width)

            // document.body.style.marginLeft = '0px';
            // ele.style.width = `${current_width}px`;
            document.getElementsByTagName('footer')[0].style.left='82px';
            ele.style.width = '60px';
            ele.style.alignItems = 'center';
       
            spans = ele.getElementsByTagName('span');
        
            for (let i = 0; i < spans.length; i++) {
                spans[i].style.visibility = 'hidden';
                spans[i].style.display = 'none';
            }

        }
    }

    else if (id == 'basic_calculator') {

        if (src == 'push_pin_unfilled1.svg') {
            // console.log('unfilled')
            pin_and_unpin.src = '../static/Assets/push_pin_filled1.svg';
                        
            document.getElementById('calci').style.display = 'block';
            // document.getElementById('result_cont').style.display = 'block';
            ele.style.width = 'auto';
            ele.style.height = '200px';
            // ele.style.backgroundColor = '#077dc7';
            // ele.style.backgroundImage = 'none';
    
            // ele.style.mask = 'none';
            // ele.style.maskImage = 'none';
            ele.style.webkitMaskImage = 'none';
            ele.style.transition = 'all 1s';
            ele.style.animation = 'none';
        }

        else {
            pin_and_unpin.src = '../static/Assets/push_pin_unfilled1.svg';
           
            document.getElementById('calci').style.display = 'none';
            // document.getElementById('result_cont').style.display = 'none';
            ele.style.width = '15px';
            ele.style.height = '15px';
            // ele.style.backgroundColor = '#077dc7';
            // ele.style.backgroundImage = 'url(../static/Assets/calci.svg)';

            // ele.style.mask = 'none';
            // ele.style.maskImage = 'url(./images/calci.svg)';
            ele.style.webkitMaskImage = 'url(../static/Assets/calci.svg)';

            ele.style.transition = 'width 1s';
            // ele.style.animation = 'none';
        }
   
    }
}


// Themes

// function theme() {
//     var theme = localStorage.getItem('--primary-color')
//     document.documentElement.style.setProperty('--primary-color',theme);
// }


function theme1() {
    document.documentElement.style.setProperty('--primary-color', "black");
    localStorage.setItem('--primary-color', JSON.stringify('black'));
}

function theme2() {
    document.documentElement.style.setProperty('--primary-color', '#012135');
    localStorage.setItem('--primary-color', JSON.stringify('#012135'));
}

function theme3() {
    document.documentElement.style.setProperty('--primary-color', "#3b0101");
    localStorage.setItem('--primary-color', JSON.stringify('#3b0101'));
}





// Basic Calculator

var input = document.getElementById('calci_result');
input.addEventListener('keypress',function(e){
    if(e.key === 'Enter'){
        // console.log('enter')
        e.preventDefault();
        document.getElementsByClassName('equal')[0].click();
    }
})


// function basic_calculator() {

var result = document.getElementById('calci_result');
numbers = document.getElementsByClassName('numbers_btns');
operators_btns = document.getElementsByClassName('operators_btns');
equal = document.getElementsByClassName('equal')[0];
clear = document.getElementsByClassName('clear')[0];

resultDisplayed = false;


for (var i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener("click", function (e) {
        val = e.target.innerText;
        var currentString = result.value;
        var lastChar = currentString[currentString.length - 1];
        // console.log(lastChar)

        if (resultDisplayed === false) {
            result.value += val;
            // input.innerHTML += e.target.innerHTML;
        }
        else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "*" || lastChar === "÷" || lastChar === "/") {
            resultDisplayed = false;
            result.value += val;
        }
        else {
            // if result is currently displayed and user pressed a number
            // we need to clear the input string and add the new input to start the new operation
            resultDisplayed = false;
            result.value = "";
            result.value += val;
        }

    })
}


for (var i = 0; i < operators_btns.length; i++) {
    operators_btns[i].addEventListener("click", function (e) {
        val = e.target.innerText;
        // result.value += val;
        // result.innerText = val;
        // console.log()

        var currentString = result.value;
        var lastChar = currentString[currentString.length - 1];

        // if last character entered is an operator, replace it with the currently pressed one
        if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "*" || lastChar === "÷" || lastChar === "/") {
            var newString = currentString.substring(0, currentString.length - 1) + e.target.innerText;
            result.value = newString;
        } else if (currentString.length == 0) {
            // if first key pressed is an opearator, don't do anything
            console.log("enter a number first");
        } else {
            // else just add the operator pressed to the input
            result.value += val;
        }
    })
}


try {
    equal.addEventListener("click", function () {

        // this is the string that we will be processing eg. -10+26+33-56*34/23
        var inputString = result.value;
    
        // forming an array of numbers. eg for above string it will be: numbers = ["10", "26", "33", "56", "34", "23"]
        var numbers = inputString.split(/\+|\-|\×|\*|\÷|\//g);
    
        // forming an array of operators. for above string it will be: operators = ["+", "+", "-", "*", "/"]
        // first we replace all the numbers and dot with empty string and then split
        var operators = inputString.replace(/[0-9]|\./g, "").split("");
    
        // console.log(inputString);
        // console.log(operators);
        // console.log(numbers);
        // console.log("----------------------------");
    
        // now we are looping through the array and doing one operation at a time.
        // first divide, then multiply, then subtraction and then addition
        // as we move we are alterning the original numbers and operators array
        // the final element remaining in the array will be the output
    
        var divide = operators.indexOf("÷");
        while (divide != -1) {
            numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
            operators.splice(divide, 1);
            divide = operators.indexOf("÷");
        }

        var divide1 = operators.indexOf("/");
        while (divide1 != -1) {
            numbers.splice(divide1, 2, numbers[divide1] / numbers[divide1 + 1]);
            operators.splice(divide1, 1);
            divide1 = operators.indexOf("/");
        }
    
        var multiply = operators.indexOf("×");
        while (multiply != -1) {
            numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
            operators.splice(multiply, 1);
            multiply = operators.indexOf("×");
        }

        var multiply1 = operators.indexOf("*");
        while (multiply1 != -1) {
            numbers.splice(multiply1, 2, numbers[multiply1] * numbers[multiply1 + 1]);
            operators.splice(multiply1, 1);
            multiply1 = operators.indexOf("*");
        }
    
        var subtract = operators.indexOf("-");
        while (subtract != -1) {
            numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
            operators.splice(subtract, 1);
            subtract = operators.indexOf("-");
        }
    
        var add = operators.indexOf("+");
        while (add != -1) {
            // using parseFloat is necessary, otherwise it will result in string concatenation :)
            numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
            operators.splice(add, 1);
            add = operators.indexOf("+");
        }
    
        result.value = numbers[0]; // displaying the output
    
        resultDisplayed = true; // turning flag if result is displayed
    });
  
    // clearing the input on press of clear
    clear.addEventListener("click", function () {
        result.value = "";
    })
}

catch (err) {
    console.log(err.message)
}



// Financial Calculators:

// Forward , Backward:

icons = document.querySelectorAll('.icons1');
const scroll = document.getElementById('but');
forward = document.getElementById('forward');
backward = document.getElementById('backward')

// console.log(slide.le\\)

function handleicons() {
    const scroll_value = scroll.scrollLeft;
    const maxscrollWidth = scroll.scrollWidth - scroll.clientWidth;
    // console.log(maxscrollWidth,scroll_value)
    scroll_change = (scroll_value / maxscrollWidth) * 100;
    // console.log(scroll_change)
    backward.style.display = scroll_value > 0 ? 'flex':'none';
    // backward.style.display = scroll_value > 38 ? 'flex' : 'none';
    // backward.style.display = scroll_change>=1 ? 'flex' : 'none';
    // forward.style.display = maxscrollWidth>scroll_value  ? 'flex': 'none';
    forward.style.display = scroll_change<36 ? 'flex': 'none';
}

icons.forEach(icon => {
    icon.addEventListener('click', function (e) {
        // console.log(icon.id) 
        scroll.scrollLeft += icon.id === 'backward' ? -280 : 280;
        // handleicons();
        setTimeout(() => handleicons(), 50);
    })
})




// Financial Calculators

// 1. CAGR Calculator:


let calci = 1;

a = document.getElementById("Cagr")
b = document.getElementById("Compound")
c = document.getElementById("emi")
d = document.getElementById("TAX")

// document.getElementById("Compound").style.display="none"
// document.getElementById("emi").style.display="none"

function cagrb() {

    // Change the toggle button color:

    calci = 1
    
    localStorage.setItem('calci', JSON.stringify(1));

    var ele = document.querySelector(':root');
    // Know the value of variable defined in CSS
    // var eles = getComputedStyle(ele);
    // const co = eles.getPropertyValue('--togglecolor')
    // console.log(co)
    ele.style.setProperty('--togglecolor',"green");
    ele.style.setProperty('--navcolor', "#e1f1e5");

    // var toggleswitch = document.getElementById("darkmodeicon").checked;
    // if (toggleswitch == true) {
    //     ele.style.setProperty('--formcolor', "#e1f1e5");
    // }

    document.getElementById("pie1").style.visibility = "hidden";  
    document.getElementById("piechart1").style.visibility = "hidden";
    
    document.getElementById("pie2").style.visibility = "hidden";  
    document.getElementById("piechart2").style.visibility = "hidden";
  
    document.getElementById("pieh").style.visibility ="hidden";

    document.getElementById("cagrh").innerText = "CAGR Calculator";
    document.getElementById("cagrh").style.color = "green";
    document.getElementById("ba").style.backgroundColor = "green";  
    document.getElementById("bb").style.backgroundColor = "grey";    
    document.getElementById("bc").style.backgroundColor = "grey";
    document.getElementById("bd").style.backgroundColor = "grey";   
    document.getElementById("be").style.backgroundColor = "grey";
    

    document.getElementById("CAGR_Cont").style.display = "block";
    document.getElementById("COMPOUND_Cont").style.display = "none";
    document.getElementById("EMI_Cont").style.display = "none";
    document.getElementById("TAX_Cont").style.display = "none";
    document.getElementById("BROKERAGE_Cont").style.display = "none";
    
    document.getElementById("investment").style.borderColor = "green";
    document.getElementById("currentvalue").style.borderColor = "green";   
    // document.getElementById("Compound").style.display="block"    
    document.getElementById('piechart').style.visibility = 'hidden';

}


function CAGR() {
    
    var i,f,p;
    i = document.getElementById("investment").value;
    f = document.getElementById("currentvalue").value;
    p = document.getElementById("myrange").value;

    var cagr = ((((f / i) ** (1 / p)) - 1) * 100);
    var cagr = Number(cagr.toFixed(2));

    // alert(typeof cagr)

    if (!Number.isNaN(cagr) && Number.isFinite(cagr)) {
        document.getElementById("CAGR").innerText = cagr;
    }
}


function CAGRFunction() {

    var cb = document.getElementById("cbstartfrom").checked;
    
    if (cb == false) {
        const currentYear = new Date().getFullYear();
        var array = [currentYear];
        // console.log("false");
    }

    else {
        var startyear = document.getElementById("startfrom").value;  
        startyear = parseInt(startyear)
        var array = [startyear];
        // console.log("not false");
    }

    var marray = [];
    var size = parseInt(document.getElementById("myrange").value);
    var p = parseFloat(document.getElementById("investment").value);
    let cagr = parseFloat(document.getElementById("CAGR").value).toFixed(2);
    // var fv = parseFloat(document.getElementById("currentvalue").value);

    const table = document.getElementById("cagrtable");
    table.innerHTML = "<tr><th>S. No</th><th>Year</th><th>Growth</th><th>Final Amount</th></tr>";
    /* <th>Principle</th> */
    // var data =  document.getElementById("cagrbody");
    for (let i = 0; i < (size+1); i++) {
        var year = array[i] + 1;
        array.push(year);
        // p.push();
        // fv.push();
        // console.log(array)
        // table.innerHTML = "<tr><td>Year 1</td><td>$10,000 x 5%</td><td style='font-weight:700'>$500</td><td>$10,500</td></tr>";
        // table.detach();
        // table.innerHTML = "<thead><th>Year</th><th>Principle</th><th>Interest</th><th>Final Amount</th></thead>";

        // Inserting Rows
        var row = table.insertRow(-1);

        // Inserting Cells
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);

        // Inserting values

        if (i == 0) {
            // console.log(1)
            cell1.innerHTML = i;
            cell2.innerHTML = "Initial";
            cell3.innerHTML = "-";
            cell4.innerHTML = p;
        }

        else {
            var a, b;
            cell1.innerHTML = i
            cell2.innerHTML = array[i-1];
            b = Number(parseFloat(table.rows[i].cells[3].innerHTML).toFixed(2));
            cell3.innerHTML = Number(parseFloat((cagr*b/100)).toFixed(2)); //Number((parseFloat(table.rows[i].cells[2].innerHTML)).toPrecision(3)) * (cagr / 100);
            cell4.innerHTML = Number((b + ((cagr * b) / 100)).toFixed(2));//100+parseFloat(table.rows[i].cells[3].innerHTML);
            // console.log(cagr)

            var max1 = Number(parseFloat(table.rows[i + 1].cells[3].innerHTML).toFixed(2));

            marray.push(max1);

            }
    }
    var maxarray = Math.max(...marray);
    // console.log(maxarray)

    if (max1 == maxarray) {
        if (Number.isFinite(maxarray)) {
            table.rows[size+1].cells[3].style.color = "white";
            table.rows[size + 1].cells[3].style.backgroundColor = "green";
            // table.rows[size + 1].cells[3].style.position = "sticky";
            // table.rows[size+1].cells[3].style.zIndex = "1";
            }
    }

    // document.querySelector(".scrollabletable").style = "overflow-y:auto;height:100%;"
    // console.log(tabl)
    // <div class = "scrollabletable" style="overflow-y:auto;height:100%;">

}



// 2. Compound Interest Calculator:


function compoundb() {

    calci = 2
    localStorage.setItem('calci', JSON.stringify(2));
    
    // Change the toggle button color:

    var ele = document.querySelector(':root');
    // Know the value of variable defined in CSS
    // var eles = getComputedStyle(ele);
    // const co = eles.getPropertyValue('--togglecolor')
    // console.log(co)

    ele.style.setProperty('--togglecolor',"#0377c0");
    ele.style.setProperty('--navcolor', "#c9e3f3");

    // var toggleswitch = document.getElementById("darkmodeicon").checked;
    // if (toggleswitch == true) {
    //     ele.style.setProperty('--formcolor', "#c9e3f3");
    // }

    // document.getElementById("piechart").style.border = "3px solid var(--secondary)";    
    document.getElementById("pie1").style.border = "3px solid var(--secondary)";   
    document.getElementById("pie1").style.visibility = "visible";  
    document.getElementById("piechart1").style.visibility = "visible"; 

    // document.getElementById("pie2").style.border = "3px solid var(--secondary)"    
    document.getElementById("pie2").style.visibility = "hidden";  
    document.getElementById("piechart2").style.visibility = "hidden";
    
    document.getElementById("pieh").style.visibility ="visible";
    document.getElementById("pieh").innerText = "Compound Interest vs Final Amount";

    // document.getElementsByTagName("tr")[0].style.borderColor = "red";
   
    // document.getElementById("FA").style.color="#0377c0"    
    // document.getElementById("COMPOUND").style.color="#0377c0"    

    document.getElementById("cagrh").innerText="Compound Interest Calculator"    
    document.getElementById("cagrh").style.color = "#0377c0";
    document.getElementById("ba").style.backgroundColor = "grey";
    document.getElementById("bb").style.backgroundColor = "#0377c0";    
    document.getElementById("bc").style.backgroundColor = "grey";  
    document.getElementById("bd").style.backgroundColor = "grey";
    document.getElementById("be").style.backgroundColor = "grey"; 
    
    // document.getElementById("Compound").style.display = "flex"    
    // document.getElementById("Cagr").style.display="none"
    // document.getElementById("EMI").style.display = "none"    
    
    document.getElementById("COMPOUND_Cont").style.display = "block";
    document.getElementById("CAGR_Cont").style.display = "none";
    document.getElementById("EMI_Cont").style.display = "none";
    document.getElementById("TAX_Cont").style.display = "none";
    document.getElementById("BROKERAGE_Cont").style.display = "none";
    
    
    document.getElementById("investment").style.borderColor = "blue"; 
    document.getElementById("currentvalue").style.borderColor = "blue";   
    // document.getElementById("Compound").style.display="block"    
    document.getElementById('piechart').style.visibility = 'hidden';

}



function COMPOUND() {

    var p, r, n;
    var dict1 = { "Yearly": 1, "Half Yearly": 2, "Quarterly": 4, "Monthly": 12, "Weekly": 52.1429, "Daily": 365 }
    
    p = document.getElementById("principle").value;
    r = document.getElementById("rate").value;
    r = r / 100;
    t = document.getElementById("myrange1").value;
    ce = document.getElementById("ce").value;
    n = dict1[ce]

    var Final = parseFloat(p * (1 + (r / n)) ** (n * t)).toFixed(3)
    var compound = parseFloat(Final-p).toFixed(3)

    // Number to currency Formatting
    
    let compound1 = new Intl.NumberFormat("en-IN", {
        // style: "currency",
        // currency:"INR"
    }).format(compound)

    let Final1 = new Intl.NumberFormat("en-IN", {
        // style: "currency"
        // currency:"INR"
    }).format(Final)

    if (!Number.isNaN(Final)) {
        document.getElementById("FA").innerText = Final1;
        if (!Number.isNaN(compound)) {
            document.getElementById("COMPOUND").innerText = compound1;
        }
    }
}




function CompoundFunction() {

    var cb = document.getElementById("cbstartfrom1").checked;
    
    if (cb == false) {
        const currentYear = new Date().getFullYear();
        var array = [currentYear];
        // console.log("false");
    }

    else {
        var startyear = document.getElementById("startfrom1").value;  
        startyear = parseInt(startyear)
        var array = [startyear];
        // console.log("not false");
    }


    const dict1 = { "Yearly": 1, "Half Yearly": 2, "Quarterly": 4, "Monthly": 12, "Weekly": 52.1429, "Daily": 365 }

    var size = parseInt(document.getElementById("myrange1").value);
    var p = parseFloat(document.getElementById("principle").value);
    var r = parseFloat(document.getElementById("rate").value);
    // r = r / 100;
    var ce = document.getElementById("ce").value;
    var size = size*dict1[ce]
    
    // console.log(size)

    // console.log(typeof p)
    // let cagr = parseFloat(document.getElementById("compound").value).toFixed(2);
    // var fv = parseFloat(document.getElementById("currentvalue").value);

    const table = document.getElementById("compoundtable");
    table.innerHTML = "<tr><th>S.No</th><th>Year</th><th>Principle</th><th>Interest</th><th>Final Amount</th></tr>";

    // dict2 = {12:}
    var marray = [];
    // var data =  document.getElementById("cagrbody");
    for (let i = 0; i < size; i++) {
        var year = array[i] + 1;
        array.push(year);
        // p.push();
        // interest.push();
        // console.log(array)
        // table.innerHTML = "<tr><td>Year 1</td><td>$10,000 x 5%</td><td style='font-weight:700'>$500</td><td>$10,500</td></tr>";
        // table.detach();
        // table.innerHTML = "<thead><th>Year</th><th>Principle</th><th>Interest</th><th>Final Amount</th></thead>";

        // Inserting Rows
        const row = table.insertRow(-1);

        // Inserting Cells
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        const cell5 = row.insertCell(4);

        // Inserting values
        if (i == 0) {
            // console.log(1)
            cell1.innerHTML = i+1;
            cell2.innerHTML = array[i];
            cell3.innerHTML = p;

            a = Number((parseFloat(table.rows[1].cells[2].innerHTML)).toFixed(2));
            b = Number((parseFloat(r*p/100)).toFixed(2));
            // console.log(typeof a)

            cell4.innerHTML = Number(parseFloat(r*p/100).toFixed(2));
            cell5.innerHTML = a+b;
            // cell4.innerHTML = p[i] + interest[i];
        }
        else {
            // console.log(1)
            cell1.innerHTML = i+1;
            cell2.innerHTML = array[i];

            c = Number((parseFloat(table.rows[i].cells[4].innerHTML)).toFixed(2));
            // console.log(c)

            cell3.innerHTML = c;
            e = cell4.innerHTML = Number(parseFloat((c*r)/100).toFixed(2));

            d = Number((parseFloat(table.rows[i+1].cells[2].innerHTML)).toFixed(2));
            // e = Number((parseFloat(table.rows[i].cells[2].innerHTML)).toFixed(2));
            // console.log(typeof c)

            // console.log(b)
            cell5.innerHTML = parseFloat(d+e).toFixed(2);//Number((parseFloat(table.rows[i].cells[2].innerHTML)).toFixed(2));

            var max1 = Number((parseFloat(table.rows[i + 1].cells[4].innerHTML)).toFixed(2));

            marray.push(max1);
            // console.log(max1)

            }
    }
    var maxarray = Math.max(...marray);
    // console.log(maxarray)

    if (max1 = maxarray) {
        if (Number.isFinite(maxarray)) {
            table.rows[size].cells[4].style.color = "white";
            table.rows[size].cells[4].style.backgroundColor = "#0377c0";
            }
    }
    // console.log(fmax)
    // 

}



// 3. EMI Calculator:


function emib() {


    calci = 3 
    localStorage.setItem('calci', JSON.stringify(3));
    
    // Change the toggle button color:

    var ele = document.querySelector(':root');
    // Know the value of variable defined in CSS
    // var eles = getComputedStyle(ele);
    // const co = eles.getPropertyValue('--togglecolor')
    // console.log(co)
    ele.style.setProperty('--togglecolor',"#5880ed");
    ele.style.setProperty('--navcolor', "#cfdbfc");

    // var toggleswitch = document.getElementById("darkmodeicon").checked;
    // if (toggleswitch == true) {
    //     ele.style.setProperty('--formcolor', "#cfdbfc");
    // }


    // document.getElementById("pie").style.visibility = "hidden"; 
    // document.getElementById("piechart").style.visibility="hidden"    
    document.getElementById("pieh").style.visibility ="visible";
    document.getElementById("pieh").innerText="Interest vs Loan Amount";

    document.getElementById("cagrh").innerText = "EMI Calculator";    
    document.getElementById("cagrh").style.color = "#5880ed";
    document.getElementById("ba").style.backgroundColor = "grey"; 
    document.getElementById("bb").style.backgroundColor = "grey";
    document.getElementById("bc").style.backgroundColor = "#5880ed";
    document.getElementById("bd").style.backgroundColor = "grey"; 
    document.getElementById("be").style.backgroundColor = "grey";   

    // document.getElementById("Cagr").style.display="none"
    // document.getElementById("Compound").style.display="none"
    // document.getElementById("EMI").style.display = "inline"

    document.getElementById("EMI_Cont").style.display = "block";
    document.getElementById("CAGR_Cont").style.display = "none";
    document.getElementById("COMPOUND_Cont").style.display = "none";
    document.getElementById("TAX_Cont").style.display = "none";
    document.getElementById("BROKERAGE_Cont").style.display = "none";  


    // document.getElementById('piechart').style.display = 'none';
    // document.getElementById('piechart').style.visibility = 'hidden';

    // document.getElementById("pie2").style.border = "3px solid var(--secondary)"    
    document.getElementById("pie1").style.visibility = "hidden";  
    document.getElementById("piechart1").style.visibility = "hidden";

    document.getElementById("pie2").style.border = "3px solid var(--secondary)";    
    document.getElementById("pie2").style.visibility = "visible";  
    document.getElementById("piechart2").style.visibility = "visible";
}


function EMI() {
    
    var p, r, n;
    // var dict1 = { "Yearly": 1, "Half Yearly": 2, "Quarterly": 4, "Monthly": 12, "Weekly": 52.1429, "Daily": 365 }
    
    p = document.getElementById("loan").value;
    r = document.getElementById("Interest").value;
    r = (r / 100)/12;
    n1 = document.getElementById("myrange2").value;
    n=n1*12
    // ce = document.getElementById("ce").value;
    // n = dict1[ce]

    var EMI = parseFloat((p * r * ((1 + r) ** n)) / (((1 + r) ** n) - 1)).toFixed(3);
    var TA = parseFloat(EMI * 12 * n1).toFixed(3);
    var TI = parseFloat(TA-p).toFixed(3);

    // Number to currency Formatting
    
    let EMI1 = new Intl.NumberFormat("en-IN", {
        // style: "currency",
        // currency:"INR"
    }).format(EMI)

    let TA1 = new Intl.NumberFormat("en-IN", {
    }).format(TA)

    let TI1 = new Intl.NumberFormat("en-IN", {
    }).format(TI)
    
    // console.log(EMI,EMI1)

    if (!isNaN(EMI)) {
        document.getElementById("EMI1").innerText = EMI1;
    }
    if (!isNaN(TA)) {
        document.getElementById("TA").innerText = TA1;
    }
    if (!isNaN(TI)) {
        document.getElementById("TI").innerText = TI1;
    }
}


function EmiFunction() {

    var cb = document.getElementById("cbstartfrom2").checked;
    const longmonths = { 1: 'January', 2: 'February', 3: 'March', 4: 'April', 5: 'May', 6: 'June', 7: 'July', 8: 'August', 9: 'September', 10: 'October', 11: 'November', 0: 'December' };

    if (cb == false) {
        var date = new Date();
    }

    else {
    var date = new Date(document.getElementById("startfrom2").value);
    }

    var loan = parseInt(document.getElementById("loan").value);
    var r = parseFloat(document.getElementById("Interest").value);
    var n = parseFloat(document.getElementById("myrange2").value);
    var emi = document.getElementById("EMI1").value;

    r = (r/100)/12;

    emi = Number(emi.replaceAll(",", ""));
    
    var ce = document.getElementById("ce").value;
    let months = n * 12;
 
    const table = document.getElementById("emitable");
    table.innerHTML = "<tr><th>S.No</th><th>Month</th><th>Beginning Amount</th><th>Remaining Amount</th><th>Principle</th><th>Interest</th><th>End Balance</th></tr>";


    var marray = [];
    // console.time();
    // var data =  document.getElementById("cagrbody");
    for (let i = 0; i < months; i++) {

        // Inserting Rows
        const row = table.insertRow(-1);

        // Inserting Cells
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        const cell5 = row.insertCell(4);
        const cell6 = row.insertCell(5);
        const cell7 = row.insertCell(6);

        // for (let j = 1; j < 12; j++){
        //     var a = date.getMonth()+1+j;
        // }
        // console.log(a)

        date.setMonth(date.getMonth()+1);
        mon = date.getMonth();

        mon = longmonths[mon]; 
        // date = date.getDate();

        // Inserting values
        if (i == 0) {
            // console.log(1)
            cell1.innerHTML = i+1;
            cell2.innerHTML = mon;
            cell3.innerHTML = loan;
            cell4.innerHTML = parseFloat(loan-emi).toFixed(2);
            cell6.innerHTML = parseFloat(loan*r).toFixed(2);
            cell5.innerHTML = parseFloat(emi-table.rows[1].cells[5].innerText).toFixed(2);
            cell7.innerHTML = parseFloat(table.rows[1].cells[2].innerText - table.rows[1].cells[4].innerText).toFixed(2);
            // cell5.innerHTML = parseFloat(emi-table.rows[1].cells[5].innerText).toFixed(2);

            // a = Number((parseFloat(table.rows[1].cells[2].innerHTML)).toFixed(2));
            // b = Number((parseFloat(loan*r)).toFixed(2));
            // console.log(typeof interest)

            // cell4.innerHTML = Number(parseFloat(r*p/100).toFixed(2));
            // cell5.innerHTML = a+b;
            // cell4.innerHTML = p[i] + interest[i];
        }
        else {
            // console.log(1)
            cell1.innerHTML = i + 1;
            cell2.innerHTML = mon;
            var endbalace = parseFloat(table.rows[i].cells[6].innerText).toFixed(2);
            
            if (endbalace<=0) {
                cell3.innerHTML = 0;
            }
            else {
                cell3.innerHTML = endbalace;
            }

            var amount = parseFloat(table.rows[i].cells[3].innerText - emi).toFixed(2);
            if (amount<=0){
                cell4.innerHTML = 0;
            }
            else {
                cell4.innerHTML = amount;
            }
            cell6.innerHTML = parseFloat(endbalace*r).toFixed(2);
            cell5.innerHTML = parseFloat(emi-table.rows[i+1].cells[5].innerText).toFixed(2);
            cell7.innerHTML = parseFloat(table.rows[i+1].cells[2].innerText - table.rows[i+1].cells[4].innerText).toFixed(2);

            // var min1 = Number((parseFloat(table.rows[i].cells[6].innerHTML)).toFixed(2));
            // console.log(min1)
            // marray.push(min1);

        }
        // i++;
    }
    // setTimeout(EmiFunction, 1000);
    // console.timeEnd();


    // var maxarray = Math.min(...marray);
    // // console.log(maxarray)

    // if (max1 = maxarray) {
    //     if (Number.isFinite(maxarray)) {
    //         table.rows[size].cells[4].style.color = "white";
    //         table.rows[size].cells[4].style.backgroundColor = "#0377c0";
    //         }
    // }
    // console.log(fmax)
    // 

}


// 4. TAX Calculator:


function taxb() {

    calci = 4
    localStorage.setItem('calci', JSON.stringify(4));
    
    // Change the toggle button color:

    var ele = document.querySelector(':root');
    // Know the value of variable defined in CSS
    // var eles = getComputedStyle(ele);
    // const co = eles.getPropertyValue('--togglecolor')
    // console.log(co)

    ele.style.setProperty('--togglecolor',"#2352a8");
    ele.style.setProperty('--navcolor', "#c9e3f3");

    // var toggleswitch = document.getElementById("darkmodeicon").checked;
    // if (toggleswitch == true) {
    //     ele.style.setProperty('--formcolor', "#c9e3f3");
    // }

    // document.getElementById("piechart").style.border = "3px solid var(--secondary)";    
    document.getElementById("pie1").style.border = "3px solid var(--secondary)";  
    document.getElementById("pie1").style.visibility = "visible";  
    document.getElementById("piechart1").style.visibility = "visible";

    // document.getElementById("pie2").style.border = "3px solid var(--secondary)"    
    // document.getElementById("pie2").style.visibility = "hidden";  
    // document.getElementById("piechart2").style.visibility = "hidden";
    
    document.getElementById("pieh").style.visibility ="hidden";
    // document.getElementById("pieh").innerText = "Compound Interest vs Final Amount";

    // document.getElementsByTagName("tr")[0].style.borderColor = "red";
   
    // document.getElementById("FA").style.color="#0377c0"    
    // document.getElementById("COMPOUND").style.color="#0377c0"    

    document.getElementById("cagrh").innerText = "TAX Calculator"; 
    document.getElementById("cagrh").style.color = "#2352a8";
    document.getElementById("ba").style.backgroundColor = "grey";
    document.getElementById("bb").style.backgroundColor = "grey";    
    document.getElementById("bc").style.backgroundColor = "grey";
    document.getElementById("bd").style.backgroundColor = "#2352a8"; 
    document.getElementById("be").style.backgroundColor = "grey"; 
    
    // document.getElementById("Compound").style.display = "flex"    
    // document.getElementById("Cagr").style.display="none"
    // document.getElementById("EMI").style.display = "none"    
    
    document.getElementById("COMPOUND_Cont").style.display = "none";
    document.getElementById("CAGR_Cont").style.display = "none";
    document.getElementById("EMI_Cont").style.display = "none";
    document.getElementById("TAX_Cont").style.display = "block";
    document.getElementById("BROKERAGE_Cont").style.display = "none";  
    
    document.getElementById("investment").style.borderColor = "blue"; 
    document.getElementById("currentvalue").style.borderColor = "blue";   
    // document.getElementById("Compound").style.display="block"    
    // document.getElementById('piechart').style.visibility = 'hidden';

}



function TAX() {

    // var p, r, n;
    // var dict1 = { "Yearly": 1, "Half Yearly": 2, "Quarterly": 4, "Monthly": 12, "Weekly": 52.1429, "Daily": 365 }
    
    gross_income = document.getElementById("Income").value;
    deductions = document.getElementById('Deductions').value;
    
    total_deductions = document.getElementById('total_deductions')
    net_taxable_income = document.getElementById('net_taxable_income');
    income_tax = document.getElementById('income_tax');
    surcharge = document.getElementById('surcharge');
    cess = document.getElementById('cess');
    
    tax_payable = document.getElementById('tax_payable');

// Tax Calculations:

    total_deductions_value = deductions;
    net_taxable_income_value = gross_income - deductions;

// Income Tax:
    // Income Slab Tax Rate
    // Up to 2.5 lakhs No tax
    // 2.5 lakhs to 5 lakhs 5%
    // 5 lakhs to 7.5 lakhs 10%
    // 7.5 lakhs to 10 lakhs 15%
    // 10 lakhs to 12.5 lakhs 20%
    // 12.5 lakhs to 15 lakhs 25%
    // Above 15 lakhs 30 %
    
// Surcharge:
// In India, a surcharge of 10% is levied if an individual’s income is more than Rs. 50 Lakhs 
// and a surcharge of 15 % is levied if the individual’s income is more than Rs 1 crore.
// In case of companies, it is levied if the income is more than Rs. 1 Crore.

    congrats_cont = document.getElementsByClassName('congrats_cont')[0];


    if (net_taxable_income_value > 0 && net_taxable_income_value <= 250000) {
        income_tax_value = 0
        surcharge_value = 0
        cess_value = 0.04 * (income_tax_value + surcharge_value);
    }
    else if (net_taxable_income_value > 250000 && net_taxable_income_value <= 500000) {
        // if (net_taxable_income_value == 500000) {
        //     income_tax_value = 12500
        // }
        // else{
        income_tax_value = 0
        // }

        surcharge_value = 0
        cess_value = 0.04 * (income_tax_value+ surcharge_value);
    }
    else if (net_taxable_income_value > 500000 && net_taxable_income_value <= 750000) {
        // if (net_taxable_income_value == 750000) {
        //     income_tax_value = 12500+25000
        // }
        // else{
        income_tax_value = 12500 + (net_taxable_income_value-500000) * 0.1;
        // }
        
        surcharge_value = 0
        cess_value = 0.04 * (income_tax_value+ surcharge_value);
    }
    else if (net_taxable_income_value > 750000 && net_taxable_income_value <= 1000000) {
        income_tax_value = 12500 + 25000 + (net_taxable_income_value-750000) * 0.15;
        surcharge_value = 0
        cess_value = 0.04 * (income_tax_value+ surcharge_value);
    }
    else if (net_taxable_income_value > 1000000 && net_taxable_income_value <= 1250000) {
        income_tax_value = 12500 + 25000 + 37500 + (net_taxable_income_value-1000000) * 0.2;
        surcharge_value = 0
        cess_value = 0.04 * (income_tax_value+ surcharge_value);
    }
    else if (net_taxable_income_value > 1250000 && net_taxable_income_value <= 1500000) {
        income_tax_value = 12500 + 25000 + 37500 + 50000 +(net_taxable_income_value-1250000) * 0.25;
        surcharge_value = 0
        cess_value = 0.04 * (income_tax_value+ surcharge_value);
    }
    else{
        income_tax_value = 12500 + 25000 + 37500 + 50000 + 62500 +(net_taxable_income_value-1500000) * 0.30;
        
        if (net_taxable_income_value > 5000000) {
            surcharge_value = income_tax_value * 0.1;
        }
        else if(net_taxable_income_value > 10000000) {
            surcharge_value = income_tax_value * 0.15;
        }
        cess_value = 0.04 * (income_tax_value+ surcharge_value);
    }

    tax_payable_value = income_tax_value + (cess_value+surcharge_value);

    if (tax_payable_value == 0 && (gross_income>0)) {
        congrats_cont.classList.add('display');
    }
    else {
        congrats_cont.classList.remove('display');
    }

// Number to currency Formatting
    let  net_taxable_income_value1 = new Intl.NumberFormat("en-IN", {}).format(net_taxable_income_value);
    let  total_deductions_value1 = new Intl.NumberFormat("en-IN", {}).format(total_deductions_value);
    let income_tax_value1 = new Intl.NumberFormat("en-IN", {}).format(income_tax_value);
    let surcharge_value1 = new Intl.NumberFormat("en-IN", {}).format(surcharge_value);
    let cess_value1 = new Intl.NumberFormat("en-IN", {}).format(cess_value);
    let tax_payable_value1 = new Intl.NumberFormat("en-IN", {}).format(tax_payable_value);
    

    net_taxable_income.innerText = net_taxable_income_value1;
    total_deductions.innerText = total_deductions_value1;

    income_tax.innerText = income_tax_value1
    surcharge.innerText = surcharge_value1;
    cess.innerText = cess_value1;

    tax_payable.innerText = tax_payable_value1;
    
    // let Final1 = new Intl.NumberFormat("en-IN", {
    //     // style: "currency"
    //     // currency:"INR"
    // }).format(Final)

    // if (!Number.isNaN(Final)) {
    //     document.getElementById("FA").innerText = Final1;
    //     if (!Number.isNaN(compound)) {
    //         document.getElementById("COMPOUND").innerText = compound1;
    //     }
    // }
}




function TAXFunction() {

    var cb = document.getElementById("cbstartfrom1").checked;
    
    if (cb == false) {
        const currentYear = new Date().getFullYear();
        var array = [currentYear];
        // console.log("false");
    }

    else {
        var startyear = document.getElementById("startfrom1").value;  
        startyear = parseInt(startyear)
        var array = [startyear];
        // console.log("not false");
    }


    const dict1 = { "Yearly": 1, "Half Yearly": 2, "Quarterly": 4, "Monthly": 12, "Weekly": 52.1429, "Daily": 365 }

    var size = parseInt(document.getElementById("myrange1").value);
    var p = parseFloat(document.getElementById("principle").value);
    var r = parseFloat(document.getElementById("rate").value);
    // r = r / 100;
    var ce = document.getElementById("ce").value;
    var size = size*dict1[ce]
    
    // console.log(size)

    // console.log(typeof p)
    // let cagr = parseFloat(document.getElementById("compound").value).toFixed(2);
    // var fv = parseFloat(document.getElementById("currentvalue").value);

    const table = document.getElementById("compoundtable");
    table.innerHTML = "<tr><th>S.No</th><th>Year</th><th>Principle</th><th>Interest</th><th>Final Amount</th></tr>";

    // dict2 = {12:}
    var marray = [];
    // var data =  document.getElementById("cagrbody");
    for (let i = 0; i < size; i++) {
        var year = array[i] + 1;
        array.push(year);
        // p.push();
        // interest.push();
        // console.log(array)
        // table.innerHTML = "<tr><td>Year 1</td><td>$10,000 x 5%</td><td style='font-weight:700'>$500</td><td>$10,500</td></tr>";
        // table.detach();
        // table.innerHTML = "<thead><th>Year</th><th>Principle</th><th>Interest</th><th>Final Amount</th></thead>";

        // Inserting Rows
        const row = table.insertRow(-1);

        // Inserting Cells
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        const cell5 = row.insertCell(4);

        // Inserting values
        if (i == 0) {
            // console.log(1)
            cell1.innerHTML = i+1;
            cell2.innerHTML = array[i];
            cell3.innerHTML = p;

            a = Number((parseFloat(table.rows[1].cells[2].innerHTML)).toFixed(2));
            b = Number((parseFloat(r*p/100)).toFixed(2));
            // console.log(typeof a)

            cell4.innerHTML = Number(parseFloat(r*p/100).toFixed(2));
            cell5.innerHTML = a+b;
            // cell4.innerHTML = p[i] + interest[i];
        }
        else {
            // console.log(1)
            cell1.innerHTML = i+1;
            cell2.innerHTML = array[i];

            c = Number((parseFloat(table.rows[i].cells[4].innerHTML)).toFixed(2));
            // console.log(c)

            cell3.innerHTML = c;
            e = cell4.innerHTML = Number(parseFloat((c*r)/100).toFixed(2));

            d = Number((parseFloat(table.rows[i+1].cells[2].innerHTML)).toFixed(2));
            // e = Number((parseFloat(table.rows[i].cells[2].innerHTML)).toFixed(2));
            // console.log(typeof c)

            // console.log(b)
            cell5.innerHTML = parseFloat(d+e).toFixed(2);//Number((parseFloat(table.rows[i].cells[2].innerHTML)).toFixed(2));

            var max1 = Number((parseFloat(table.rows[i + 1].cells[4].innerHTML)).toFixed(2));

            marray.push(max1);
            // console.log(max1)

            }
    }
    var maxarray = Math.max(...marray);
    // console.log(maxarray)

    if (max1 = maxarray) {
        if (Number.isFinite(maxarray)) {
            table.rows[size].cells[4].style.color = "white";
            table.rows[size].cells[4].style.backgroundColor = "#0377c0";
            }
    }
    // console.log(fmax)
    // 

}


// 5. BROKERAGE Calculator:

function brokerageb() {


    calci = 5
    localStorage.setItem('calci', JSON.stringify(5));
    
    // Change the toggle button color:

    var ele = document.querySelector(':root');
    // Know the value of variable defined in CSS
    // var eles = getComputedStyle(ele);
    // const co = eles.getPropertyValue('--togglecolor')
    // console.log(co)
    ele.style.setProperty('--togglecolor',"#018c7e");
    ele.style.setProperty('--navcolor', "#9df5ec");

    // var toggleswitch = document.getElementById("darkmodeicon").checked;
    // if (toggleswitch == true) {
    //     ele.style.setProperty('--formcolor', "#cfdbfc");
    // }


    // document.getElementById("pie").style.visibility = "hidden"; 
    // document.getElementById("piechart").style.visibility="hidden"    
    document.getElementById("pieh").style.visibility ="hidden";
    // document.getElementById("pieh").innerText="Interest vs Loan Amount";

    document.getElementById("cagrh").innerText = "BROKERAGE Calculator";  
    document.getElementById("cagrh").style.color = "#018c7e";
    document.getElementById("ba").style.backgroundColor = "grey";
    document.getElementById("bb").style.backgroundColor = "grey"; 
    document.getElementById("bc").style.backgroundColor = "grey";
    document.getElementById("bd").style.backgroundColor = "grey"; 
    document.getElementById("be").style.backgroundColor = "#018c7e"; 

    // document.getElementById("Cagr").style.display="none"
    // document.getElementById("Compound").style.display="none"
    // document.getElementById("EMI").style.display = "inline"

    document.getElementById("EMI_Cont").style.display = "none";
    document.getElementById("CAGR_Cont").style.display = "none";
    document.getElementById("COMPOUND_Cont").style.display = "none";
    document.getElementById("TAX_Cont").style.display = "none";
    document.getElementById("BROKERAGE_Cont").style.display = "block";


    // document.getElementById('piechart').style.display = 'none';
    // document.getElementById('piechart').style.visibility = 'hidden';

    // document.getElementById("pie2").style.border = "3px solid var(--secondary)"    
    document.getElementById("pie1").style.visibility = "hidden";  
    document.getElementById("piechart1").style.visibility = "hidden";

    document.getElementById("pie2").style.border = "3px solid var(--secondary)"; 
    document.getElementById("pie2").style.visibility = "visible";  
    document.getElementById("piechart2").style.visibility = "visible";
}



function get_charges(buy,sell,qty,instrument) {

    // console.log(buy,sell,instrument)

    BROKERAGE_Charges = { 'Futures': 20, 'Options': 20, 'Intraday': 0.0003, 'Delivery': 0 }; // on Turnover
    STT_Charges = { 'Futures': 0.01, 'Options': 0.05, 'Intraday': 0.025, 'Delivery': 0.1 }; //on buy and sell for Equity, sell for all
    EXCHANGE_Charges = { 'Futures': 0.002, 'Options': 0.053, 'Intraday': 0.00345, 'Delivery': 0.00345 }; // on Turnover
    GST_Charges = 18; // on brokerage + SEBI charges + transaction charges
    STAMP_Charges = { 'Futures': 0.002, 'Options': 0.003, 'Intraday': 0.003, 'Delivery': 0.015 }; // on buy

    Turnover = parseFloat(((buy + sell) * qty).toFixed(3));
    SEBI = parseFloat((Turnover * 10 / (10000000)).toFixed(3));
    var dp_charges = 0;

    if (instrument == 'Intraday') {
        BROKERAGE = parseFloat((BROKERAGE_Charges[instrument] * (Turnover)).toFixed(3));
        if (BROKERAGE >= 40) {
            BROKERAGE = 40
        }
        stt = parseFloat(((sell * qty * STT_Charges[instrument]) / 100).toFixed(3));
    }
    else if (instrument == 'Delivery') {
        stt = parseFloat(((Turnover * STT_Charges[instrument]) / 100).toFixed(3));
        BROKERAGE = parseFloat((BROKERAGE_Charges[instrument] * (Turnover)).toFixed(3));
        var dp_charges = 15.93;
    }
    else {
        BROKERAGE = 40
        stt = parseFloat(((sell * qty * STT_Charges[instrument]) / 100).toFixed(3)); 
    }

    Stamp_Duty = parseFloat(((STAMP_Charges[instrument] * buy * qty) / 100).toFixed(3));
    Exchange_tr_charge = parseFloat(((EXCHANGE_Charges[instrument] * Turnover) / 100).toFixed(3));
    GST = parseFloat((GST_Charges * (BROKERAGE + SEBI + Exchange_tr_charge) / 100).toFixed(3));
    // GST = (BROKERAGE + SEBI + Exchange_tr_charge);
    // console.log(SEBI ,stt ,GST ,BROKERAGE, Stamp_Duty, Exchange_tr_charge)

    // if (dp_charges) {
    //     Total_Charges = parseFloat((SEBI + stt + GST + BROKERAGE + Stamp_Duty + Exchange_tr_charge+dp_charges).toFixed(3));
    // }
    // else {
    Total_Charges = parseFloat((SEBI + stt + GST + BROKERAGE + Stamp_Duty + Exchange_tr_charge+dp_charges).toFixed(3));
    // }
    
    Charges_Breakdown = {"SEBI":SEBI,"STT":stt,"GST":GST,"BROKERAGE":BROKERAGE,"Stamp_Duty":Stamp_Duty,"Exchange_tr_charge":Exchange_tr_charge,'DP Charges':dp_charges}

    return [Total_Charges, Charges_Breakdown];
}


function BROKERAGEFunction() {

    // var instruments = { 'EQUITY': ['Delivery', 'Intraday'], 'F&O': ['Futures', 'Options'] }
    // var instrument = document.getElementById('instrument').value;

    // document.getElementById('ins1_label').innerText = instruments[instrument][0];
    // document.getElementById('ins2_label').innerText = instruments[instrument][1];

    // document.getElementById('ins1').value = instruments[instrument][0];
    // document.getElementById('ins2').value = instruments[instrument][1];

    let buy = Number(document.getElementById('buy').value);
    let sell = Number(document.getElementById('sell').value);
    let qty = Number(document.getElementById('qty').value);

    var turnover = Number(((buy + sell) * qty).toFixed(3));
    // console.log(buy, sell, qty, turnover)
    
    // document.getElementById('turnover_br').innerHTML = turnover;

    var exchange = document.querySelector("input[name='exchange']:checked").value;
    var instrument = document.getElementById('instrument').value;
    // console.log(exchange,instrument)
    
    // var brokerage = { 'EQUITY Delivery': 0, 'EQUITY Intraday': 0.0003, 'F&O Futures': 20, 'F&O Options': 20 };

    // var STT = { 'EQUITY Delivery': 0.001, 'EQUITY Intraday': 0.00025, 'F&O Futures': 0.0001, 'F&O Options': 0.0005 };
    // var Exchange_txn_charge = { 'NSE': 0.0000345, 'BSE': 0.0000375, 'F&O Futures NSE': 0.00002, 'F&O Futures: BSE': 0.00053 }
    // var SEBI = 0.000001  //10/ crore + GST
    // var GST = 0.18 * (brokerage + SEBI + Exchange_txn_charge)
    // var Stamp = { 'EQUITY Delivery': 0.00015, 'EQUITY Intraday': 0.00003, 'F&O Futures': 0.00002, 'F&O Options': 0.00003 };

    // if (instrument != 'Delivery') {
    //     document.getElementById('dp_br').innerText = 0;
    // }
    // else {
    //     document.getElementById('dp_br').innerText = 20;
    // }

    // var ins = instrument + ' ' + inp;

    var gross_profit = parseFloat(((sell - buy) * qty).toFixed(3));
    // console.log(gross_profit_br)
    charges = get_charges(buy = buy, sell = sell, qty = qty, instrument = instrument);
    
    total_charges = charges[0];

    var net_profit = parseFloat((gross_profit - total_charges).toFixed(3));
    // console.log(gross_profit,total_charges,net_profit,charges_breakdown)

    let gross_profit_value = new Intl.NumberFormat("en-IN").format(gross_profit);
    let total_charges_value = new Intl.NumberFormat("en-IN").format(total_charges);
    let net_profit_value = new Intl.NumberFormat("en-IN").format(net_profit);

    if (buy > 0, sell > 0, qty > 0) {
        document.getElementById('gross_profit_value').innerText = gross_profit_value;
        document.getElementById('total_charges_value').innerText = total_charges_value;
        document.getElementById('net_profit_value').innerText = net_profit_value;
    }

    charges_breakdown = charges[1];
    // console.log(charges_breakdown)

    document.getElementById('brokerage_br').innerText = charges_breakdown.BROKERAGE;
    document.getElementById('STT_br').innerText = charges_breakdown.STT;
    document.getElementById('exhange_charge_br').innerText = charges_breakdown.Exchange_tr_charge;
    document.getElementById('GST_br').innerText = charges_breakdown.GST;
    document.getElementById('SEBI_br').innerText = charges_breakdown.SEBI;
    document.getElementById('stamp_duty_br').innerText = charges_breakdown.Stamp_Duty;
    // document.getElementById('clearing_br').innerText = '';

    document.getElementById('gross_profit1').innerText = gross_profit_value;
    document.getElementById('total_charges1').innerText = total_charges_value;
    document.getElementById('net_profit1').innerText = net_profit_value;
}


function element_toggle(ele_id) {
    const contract_note = document.getElementById(ele_id);
    
    // const im = document.querySelector('#nav a img[alt="contract note logo"]');
    // console.log('img ',im)
    // #nav a img[alt="contract note logo"]{
    //     box-shadow: 1px 1px 10px var(--secondary-color);
    //     border: 1px solid white;
    //     /* box-shadow: 1px 1px 10px var(--secondary-color) !important; */
    // }
    
    if (contract_note.style.display == 'flex') {
        contract_note.style.display = 'none';
        document.body.style.overflow = 'auto';
        // im.style.boxShadow = 'none';
        // im.style.border = 'none';
    }
    else{
        contract_note.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        // im.style.boxShadow = '1px 1px 10px var(--secondary-color)';
        // im.style.border = '1px solid white';
    }
}


function contract_note(btn_id, table_id) {
    //  console.log(btn_id,table_id)

    try {
        var table = document.getElementById(table_id); //'Fut_Dashboard', 'Opt_Dashboard'
        var buy = document.getElementById('buy_price');
        var sell = document.getElementById('sell_price');
        var qty = document.getElementById('qty');

        var charges = document.getElementById('charges');

        // console.log(charges_breakdown)
        // console.log(typeof charges_breakdown)

        if (table_id == 'Opt_Dashboard') {
            var buy_price = table.rows[btn_id].cells[11].innerText;
            var sell_price = table.rows[btn_id].cells[16].innerText;
            var total_charges = table.rows[btn_id].cells[22].innerText;
            var charges_breakdown = table.rows[btn_id].cells[23].innerText;
            var charges_breakdown1 = JSON.parse(charges_breakdown.replaceAll("'",'"'));
            // console.log(charges_breakdown1.BROKERAGE)

            document.getElementById('brokerage').innerText = charges_breakdown1.BROKERAGE;
            document.getElementById('STT').innerText = charges_breakdown1.STT;
            document.getElementById('SEBI').innerText = charges_breakdown1.SEBI;
            document.getElementById('stamp_duty').innerText = charges_breakdown1.Stamp_Duty;
            document.getElementById('GST').innerText = charges_breakdown1.GST;
            document.getElementById('exchange_charge').innerText = charges_breakdown1.Exchange_tr_charge;

            // console.log(typeof charges_breakdown1)
            // console.log(charges_breakdown1)
        }
        else {
            var buy_price = table.rows[btn_id].cells[10].innerText;
            var sell_price = table.rows[btn_id].cells[15].innerText;
            var total_charges = table.rows[btn_id].cells[21].innerText;
            var charges_breakdown = table.rows[btn_id].cells[22].innerText;

            var charges_breakdown1 = JSON.parse(charges_breakdown.replaceAll("'",'"'));
            // console.log(charges_breakdown1.BROKERAGE)

            document.getElementById('brokerage').innerText = charges_breakdown1.BROKERAGE;
            document.getElementById('STT').innerText = charges_breakdown1.STT;
            document.getElementById('SEBI').innerText = charges_breakdown1.SEBI;
            document.getElementById('stamp_duty').innerText = charges_breakdown1.Stamp_Duty;
            document.getElementById('GST').innerText = charges_breakdown1.GST;
            document.getElementById('exchange_charge').innerText = charges_breakdown1.Exchange_tr_charge;
        }
        
        buy.value = buy_price;
        sell.value = sell_price;
        qty.value = 100;

        // console.log(buy_price, sell_price);
        // console.log(total_charges)

        charges.innerText = total_charges;
    }
    catch(err) {
        console.log(err.message)
    }

    var cb = document.getElementById('profit_in_percentage').checked;

    var buy_price = Number(document.getElementById('buy_price').value);
    var sell_price = Number(document.getElementById('sell_price').value);
    var qty = Number(document.getElementById('qty').value);

    // var charges_value = get_total_charges();
    // console.log(charges_value)

    var margin = document.getElementById('margin');
    var turnover = document.getElementById('turnover');
    
    margin.innerHTML = Number(((buy_price)* qty).toFixed(3));
    turnover.innerHTML = Number(((buy_price+sell_price)* qty).toFixed(3));

    var gross_profit = document.getElementById('gross_profit');
    var charges = document.getElementById('charges');
    var net_profit = document.getElementById('net_profit');

    // charges.innerHTML = charges_value;

    if (cb == true) {
        
        document.getElementById('profit_in_percentage_toggle_cont').style.borderColor = '#1f85f2';
        document.getElementById('profit_in_percentage_toggle_ball').style.backgroundColor = '#1f85f2';

        var margin = Number(parseFloat((document.getElementById('margin').innerText)).toFixed(3));
    
        var gross_profit_value_in_p = Number((((sell_price - buy_price) * qty) / margin) * 100);
        var gross_profit_value = (sell_price - buy_price) * qty;

        var net_profit_value = ((Number(gross_profit_value) - Number(charges.innerText))/margin)*100;
    
        // console.log(gross_profit_value,net_profit_value)
        // console.log(buy_price,sell_price,qty,margin)
        document.getElementById('netp_inr').className = 'fa fa-percent'

        var gross_profit_value1 = Number((gross_profit_value_in_p).toFixed(3));
        var net_profit_value1 = Number((net_profit_value).toFixed(3));

        // let gross_profit_value1 = new Intl.NumberFormat("en-IN", {
        // }).format(gross_profit_value);
    
        // let net_profit_value1 = new Intl.NumberFormat("en-IN", {
        // }).format(net_profit_value);
    }
    else {
        document.getElementById('profit_in_percentage_toggle_cont').style.borderColor = 'green';
        document.getElementById('profit_in_percentage_toggle_ball').style.backgroundColor = 'green';

        var margin = Number(parseFloat((document.getElementById('margin').innerText).replace(',','')).toFixed(3));
        var gross_profit_value = (sell_price - buy_price) * qty;
        var net_profit_value = Number(gross_profit_value) - Number(charges.innerText);
        // console.log(buy_price,sell_price,gross_profit_value)
    
        document.getElementById('netp_inr').className = 'fa fa-inr'

        var gross_profit_value1 = new Intl.NumberFormat("en-IN", {
        }).format(gross_profit_value);
    
        var net_profit_value1 = new Intl.NumberFormat("en-IN", {
        }).format(net_profit_value);
    }

    gross_profit.innerHTML = `<b>${gross_profit_value1}</b>`;
    net_profit.innerHTML = net_profit_value1;

    if (net_profit_value > 0) {
        net_profit.style.color = 'green';
        document.getElementById('netp_inr').style.color = 'green';
    }
    else {
        net_profit.style.color = 'red';
        document.getElementById('netp_inr').style.color = 'red';
    }

}


function clear_all(element,outputs) {
    // console.log(element)
    // var ele = document.getElementById(element);
    var inputs = document.querySelectorAll(`#${element} input,#${element} output`);
    // console.log(inputs);

    // document.querySelector('input#investment').value = '';

    inputs.forEach(inp => {
        // console.log(inp)
        inp.value = '';
    })
}



// Chart


function drawChart() {

    // console.log("calci = ",calci)

    if (calci == 2) {

        // ci = document.getElementById("FA").value;
        // alert(ci);
        var ci = document.getElementById("COMPOUND").value;
        var fa = document.getElementById("FA").value;
        var p = parseFloat(document.getElementById("principle").value);
        
        ci = Number(ci.replaceAll(",", ""));
        fa = Number(fa.replaceAll(",", ""));
        
        // console.log(ci);
        // console.log(typeof ci);
        // console.log(typeof fa,ci)
        // ci = ci + 1;
        // fa = fa + 1;
        var data = google.visualization.arrayToDataTable([
            ['Component', 'Value'],
            ['Compound Interest', ci],
            ['Final Amount', fa],
        ]);
    
        // Optional; add a title and set the width and height of the chart
        var options = {
            'width': 450, 'height': 280,
            'titleTextStyle': { color: 'black', bold: 'true', fontSize: "18" },
            'pieSliceTextStyle': {
                color: 'white',
                // font-weigth:'bold'
            },
            slices: {
                0: { color: '#47b2f5' },
                1: { color: '#0377c0' }
            },
            tooltip: {
                isHtml: true,
                text: 'value',
                textStyle:{color:'#0377c0',bold:true},
            }
            // colors:[]
            // 'color': ['red', 'green']
        };

        // Display the chart inside the <div> element with id="piechart"
        if (p > 0) {
            // document.getElementById("piechart").style.border = "3px solid var(--secondary)";    

            document.getElementById("piechart1").style.visibility = "visible"
            document.getElementById("pie1").style.visibility = "visible";
            // document.getElementById("pieh").style.visibility ="visible";
 
            // document.getElementById("pie").style.border = "3px solid var(--secondary)"    
            // document.getElementById("piechart").style.border = "3px solid var(--secondary)"    
            // document.getElementById('piechart').style = "border:2px solid black;margin-bottom: 40px;";
            var chart = new google.visualization.PieChart(document.getElementById('piechart1'));
            chart.draw(data, options);
        }
    }


    if (calci == 3) {

        // ci = document.getElementById("FA").value;
        //     console.log(ci);
        // alert(ci);
        // var EMI = document.getElementById("EMI1").value;
        var LOAN = document.getElementById("loan").value;
        var TI = document.getElementById("TI").value;
        var loan = parseFloat(document.getElementById("loan").value);
        
        // EMI = Number(EMI.replaceAll(",", ""));
        LOAN = Number(LOAN.replaceAll(",", ""));
        TI = Number(TI.replaceAll(",", ""));
        
        // console.log(ci);
        // console.log(typeof ci);
        // console.log(typeof fa,ci)
        // ci = ci + 1;
        // fa = fa + 1;
        var data = google.visualization.arrayToDataTable([
            ['Component', 'Value'],
            ['Loan Amount', LOAN],
            ['Total Interest', TI],
        ]);
    

        // Optional; add a title and set the width and height of the chart
        var options = {
            'width': 450, 'height': 280,
            'titleTextStyle': { color: 'black', bold: 'true', fontSize: "18" },
            'pieSliceTextStyle': {
                color: 'white',
                // font-weigth:'bold'
            },
            slices: {
                0: { color: '#5880ed' },
                1: { color: '#a1baff' }
            },
            tooltip: {
                isHtml: true,
                text:'value',
                textStyle:{color:'#5880ed',bold:true},
            }
            // colors:[]
            // 'color': ['red', 'green']
        };

        // Display the chart inside the <div> element with id="piechart"
        if (loan > 0) {
            // document.getElementById("piechart").style.border = "3px solid var(--secondary)";    

            document.getElementById("piechart2").style.visibility = "visible"
            document.getElementById("pie2").style.visibility = "visible";
            // document.getElementById("pieh").style.visibility ="visible";
 
            // document.getElementById("pie").style.border = "3px solid var(--secondary)"    
            // document.getElementById("piechart").style.border = "3px solid var(--secondary)"    
            // document.getElementById('piechart').style = "border:2px solid black;margin-bottom: 40px;";
            var chart = new google.visualization.PieChart(document.getElementById('piechart2'));
            chart.draw(data, options);
        }
    }

}


// Download Table as CSV File:

function download_csv(csv, filename) {
    var csvFile;
    var downloadLink;
 
    // CSV FILE
    csvFile = new Blob([csv], {type: "text/csv"});
 
    // Download link
    downloadLink = document.createElement("a");
 
    // File name
    downloadLink.download = filename;
 
    // We have to create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);
 
    // Make sure that the link is not displayed
    downloadLink.style.display = "none";
 
    // Add the link to your DOM
    document.body.appendChild(downloadLink);
 
    // Lanzamos
    downloadLink.click();
}

function export_table_to_csv(table, filename) {
    
    var html = document.querySelector(table).outerHTML;

    var csv = [];
    var rows = document.querySelectorAll(`${table} tr`);
    // console.log(rows)

    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");
        
        for (var j = 0; j < cols.length; j++)
            row.push(cols[j].innerText);
        
        csv.push(row.join(","));        
    }
 
    // Download CSV
    download_csv(csv.join("\n"), filename);
}
 

// Scroll to Top:

// Get the button
let mybutton = document.getElementById("scrolltop");

// When the user scrolls down 20px from the top of the document, show the button
document.body.onscroll = function() {scrollFunction()};

function scrollFunction() {
    console.log('scrolling')
  if (document.body.scrollTop > 450 || document.documentElement.scrollTop > 450) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
//   document.documentElement.scrollTop = 0;
}




