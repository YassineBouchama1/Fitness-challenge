const SERVER_URL = "http://localhost:3000"
const UPLOAD_URL = `${SERVER_URL}/api/upload`;
console.log('test api')
$(document).ready(function () {
  // fect and display fact
  $.ajax({
    // url: "https://corsproxy.io/?url=http://numbersapi.com/1/30/date?json", // this is just for  the url u gives me dosnt work with https
    url: "http://numbersapi.com/1/30/date?json",
    method: "GET",
    success: function (response) {
      $("#number-fact").text(response.text);
    },
    error: function () {
      $("#number-fact").text(
        "Failed to load today's fact. Please try again later."
      );
    },
  });


  const uploadArea = $("#upload-area");
  const fileInput = $("#file-input");
  const previewArea = $("#preview-area");
  const uploadProgress = $("#upload-progress");


  // this display loader while image uploading
  function showGlobalLoading() {
    const loading = $(
      '<div class="global-loading"><div class="loading-spinner"></div></div>'
    );
    uploadArea.append(loading);
  }

  function hideGlobalLoading() {
    uploadArea.find(".global-loading").remove();
  }

  function createPreviewItem(file, previewUrl) {
    const previewItem = $('<div class="preview-item"></div>');
    const img = $("<img>").attr("src", previewUrl);
    const loadingOverlay = $(
      '<div class="loading-overlay"><div class="loading-spinner"></div></div>'
    );

    previewItem.append(img, loadingOverlay);
    previewArea.append(previewItem);

    return previewItem;
  }

  // here we handle drag and drop events
  uploadArea.on("dragover dragenter", function (e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).addClass("dragover");
  });

  uploadArea.on("dragleave drop", function (e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).removeClass("dragover");
  });

  // Handle click to upload
  uploadArea.on("click", function (e) {
    if ($(e.target).closest(".preview-area, .preview-item").length === 0) {
      fileInput.trigger("click");
    }
  });

  // thsi for avoid pagination when user click on file input
  fileInput.on("click", function (e) {
    e.stopPropagation();
  });


  uploadArea.on("drop", function (e) {
    const files = e.originalEvent.dataTransfer.files;
    handleFiles(files);
  });


  fileInput.on("change", function (e) {
    handleFiles(this.files);
  });

  function handleFiles(files) {
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) {
        alert("Please upload image files only.");
        return;
      }

      const reader = new FileReader();
      reader.onload = function (e) {
        const previewItem = createPreviewItem(file, e.target.result);
        showGlobalLoading() // display loading

        const formData = new FormData();
        formData.append("image", file);


        $.ajax({
          url: `${SERVER_URL}/upload`,
          method: "POST",
          data: formData,
          processData: false,
          contentType: false,
          xhr: function () {
            const xhr = new window.XMLHttpRequest();
            xhr.upload.addEventListener(
              "progress",
              function (e) {
                if (e.lengthComputable) {
                  const percent = (e.loaded / e.total) * 100;
                  uploadProgress.css("width", percent + "%");
                }
              },
              false
            );
            return xhr;
          },
          success: function (response) {
            previewItem.find(".loading-overlay").fadeOut();
            uploadProgress.css("width", "0%");
            console.log("File uploaded successfully:", response);
            hideGlobalLoading() // hide loader
          },
          error: function (xhr, status, error) {
            previewItem.find(".loading-overlay").fadeOut();
            uploadProgress.css("width", "0%");
            console.error("Error uploading file:", error);
            hideGlobalLoading()
            alert("Error uploading file. Please try again.");
          },
        });
      };

      reader.readAsDataURL(file);
    });
  }
});
