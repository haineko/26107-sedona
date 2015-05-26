var menu = document.querySelector(".main-menu__btn-menu");
var nav = document.querySelectorAll(".main-menu__item");
var cross = document.querySelector(".main-menu__cross");

menu.addEventListener("click", function () {
  event.preventDefault();
  for (i = 0; i < nav.length; i++) {
    nav[i].classList.add("main-menu__item--show");
  }  
  cross.classList.add("main-menu__cross--show");
});

cross.addEventListener("click", function () {
  event.preventDefault();
  for (i = 0; i < nav.length; i++) {
    nav[i].classList.remove("main-menu__item--show");
  }
  cross.classList.remove("main-menu__cross--show");
});