$('input#search').on('change paste keyup', function () {
  var value = $(this).val().toLowerCase();
  if (!value) {
    $('.list-search-style').html('');
  } else {
    _searchStart(value);
  }

  function _searchStart(v) {
    $('.list-search-style').html(
      '#container2 .type1:not([data-title*="' + v + '"]) {display: none;}' +
      '#container2 .hh:not([data-title*="' + v + '"]) {display: none;}' +
      '#container2 .underline:not([data-title*="' + v + '"]) {display: none;}'
    );
  }
})
