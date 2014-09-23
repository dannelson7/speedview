self.port.on("transferURL", function(urlContent) {
	if (urlContent == "empty") {
		document.getElementById("title-js").className = "hide";
		document.getElementById("list").innerHTML = null;
		document.getElementById("title-css").className = "hide";
		document.getElementById("css").innerHTML = null;
		document.getElementById("no-content").className = "show";
	} else {
		document.getElementById("title-js").className = "show";
		document.getElementById("list").innerHTML = null;
		document.getElementById("title-css").className = "show";
		document.getElementById("css").innerHTML = null;
		document.getElementById("no-content").className = "hide";
		function getHeight(){
			var clientHeight = document.getElementById('speedview').clientHeight;
			self.port.emit('resize', {height: clientHeight});
		}
		function setHeight(){
			setTimeout(getHeight, 1000);
		}
		document.onload = setHeight();
	}
});

self.port.on("transferScript", function(scriptContent) {
	if (scriptContent.indexOf(".js") > -1) {
		var nameQuery = scriptContent.substring(scriptContent.lastIndexOf('/')+1);
		var name = nameQuery.split('?',1);
		var list = document.getElementById("list");
		var entry = document.createElement('li');
		var link = document.createElement('a');
		link.setAttribute('href', scriptContent);
		link.setAttribute('target', '_blank');
		link.appendChild(document.createTextNode(name));
		list.appendChild(entry);
		entry.appendChild(link);
	}
});

self.port.on("transferStyle", function(styleContent) {
	if (styleContent.indexOf(".css") > -1) {
		var nameQuery = styleContent.substring(styleContent.lastIndexOf('/')+1);
		var name = nameQuery.split('?',1);
		var list = document.getElementById("css");
		var entry = document.createElement('li');
		var link = document.createElement('a');
		link.setAttribute('href', styleContent);
		link.setAttribute('target', '_blank');
		link.appendChild(document.createTextNode(name));
		list.appendChild(entry);
		entry.appendChild(link);
	}
});

document.getElementById('speedview').onclick = function() {
    self.port.emit('close', {click: on});
}

self.port.on("getPlatform", function(platform) {
	if (platform == "darwin") {
		document.getElementById("shortcut-mac").className = "inline";
	} else {
		document.getElementById("shortcut-pc").className = "inline";
	}
});