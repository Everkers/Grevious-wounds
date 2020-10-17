//----------------------------------------------------------------------------------------------------------------------------------------------------
// Set the environment
//----------------------------------------------------------------------------------------------------------------------------------------------------
const ENVIRONMENT = 'development';
// if (chrome.runtime.id == '[CWS_EXTENSION_ID]') ENVIRONMENT = 'production'; // Chrome Web Store version

//----------------------------------------------------------------------------------------------------------------------------------------------------
// Global vars
//----------------------------------------------------------------------------------------------------------------------------------------------------
const PRINT_LOGS = true;

//----------------------------------------------------------------------------------------------------------------------------------------------------
// Helper functions
//----------------------------------------------------------------------------------------------------------------------------------------------------
// Get tab name: helper method for debug prints
const getTabName = function (tab) {
  return `${tab.id} "${tab.url.substr(0, 135).replace('https://', '').replace('http://', '')}...` + '"';
};

// Logging helpers
const log = function () {
  if (PRINT_LOGS) console.log.apply(console, arguments);
};
const logWarn = function () {
  if (PRINT_LOGS) console.warn.apply(console, arguments);
};
const logError = function () {
  if (PRINT_LOGS) console.error.apply(console, arguments);
};
const logTime = function () {
  if (PRINT_LOGS) console.time.apply(console, arguments);
};
const logTimeEnd = function () {
  if (PRINT_LOGS) console.timeEnd.apply(console, arguments);
};

// Parse the specified URL into host, path, hash, etc.
const parseUrl = function (url) {
  const parser = document.createElement('a');
  parser.href = url;
  return parser;
  // e.g. {protocol: "http:", host: "abc.com:3000", hostname: "abc.com", port: "3000", pathname: "/path/", search: "?search=test", hash: "#hash"}
};

// Send an HTTP POST request expecting a JSON response
const sendHttpPostRequest = function (url, params, callback) {
  const kvps = [];
  for (const k in params) {
    const v = params[k];
    kvps.push(`${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
  }
  const paramsString = kvps.join('&');

  const xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        var resp = null;
        // JSON.parse does not evaluate the attacker's scripts.
        try {
          var resp = JSON.parse(xhr.responseText);
        } catch (e) {
          callback('Error parsing response as JSON: ', e, `\nResponse is: ${xhr.responseText}`);
        }
        if (resp) callback(null, resp);
      } else {
        callback(`${xhr.status} | ${xhr.statusText} | ${xhr.responseText}`);
      }
    }
  };
  xhr.send(paramsString);
};
