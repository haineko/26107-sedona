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

/* -- ДОБАВЛЕНИЕ ФОТОГРАФИЙ -- */
var btn_upload = document.querySelector("#upload_photo");

btn_upload.addEventListener("change", function() {
  var files = this.files;
  
  for (var i = 0; i < files.length; i++) {
    preview(files[i]);
  }
  this.value = "";
  
});

function preview(file) {

  if("FileReader" in window) {
    
    if(file.type.match(/image.*/)) {
      
      var reader = new FileReader();
      
      reader.addEventListener("load", function(event) {
          
        var form = document.querySelector(".form-review__form");
        var gallery = document.querySelector(".form-review__photos-gallery"); 
        var imtemplate = document.querySelector("#image_template").innerHTML;
        var queue =[];
        
        var html = Mustache.render(imtemplate, {
          "image": event.target.result,
          "name": file.name
        });
          
        var figure = document.createElement("figure");
        figure.innerHTML = html;
        gallery.appendChild(figure);
        console.info("Фотография добавлена!");

        var close = figure.querySelector(".form-review__photo-close");
        close.addEventListener("click", function(event) {
          
          event.preventDefault();
          removePreview(figure);
        });
        
        queue.push({
          
          "file": file,
          "figure": figure
          
        });
        
      });
      
      reader.readAsDataURL(file);
    }
  }
}

function removePreview(figure) {
  
  var queue =[];
  queue = queue.filter(function(element) {
    
    return element.figure != figure;
    
  });
  
  figure.parentNode.removeChild(figure);
  console.info("Фотография удалена!");
}
