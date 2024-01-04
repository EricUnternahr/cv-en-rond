
(function() {
    function loadStylesheet(url) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        document.head.appendChild(link);
    }

    function loadScript(url) {
        const script = document.createElement('script');
        script.src = url;
        script.async = true;
        document.head.appendChild(script); 
    }

    // Charger immédiatement les fichiers CSS et JS
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        loadStylesheet('cv-mobile-style.css');
        loadScript('cv-mobile-script.js');
    } else {
        loadStylesheet('cv.css');
        loadScript('cv.js');
    }
})();

