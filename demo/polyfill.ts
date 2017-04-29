// Polyfill for browser that doesn't support Web Component

(function() {
    if ("registerElement" in document
        && "import" in document.createElement("link")
        && "content" in document.createElement("template")) {
        // platform is good!
    } else {
        // polyfill the platform!
        let e = document.createElement("script");
        e.src = "bower_components/webcomponentsjs/webcomponents-lite.min.js";
        document.body.appendChild(e);
    }
})();
