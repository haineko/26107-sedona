//открытие меню
var menu = document.querySelector(".main-menu__btn-menu");
var nav = document.querySelectorAll(".main-menu__item");
var cross = document.querySelector(".main-menu__cross");
var form = document.querySelector(".form-review__form");

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

initLocalStorage();
initForm();


//отправка формы с помощью ajax
function initForm() {
  if (!("FormData" in window)) {
    return;
  }
  var data = new FormData(form);
  var xhr = new XMLHttpRequest();
  //xhr.open("post", "http://simonenko.su/academy/echo?");
  xhr.open("get", "http://localhost:8001/out.txt");
  xhr.addEventListener("readystatechange", function() {
    if (xhr.readyState == 4) {
      console.log(xhr.responseText);
      // TODO: тут делаем очистку localstorage
    }
  });
  xhr.send(data);
}

//LoaclStorage
function initLocalStorage() {
  if (window.localStorage) {
    var form = document.querySelector(".form-review__form");
    var savElements = form.querySelectorAll("[name]");

    for (var i = 0; i < savElements.length; i++) {
      getState(savElements[i]);
      setState(savElements[i]);
    }
  }
}

function getState(savElement){
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

//счетчик
var arrival = document.getElementById('arrival');
var depart = document.getElementById('depart');
var trip_duration = document.getElementById('trip-duration');

var btn_minus = document.querySelector('.form-review__counter-trip > .form-review__btn-minus');
var btn_plus = document.querySelector('.form-review__counter-trip > .form-review__btn-plus');

btn_minus.addEventListener('click', function(e){
  e.preventDefault();
  changeNumbers(-1, trip_duration);
});

btn_plus.addEventListener('click', function(e){
  e.preventDefault();
  changeNumbers(1, trip_duration);
});

function changeNumbers(number, el){
  if ((el.value + number) >= 1 && (el.value + number) <= 20) {
    if (!el.value) { el.value = 1; }
    el.value = parseInt(el.value) + number;
    console.log(parseInt(el.value));
    console.log(number);
  }
}

depart.addEventListener('change', function(){
  var date_arrival = new Date(arrival.value).getTime();
  var date_depart = new Date(depart.value).getTime();
  trip_duration.value(Math.floor((date_depart - date_arrival)/1000/60/60/24))
});


//удаление и добавление людей
var delTraveler = form.querySelector(".form-review__travelers-data .form-review__btn-minus");
var addlTraveler = form.querySelector(".form-review__travelers-data .form-review__btn-plus");
//TODO: функция удаления и добавления путешественника


//загрузка фотографий
//form.querySelector("#upload_photo").addEventListener("change", function() {

//});
