// //!Ajuste la taille de la police du rond central
// function adjustFontSize() {
//     const div = document.getElementById("textNom");
//     const width = div.offsetWidth;
//     div.style.fontSize = (width / 11) + "px"; 
//     console.log("adjustfontsize")
// }

// window.onresize = adjustFontSize;
// window.onload = adjustFontSize;
//!Ajuste la taille selon la taille de l'ecran

function adjustScaleByAspectRatioAndOrientation() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspectRatio = height / width;
    let scale;
    const isLandscape = width > height;

    if (isLandscape) {
        // Pour les écrans d'ordinateur (mode paysage)
            scale = 0.85*(height/1300);
            console.log("ajustement fenetre landscape")
    } else {
        // Pour les écrans de smartphones (mode portrait)
        if (aspectRatio >= 1.8) { // Proche du 18:9
            scale = 0.5*(width/800);
            console.log("ajustement fenetre portrait")
    }
}
    const manege = document.querySelector('#manege');
    manege.style.transform = 'scale(' + scale + ')';
}

window.onresize = adjustScaleByAspectRatioAndOrientation;
window.onload = adjustScaleByAspectRatioAndOrientation;

//!ANIMATION PANEL
    const panels = document.querySelectorAll('.panel');
    const manege = document.querySelector('#manege');
    let isAnimating = false;
    let isClicked = false;
    

//! Fonction pour centrer la vue sur le panel survolé
    function centerOnPanel(panel) {
        if (isAnimating || isClicked) return;
        isAnimating = true;
        isClicked = true;
        const contactDiv = document.querySelector('.contact');
        contactDiv.style.opacity ='0'
        const panelRect = panel.getBoundingClientRect();
        const manegeRect = manege.getBoundingClientRect();
        
        const offsetX = (panelRect.left + panelRect.right-150)  - (manegeRect.left + manegeRect.right-150) ;
        const offsetY = (panelRect.top + panelRect.bottom-150)  - (manegeRect.top + manegeRect.bottom-150) ;

        manege.style.transform = `translate(${-offsetX}px, ${-offsetY}px) scale(1.4)`;

        setTimeout(() => {
            isAnimating = false;

        }, 200); 
    }

//! Fonctions pour arrêter et démarrer toutes les animations
    function stopAllAnimations() {
        if (isAnimating) return;
        panels.forEach(panel => panel.classList.add('stop-animation'));
    }

    function startAllAnimations() {
        panels.forEach(panel => panel.classList.remove('stop-animation'));
    }

//! Attacher les événements de survol aux panels
panels.forEach(function(panel) {
    const contactDiv = document.querySelector('.contact');
    
    if (!panel.classList.contains('cv-panel')) {
    panel.addEventListener('mouseenter', function() {
        stopAllAnimations();
        centerOnPanel(panel);
    });

    panel.addEventListener('click', function() {
        startAllAnimations();
        adjustScaleByAspectRatioAndOrientation();
        contactDiv.style.opacity = '1';
        isClicked = false;
    });
}else{
    panel.addEventListener('mouseenter', function() {
        stopAllAnimations();
    });

    panel.addEventListener('mouseleave', function() {
        startAllAnimations();
    });
}
});

//!CONTACT

    const contactDiv = document.querySelector('.contact');
    const centre = document.querySelector('.centre');
    let isTransformed = false;
    let addedElements = [];

    contactDiv.addEventListener('click', function() {
        if (!isTransformed) {
            transformContactDiv();
            isTransformed = true;
            centre.style.transform = 'scale(0.5)';
        }
    });

    // !ajustement de la taille de la DIV CONTACT


    function adjustDivProperties() {
    // Déterminer si l'écran est en mode portrait ou paysage
    if (window.innerHeight > window.innerWidth) {
        // Mode portrait
        contactDiv.style.height = 'auto';
        contactDiv.style.width = '25vw';
        contactDiv.style.fontSize = '1.8vw'; // Ajuster également la taille de la police si nécessaire
        contactDiv.style.lineHeight = '1.5vw';
        contactDiv.style.border ='1vw rgb(19, 247, 3) solid'
        contactDiv.style.borderRadius='2vw'
        contactDiv.style.padding ='2vh'
        contactDiv.style.top = '25%'
        contactDiv.style.left = '20%'
        console.log("mode portrait")
    } else {
        // Mode paysage
        contactDiv.style.height = '30vh';
        contactDiv.style.width = 'auto';
        contactDiv.style.fontSize = '1.8vh'; // Ajuster également la taille de la police si nécessaire
        contactDiv.style.lineHeight = '1.5vh';
        contactDiv.style.border ='1vh rgb(19, 247, 3) solid'
        contactDiv.style.borderRadius='2vh'
        contactDiv.style.padding ='3vh'
        contactDiv.style.top = '15%'
        contactDiv.style.left = '10%'
        console.log("mode paysage")
    }
}
    window.addEventListener('resize', function() {
        if (isTransformed) {
            adjustDivProperties();
        }
    });

    function transformContactDiv() {
        // Appliquer les styles de transformation
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
            contactDiv.style.height = '15vh';
            contactDiv.style.width = '15vh';
            contactDiv.style.fontSize = '2.2vh';
            contactDiv.style.padding ='0'
            contactDiv.style.top = '1%'
            contactDiv.style.left = '0%'

            centre.style.transform = 'scale(1)';
        }, 120 * addedElements.length + 300); // Ajouter un délai supplémentaire pour la dernière animation
    }



function adjustScaleByAspectRatioAndOrientation() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspectRatio = height / width;
    let scale;
    const isLandscape = width > height;

    if (isLandscape) {
        // Pour les écrans d'ordinateur (mode paysage)
            scale = 0.85*(height/1300);
            console.log("ajustement fentre landscape")
    } else {
        // Pour les écrans de smartphones (mode portrait)
        if (aspectRatio >= 1.8) { // Proche du 18:9
            scale = 0.5*(width/800);
            console.log("ajustement fentre portrait")
    }
}
    const manege = document.querySelector('#manege');
    manege.style.transform = 'scale(' + scale + ')';
}

window.onresize = adjustScaleByAspectRatioAndOrientation;
window.onload = adjustScaleByAspectRatioAndOrientation;

