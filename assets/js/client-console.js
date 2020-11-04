let getTheFileSystem = function () {
  $.ajax({
    type: "GET",
    url: "/api/get-file-system",
    success: function (data) {
      fileSystem = data.data;
      return fileSystem;
    },
    error: function (err) {
      console.log(err);
    },
  });
};


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
      },
      allowedFileExtensions: [".png", ".jpg", "jpeg", "wepg"],
    });
  }, 1000);

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
      },
      error: function (err) {
        console.log(err);
      },
    });
  });
//  ////////////////////////////// Direct Share  ////////////////////////////
  $("#direct-share-button").click(function (event) {
    $(this).css('background-color', 'green');
    $(this).html('<i class="fa fa-circle-o-notch fa-spin loading-hidden"></i> Uploading');
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
        },
        error: function (err) {
          console.log(err);
        },
      });
    } else {
      console.log("Please select a badge and press save changes");
    }
  });
});
