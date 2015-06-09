var arrival = document.getElementById('arrival');
var depart = document.getElementById('depart');
var trip_duration = document.getElementById('trip-duration');
var btn_minus = document.querySelector('.form-review__counter-trip > .form-review__btn-minus');
var btn_plus = document.querySelector('.form-review__counter-trip > .form-review__btn-plus');
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

/* -- путешественники -- */
var del_traveler = document.querySelector('.form-review__number-travelers > .form-review__btn-minus');
var add_traveler = document.querySelector('.form-review__number-travelers > .form-review__btn-plus');
var number_traveler = document.getElementById('number_traveler');
//TODO: функция удаления и добавления путешественника
del_traveler.addEventListener('click', function (e) {
  e.preventDefault();
  changeNumbers(-1, number_traveler);
  console.info(number_traveler.value);
  removeTraveler();
});

add_traveler.addEventListener('click', function (e) {
  e.preventDefault();
  changeNumbers(1, number_traveler);
   console.info(number_traveler.value);
  addTraveler();
});

function removeTraveler() {
  var data_travel = form.querySelector('.form-review__travelers-data .form-wrapper');
  var delElement = document.getElementById("traveler" + (parseInt(number_traveler.value) + 1));

  data_travel.removeChild(delElement);
  console.log('Удален путешественник!');
}

function addTraveler() {
 var data_travel = document.querySelector('.form-review__travelers-data'); //объявляем переменную, где лежат наши путешественники
 var contener = document.querySelector('.form-review__travelers-data .form-wrapper')//создаем новый элемент, в котором будет находится наш новый путешественник
   var imtemplate = document.querySelector("#traveler_template").innerHTML;
  var imhtml = Mustache.render(imtemplate, {
          "number": number_traveler.value
        });
  
  var new_traveler = document.createElement('div');
  new_traveler.classList.add('form-review__traveler');
  new_traveler.id = "traveler"+number_traveler.value;
  new_traveler.innerHTML = imhtml;
//  contener.appendChild(new_traveler);
//  var new_traveler = document.createElement('div');
//  new_traveler.setAttribute('id', 'traveler' + number_traveler.value);
//  new_traveler.innerHTML = '<p>Новый путешественник!</p>';

  contener.appendChild(new_traveler);
  console.log('Добавлен путешественник!');
}
