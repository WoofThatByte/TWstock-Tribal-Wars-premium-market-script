function loadPage(url, target) {
    $.ajax({
      url: url,
      type: 'GET',
      success: function(response) {
        $('#' + target).html(response);
      },
      error: function(xhr) {
        alert('Error loading page: ' + xhr.statusText);
      }
    });
  }