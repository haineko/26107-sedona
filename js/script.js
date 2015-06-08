var menu = document.querySelector(".main-menu__btn-menu");
var nav = document.querySelectorAll(".main-menu__item");
var cross = document.querySelector(".main-menu__cross");
var form = document.querySelector(".form-review__form");
var done = document.querySelector(".popup--request");
var fail = document.querySelector(".popup--failure");


/* -- МЕНЮ -- */
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

initForm();
initLocalStorage()

/* -- ОТПРАВКА ФОРМЫ С ПОМОЩЬЮ AJAX -- */
function initForm() {
  if (!("FormData" in window)) {
    
    return;
    
  } else {
    
    
    form.addEventListener("submit", function(event) {
      
      event.preventDefault();
      var data = new FormData(form);
      var queue =[];
      
      queue.forEach(function(element) {
        data.append("form-review__photos-gallery", element.file);
      });
      
      request(data, function(response) {
        console.log(response);
      });
      
    });
  }
}

function request(data, fn) {

  var xhr = new XMLHttpRequest();
  var time = (new Date()).getTime();

  xhr.open("post", "http://simonenko.su/academy/echo?" + time);
  xhr.addEventListener("readystatechange", function () {

    if (xhr.readyState == 4) {
      fn(xhr.responseText);
      // TODO: тут делаем очистку localstorage
      done.classList.add("popup-show");
    } else {
      fail.classList.add("popup-show");
    }
    
  });

  xhr.send(data);
}

/* -- LOCALSTORAGE -- */
function initLocalStorage() {
  
  if (window.localStorage) {
    
    var form = document.querySelector(".form-review__form");
    var savElements = form.querySelectorAll("[name]")-1;
    
    for (var i = 0; i < savElements.length; i++) {
      
      getState(savElements[i]);
      setState(savElements[i]);
      
    }
  }
}

function getState(savElement) {
  
  var name = savElement.getAttribute('name');
  savElement.value = localStorage.getItem(name) || '';
  
}

function setState(savElement) {
  
  var name = savElement.getAttribute('name');
  
  savElement.addEventListener('keyup', function () {
    
    var value = this.value;
    
    if (!value) {
      value = '';
    }
    
    localStorage.setItem(name, value);
    
  });
}


var trip_duration = document.getElementById('trip-duration');
var btn_minus = document.querySelector('.form-review__counter-trip > .form-review__btn-minus');
var btn_plus = document.querySelector('.form-review__counter-trip > .form-review__btn-plus');

btn_minus.addEventListener('click', function (e) {
  
  e.preventDefault();
  changeNumbers(-1, trip_duration);
  console.info('Минус день'+trip_duration.value);
  
});

btn_plus.addEventListener('click', function (e) {
  
  e.preventDefault();
  changeNumbers(1, trip_duration);
  console.info('Плюс день'+trip_duration.value);
  
});


function changeNumbers(number, el) {
  
  if ((parseInt(el.value) + number) < 1) {
    
    console.warn('Слишком мало!');
    
  } else if ((parseInt(el.value) + number) >= 1 && (parseInt(el.value) + number) <= 30) {
    
    if (!el.value) {
      el.value = 1; 
    }
    
    el.value = parseInt(el.value) + number;
    
  } else {
    console.warn('Слишком много!');
  }
  
}

var del_traveler = document.querySelector('.form-review__number-travelers > .form-review__btn-minus');
var add_traveler = document.querySelector('.form-review__number-travelers > .form-review__btn-plus');
var number_traveler = document.getElementById('number_traveler');

del_traveler.addEventListener('click', function (e) {
  
  e.preventDefault();
  changeNumbers(-1, number_traveler);
  console.info('Больше путешественников, больше!'+number_traveler.value);
  removeTraveler();
  
});

add_traveler.addEventListener('click', function (e) {
  
  e.preventDefault();
  changeNumbers(1, number_traveler);
  console.info('Меньше путешественников,меньше!'+number_traveler.value);
  addTraveler()
  
});

function removeTraveler() {
  
  var data_traveler = form.querySelector('.form-review__travelers-data .form-wrapper');
  var del_traveler = document.getElementById("traveler" + (parseInt(number_traveler.value) + 1));

  data_traveler.removeChild(del_traveler);
  console.log('Путешественник удален!');
}

function addTraveler() {
  
  var data_traveler = document.querySelector('.form-review__travelers-data'); 
  var contener = document.querySelector('.form-review__travelers-data .form-wrapper');
  var traveler_template = document.querySelector("#traveler_template").innerHTML;
  var traveler_html = Mustache.render(traveler_template, {
          "number": number_traveler.value
        });
  
  var new_traveler = document.createElement('div');
  new_traveler.classList.add('form-review__traveler');
  new_traveler.id = "traveler"+number_traveler.value;
  new_traveler.innerHTML = traveler_html;
  contener.appendChild(new_traveler);
  console.log('Добавлен путешественник!');
}