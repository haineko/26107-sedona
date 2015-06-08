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
 
});

add_traveler.addEventListener('click', function (e) {
  e.preventDefault();
  changeNumbers(1, number_traveler);
  console.info('Меньше путешественников,меньше!'+number_traveler.value);
  
});