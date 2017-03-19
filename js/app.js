document.addEventListener("DOMContentLoaded", function(event) {

  var mymap = L.map('map').setView(
    [
      51.4534771, // lon
      6.6242356   // lat
    ], 15 // zoom-level
  );

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets'
  }).addTo(mymap); // karten-hintergrund laden

  $.getJSON("./data/fahrradstaender.json", function (data) {
    var geoJsonLayer = L.geoJson(data, {
      pointToLayer: function (feature, latlng) {
        var markerIcon = L.AwesomeMarkers.icon({
          icon: 'bicycle',
          markerColor: 'gray',
          prefix: 'fa'
        });

        return new L.marker(latlng, {
          icon: markerIcon
        });
      }
    });

    mymap.addLayer(geoJsonLayer);
  });

   $.getJSON("./data/schulen.json", function(data) {
    var geoJsonLayer = L.geoJson(data, {
      pointToLayer: function (feature, latlng) {
        var markerIcon = L.AwesomeMarkers.icon({
          icon: 'graduation-cap',
          markerColor: 'red',
          prefix: 'fa'
        });

        return new L.marker(latlng, {
          icon: markerIcon
        });
      }
    });

    mymap.addLayer(geoJsonLayer);
  });

});
