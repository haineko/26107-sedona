var menu = document.querySelector(".main-menu__btn-menu");
var nav = document.querySelectorAll(".main-menu__item");
var cross = document.querySelector(".main-menu__cross");
var form = document.querySelector(".form-review__form");



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

initLocalStorage();
initForm();



/* -- ОТПРАВКА ФОРМЫ С ПОМОЩЬЮ AJAX -- */
function initForm() {
  if (!("FormData" in window)) {
    return;
  }
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var data = new FormData(form);
    images.forEach(function (element) {
      data.append("images", element.file);
    });

    request(data, function (response) {
      console.log(response);
    });


  });
}

function request(data, fn) {

  var xhr = new XMLHttpRequest();

  xhr.open("post", "http://simonenko.su/academy/echo?" + time);

  xhr.addEventListener("readystatechange", function () {

    if (xhr.readyState == 4) {
      fn(xhr.responseText);
      // TODO: тут делаем очистку localstorage
    }
  });

  xhr.send(data);
}



/* -- LOCALSTORAGE -- */
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



/* -- СЧЕТЧИК -- */
var arrival = document.getElementById('arrival');
var depart = document.getElementById('depart');
var trip_duration = document.getElementById('trip-duration');
var btn_minus = document.querySelector('.form-review__counter-trip > .form-review__btn-minus');
var btn_plus = document.querySelector('.form-review__counter-trip > .form-review__btn-plus');

btn_minus.addEventListener('click', function (e) {
  e.preventDefault();
  changeNumbers(-1, trip_duration);
});

btn_plus.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('asd');
  changeNumbers(1, trip_duration);
  plusDate(trip_duration);
});


function changeNumbers(number, el) {
  if ((parseInt(el.value) + number) >= 1 && (parseInt(el.value) + number) <= 20) {
    if (!el.value) {
      el.value = 1;
    }
    el.value = parseInt(el.value) + number;
    console.info(el.value);
    //console.info(number);

  } else {
    console.warn('Слишком много!');
  }
}

depart.addEventListener('change', function () {
  var date_arrival = new Date(arrival.value).getTime();
  var date_depart = new Date(depart.value).getTime();

  var date_diff = Math.floor((date_depart - date_arrival) / 1000 / 60 / 60 / 24)
    //TODO: реализовать проверку
  if (date_diff <= 0) {
    trip_duration.value = 1;
  } else {
    trip_duration.value = date_diff;
    console.log(trip_duration.value);
  }
});

function plusDate(num) {
  var date_arrival = new Date(arrival.value).getTime();
  
}


/* -- УДАЛЕНИЕ И ДОБАВЛЕНИЕ ЛЮДЕЙ -- */
var del_traveler = document.querySelector('.form-review__number-travelers > .form-review__btn-minus');
var add_traveler = document.querySelector('.form-review__number-travelers > .form-review__btn-plus');
var number_traveler = document.getElementById('number_traveler');
//TODO: функция удаления и добавления путешественника
del_traveler.addEventListener('click', function (e) {
  e.preventDefault();
  changeNumbers(-1, number_traveler);
  removeTraveler();
});

add_traveler.addEventListener('click', function (e) {
  e.preventDefault();
  changeNumbers(1, number_traveler);
  addTraveler();
});

function removeTraveler() {
  var data_travel = form.querySelector('.form-review__travelers-data');
  var delElement = document.getElementById("traveler" + (parseInt(number_traveler.value) + 1));

  data_travel.removeChild(delElement);
  console.log('Удален путешественник!');
}

function addTraveler() {
  var data_travel = form.querySelector('.form-review__travelers-data'); //объявляем переменную, где лежат наши путешественники
  var new_traveler = document.createElement('div'); //создаем новый элемент, в котором будет находится наш новый путешественник
  new_traveler.classList.add('form-review__traveler');

  var row_left = document.createElement('div');
  row_left.classList.add('row-left');

  var row_right = document.createElement('div');
  row_right.classList.add('row-right');

  var label_number = document.createElement('label');
  label_number.htmlFor = "number-traveler";

  var input_number = document.createElement('input');
  input_number.id = "number-traveler";
  input_number.value = number_traveler.value;
  input_number.type = "text";

  var col_3 = document.createElement('div');
  col_3.className = "form-review__col-3";

  var label_lastname = document.createElement('label');
  label_lastname.htmlFor = "lastname_traveler";

  var input_lastname = document.createElement('input');
  input_lastname.id = "lastname_traveler";
  input_lastname.placeholder = "Иванов";
  input_lastname.type = "text";

  var label_firstname = document.createElement('label');
  label_firstname.htmlFor = "firstname_traveler";

  var input_firstname = document.createElement('input');
  input_firstname.id = "firstname_traveler";
  input_firstname.placeholder = "Пётр";
  input_firstname.type = "text";

  var label_middlename = document.createElement('label');
  label_middlename.htmlFor = "middlename_traveler";

  var input_middlename = document.createElement('input');
  input_middlename.id = "middlename_traveler";
  input_middlename.placeholder = "Александрович";
  input_middlename.type = "text";


  new_traveler.appendChild(row_left).appendChild(label_number);
  new_traveler.appendChild(row_left).appendChild(input_number);
  new_traveler.appendChild(row_right).appendChild(col_3);
  col_3.appendChild(label_lastname);
  col_3.appendChild(input_lastname);
  col_3.appendChild(label_firstname);
  col_3.appendChild(input_firstname);
  col_3.appendChild(label_middlename);
  col_3.appendChild(input_middlename);

  new_traveler.setAttribute('id', 'traveler' + number_traveler.value);
  //new_traveler.innerHTML = '<p>Новый путешественник!</p>';

  data_travel.appendChild(new_traveler);
  console.log('Добавлен путешественник!');
}



/* -- ЗАГРУЗКА ФОТОГРАФИЙ -- */
//function LoadPhoto() {
//  if ('FileReader' in window) {
//    var btn_upload = document.getElementById('upload_photo'); // кнопка для добавления фотографий
//    var gallery = document.querySelector('.form-review__photos-gallery'); // див в котором лежат наши фотографии
//    var templ_image = document.getElementById('image_template').innerHTML; // шаблон для добавления фотографий
//    var images = []; // массив, в который передаем загруженные фотографии
//
//    btn_upload.addEventListener('change', function () {
//      var files = this.files;
//      for (var i = 0; i < files.length; i++) {
//        preview(files[i]);
//      }
//      this.value = '';
//    });
//
//    function preview(file) {
//      if (file.type.match(/image.*/)) {
//        var reader = new FileReader();
//
//        reader.addEventListener('load', function (event) {
//          var html = Mustache.render(template, {
//              "image": event.target.result,
//              "name": file.name
//            });
//          
//          console.log('Ура, картинка загрузилась');
//          
//          var figure = document.createElement('figure');
//          figure.classList.add('upload-photo');
//          figure.innerHTML = html;
//          
//          gallery.innerHTML = gallery.innerHTML + html;
//          
//          gallery.appendChild(img);
//          
//          figure.querySelector(".form-review__photo-close").addEventListener("click", function(event) {
//              event.preventDefault();
//              removePreview(figure);
//            });
//          
//          images.push({
//            'file': file,
//            'figure': figure
//          })
//          
//        });
//
//        reader.readAsDataURL(file);
//      }
//    }
//    
//    function removePreview(figure) {
//      images = images.filter(function(element) {
//        return element.figure != figure;
//      });
//      figure.parentNode.removeChild(figure);
//    }
//  }
//}



/* -- АВТОМАТИЧЕСКОЕ ЗАПОЛНЕНИЕ 1го ПОЛЯ в ПУТЕШЕСТВЕННИКАХ -- */
//var lastname = document.querySelector('.form-review__personal-data  [name=lastname]');
//var lastname = document.querySelector('.form-review__personal-data  [name=firstname]');
//var lastname = document.querySelector('.form-review__personal-data  [name=middlename]');

