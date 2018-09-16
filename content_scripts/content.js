chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "start" ) {
      start();
    }
  }
);

function start(){
  var scripts = document.getElementsByTagName("script");
  var scriptsSrc = [];
  for (var i = 0; i < scripts.length; i++) {
    var scriptStr = scripts[i].src;
    if (scriptStr) {
      scriptsSrc.push(scriptStr);
    }
  }

  var styles = document.getElementsByTagName("link");
  var stylesSrc = [];
  for (var i = 0; i < styles.length; i++) {
    var styleStr = styles[i].href;
    if (styleStr.indexOf(".css") >= 0) {
      stylesSrc.push(styleStr);
    }
  }

  function notifyBackgroundPage(e) {
    var sending = chrome.runtime.sendMessage({
    scriptSrc: scriptsSrc,
    stylesSrc: stylesSrc
    });
  }

  notifyBackgroundPage();
}