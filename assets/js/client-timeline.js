// /// Binding enter to open craete timeline 
$('#input-name').on("keyup", function(e){
  if (e.keyCode == 13 && $('#input-name').val() != ''){
    $("#backdrop").fadeIn();
    $("#create-timeline").fadeIn();
    $("#create-timeline").css("display", "flex");
    $(".full-width-text").first().text($("#input-name").val());
  }
})
//  //// clicking on backdrop will hide the craete timeline div
$("#backdrop").on("click", function (e) {
  $("#backdrop").fadeOut();
  $("#create-timeline").fadeOut();
});
//  /////// click will open the craete timeline div
$("#create-timeline-button").on("click", function (e) {
  $("#backdrop").fadeIn();
  $("#create-timeline").fadeIn();
  $("#create-timeline").css("display", "flex");
  $(".full-width-text").first().text($("#input-name").val());
});
//  ////// handling adding nodes to the tree
$(".tf-tree").on("keyup", "input", function (e) {
  if (e.keyCode == 13) {
    var value = $(e.target).val();
    var span = $(e.target).parent();
    var ulList = span.next()[0];
    console.log(ulList);
    if (typeof ulList !== "undefined" && ulList.tagName == "UL") {
      $(ulList).append(
        `<li><span class="tf-nc">${value}<input type="text"></span></li>`
      );
    } else {
      $(span).after(
        `<ul><li><span class="tf-nc">${value}<input type="text"></span></li></ul>`
      );
    }
  }
});
// //// submit timeline
$("#submit-timeline").on("click", function (e) {
  $(this).css('background-color', 'green');
  $(this).html('<i class="fa fa-circle-o-notch fa-spin loading-hidden"></i> Uploading');

  let timelineName = $("#input-name").val();
  let timeline = $(".tf-tree").first().html();
  $.ajax({
    type: "POST",
    url: "/api/submit-timeline",
    data: {
      timelineName: timelineName,
      timeline: timeline,
    },
    success: function (res) {
      $("#submit-timeline").css('background-color', 'navy');
      $("#submit-timeline").text('Send');
      $("#backdrop").fadeOut();
      $("#create-timeline").fadeOut();
      new Noty({
          text: 'Timeline Created successfully',
          type: 'success', 
          theme: "relax", 
          timeout: "1500"
      }).show();
    },
    error: function (err) {
      console.log(err);
      new Noty({
          text: 'Error in craeting timeline',
          type: 'error', 
          theme: "relax", 
          timeout: "1500"
      }).show();
    },
  });
});
