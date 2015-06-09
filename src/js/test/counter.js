var arrival = document.getElementById('arrival');
var depart = document.getElementById('depart');
var trip_duration = document.getElementById('trip-duration');
var btn_minus = document.querySelector('.form-review__counter-trip > .form-review__btn-minus');
var btn_plus = document.querySelector('.form-review__counter-trip > .form-review__btn-plus');

btn_minus.addEventListener('click', function (e) {
  e.preventDefault();
  changeNumbers(-1, trip_duration);
  console.info(trip_duration.value);
});

btn_plus.addEventListener('click', function (e) {
  e.preventDefault();
  changeNumbers(1, trip_duration);
  console.info(trip_duration.value);
  plusDate(trip_duration.value);
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


arrival.addEventListener('change', function () {
depart.addEventListener('change', function () {
  var date_arrival = new Date(arrival.value).getTime();
  var date_depart = new Date(depart.value).getTime();

  var date_diff = Math.floor((date_depart - date_arrival) / 1000 / 60 / 60 / 24);
    //TODO: реализовать проверку
  if (date_diff < 0) {
    trip_duration.value = 0;
  } else   {
    trip_duration.value = date_diff;
    console.log(trip_duration.value);
  }
    
});
});


function plusDate(num) {
  var date_arrival = new Date(arrival.value).getTime();
  var date_depart = new Date(depart.value).getTime();
  var d = Math.floor(num*1000*60*60*24 + date_arrival);
  var a = new Date(d);
  console.log(a);
  //depart.value = new Date(d); 
}

