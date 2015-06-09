(function() {

  if (!("FormData" in window)) {

    return;

  } else {

    var form = document.querySelector(".page-form form");
    var area = document.querySelector(".images");
    var template = document.querySelector("#image-template").innerHTML;

    var queue =[];

    form.addEventListener("submit", function(event) {

      event.preventDefault();

      var data = new FormData(form);

      queue.forEach(function(element) {

        data.append("images", element.file);

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

    form.querySelector("#upload-images-btn").addEventListener("change", function() {

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
            figure.classList.add("image");
            figure.innerHTML = html;

            area.appendChild(figure);

            figure.querySelector(".delete-btn").addEventListener("click", function(event) {

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