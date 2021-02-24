// Calling Rescue Time Data
document.addEventListener("DOMContentLoaded", function () {
	// ...
	// setTimeout(embedLin, 5000);
	setTimeout(removeAllEmbed, 1000);
});

function embedLin() {
	console.log("Hello Kautilya");
	var cssLink = document.createElement("link");
	cssLink.href = "../css/embed.css";
	cssLink.rel = "stylesheet";
	console.log(cssLink.href.toString());
	cssLink.type = "text/css";
	// console.log(frames["emb_5480cf"].document.body);
	window.frames["embedly-card"].document.body.appendChild(cssLink);

	// frames["c"].document.body.appendChild(cssLink);
}

/* Removing Sponsored or Powered by Content */
function removeAllEmbed() {
	console.log("Hello Sensehack");
	removeEmbedLayer("emb_sm4o04");
	removeAuthorViaEmbed("emb_sm4o04");
	removeEmbedLayer("emb_0is1oe");
	removeAuthorViaEmbed("emb_0is1oe");
	removeEmbedLayer("emb_5480cf");
	removeAuthorViaEmbed("emb_5480cf");
}

function oldEmbedRemove() {
	var iframe = document.getElementById("emb_sm4o04");
	var style = document.createElement("style");
	style.textContent =
		".card .brd {" +
		" text-align: right; padding: 7px 0 5px; display: none !important;" +
		"}";
	sty;
	iframe.contentDocument.head.appendChild(style);
}

function removeEmbedLayer(idName) {
	var iframe1 = document.getElementById(idName);
	var style = document.createElement("style");
	style.textContent = ".card .brd {" + "display: none !important;" + "}";
	iframe1.contentDocument.head.appendChild(style);
}

function removeAuthorViaEmbed(idName) {
	var iframe1 = document.getElementById(idName);
	var style = document.createElement("style");
	style.textContent = ".card .hdr .via {" + "display: none !important;" + "}";
	iframe1.contentDocument.head.appendChild(style);
}
