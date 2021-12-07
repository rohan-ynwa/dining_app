//current selection
let currMenu = "";
let currItem = "";
let currStation = "";
let currStar = "";
let allData = [];
let currData = [];
let dataAtStation= [];

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
    }).then(x => {changeMenu(document.getElementById('Breakfast'), x)})
}

//all components
const buttons = document.querySelectorAll(".meal");
const stations = document.querySelectorAll(".station");
const stars = document.querySelectorAll(".select");
let selections = [];

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
            case ("Latino1"):
                stationName = "Latino 1  WOR";
                break;
            case ("Latino2"):
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
        dataAtStation.forEach(e => {
            let elem = document.createElement('div');
            elem.classList.add('item');
            elem.innerHTML = e["dish-name"];
            selectionMenu.appendChild(elem);
            selections.push(elem);
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
            console.log(i);
        });
        currItem = this.id;
        this.classList.add("item-active");
    })
}; 


// //updates ingrediants 
// function showInfo(df) {
//     document.getElementById('ing-header').innerHTML = '';
//     document.getElementById('ing-header').innerHTML = df["dish-name"];
//     document.getElementById('ing-container').innerHTML = '';
//     df[ingredient-list].forEach(e => {
//         let elem = document.createElement('div').innerHTML = e;
//         document.getElementById('ing-header').appendChild(elem);
//     });
// }

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

submitStarRating();


function submitStarRating() {
    const starButton = document.getElementById("star-button");
    let starCount = 0;

    starButton.addEventListener("click", () => {
        for(let i = 5; i>0; i++) {
            if(document.getElementById(JSON.stringify(i)).classList.contains("select-active")){
                starCount = i;
                break;
            }
        }
    });

   const activeItem = document.getElementsByClassName("item-active");
   console.log(activeItem[0]);
   for(let s = 0; s < starCount; s++){
        console.log('ONE STAR');
    }
}

console.log(new Date().toLocaleTimeString())

