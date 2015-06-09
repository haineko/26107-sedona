function initialize() {
  var myLatlng = new google.maps.LatLng(34.8697395, -111.7609896);
  var image = "http://i11.pixs.ru/storage/8/1/4/markerpng_8770777_17539814.png";
  var myOptions = {
    zoom: 7,
    center: myLatlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scrollwheel: false
  };
  var map = new google.maps.Map(document.getElementById('map'), myOptions);  
  var beachMarker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      icon: image
  });
}
google.maps.event.addDomListener(window, "load", initialize);