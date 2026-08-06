;(function () {
  'use strict';

  var STORAGE_KEY = 'slateBannerDismissed';

  $(function() {
    $('#announce-close').on('click', function() {
      $('#announce-banner').remove();
      document.documentElement.className += ' banner-hidden';

      try {
        localStorage.setItem(STORAGE_KEY, '1');
      } catch (e) {}

      // every heading moved up by the banner height, so the ToC's cached
      // offsets are stale
      if (window.recacheHeights) {
        window.recacheHeights();
        window.refreshToc();
      }
    });
  });
})();
