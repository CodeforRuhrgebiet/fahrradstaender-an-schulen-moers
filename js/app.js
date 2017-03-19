document.addEventListener("DOMContentLoaded", function(event) {

  var mymap = L.map('map').setView(
    [
      51.4534771, // lon
      6.6242356   // lat
    ], 15 // zoom-level
  );

  L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets'
  }).addTo(mymap); // karten-hintergrund laden



  $.getJSON("./data/fahrradstaender.json", function (data) {
    var markersCluster = L.markerClusterGroup();
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

    markersCluster.addLayer(geoJsonLayer);
    mymap.addLayer(markersCluster);
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
