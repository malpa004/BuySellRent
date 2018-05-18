console.log('Hi');

$('#saveEditedProfile').click(function(e) {
    // how to select the file itself
    $('#errorDiv').css('display', 'none');

    var userInfo = Object();
    userInfo.displayName = $('#name').val();
    userInfo.email = $('#email').val();
    userInfo.contactNumber = $('#contactNumber').val();

    console.log($('#contactNumber').val());

    $.ajax({
      url: '/user/editProfile',
      data: userInfo,
      type: 'POST',
      success: function(data) {
        console.log('data', data);
        if(!!data.Error){
          $('#errorDiv').css('display', 'inline-block');
          $('#errorText').html(data.Error);
          // alert(data.Error);
        }else{
          window.location = "/user/editProfile";
        }
        $('#ajaxResponse').html(JSON.stringify(data));

      }
    });

  });
