$(function() {
  console.log('local.js ready');

  var numImages = $('.prod_image').length;
  var counter =0;
  displayImage(counter);
  $('.next-icon').click(function(){
    counter = (counter + 1 )%numImages;
    displayImage(counter);
  });

  $('.prev-icon').click(function(){
    counter = (counter + 1 )%numImages;
    displayImage(counter);
  });

  function displayImage(counter){
    var url = "url("+$('.prod_image')[counter].src+")";
    $('#images').css('background-image',url);
    }

    $("button[name='postComment']").click(function(){
      var comment = $('textarea[name="comment"]').val();
      userid = $('input[name="userId"]').val();
      username = $('input[name="userName"]').val();
      userpic = $('input[name="userPic"]').val();
      productId = $('input[name="productId"]').val();
      if(!!comment){
        $.post( "/product/comment", {productId:productId, userid: userid,username: username,userpic: userpic, comment:comment })
      .done(function( data ) {
          location.reload();
      });
      }
    });

    $('#contactSellerBtn').click(function(){
      $('#contactSeller').addClass('is-active');
    });

    $('#sendEmail').click(function(){
      var sub = $('#emailSubject').val();
      var text = $('#emailText').val();
      var productId = $('input[name="productId"]').val();

      if(!!sub && !!text){
        $.post( "/product/contactSeller", {productId:productId, subject: sub,text: text})
      .done(function( data ) {
        $('#contactSeller').removeClass('is-active');
      });
    }else{
      alert('Fill out all fields');
    }
    });

    $("#closeRequestForm").click(function(){
        $(".requestForm").removeClass("is-active");
    });

    $("#closeCommentForm").click(function(){
        $(".commentForm").removeClass("is-active");
    });
});
