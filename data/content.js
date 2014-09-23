if (document.URL.indexOf("about:") == -1) {

  self.port.on("getURLs", function(type) {
      var url = document.URL;
      self.port.emit("gotURL", url);
  });

  self.port.on("getScripts", function(tag) {
    var scripts = document.getElementsByTagName(tag);
    for (var i = 0; i < scripts.length; i++) {
      self.port.emit("gotScript", scripts[i].src);
    }
  });

  self.port.on("getStyles", function(type) {
    var styles = document.getElementsByTagName(type);
    for (var i = 0; i < styles.length; i++) {
      self.port.emit("gotStyle", styles[i].href);
    }
  });

} else {

  self.port.on("getURLs", function(type) {
      var url = "empty";
      self.port.emit("gotURL", url);
  });

}