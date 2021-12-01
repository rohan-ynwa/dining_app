//current selection
let currMenu = "";
let currItem = "";

const buttons = document.querySelectorAll(".meal");
const selections = document.querySelectorAll(".item");

//to select menu (lunch, dinner etc.)
document.querySelectorAll('.meal').forEach(function(e) {
    e.addEventListener('click', function() {
        buttons.forEach(i => {i.classList.remove("active")})
        currMenu = this.id;
        this.classList.add("active");
    })
  });

//to select menu (lunch, dinner etc.)
document.querySelectorAll('.item').forEach(function(e) {
    e.addEventListener('click', function() {
        selections.forEach(i => {i.classList.remove("item-active")})
        currItem = this.id;
        this.classList.add("item-active");
    })
  }); 

//form stays in current state
let form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
})