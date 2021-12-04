//current selection
let currMenu = "";
let currItem = "";
let currStation = "";

const buttons = document.querySelectorAll(".meal");
const selections = document.querySelectorAll(".item");
const stations = document.querySelectorAll(".station");
const stars = document.querySelectorAll(".select");


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

//star rating
document.querySelectorAll('.select').forEach(function(e) {
    
    //on click
    e.addEventListener('click', function() {
        stars.forEach(i => {i.classList.remove("select-active")})
        for (let i = 1; i <= 5; i++) {
            stars[i - 1].classList.add('select-active');
            if (parseInt(e.id) === i) {
                break;
            }
        }
    })

    //on hover
    e.addEventListener('mouseover', function() {
        for (let i = 1; i <= 5; i++) {
            stars[i - 1].classList.add('select-active-hover');
            if (parseInt(e.id) === i) {
                break;
            }
        }
    })
    e.addEventListener('mouseout', function() {
        stars.forEach(i => {i.classList.remove("select-active-hover")})
    })
}); 
