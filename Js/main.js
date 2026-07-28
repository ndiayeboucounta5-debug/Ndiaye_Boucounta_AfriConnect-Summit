/* =====================================================
   AFRICONNECT SUMMIT 2026
   SCRIPT.JS
===================================================== */


/* ================= DARK / LIGHT MODE ================= */


const themeBtn = document.getElementById("theme-toggle");


const savedTheme = localStorage.getItem("theme");


if(savedTheme === "dark"){

    document.body.classList.add("dark-mode");

}



if(themeBtn){

themeBtn.addEventListener("click",()=>{


    document.body.classList.toggle("dark-mode");


    let theme = "light";


    if(document.body.classList.contains("dark-mode")){

        theme="dark";

    }


    localStorage.setItem("theme",theme);


});


}







/* ================= MENU HAMBURGER ================= */


const hamburger = document.getElementById("hamburger");

const navMenu = document.getElementById("nav-menu");



if(hamburger){


hamburger.addEventListener("click",()=>{


    hamburger.classList.toggle("active");


    navMenu.classList.toggle("active");


});


}






// Fermer menu après clic sur un lien


const navLinks = document.querySelectorAll(".nav-link");


navLinks.forEach(link=>{


    link.addEventListener("click",()=>{


        if(navMenu){

            navMenu.classList.remove("active");

        }


        if(hamburger){

            hamburger.classList.remove("active");

        }


    });


});







/* ================= NAVBAR AU SCROLL ================= */


const header = document.querySelector(".header");



window.addEventListener("scroll",()=>{


    if(window.scrollY > 50){


        header.classList.add("scrolled");


    }else{


        header.classList.remove("scrolled");


    }


});







/* ================= ANNEE AUTOMATIQUE FOOTER ================= */


const year = document.getElementById("year");



if(year){


    year.textContent = new Date().getFullYear();


}







/* ================= BOUTON RETOUR EN HAUT ================= */


const backTop = document.getElementById("back-top");



window.addEventListener("scroll",()=>{


    if(backTop){


        if(window.scrollY > 400){


            backTop.classList.add("show");


        }else{


            backTop.classList.remove("show");


        }


    }


});




if(backTop){


backTop.addEventListener("click",()=>{


    window.scrollTo({

        top:0,

        behavior:"smooth"

    });


});


}







/* ================= COMPTE A REBOURS ================= */


const eventDate = new Date("October 12, 2026 09:00:00").getTime();



const countdown = setInterval(()=>{


const now = new Date().getTime();



const distance = eventDate - now;



if(distance <= 0){


    clearInterval(countdown);


    document.getElementById("days").textContent="00";

    document.getElementById("hours").textContent="00";

    document.getElementById("minutes").textContent="00";

    document.getElementById("seconds").textContent="00";


    return;


}



const days = Math.floor(
    distance /
    (1000 * 60 * 60 * 24)
);



const hours = Math.floor(
    (distance %
    (1000 * 60 * 60 * 24))
    /
    (1000 * 60 * 60)
);



const minutes = Math.floor(
    (distance %
    (1000 * 60 * 60))
    /
    (1000 * 60)
);



const seconds = Math.floor(
    (distance %
    (1000 * 60))
    /
    1000
);




if(document.getElementById("days")){

document.getElementById("days").textContent = days;

document.getElementById("hours").textContent = hours;

document.getElementById("minutes").textContent = minutes;

document.getElementById("seconds").textContent = seconds;

}



},1000);







/* ================= ANIMATION AU SCROLL ================= */


const elements = document.querySelectorAll(
".pourquoi-item, .speaker-card, .sponsor-card, .chiffre-item"
);



const observer = new IntersectionObserver((entries)=>{


entries.forEach(entry=>{


    if(entry.isIntersecting){


        entry.target.classList.add("show");


        observer.unobserve(entry.target);


    }



});


},{

threshold:0.2

});




elements.forEach(element=>{


    element.classList.add("hidden-scroll");


    observer.observe(element);


});







/* ================= ANIMATION CHIFFRES ================= */


const numbers = document.querySelectorAll(".chiffre-number");



numbers.forEach(number=>{


let target = Number(number.dataset.target);



let count = 0;



let speed = target / 100;



function update(){


    count += speed;


    if(count < target){


        number.textContent =
        Math.floor(count);


        requestAnimationFrame(update);


    }else{


        number.textContent = target + "+";


    }


}



const numberObserver =
new IntersectionObserver(entries=>{


entries.forEach(entry=>{


if(entry.isIntersecting){


update();

numberObserver.unobserve(entry.target);


}


});


});



numberObserver.observe(number);



});



/* =====================================================
   COMMIT 6 - PROGRAMME + INTERVENANTS + CONTACT
   AfriConnect Summit
===================================================== */


/* =====================================================
   ONGLET PROGRAMME (JOUR 1 / JOUR 2 / JOUR 3)
===================================================== */

const tabButtons = document.querySelectorAll(".tab-btn");
const programmeJours = document.querySelectorAll(".programme-jour");


if(tabButtons.length > 0){

    tabButtons.forEach(button => {

        button.addEventListener("click",()=>{

            // retirer active
            tabButtons.forEach(btn=>{
                btn.classList.remove("active");
            });


            programmeJours.forEach(jour=>{
                jour.classList.remove("active");
            });


            // ajouter active bouton
            button.classList.add("active");


            // afficher le jour choisi
            const jourId = button.dataset.jour;

            const jourAfficher = document.getElementById(jourId);

            if(jourAfficher){
                jourAfficher.classList.add("active");
            }

        });

    });

}



/* =====================================================
   FILTRAGE INTERVENANTS PAR PAYS
===================================================== */

const filtreButtons = document.querySelectorAll(".filtre-btn");
const intervenants = document.querySelectorAll(".intervenant-full-card");


if(filtreButtons.length > 0){

    filtreButtons.forEach(button=>{


        button.addEventListener("click",()=>{


            // bouton actif

            filtreButtons.forEach(btn=>{
                btn.classList.remove("active");
            });


            button.classList.add("active");


            const pays = button.dataset.pays;



            intervenants.forEach(card=>{


                const cardPays = card.dataset.pays;


                if(pays === "tous" || pays === cardPays){

                    card.style.display="block";


                    setTimeout(()=>{
                        card.style.opacity="1";
                        card.style.transform="translateY(0)";
                    },50);


                }

                else{

                    card.style.opacity="0";
                    card.style.transform="translateY(20px)";


                    setTimeout(()=>{

                        card.style.display="none";

                    },300);

                }


            });



        });


    });


}





/* =====================================================
   VALIDATION FORMULAIRE CONTACT
===================================================== */


const contactForm = document.getElementById("contact-form");


if(contactForm){


contactForm.addEventListener("submit",(e)=>{


    e.preventDefault();



    const nom = document.getElementById("nom").value.trim();

    const email = document.getElementById("email").value.trim();

    const telephone = document.getElementById("telephone").value.trim();

    const sujet = document.getElementById("sujet").value;

    const message = document.getElementById("message").value.trim();

    const consentement = document.getElementById("consentement").checked;



    // Regex email

    const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



    let erreurs = [];



    if(nom === ""){

        erreurs.push("Le nom est obligatoire");

    }



    if(!emailRegex.test(email)){

        erreurs.push("Adresse email invalide");

    }



    if(telephone !== "" && telephone.length < 8){

        erreurs.push("Téléphone invalide");

    }



    if(sujet === ""){

        erreurs.push("Veuillez choisir un sujet");

    }



    if(message === ""){

        erreurs.push("Le message est obligatoire");

    }



    if(!consentement){

        erreurs.push("Vous devez accepter les conditions");

    }





    if(erreurs.length > 0){


        alert(
            "Veuillez corriger :\n\n" 
            + erreurs.join("\n")
        );


    }


    else{


        alert(
            "✅ Votre message a été envoyé avec succès !"
        );


        contactForm.reset();


    }



});


}

