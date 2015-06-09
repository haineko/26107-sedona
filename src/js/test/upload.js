

function initForm() {
  if (!("FormData" in window)) {
    return;
  }
    var form = document.querySelector('.form-review__form');
    var btn_upload = document.getElementById('upload__photo'); 
    var gallery = document.querySelector('.form-review__photos-gallery'); 
    var templ = document.querySelector('#image_template').innerHTML; 
    var images = [];
  
  
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var data = new FormData(form);
    images.forEach(function (element) {
      data.append("form-review__photos-gallery", element.file);
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

        var area = document.querySelector(".form-review__download-photos");
        //var adder = document.querySelector(".form-review__photos-gallery");
        area.querySelector("#upload__photo").addEventListener("change", function() {

            var files = this.files;

            for (var i = 0; i < files.length; i++) {
                preview(files[i]);
            }
        });



        function preview(file) {
            if (file.type.match(/image.*/)) {
                var reader = new FileReader();
                var templ = document.querySelector('#image_template').innerHTML;

                reader.addEventListener("load", function(event) {

                  var html = Mustache.render(templ, {
                    "image": event.target.result,
                    "name": file.name
                  });  
                  
                  var figure = document.createElement("figure");
                  figure.classList.add('upload-photo');
                  figure.innerHTML = html;
                  
                  area.appendChild('figure');
                  
                  figure.querySelector(".form-review__photo-close").addEventListener("click", function(event) {
                    event.preventDefault();
                    removePreview(figure);
                  });
                  
//                    var figure = document.createElement("figure");
//                    var img = document.createElement("img");
//                    var cancel = document.createElement("a");
//                    var caption = document.createElement("figcaption");
//
//
//                    img.src = event.target.result;
//                    img.alt = file.name;
//
//                    cancel.classList.add("travel-photo__btn-cancel");
//                    cancel.innerHTML = ("&times;");
//                    cancel.href = "#";
//
//                    caption.innerHTML = (file.name.toUpperCase());
//
//                    adder.appendChild(figure);
//                    figure.appendChild(img);
//                    figure.appendChild(cancel);
//                    figure.appendChild(caption);

                    cancel.onclick = function(event) {
                        event.preventDefault();
                        this.parentNode.remove();
                    }
                });
                reader.readAsDataURL(file);
            }
        }
    
