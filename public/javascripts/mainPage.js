var userId = $('input[name="user-logged-in"]').val();
console.log(userId);

if(!!userId){
  $('.comment-if-user').css('display', 'block');
}

$("#toggle-book").click(function(){
  $('#book-content').toggle();
  $(this).children('i').toggleClass("fa-chevron-down fa-chevron-up");
});

$("#toggle-apartment").click(function(){
  $('#apartment-content').toggle();
  $(this).children('i').toggleClass("fa-chevron-down fa-chevron-up");
});

$("#toggle-furniture").click(function(){
  $('#furniture-content').toggle();
  $(this).children('i').toggleClass("fa-chevron-down fa-chevron-up");
});

$("#toggle-bike").click(function(){
  $('#bike-content').toggle();
  $(this).children('i').toggleClass("fa-chevron-down fa-chevron-up");
});

$("#toggle-other").click(function(){
  $('#other-content').toggle();
  $(this).children('i').toggleClass("fa-chevron-down fa-chevron-up");
});

$("#addRequest").click(function(){
    $(".requestForm").addClass("is-active");
});

$("#closeRequestForm").click(function(){
    $(".requestForm").removeClass("is-active");
});

$(".addComment").click(function(){
   $(".commentForm").addClass("is-active");
  //  $("#sendMailTo").val($(this).closest(".card").attr("postedBy"));
   $("#buyer").html("Send Email to: "+ $(this).closest(".card").find('input[name="postedBy"]').val());
   $("#subject").val("Re: "+$(this).closest(".card").find('input[name="item"]').val());
   $("#commentMessage").val("Hi I saw your request for: "+$(this).closest(".card").find('input[name="item"]').val() +". I have something similar if you are interested. Do let me know.");
   $("#commentEmail").val($(this).closest(".card").find('input[name="email"]').val());
});

$("#closeCommentForm").click(function(){
    $(".commentForm").removeClass("is-active");
});


$('#saveRequest').click(function(e) {
  console.log("Mein aya");
    // how to select the file itself
    $('#errorDiv').css('display', 'none');

    var request = Object();

    request.category = $('#category').val();
    request.requirement = $('#requirement').val();
    request.requestMessage = $('#requestMessage').val();



console.log($('#name').val());
    console.log(request);


    $.ajax({
      url: '/addRequest',
      data: request,
      type: 'POST',
      success: function(data) {
        console.log('data', data);
        if(!!data.Error){
          $('#errorDiv').css('display', 'inline-block');
          $('#errorText').html(data.Error);
          // alert(data.Error);
        }else{
          $(".requestForm").removeClass("is-active");
          window.location = "/";
        }
        $('#ajaxResponse').html(JSON.stringify(data));

      }
    });

  });



  $('#saveComment').click(function(e) {
    console.log("Mein aya");
      // how to select the file itself
      $('#errorDiv').css('display', 'none');

      var data = Object();
      data.subject = $('#subject').val();
      data.message =  $('#commentMessage').val();
      data.email = $('#commentEmail').val();

      console.log(data);


      $.ajax({
        url: '/product/replyRequest',
        data: data,
        type: 'POST',
        success: function(data) {
          console.log('data', data);
          location.reload();
        }
      });

    });
