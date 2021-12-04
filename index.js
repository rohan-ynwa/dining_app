//current selection
let currMenu = "";
let currItem = "";
let currStation = "";

const buttons = document.querySelectorAll(".meal");
const selections = document.querySelectorAll(".item");
const stations = document.querySelectorAll(".station");

//to select menu (lunch, dinner etc.)
document.querySelectorAll('.meal').forEach(function(e) {
    e.addEventListener('click', function() {
        buttons.forEach(i => {i.classList.remove("menu-active")})
        currMenu = this.id;
        this.classList.add("menu-active");
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
        document.getElementById('station-head').innerHTML = "Menu at " + currStation;
        document.getElementById('menu').scrollIntoView({behaviour: "smooth"});
    })
  }); 

//form stays in current state
let form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
})

