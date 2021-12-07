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
    hideNA(elem.id);
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

//hide not avalible items
function hideNA(menu) {
    console.log(document.querySelectorAll('.all-label'));
    document.querySelectorAll('.all-label').forEach(x => x.classList.remove("station-inactive"));
    switch(menu) {
        case("Breakfast"):
        document.querySelectorAll('.all-label').forEach(x => {
            if ((x.id != "sushi-label") && (x.id != "breads-label") && (x.id != "grill-label")) {
                x.classList.add("station-inactive");
            }
        })
            break;
        case("Lunch"):
            document.getElementById("latin1-label").classList.add("station-inactive");
            break;
        case("Dinner"):
            document.getElementById("latin1-label").classList.add("station-inactive");
            break;
        case("Late Night"):
            document.querySelectorAll('.all-label').forEach(x => {
                if ((x.id != "pizza-label") && (x.id != "latin1-label") && (x.id != "grill-label")) {
                    x.classList.add("station-inactive");
                }
            })
            break;
        default:
            break;
    }
}

//change station
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
            case ("Dessert"):
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
            elem.appendChild(starGen());
            selections.push(elem);
            selectionsData.push(e);
            addClick(elem, e);
        })
        document.getElementById('menu').scrollIntoView({behaviour: "smooth"});
    })
  }); 

//generate stars
function starGen() {
    let starDiv = document.createElement('div');
    let stars = Math.floor((Math.random() * 5) + 1);

    for (i = 1; i <= 5; i++) {
        let e = document.createElement('span');
        if (i <= stars) {
            e.classList.add("fa", "fa-star", "checked");
        }
        else {
            e.classList.add("fa", "fa-star-o");
        }
        starDiv.appendChild(e);
    }

    return starDiv;
}

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

//get live meal
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
        elem.title = "Live";
        document.getElementById('Breakfast').appendChild(elem);
        return 'Breakfast'
    }
    if (date >= lunchStart && date < lunchEnd) {
        let elem = document.createElement('div');
        elem.classList.add('live');
        elem.title = "Live";
        document.getElementById('Lunch').appendChild(elem);
        return 'Lunch'
    }
    if (date >= dinnerStart && date < dinnerEnd) {
        let elem = document.createElement('div');
        elem.classList.add('live');
        elem.title = "Live";
        document.getElementById('Dinner').appendChild(elem);
        return 'Dinner'
    }
    if (date >= lateNightStart && date < lateNightEnd) {
        let elem = document.createElement('div');
        elem.classList.add('live');
        elem.title = "Live";
        document.getElementById('Late Night').appendChild(elem);
        return 'Late Night'
    }
}

//filter form
document.getElementById('filter-form').onsubmit = function() { 
    filteredData=[];
    var checkboxesAl = document.querySelectorAll('input[name="all"]:checked');
    var checkboxesDt = document.querySelectorAll('input[name="diet"]:checked');
    filteredData = selections.map((x) => x);
    checkboxesAl.forEach(x => filter(x, "allergens", true));
    checkboxesDt.forEach(x => filter(x, "diets", false));
    let selectionMenu = document.getElementById('selection');
    selectionMenu.innerHTML = '';
    filteredData.forEach(e => {
        selectionMenu.appendChild(e);
    })
    return false;
};

//filter helper
function filter (f, v, remove) {
    let toFilter = [];
    for (let i = 0; i < selectionsData.length; i++) {
        if (selectionsData[i][v].map(x => x.trim()).includes(f.value) === remove) {
            toFilter.push(i);
        }
    }
    for (let i = 0; i < toFilter.length; i++) { 
        filteredData.splice((toFilter[i] - i), 1);
    }
}

