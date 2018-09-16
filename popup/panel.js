document.addEventListener("DOMContentLoaded", function() {
  popup();
});

function popup() {
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "start"});
  });
}

function handleMessage(request, sender) {
  // JavaScript Files
  var scripts = request.scriptSrc;
  var scriptList = '';
  var scriptsLength = scripts.length;
  if (scriptsLength > 0) {
    document.getElementById("title-js").className = "show";
    document.getElementById("no-content").className = "hide";
  }
  for (var i = 0; i < scriptsLength; i++) {
    iconUrl = scripts[i].substring(0, scripts[i].indexOf('/',8));
    if (iconUrl.includes("google")) {
      favIcon = 'https://www.google.com/favicon.ico';
    } else if (iconUrl.includes("bing")) {
      favIcon = 'https://www.bing.com/favicon.ico';
    } else {
      favIcon = iconUrl + '/favicon.ico';
    }
    scriptList += '<li><a href="' + scripts[i] + '" target="_blank"><img src="' + favIcon + '" alt="">' + scripts[i] + '</a></li>';
  }
  document.getElementById("list").innerHTML = scriptList;
  document.getElementById("count-js").innerHTML = scriptsLength;

  // CSS Files
  var styles = request.stylesSrc;
  var styleList = '';
  var stylesLength = styles.length;
  if (stylesLength > 0) {
    document.getElementById("title-css").className = "show"
    document.getElementById("no-content").className = "hide";
  }
  for (var i = 0; i < stylesLength; i++) {
    iconUrl = styles[i].substring(0, styles[i].indexOf('/',8));
    if (iconUrl.includes("google")) {
      favIcon = 'https://www.google.com/favicon.ico';
    } else if (iconUrl.includes("bing")) {
      favIcon = 'https://www.bing.com/favicon.ico';
    } else {
      favIcon = iconUrl + '/favicon.ico';
    }
    styleList += '<li><a href="' + styles[i] + '" target="_blank"><img src="' + favIcon + '" alt="">' + styles[i] + '</a></li>';
  }
  document.getElementById("css").innerHTML = styleList;
  document.getElementById("count-css").innerHTML = stylesLength;
}

chrome.runtime.onMessage.addListener(handleMessage);