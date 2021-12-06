//current selection
let currMenu = "";
let currItem = "";
let currStation = "";
let currStar = "";
let allData = [];
let currData = [];

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
const selections = document.querySelectorAll(".item");
const stations = document.querySelectorAll(".station");
const stars = document.querySelectorAll(".select");

//to select menu (lunch, dinner etc.)
document.querySelectorAll('.meal').forEach(function(e) {
    e.addEventListener('click', function() {
        buttons.forEach(i => {i.classList.remove("menu-active")});
        changeMenu(this, allData);
    })
  });

//to select item on menu 
document.querySelectorAll('.item').forEach(function(e) {
    e.addEventListener('click', function() {
        selections.forEach(i => {i.classList.remove("item-active")})
        currItem = this.id;
        this.classList.add("item-active");
    })
  }); 

//to select item on menu 
document.querySelectorAll('.station').forEach(function(e) {
    e.addEventListener('click', function() {
        stations.forEach(i => {i.classList.remove("station-active")})
        currStation = this.id;
        this.classList.add('station-active');
        document.getElementById('station-head').innerHTML = "Menu at " + currStation + " station for " + currMenu;
        document.getElementById('menu').scrollIntoView({behaviour: "smooth"});
    })
  }); 

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
                console.log(e);
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






