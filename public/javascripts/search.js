$(document).ready(function() {
    // On refresh check if there are values selected
    if (localStorage.selectVal1) {
            // Select the value stored
        $('#select-category').val( localStorage.selectVal1 );
    }

    if (localStorage.selectVal2) {
        $('#select-sell-type').val( localStorage.selectVal2 );
    }

    var cat = $('input[name="cat"]').val();
    if(cat=="Apartment"){
      $("#map").css('display', 'block');
    }

var locations = [];
var ids = [];
var names = [];
var imgs = [];

var l = $('.apartment-location-for-map');
var p = $('.apartment-id-for-map');
var n = $('.apartment-name-for-map');
var m = $('.apartment-img-for-map');

for(var i =0; i<l.length; i++){
  if(!!l[i].value){
    locations.push(l[i].value);
    ids.push(p[i].value);
    names.push(n[i].value);
    imgs.push(m[i].value);
  }
}
console.log(imgs.length);
console.log(locations.length);
if(!!locations)
  initMap(locations, ids, names, imgs);
});

// On change store the value
$('#select-category').on('change', function(){
    var currentVal1 = $(this).val();
    localStorage.setItem('selectVal1', currentVal1 );

});

$('#select-sell-type').on('change', function(){
    var currentVal2 = $(this).val();
    localStorage.setItem('selectVal2', currentVal2 );
});


function initMap(locations, ids, names, imgs) {
  addressSet = false;
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: {lat: parseFloat(locations[0].split('(')[1].split(')')[0].split(',')[0]),
       lng: parseFloat(locations[0].split('(')[1].split(')')[0].split(',')[1])}
  });
var infowindow = new google.maps.InfoWindow();

function placeMarker(locations, ids, names, imgs){
  var marker = new google.maps.Marker({
    map: map,
    position: {lat: parseFloat(locations.split('(')[1].split(')')[0].split(',')[0]),
       lng: parseFloat(locations.split('(')[1].split(')')[0].split(',')[1])}
  });

  google.maps.event.addListener(marker, 'click', function(){
      infowindow.close(); // Close previously opened infowindow
      infowindow.setContent( "<div id='infowindow' style='text-align:center; max-width:300px'><img style='max-width:250px' src='/upload/view/"+imgs+"'/></br><b>"+ names +"</b></br><a href='/product/"+ids+"'>View Apartment</a></div>");
      infowindow.open(map, marker);
  });
}
  for(var i in locations){
    // console.log("adding" +{lat: parseFloat(locations[0].split('(')[1].split(')')[0].split(',')[0]),
    //    lng: parseFloat(locations[0].split('(')[1].split(')')[0].split(',')[1])});
    // console.log(imgs[i]);
placeMarker(locations[i], ids[i], names[i], imgs[i]);
  }
}
