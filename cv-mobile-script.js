// Initialisation
const divPros = document.querySelectorAll(".pro");

// Fonction pour afficher le ul et tourner l'icône
function showUl(divPro) {
    const ul = divPro.querySelector("ul");
    const icon = divPro.querySelector("h4 > i");
    ul.style.display = "block";
    icon.classList.add("rotated"); 
}

// Fonction pour cacher le ul et réinitialiser l'icône
function hideUl(divPro) {
    const ul = divPro.querySelector("ul");
    const icon = divPro.querySelector("h4 > i");
    ul.style.display = "none";
    icon.classList.remove("rotated");
}

// Attachement des événements
divPros.forEach(divPro => {
    divPro.addEventListener("click", () => {
        const ul = divPro.querySelector("ul");
        if (ul.style.display === "block") {
            hideUl(divPro);
        } else {
            showUl(divPro);
        }
    });
});





//!CONTACT
const contactDiv = document.querySelector('.contact');
const nom = document.querySelector('.nom');
const experiencesPro = document.querySelector('.experiencesPro');
let isTransformed = false;
let addedElements = [];

contactDiv.addEventListener('click', function() {
    if (!isTransformed) {
        transformContactDiv();
        isTransformed = true;
        divPros.forEach(div => {
            div.style.transform = 'scale(0.5)';
            div.style.opacity = '0';
        });
        nom.style.transform = 'scale(0.5)';
        nom.style.opacity = '0';
        experiencesPro.style.transform = 'scale(0.5)';
        experiencesPro.style.opacity = '0';

    }
});

// ! DIV CONTACT CARREE


function adjustDivProperties() {
    contactDiv.style.height = 'auto';
    contactDiv.style.width = '80vw';
    contactDiv.style.fontSize = '5vw'; 
    contactDiv.style.lineHeight = '8vw';
    contactDiv.style.border ='1vw rgb(19, 247, 3) solid'
    contactDiv.style.borderRadius='2vw'
    contactDiv.style.padding ='2vh'
    contactDiv.style.top = '25vh'
    contactDiv.style.right = '10vw'
    console.log("mode portrait")

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
        contactDiv.style.height = '7vh';
        contactDiv.style.width = '7vh';
        contactDiv.style.fontSize = '1.2vh';
        contactDiv.style.padding ='0'
        contactDiv.style.top = '1.5vh'
        contactDiv.style.right = '2.5vw'
        contactDiv.style.border = '0.3vh rgb(19, 247, 3) solid'


        setTimeout(() => {
            divPros.forEach(div => {
                div.style.transform = 'scale(1)';
                div.style.opacity = '1';
            });

            nom.style.transform = 'scale(1)';
            nom.style.opacity = '1';
            experiencesPro.style.transform = 'scale(1)';
            experiencesPro.style.opacity = '1';
        }, 1000);
    }, 120 * addedElements.length + 300); 
}
