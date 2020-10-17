/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
/* eslint-disable block-scoped-var */
/* eslint-disable max-len */
if (typeof (EXT_NAME_CONTENT_SCRIPT_LOADED) === 'undefined') {
  // eslint-disable-next-line no-var
  var EXT_NAME_CONTENT_SCRIPT_LOADED = true;

  const ExtName = {};

  //---------------------------------------------------------------------------------------------------------------------
  ExtName.initialize = function () {
    console.log('Initializing extension content script');

    // On document ready
    $(document).ready(() => {
      // Load CSS
      const path = chrome.extension.getURL('css/content.css');
      const link = document.createElement('link');
      link.setAttribute('rel', 'stylesheet');
      link.setAttribute('type', 'text/css');
      link.setAttribute('href', path);
      document.getElementsByTagName('head')[0].appendChild(link);
    }); // End of document.ready

    // End of initialize
  };

  //---------------------------------------------------------------------------------------------------------------------
  // Start the extension content script
  ExtName.initialize();
}
