//открытие меню
var menu = document.querySelector(".main-menu__btn-menu");
var nav = document.querySelectorAll(".main-menu__item");
var cross = document.querySelector(".main-menu__cross");

menu.addEventListener("click", function () {
  event.preventDefault();
  for (var i = 0; i < nav.length; i++) {
    nav[i].classList.toggle("main-menu__item--show");
  }  
  cross.classList.toggle("main-menu__cross--show");
});

cross.addEventListener("click", function () {
  event.preventDefault();
  for (var i = 0; i < nav.length; i++) {
    nav[i].classList.remove("main-menu__item--show");
  }
  cross.classList.remove("main-menu__cross--show");
});

//отправка формы с помощью ajax

(function() { 
  if (!("FormData" in window)) { 
    return; 
  } 
  var form = document.querySelector(".form-rewiew__form"); 
  var data = new FormData(form); 
  var xhr = new XMLHttpRequest(); 
  xhr.open("post", "/send"); 
  xhr.addEventListener("readystatechange", function() {
    if (xhr.readyState == 4) {
      console.log(xhr.responseText); 
      if
    }
  }); 
  xhr.send(data);
})();