
// !Interaction pour .bigBox
document.querySelector('.bigBox').addEventListener('click', function() {
    this.querySelector('.box').classList.toggle('is-flipped');

});

//!ANIMATION AU CLIC SUR LES PANELS

let isPanelActive = false;

document.querySelectorAll('.panel').forEach(function(panel) {
    panel.addEventListener('click', function() {
        
        if (isPanelActive && !this.classList.contains('active')) {
            return;
        }

        const allPanels = document.querySelectorAll('.panel');
        const contactDiv = document.querySelector('.contact'); 
        const intro = this.querySelector('.intro');
        const introParagraphs = this.querySelectorAll('.intro p');
        const card = this.querySelector('.card');
        const isIntroVisible = intro.style.opacity === "1";

        allPanels.forEach(p => {
            if (p !== this) {
                p.style.opacity = isIntroVisible ? "1" : "0";
                p.classList.remove('active'); 
            }
        });

        intro.style.opacity = isIntroVisible ? "0" : "1";
        card.style.opacity = isIntroVisible ? "1" : "0";
        introParagraphs.forEach(p => {
            p.style.opacity = isIntroVisible ? "0" : "1";
        });

        if (!isIntroVisible) {
            contactDiv.style.opacity = "0";
            
            isPanelActive = true; 
            this.classList.add('active'); 
        } else {
            contactDiv.style.opacity = "1";
            
            isPanelActive = false; 
            this.classList.remove('active'); 
        }
    });
});

//!CONTACT

    const contactDiv = document.querySelector('.contact');
    const centre = document.querySelector('.centre');
    let isTransformed = false;
    let addedElements = [];

    contactDiv.addEventListener('click', function() {
        if (!isPanelActive & !isTransformed) {
            transformContactDiv();
            isTransformed = true;
            centre.style.transform = 'scale(0.5)';
            centre.style.opacity = '0';
        }
    });

    // !ajustement de la taille de la DIV CONTACT


    function adjustDivProperties() {
        contactDiv.style.height = 'auto';
        contactDiv.style.width = '80vw';
        contactDiv.style.fontSize = '5vw'; 
        contactDiv.style.lineHeight = '8vw';
        contactDiv.style.border ='1vw rgb(19, 247, 3) solid'
        contactDiv.style.borderRadius='2vw'
        contactDiv.style.padding ='2vh'
        contactDiv.style.top = '15%'
        contactDiv.style.left = '-1%'

    
}
    window.addEventListener('resize', function() {
        if (isTransformed) {
            adjustDivProperties();
        }
    });

    function transformContactDiv() {
        contactDiv.style.borderRadius = '45px';
        contactDiv.style.display = 'flex';
        contactDiv.style.flexDirection = 'column';
        contactDiv.style.justifyContent = 'center';
        contactDiv.style.alignItems = 'center';
        contactDiv.style.color = 'white';
        
        adjustDivProperties();
        
        // Ajouter la croix de fermeture et les liens
        const closeButton = createCloseButton();
        contactDiv.appendChild(closeButton);
        addedElements.push(closeButton);

        // Informations pour les liens
        const linkInfo = [
            { href: 'mailto:unternahr.eric@gmail.com', text: 'unternahr.eric@gmail.com' },
            { href: 'tel:+33612356741', text: '06 12 35 67 41' },
            { href: 'https://fr.linkedin.com/in/eric-unternahr-2b798b222', text: 'LinkedIn' },
            { href: 'https://github.com/EricUnternahr', text: 'GitHub' }
        ];

        // délai d'apparition des liens
        linkInfo.forEach((info, index) => {
            setTimeout(() => {
                const link = createAndAppendLink(info.href, info.text);
                addedElements.push(link);
            }, 220 * (index + 1)); 
        });
    }

    function createAndAppendLink(href, displayText) {
        const link = document.createElement('a');
        link.href = href;
        link.textContent = displayText;
        link.target = '_blank'; 
        link.rel = 'noopener noreferrer';
        link.style.margin = '10px 0';
        link.style.opacity = '0';
        link.style.transform = 'scale(0)';
        link.style.transition = 'opacity 1s ease, transform 1s ease';
        link.style.color = 'white';
        contactDiv.appendChild(link);

        setTimeout(() => {
            link.style.opacity = '1';
            link.style.transform = 'scale(1)';
        }, 150);

        return link;
    }

    function createCloseButton() {
        const closeButton = document.createElement('span');
        closeButton.textContent = '✖';
        closeButton.style.cursor = 'pointer';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '2vh';
        closeButton.style.right = '2vw';
        closeButton.style.fontSize = '2vh';
        closeButton.style.color = 'white';

        closeButton.addEventListener('click', function(event) {
            event.stopPropagation();
            resetContactDiv();
            isTransformed = false;
        });
        return closeButton;
    }

    function resetContactDiv() {
        // Animer la disparition des éléments ajoutés
        for (let i = 0; i < addedElements.length; i++) {
            setTimeout(() => {
                addedElements[i].style.opacity = '0';
                addedElements[i].style.transform = 'scale(0)';
                addedElements[i].style.height = '0'; 
                addedElements[i].style.margin = '0'; 
            }, 220 * i);
        }

        // Supprimer les éléments et réinitialiser les styles après que l'animation soit terminée
        setTimeout(() => {
            addedElements.forEach(elem => elem.remove());
            addedElements = [];            

            // Réinitialiser les styles de contactDiv
            contactDiv.style.borderRadius = '50%';
            contactDiv.style.display = 'flex';
            contactDiv.style.justifyContent = 'center';
            contactDiv.style.alignItems = 'center';
            contactDiv.style.height = '6vh';
            contactDiv.style.width = '6vh';
            contactDiv.style.fontSize = '1.2vh';
            contactDiv.style.padding ='0'
            contactDiv.style.top = '1%'
            contactDiv.style.left = '0%'
            contactDiv.style.border = '0.3vh rgb(19, 247, 3) solid'

            centre.style.transform = 'scale(1)';
            centre.style.opacity = '1';
        }, 120 * addedElements.length + 300); 
    }

// !COOKIE

if (!getCookie("cookieConsent")) {
    document.getElementById("cookieConsentContainer").style.display = "block";
}

function acceptCookieConsent() {
    setCookie("cookieConsent", "1", 365);
    document.getElementById("cookieConsentContainer").style.display = "none";
}

function hideCookieBanner() {
    document.getElementById("cookieConsentContainer").style.display = "none";
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

