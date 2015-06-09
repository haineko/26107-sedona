(function() {

  if (!("FormData" in window)) {

    return;

  } else {

    var form = document.querySelector(".form-review__form");
    var gallery = document.querySelector(".form-review__photos-gallery"); //area, images
    var template = document.querySelector("#image_template").innerHTML;

    var queue =[];//queue

    form.addEventListener("submit", function(event) {

      event.preventDefault();

      var data = new FormData(form);

      queue.forEach(function(element) {

        data.append("form-review__photos-gallery", element.file);

      });

      request(data, function(response) {

        console.log(response);

      });

    });

    function request(data, fn) {

        var xhr = new XMLHttpRequest();
        var time = (new Date()).getTime();

        xhr.open("post", "http://simonenko.su/academy/echo?" + time);

        xhr.addEventListener("readystatechange", function() {

          if (xhr.readyState == 4) {

            fn(xhr.responseText);

          }

        });

      xhr.send(data);

    }

    form.querySelector("#upload__photo").addEventListener("change", function() {

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

            var html = Mustache.render(template, {

              "image": event.target.result,
              "name": file.name

            });

            var figure = document.createElement("figure");
            figure.innerHTML = html;

            gallery.appendChild(figure);

            figure.querySelector(".form-review__photo-close").addEventListener("click", function(event) {

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

      queue = queue.filter(function(element) {

        return element.figure != figure;

      });

      figure.parentNode.removeChild(figure);

    }

  }

})();