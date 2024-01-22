(function() {
    let ecranChargementDejaMasque = false;

    function chargementStyle(url) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        document.head.appendChild(link);
    }

    function chargementScript(url, callback) {
        const script = document.createElement('script');
        script.src = url;
        script.async = true;
        script.onload = callback;
        document.head.appendChild(script);
    }

    function masquerEcranChargement() {
        if (!ecranChargementDejaMasque) {
            let loadingScreen = document.getElementById('loadingScreen');
            if (loadingScreen) {
                loadingScreen.style.display = 'none';
                ecranChargementDejaMasque = true;
            }
        }
    }

    
    let delaiMax = 5000; // 5000 millisecondes = 5 secondes
    setTimeout(masquerEcranChargement, delaiMax);



    function estMobile() {
        return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) || window.innerHeight > window.innerWidth;
    }

    let page = window.location.pathname.split("/").pop();

    if (page === 'index.html' || page === '') {
        if (estMobile()) {
            chargementStyle('style-mobile.css');
            chargementScript('script-mobile.js', masquerEcranChargement);
        } else {
            chargementStyle('style.css');
            chargementScript('script.js', masquerEcranChargement);
        }
    }

    if (page === 'cv.html') {
        if (estMobile()) {
            chargementStyle('cv-mobile-style.css');
            chargementScript('cv-mobile-script.js', masquerEcranChargement);
        } else {
            chargementStyle('cv.css');
            chargementScript('cv.js', masquerEcranChargement);
        }
    }

    if (page === 'TechUtilisees.html') {
        if (estMobile()) {
            chargementStyle('TechUtilisees-mobile.css');
        } else {
            chargementStyle('TechUtilisees.css');
        }
        
        masquerEcranChargement();
    }
})();

