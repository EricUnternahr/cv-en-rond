
//!CONTACT

    const contactDiv = document.querySelector('.contact');
    const centre = document.querySelector('.centre');
    let isTransformed = false;
    let addedElements = [];

    contactDiv.addEventListener('click', function() {
        if (!isTransformed) {
            transformContactDiv();
            isTransformed = true;
        }
    });

    // ! ajustement de la taille de la DIV CONTACT

    function adjustDivProperties() {
    // Déterminer si l'écran est en mode portrait ou paysage
    if (window.innerHeight > window.innerWidth) {
        // Mode portrait
        contactDiv.style.height = '16vw';
        contactDiv.style.width = '16vw';
        contactDiv.style.fontSize = '1vw'; 
        contactDiv.style.lineHeight = '1.5vh';
        console.log("mode portrait")
    } else {
        // Mode paysage
        contactDiv.style.height = '20vh';
        contactDiv.style.width = '25vh';
        contactDiv.style.fontSize = '1.5vh'; 
        contactDiv.style.lineHeight = '2vh';
        
        
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
        
        contactDiv.style.display = 'flex';
        contactDiv.style.flexDirection = 'column';
        contactDiv.style.justifyContent = 'center';
        contactDiv.style.alignItems = 'center';
        contactDiv.style.color = 'white';
        contactDiv.style.padding ='3vh'
        
        
        contactDiv.style.border ='0.5vh rgb(19, 247, 3) solid'
        contactDiv.style.borderRadius='2vh'
        
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
        link.style.margin = '2px 0';
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
        closeButton.style.top = '1vh';
        closeButton.style.right = '1vw';
        closeButton.style.fontSize = '1vh';
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
                addedElements[i].style.height = '0'; // Ajouter une animation de hauteur
                addedElements[i].style.margin = '0'; // Éliminer les marges pendant la transition
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
            contactDiv.style.height = '10vh';
            contactDiv.style.width = '10vh';
            contactDiv.style.fontSize = '2vh';
            contactDiv.style.padding ='0'


        }, 120 * addedElements.length + 300); // Ajouter un délai supplémentaire pour la dernière animation
    }

