
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


//!Ajuste la taille selon la taille de l'ecran

function ajustementScale() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspectRatio = height / width;
    let scale;
    const isLandscape = width > height;

    if (isLandscape) {
        // Pour les écrans d'ordinateur (mode paysage)
            scale = 0.85*(height/1300);
    } else {
        // Pour les écrans de smartphones (mode portrait)
        if (aspectRatio >= 1.8) { 
            scale = 0.5*(width/800);
    }
}
    const manege = document.querySelector('#manege');
    manege.style.transform = 'scale(' + scale + ')';
}

window.onresize = ajustementScale;
window.onload = ajustementScale;

//!ANIMATION PANEL
const panels = document.querySelectorAll('.panel');
const manege = document.querySelector('#manege');
let isAnimating = false;
let isClicked = false;
    

//! Fonction pour centrer la vue sur le panel survolé
function centrerPanel(panel) {
    if (isAnimating || isClicked) return;
    isAnimating = true;
    isClicked = true;

    const panelRect = panel.getBoundingClientRect();
    const viewportCenterX = window.innerWidth / 2;
    const viewportCenterY = window.innerHeight / 2;
    const viewportHeight = window.innerHeight;
    const panelCenterX = panelRect.left + panelRect.width / 2;
    const panelCenterY = panelRect.top + panelRect.height / 2;
    const offsetX = viewportCenterX - panelCenterX;
    const offsetY = viewportCenterY - panelCenterY;
    let scale;
    if (viewportHeight < 500) {
        scale = 0.4;
        console.log("scale0.4")
    } else if (viewportHeight < 750) {
        scale = 0.7;
        console.log("scale0.7")
    } else {
        scale = 1.3;
        console.log("scale1.3")
    }

    manege.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;

    setTimeout(() => {
        isAnimating = false;
    }, 200);
}


//! Fonctions pour arrêter et démarrer toutes les animations
function arreterAnimation() {
    if (isAnimating) return;
    panels.forEach(panel => panel.classList.add('stop-animation'));
}

function demarrerAnimation() {
    panels.forEach(panel => panel.classList.remove('stop-animation'));
}

//! Attacher les événements de survol aux panels
const contactDiv = document.querySelector('.contact');
const footer = document.querySelector('footer');

panels.forEach(function(panel) {
    if (!panel.classList.contains('cv-panel')) {
        panel.addEventListener('mouseenter', function() {
            if(isClicked){
                return;
            } else {
                handleMouseEnter(panel);
            }
        });

        document.addEventListener('click', function() {
            handleClick(panel);
        });
    } else {
        panel.addEventListener('mouseenter', function() {
            arreterAnimation();
        });

        panel.addEventListener('mouseleave', function() {
            if(isClicked) {
                return;
            } else {
                demarrerAnimation();
            }
        });

        const cardCV = panel.querySelector('.cardCV');
        if (cardCV) {
            cardCV.addEventListener('click', function(event) {
                if (isClicked) {
                    event.preventDefault();
                    event.stopPropagation();
                }
            });
        }
    }
});


function handleMouseEnter(panel) {
    const allPanels = document.querySelectorAll('.panel');
    
    arreterAnimation();
    centrerPanel(panel);

    contactDiv.style.opacity = '0';
    footer.style.opacity = '0';

    allPanels.forEach(p => {
        if (p !== panel) {
            p.style.opacity = "0";
        }
    });

    const intro = panel.querySelector('.intro');
    const card = panel.querySelector('.card');
    const introParagraphs = panel.querySelectorAll('.intro p');
    
    intro.style.opacity = "1";
    card.style.opacity = "0";
    introParagraphs.forEach(p => p.style.opacity = "1");
}

function handleClick(panel) {
    demarrerAnimation();
    ajustementScale();
    contactDiv.style.opacity = '1';
    footer.style.opacity = '1';

    const allPanels = document.querySelectorAll('.panel');
    allPanels.forEach(p => p.style.opacity = "1");

    const intro = panel.querySelector('.intro');
    const card = panel.querySelector('.card');
    const introParagraphs = panel.querySelectorAll('.intro p');

    intro.style.opacity = "0";
    card.style.opacity = "1";
    introParagraphs.forEach(p => p.style.opacity = "0");
    isClicked = false;
}

//!CONTACT

const centre = document.querySelector('.centre');
let isTransformed = false;
let addedElements = [];

contactDiv.addEventListener('click', function() {
    if (!isTransformed) {
        transformerContact();
        isTransformed = true;
        centre.style.transform = 'scale(0.5)';
    }
});

// !ajustement de la taille de la DIV CONTACT

function ajustementContact() {
        contactDiv.style.height = '30vh';
        contactDiv.style.width = 'auto';
        contactDiv.style.fontSize = '1.8vh'; 
        contactDiv.style.lineHeight = '1.5vh';
        contactDiv.style.border ='1vh rgb(19, 247, 3) solid'
        contactDiv.style.borderRadius='5vh'
        contactDiv.style.padding ='3vh'
        contactDiv.style.top = '15%'
        contactDiv.style.left = '10%'
}

window.addEventListener('resize', function() {
    if (isTransformed) {
        ajustementContact();
    }
});

function transformerContact() {
    contactDiv.style.display = 'flex';
    contactDiv.style.flexDirection = 'column';
    contactDiv.style.justifyContent = 'center';
    contactDiv.style.alignItems = 'center';
    contactDiv.style.color = 'white';
    ajustementContact();

    // Ajouter la croix de fermeture et les liens
    const closeButton = boutonCroix();
    contactDiv.appendChild(closeButton);
    addedElements.push(closeButton);

    // Informations pour les liens
    const linkInfo = [
        { href: 'mailto:unternahr.eric@gmail.com', text: 'unternahr.eric@gmail.com' },
        { href: 'tel:+33612356741', text: '06 12 35 67 41' },
        { href: 'https://fr.linkedin.com/in/eric-unternahr-2b798b222', text: 'LinkedIn' },
        { href: 'https://www.github.com/yourusername', text: 'GitHub' }
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

function boutonCroix() {
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
        contactDiv.style.height = '15vh';
        contactDiv.style.width = '15vh';
        contactDiv.style.fontSize = '2.2vh';
        contactDiv.style.padding ='0'
        contactDiv.style.top = '1%'
        contactDiv.style.left = '0%'

        centre.style.transform = 'scale(1)';
    }, 120 * addedElements.length + 300); 
}

function ajustementScale() {
    const height = window.innerHeight;
    const manege = document.querySelector('#manege');
    let scale;
        scale = 0.85*(height/1300);

    manege.style.transform = 'scale(' + scale + ')';
}

window.onresize = ajustementScale;
window.onload = ajustementScale;

