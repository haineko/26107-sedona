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
      
    }
  }); 
  xhr.send(data);
})();
    
//LoaclStorage
    
(function() {
  if (window.localStorage) {
    var form = document.querySelector(".form-rewiew__form");
    var savElements = form.querySelector("[name]");
    
    for ( var i = 0, i < save_elements.length; i++) {
      function(save_elements) {
          var name = saveElements.getAttribute('name');
          savElements.value = localStorage.getItem(name) || '';

          savElements.onkeyup = function() {
            var value = element.value;
            if (!value) {
              value = '';
            }

            localStorage.setItem(name, value);
          };
        };
    }
  }
  
})();
    
//счетчик
function() {
  var form = document.querySelector(".form-review__form");
  var count = form.querySelectorAll(".form-review__number");

  for (var i = 0; i < count.length; i++) {
    countField(count[i]);
  }
  
  function countField(parent) {
    
    var input = parent.querySelector("input"); 
    var minus = parent.querySelector(".form-review__btn-minus"); 
    var plus = parent.querySelector(".form-review__btn-plus"); 
    
    minus.addEventListener("click", function)() {
      event.preventDefault();
      changeNumber(false);
    }
    plus.addEventListener("click", function)() {
      event.preventDefault();
      changeNumber(true);
    }
    
    function changeNumber(operation) {
      var value = Number(input.value);
      
      if (isNaN(value)) {
        value = 0;
      }
      
      if (operation) {
        input.value = value + 1;
      } else {

        input.value = value - 1;
      }
    }
  }
}
    //        if (input.value<=1) {
//          return false;
//        }
//удаление и добавление людей
  var form = document.querySelector(".form-rewiew__form");
  var delTraveler = form.querySelector(".form-review__travelers-data .form-review__btn-minus"); 
  var addlTraveler = form.querySelector(".form-review__travelers-data .form-review__btn-plus"); 
    
//загрузка фотографий
    form.querySelector("#upload_photo").addEventListener("change", function() {

 });