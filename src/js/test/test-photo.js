

/* -- ЗАГРУЗКА ФОТОГРАФИЙ -- */
// if ('FileReader' in window) {
//    var btn_upload = document.getElementById('upload_photo'); // кнопка для добавления фотографий
//    var gallery = document.querySelector('.form-review__photos-gallery'); // див в котором лежат наши фотографии
//    var templ_image = document.getElementById('image_template'); // шаблон для добавления фотографий
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
//          var figure = Mustache.render(templ_image, {
//              "image": event.target.result,
//              "name": file.name
//            });
//          
//          console.log(figure);
//          
////          var figure = document.createElement('figure');
////          figure.classList.add('upload-photo');
////          figure.innerHTML = html;
//          
//          //gallery.innerHTML = gallery.innerHTML + html;
//          
//          gallery.appendChild(figure);
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