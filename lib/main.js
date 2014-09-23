var { ToggleButton } = require('sdk/ui/button/toggle');
var panels = require("sdk/panel");
var self = require("sdk/self");
var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");
var tag = "script";
var type = "link";
var tabs = require("sdk/tabs");
var { Hotkey } = require("sdk/hotkeys");
var system = require("sdk/system");
var platform = system.platform;

var button = ToggleButton({
  id: "speedview-button",
  label: "SpeedView",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onChange: handleChange
});

var panel = panels.Panel({
  width: 300,
  height: 500,
  contentURL: self.data.url("panel.html"),
  onHide: handleHide,
  contentScriptFile: self.data.url("panel.js"),
  contentStyleFile: self.data.url("panel.css"),
});

function handleChange(state) {
  if (state.checked) {
    panel.show({
      position: button
    });
  }
}

function handleHide() {
  button.state('window', {checked: false});
}

pageMod.PageMod({
  include: "*",
  contentScriptFile: data.url("content.js"),
  onAttach: function(worker) {
    worker.port.emit("getURLs", type);
    worker.port.on("gotURL", function(urlContent) {
      panel.port.emit("transferURL", urlContent);
    });
    worker.port.emit("getScripts", tag);
    worker.port.on("gotScript", function(scriptContent) {
      panel.port.emit("transferScript", scriptContent);
    });
    worker.port.emit("getStyles", type);
    worker.port.on("gotStyle", function(styleContent) {
      panel.port.emit("transferStyle", styleContent);
    });
  }
});

tabs.on('activate', function(tab) {
  worker = tab.attach({
    contentScriptFile: self.data.url("content.js")
  });
  worker.port.emit("getURLs", type);
  worker.port.on("gotURL", function(urlContent) {
    panel.port.emit("transferURL", urlContent);
  });
  worker.port.emit("getScripts", tag);
  worker.port.on("gotScript", function(scriptContent) {
    panel.port.emit("transferScript", scriptContent);
  });
  worker.port.emit("getStyles", type);
  worker.port.on("gotStyle", function(styleContent) {
    panel.port.emit("transferStyle", styleContent);
  });
});

tabs.on('pageshow', function(tab) {
  worker = tab.attach({
    contentScriptFile: self.data.url("content.js")
  });
  worker.port.emit("getURLs", type);
  worker.port.on("gotURL", function(urlContent) {
    panel.port.emit("transferURL", urlContent);
  });
  worker.port.emit("getScripts", tag);
  worker.port.on("gotScript", function(scriptContent) {
    panel.port.emit("transferScript", scriptContent);
  });
  worker.port.emit("getStyles", type);
  worker.port.on("gotStyle", function(styleContent) {
    panel.port.emit("transferStyle", styleContent);
  });
});

panel.port.on("resize", function({height}) {
  panel.resize(300, height+50);
});
panel.port.on("close", function({click}) {
  panel.hide();
});
panel.port.emit("getPlatform", platform);

var showHotKey = Hotkey({
  combo: "accel-shift-z",
  onPress: function() {
    panel.show({
      position: button
    });
  }
});