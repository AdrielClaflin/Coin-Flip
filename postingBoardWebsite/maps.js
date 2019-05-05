var map, infoWindow;

var gmarkers = [];

var initialPos = {
  lat: -34.398,
  lng: 150.664
}


function updateLocations() {
  var arrayLength = locationsDataArray.length;
  var pos;
  for (var i = 0; i < arrayLength; i++) {
    var latData = locationsDataArray[i].latitude;
    var lngData = locationsDataArray[i].longitude;
    var title = locationsDataArray[i].title;
    var content = locationsDataArray[i].content;
    pos = {
      lat: latData,
      lng: lngData
    }
    addMarker(map, locationsDataArray[i]);
  }
  map.setCenter(pos);
  map.setZoom(4);
}

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: initialPos,
    zoom: 1,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  infoWindow = new google.maps.InfoWindow;
  updateLocations();
}

function addMarker(map, location) {
  var categories = [
    ["Car Crash", "pink-dot.png"],
    ["Closed", "yellow-dot.png"],
    ["Detour", "orange-dot.png"],
    ["Power Outage", "red-dot.png"],
    ["Speed Trap", "blue-dot.png"]
  ];

  pos = {
    lat: location.latitude,
    lng: location.longitude
  }
  var marker = new google.maps.Marker({
    position: pos,
    map: map,
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/" + categories[location.category][1]
    }
  });
  gmarkers.push([marker, location.category]);

  var contentString =
    '<div class="info-window" id="clickableItem" >' +
      '<h3>' + location.title + '</h3>' +
      '<p>' + categories[location.category][0] + '</p>' +
      '<div class="info-content">' +
        '<img src=' + location.picture + ' alt="HTML tutorial" style="width:30px;height:30px;border-radius: 50%; padding: 20px, 20px, 20px, 20px;"' +
        '<p>' + location.content + '</p>' +
      '</div>' +
    '</div>';

  var infoWindow = new google.maps.InfoWindow({
    content: contentString,
    maxWidth: 400
  });
  marker.addListener('click', function () {
    infoWindow.open(map, marker);
  });

  google.maps.event.addListener(infoWindow, 'domready', function () {
    //now my elements are ready for dom manipulation
    var clickableItem = document.getElementById('clickableItem');
    clickableItem.addEventListener('click', () => {
      loadViewPage(location);
    });
  });
}

function loadViewPage(location) {
  localStorage.setItem("currentLocTitle", location.title);
  localStorage.setItem("currentLocContent", location.content);
  localStorage.setItem("currentLocPicture", location.picture);
  localStorage.setItem("currentLocCategory", location.category);

  window.location = "info.html";
}

function changeCategories(int) {
  for (i = 0; i < gmarkers.length; i++) {
    if (int >= 0) gmarkers[i][0].setVisible(int == gmarkers[i][1]);
    else gmarkers[i][0].setVisible(true);
  }
}