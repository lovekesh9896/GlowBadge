// //////////// Get fileSystem form the server
let getTheFileSystem = function () {
  $.ajax({
    type: "GET",
    url: "/api/get-file-system",
    success: function (data) {
      fileSystem = data.data;
      return fileSystem;
    },
    error: function (err) {
       new Noty({
          text: 'Error in Loading filesystem',
          type: 'error', 
          theme: "relax", 
          timeout: "1500"
      }).show();
      console.log(err);
    },
  });
};

// /////////// Initialize the file explorer
let currBadge;
$(document).ready(async () => {
  fileSystem = getTheFileSystem();
  setTimeout(function () {
    $("#file-manager").dxFileManager({
      name: "fileManager",
      fileSystemProvider: fileSystem,
      permissions: {
        create: true,
        copy: true,
        move: true,
        delete: true,
        rename: true,
        upload: true,
      },
      onSelectedFileOpened: function (e) {
        var popup = $("#photo-popup").dxPopup("instance");
        popup.option({
          title: e.file.name,
          contentTemplate: `<img src="${e.file.dataItem.url}" alt="Red dot" />`,
        });
        popup.show();
      },
      onFocusedItemChanged: function (e) {
        if (e.item && e.item.isDirectory) {
          $("#url-update").text("Path : Image Path");
          currBadge = null;
        } else {
          currBadge = null;
          if (e.item != null) {
            $("#url-update").text(`Path : "${e.item.path}"`);
            currBadge = e.item.path;
          }
        }
      },
      onContextMenuItemClick: function (e) {
        $("#upload-asset-button").prop("disabled", false);
        $("#upload-asset-button").css('background-color', 'navy');
      },
      onToolbarItemClick: function (e) {
        $("#upload-asset-button").prop("disabled", false);
        $("#upload-asset-button").css('background-color', 'navy');
      },
      allowedFileExtensions: [".png", ".jpg", "jpeg", "wepg"],
    });
  }, 1000);
// ///////// POP up on badge select
  $("#photo-popup").dxPopup({
    maxHeight: 600,
    closeOnOutsideClick: true,
    onContentReady: function (e) {
      var $contentElement = e.component.content();
      $contentElement.addClass("photo-popup-content");
    },
  });
//  ///////////////////// Upload the file System /////////////////////////////
  $("#upload-asset-button").click(function () {
    $(this).css('background-color', 'green');
    $(this).html('<i class="fa fa-circle-o-notch fa-spin loading-hidden"></i> Uploading');
    $.ajax({
      url: "/api/update-file-system",
      type: "POST",
      data: { data: JSON.stringify(fileSystem) },
      dataType: "json",
      beforeSend: function (x) {
        if (x && x.overrideMimeType) {
          x.overrideMimeType("application/j-son;charset=UTF-8");
        }
      },
      success: function (data) {
        $("#upload-asset-button").prop("disabled", true);
        $("#upload-asset-button").css('background-color', 'lightgrey');
        $("#upload-asset-button").text('Save Changes');
<<<<<<< HEAD
	location.reload();
=======
        location.reload();
>>>>>>> dbec6180481ae44b64914f56cffdd304db2ec967
        new Noty({
          text: 'File System Updated Successfully',
          type: 'error', 
          theme: "relax", 
          timeout: "1500"
      }).show();
      },
      error: function (err) {
        $("#upload-asset-button").css('background-color', 'navy');
        $("#upload-asset-button").text('Save Changes');
        new Noty({
          text: 'Error in Uploading filesystem',
          type: 'error', 
          theme: "relax", 
          timeout: "1500"
      }).show();
        console.log(err);
      },
    });
  });
//  ////////////////////////////// Direct Share  ////////////////////////////
  $("#direct-share-button").click(function (event) {
    $(this).css('background-color', 'green');
    $(this).html('<i class="fa fa-circle-o-notch fa-spin loading-hidden"></i> Sending...');
    event.preventDefault();
    var emails = $("#email-entries").val();
    var criteria = $("#criteria").val();
    if (currBadge != null) {
      $.ajax({
        type: "POST",
        url: "/api/direct-share",
        data: {
          emails: emails,
          criteria: criteria,
          path: currBadge,
        },
        success: function (resposnse) {
          $("#direct-share-button").css('background-color', 'navy');
          $("#direct-share-button").text('Send');
          new Noty({
              text: 'Badge Shared Successfuly',
              type: 'success', 
              theme: "relax", 
              timeout: "1500"
          }).show();
        },
        error: function (err) {
          $("#direct-share-button").css('background-color', 'navy');
          $("#direct-share-button").text('Send');
          new Noty({
              text: 'Internal Server Error',
              type: 'error', 
              theme: "relax", 
              timeout: "1500"
          }).show();
          console.log(err);
        },
      });
    } else {
      new Noty({
          text: 'Please select a badge from filesystem',
          type: 'error', 
          theme: "relax", 
          timeout: "1500"
      }).show();
      console.log("Please select a badge and press save changes");
    }
  });
});
