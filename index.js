// //to select menu (lunch, dinner etc.)
const buttons = document.querySelectorAll(".meal");

document.querySelectorAll('.meal').forEach(function(e) {
    e.addEventListener('click', function() {
        buttons.forEach(i => {i.classList.remove("active")})
        this.classList.add("active");
    })
  });