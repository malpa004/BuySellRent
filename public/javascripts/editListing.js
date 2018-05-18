$(".save-button").click(function(){
    console.log("Button Clicked!!");
    var id=$('input[name="prodId"]').val();
    var name=$('input[name="name"]').val();
    var description=$('textarea[name="description"]').val();
    var category=$('select[name="category"]').val();
    var type=$('select[name="type"]').val();
    var price=$('input[name="price"]').val();

    console.log(id);

    if(category=="Apartment")
        {
              var location =$('input[name="location"]').val();
           var address=$('input[name="address"]').val();
           var beds=$('input[name="beds"]').val();
           var bath=$('input[name="bath"]').val();
           var area=$('input[name="area"]').val();
           var pets=$('input[name="pets"]').val();
           var parking=$('input[name="parking"]').val();
           var ac=$('input[name="ac"]').val();
        }

    if(type=="Rent")
        {
            var from_date=$('input[name="from_date"]').val();
            var to_date=$('input[name="to_date"]').val();
        }


  $.ajax({
    url: '/user/editListing',
    data: {'id': id, 'name':name, 'description': description, 'category': category, 'type': type, 'price': price, 'address': address,'location':location, 'beds':beds, 'bath':bath, 'area':area, 'pets': pets, 'parking': parking, 'ac':ac, 'from_date':from_date, 'to_date': to_date},
    type: 'POST',
    success: function(data) {
      // console.log(data);
      window.location='/user/allListings'
    }
  });
});
