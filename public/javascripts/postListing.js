var addressSet = false;
var isApartment = false;

$(function() {
  initMap();
  console.log('postListing.js ready');

  $('#fileUpload').change(function() {
    var f = $('#fileUpload')[0].files;
    var text = "";
    for(var i = 0; i < f.length; i++){
      console.log(i+" "+$('#fileUpload')[0].files[i].name)
      text+= $('#fileUpload')[0].files[i].name+", ";
    }
    console.log(text);
    $('#fileUploadLabel').html( text );
  });

  $('#select-type').find(":selected").each(function () {
    // do something amazing here
    var selectedValue = $(this).val();
    console.log(selectedValue);

    if(selectedValue === "Rent"){
      $('#price-label').text("Price ($) / Month");
      $('#price-input').attr("placeholder","Price ($) / Month");
      $('#rent-extras').css('display', 'flex');
      $('input[name="from-date"]').attr('required', true);
      $('input[name="to-date"]').attr('required', true);
    }else{
       $('#price-label').text("Price ($)");
       $('#price-input').attr("placeholder","Price ($)");
        $('#rent-extras').css('display', 'none');
        $('input[name="from-date"]').attr('required', false);
        $('input[name="to-date"]').attr('required', false);
    }
  });

  $('#select-category').find(":selected").each(function () {
    // do something amazing here
    var selectedValue = $(this).val();
    console.log(selectedValue);

    if(selectedValue === "Apartment"){
      isApartment = true;
      $('#apartment-extras').css('display', 'block');
      $('input[name="beds"]').attr('required', true);
      $('input[name="bath"]').attr('required', true);
      $('input[name="area"]').attr('required', true);
      $('input[name="address"]').attr('required', true);
      initMap();

    }else{
      isApartment = false;
        $('#apartment-extras').css('display', 'none');
        $('input[name="beds"]').attr('required', false);
        $('input[name="bath"]').attr('required', false);
        $('input[name="area"]').attr('required', false);
        $('input[name="address"]').attr('required', false);
    }
  });



  $('#select-category').bind("change keyup",function() {
     $(this).find(":selected").each(function () {
       // do something amazing here
       var selectedValue = $(this).val();
       console.log(selectedValue);

       if(selectedValue === "Apartment"){
         isApartment = true;
         $('#apartment-extras').css('display', 'block');
         $('input[name="beds"]').attr('required', true);
         $('input[name="bath"]').attr('required', true);
         $('input[name="area"]').attr('required', true);
         $('input[name="address"]').attr('required', true);
         initMap();

       }else{
           isApartment = false;
           $('#apartment-extras').css('display', 'none');
           $('input[name="beds"]').attr('required', false);
           $('input[name="bath"]').attr('required', false);
           $('input[name="area"]').attr('required', false);
           $('input[name="address"]').attr('required', false);
       }
     });
  });

  $('#select-type').bind("change keyup",function() {
     $(this).find(":selected").each(function () {
       // do something amazing here
       var selectedValue = $(this).val();
       console.log(selectedValue);

       if(selectedValue === "Rent"){
         $('#price-label').text("Price ($) / Month");
         $('#price-input').attr("placeholder","Price ($) / Month");
         $('#rent-extras').css('display', 'flex');
         $('input[name="from-date"]').attr('required', true);
         $('input[name="to-date"]').attr('required', true);
       }else{
          $('#price-label').text("Price ($)");
          $('#price-input').attr("placeholder","Price ($)");
           $('#rent-extras').css('display', 'none');
           $('input[name="from-date"]').attr('required', false);
           $('input[name="to-date"]').attr('required', false);
       }
     });
  });

  function initMap() {
    addressSet = false;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: {lat: 44.9963503, lng: -93.2643106}
    });
    var geocoder = new google.maps.Geocoder();

    $('button[name="get_coordinates"]').click(function(e){
      geocodeAddress(geocoder, map);
    });
  }

  function geocodeAddress(geocoder, resultsMap) {
    var address = $('input[name="address"]').val()+ " Minnesota";
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        addressSet = true;
        $('input[name="location"]').val(results[0].geometry.location);

        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
});

function validateMyForm(){
  console.log("popo");
  if(isApartment && !addressSet){
      alert('Address not found');
      return false;
  }
  else {
    return true;
  }
}
