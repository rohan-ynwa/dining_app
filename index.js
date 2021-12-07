//current selection
let currMenu = "";
let currItem = "";
let currStation = "";
let currStar = "";
let allData = [];
let currData = [];
let dataAtStation= [];
let filteredData = [];

function changeMenu(elem, data) {
    currMenu = elem.id;
    elem.classList.add("menu-active");
    currData = data.filter(x => x["meal-name"] == currMenu.toLowerCase());
}

//get data on window load
window.onload = async function () {
    await fetch('http://127.0.0.1:8000/items', {
      method: 'GET',
    })
    .then(function(response) {
      return response.json();
    }).then(x => {
        allData = x;
        return x;
    }).then(x => {changeMenu(document.getElementById(liveMeal()), x)
    })
}

//all components
const buttons = document.querySelectorAll(".meal");
const stations = document.querySelectorAll(".station");
const stars = document.querySelectorAll(".select");
let selections = [];
let selectionsData = [];

//to select menu (lunch, dinner etc.)
document.querySelectorAll('.meal').forEach(function(e) {
    e.addEventListener('click', function() {
        buttons.forEach(i => {i.classList.remove("menu-active")});
        changeMenu(this, allData);
    })
  });

function changeStation(station, data, menu) {
    let dataAtStation = [];
    let stationName = "";

    if (menu === "Breakfast") {
        switch (station) {
            case ("Grill"):
                stationName = "Breakfast Entrees";
                break;
            case ("Bakery"):
                stationName = "Breakfast Pastries";
                break;
            case ("Sushi"):
                stationName = 'Display Station';
                break;
            default:
                stationName = "none1";
                break;
        }
    }
    
    else {
        switch (station) {
            case ("Latin1"):
                stationName = "Latino 1  WOR";
                break;
            case ("Latin2"):
                stationName = "Latino 2  WOR";
                break;
            case ("Pizza"):
                stationName = 'Pizza';
                break;
            case ("Grill"):
                stationName = 'Grill Station';
                break;
            case ("Seasons"):
                stationName = 'Seasons';
                break;
            case ("Pasta"):
                stationName = 'Mediterranean';
                break;
            case ("Streetfood"):
                stationName = 'Street Food';
                break;
            case ("Sushi"):
                stationName = 'Sushi';
                break;
            case ("Noodles"):
                stationName = 'Noodle Bowl';
                break;
            case ("Bakery"):
                stationName = 'Desserts';
                break;
            case ("Desserts"):
                stationName = 'Desserts';
                break;
            case ("Soup"):
                stationName = 'Soups';
                break;
            case ("Tandoor"):
                stationName = 'Tandoor'; 
                break;
            default:
                stationName = "none2";   
                break;
        }
    }
    dataAtStation = data.filter(x => x["category-name"] == stationName);
    return dataAtStation;
}

//to select station on menu 
document.querySelectorAll('.station').forEach(function(e) {
    e.addEventListener('click', function() {
        stations.forEach(i => {i.classList.remove("station-active")})
        currStation = this.id;
        this.classList.add('station-active');
        document.getElementById('station-head').innerHTML = "Menu at " + currStation + " station for " + currMenu;
        dataAtStation = changeStation(currStation, currData, currMenu);
        let selectionMenu = document.getElementById('selection');
        selectionMenu.innerHTML = '';
        selections = [];
        selectionsData = [];
        dataAtStation.forEach(e => {
            let elem = document.createElement('div');
            elem.classList.add('item');
            elem.innerHTML = e["dish-name"];
            selectionMenu.appendChild(elem);
            selections.push(elem);
            selectionsData.push(e);
            addClick(elem, e);
        })
        document.getElementById('menu').scrollIntoView({behaviour: "smooth"});
    })
  }); 

//to select item on menu 
function addClick(elem, e) {
    elem.addEventListener('click', function() {
        selections.forEach(i => {i.classList.remove("item-active")});
        document.getElementById('ing-header').innerHTML = e["dish-name"];
        document.getElementById('ing-container').innerHTML = '';
        e["ingredient-list"].forEach(i => {
            let ing = document.createElement('li');
            ing.classList.add('ing');
            ing.innerHTML = i;
            document.getElementById('ing-container').appendChild(ing);
        });
        currItem = this.id;
        this.classList.add("item-active");
    })
}; 

//form stays in current state
let form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
})

//star rating
document.querySelectorAll('.select').forEach(function(e) {
    //on click
    e.addEventListener('click', function() {
        stars.forEach(i => {i.classList.remove("select-active")})
        for (let i = 1; i <= 5; i++) {
            stars[5 - i].classList.add('select-active');
            if (parseInt(e.id) === i) {
                break;
            }
        }
    })
}); 


function submitStarRating() {
    const starButton = document.getElementById("star-button")

    starButton.addEventListener("click", () => {
        
    });

}

function liveMeal() {
    let result = ''
    let date = new Date().toLocaleTimeString('en-US', { hour12: false })
    // let date = new Date(2021, 0, 1, 23).toLocaleTimeString('en-US', { hour12: false })
    // year, month, day, hours, mins, seconds
    let breakfastStart = new Date(2021, 0, 1, 7).toLocaleTimeString('en-US', { hour12: false })
    let breakfastEnd = new Date(2021, 0, 1, 11).toLocaleTimeString('en-US', { hour12: false })
    let lunchStart = new Date(2021, 0, 1, 11).toLocaleTimeString('en-US', { hour12: false })
    let lunchEnd = new Date(2021, 0, 1, 16, 30).toLocaleTimeString('en-US', { hour12: false })
    let dinnerStart = new Date(2021, 0, 1, 16, 30).toLocaleTimeString('en-US', { hour12: false })
    let dinnerEnd = new Date(2021, 0, 1, 21).toLocaleTimeString('en-US', { hour12: false })
    let lateNightStart = new Date(2021, 0, 1, 21).toLocaleTimeString('en-US', { hour12: false })
    let lateNightEnd = new Date(2021, 0, 1, 0).toLocaleTimeString('en-US', { hour12: false })
    document.querySelectorAll(".live").forEach(x => x.remove());
    if (date >= breakfastStart && date < breakfastEnd) {
        let elem = document.createElement('div');
        elem.classList.add('live');
        document.getElementById('Breakfast').appendChild(elem);
        return 'Breakfast'
    }
    if (date >= lunchStart && date < lunchEnd) {
        let elem = document.createElement('div');
        elem.classList.add('live');
        document.getElementById('Lunch').appendChild(elem);
        return 'Lunch'
    }
    if (date >= dinnerStart && date < dinnerEnd) {
        let elem = document.createElement('div');
        elem.classList.add('live');
        document.getElementById('Dinner').appendChild(elem);
        return 'Dinner'
    }
    if (date >= lateNightStart && date < lateNightEnd) {
        let elem = document.createElement('div');
        elem.classList.add('live');
        document.getElementById('Late Night').appendChild(elem);
        return 'Late Night'
    }
}

document.getElementById('filter-form').onsubmit = function() { 
    filteredData=[];
    var checkboxesAl = document.querySelectorAll('input[name="all"]:checked');
    var checkboxesDt = document.querySelectorAll('input[name="diet"]:checked');
    filteredData = selections;
    checkboxesAl.forEach(x => filter(x, "allergens"));
    let selectionMenu = document.getElementById('selection');
    selectionMenu.innerHTML = '';
    filteredData.forEach(e => {
        selectionMenu.appendChild(e);
    })
    return false;
};

function filter (f, v) {
    let toFilter = [];
    for (let i = 0; i < selectionsData.length; i++) {
        console.log(f, selectionsData[i][v].map(x => x.trim()), selectionsData[i][v].map(x => x.trim()).includes(f.value));
        if (selectionsData[i][v].map(x => x.trim()).includes(f.value)) {
            toFilter.push(i);
        }
    }
    for (let i = 0; i < toFilter.length; i++) { 
        filteredData.splice((toFilter[i] - i), 1);
    }
}

