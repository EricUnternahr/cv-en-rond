(function() {
    function chargementStyle(url) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        document.head.appendChild(link);
    }

    function chargementScript(url) {
        const script = document.createElement('script');
        script.src = url;
        script.async = true;
        document.head.appendChild(script); 
    }

    // Déterminer la page actuelle
    let page = window.location.pathname.split("/").pop();

    // Charger les fichiers pour index.html
    if (page === 'index.html' || page === '') {
        if (/Mobi|Android/i.test(navigator.userAgent)) {
            chargementStyle('style-mobile.css');
            chargementScript('script-mobile.js');
        } else {
            chargementStyle('style.css');
            chargementScript('script.js');
        }
    }

    // Charger les fichiers pour cv.html
    if (page === 'cv.html') {
        if (/Mobi|Android/i.test(navigator.userAgent)) {
            chargementStyle('cv-mobile-style.css');
            chargementScript('cv-mobile-script.js');
        } else {
            chargementStyle('cv.css');
            chargementScript('cv.js');
        }
    }

    // Charger les fichiers pour mentions-legales.html
    if (page === 'TechUtilisees.html') {
        if (/Mobi|Android/i.test(navigator.userAgent)) {
            chargementStyle('TechUtilisees-mobile.css');
        } else {
            chargementStyle('TechUtilisees.css');
            
        }
    }
})();
