$('.allListings-delete-btn').click(function(){
  console.log('clicked');
     $("#confDelete").addClass("is-active");
    console.log($(this).closest(".card").find('input[name="id"]').val())
    $('input[name="chosenId"]').val($(this).closest(".card").find('input[name="id"]').val());
});

$("#closeCommentForm").click(function(){
    $("#confDelete").removeClass("is-active");
});

$("#cancel").click(function(){
    $("#confDelete").removeClass("is-active");
});

$("#delete").click(function(){
var id=$('input[name="chosenId"]').val();
  $.ajax({
    url: '/user/deleteRequest',
    data: {'id':id},
    type: 'POST',
    success: function(data) {
      location.reload();
    }
  });
});

$("#deleteListing").click(function(){
var id=$('input[name="chosenId"]').val();
  $.ajax({
    url: '/user/deleteListing',
    data: {'id':id},
    type: 'POST',
    success: function(data) {
      location.reload();
    }
  });
});
