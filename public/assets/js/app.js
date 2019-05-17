$(function() {
  $(".change-devoured").on("click", function(event) {
    var id = $(this).data("id");
    var newDevoured = $(this).data("newdevoured");

    var newDevouredState = {
      devoured: newDevoured
    };

    //send the PUT request
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newDevouredState
    }).then(function() {
      console.log("changed devoured to " + newDevoured);
      location.reload();
    });
  });

  $(".create-form").on("submit", function(event) {
    event.preventDefault();

    var newBurger = {
      burger_name: $("#ba")
        .val()
        .trim(),
      devoured: $("[name=devoured]:checked")
        .val()
        .trim()
    };

    $.ajax("/api/burger", {
      type: "POST",
      data: newBurger
    }).then(function() {
      console.log("Burger added");
      location.reload();
    });
  });

  $(".delete-burger").on("click", function(event) {
    var id = $(this).data("id");

    //Send the DELETE request

    $.ajax("api/burger/" + id, {
      type: "DELETE"
    }).then(function() {
      console.log("deleted burger", id);

      location.reload();
    });
  });
});
