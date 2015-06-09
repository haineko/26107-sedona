function initialize() {
  var myLatlng = new google.maps.LatLng(34.8697395, -111.7609896);
  var image = "./img/marker.png";
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
