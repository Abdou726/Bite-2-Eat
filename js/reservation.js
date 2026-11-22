/* ==========================================================
   reservation.js - validation du formulaire de reservation
   Le formulaire a "novalidate" : c'est ce script qui verifie
   les champs et affiche les messages d'erreur.
   ========================================================== */

form = document.getElementById("reservationForm");
confirmation = document.getElementById("confirmation");

/* ---------- Fonctions utilitaires ---------- */

// affiche un message d'erreur sous un champ
function afficherErreur(id, message) {
    document.getElementById(id).classList.add("invalide");
    document.getElementById(id).setAttribute("aria-invalid", "true");
    document.getElementById("erreur-" + id).textContent = message;
}

// efface l'erreur d'un champ
function effacerErreur(id) {
    document.getElementById(id).classList.remove("invalide");
    document.getElementById(id).removeAttribute("aria-invalid");
    document.getElementById("erreur-" + id).textContent = "";
}

// date du jour au format AAAA-MM-JJ (comme <input type="date">)
function aujourdhui() {
    d = new Date();
    const mois = String(d.getMonth() + 1).padStart(2, "0");
    const jour = String(d.getDate()).padStart(2, "0");
    return d.getFullYear() + "-" + mois + "-" + jour;
}

// on empeche de choisir une date passee
document.getElementById("date").min = aujourdhui();

/* ---------- Validation de chaque champ ---------- */
// chaque fonction retourne un message d'erreur, ou "" si le champ est correct

function verifierNom(valeur) {
    if (valeur.trim() === "") return "Full name is required.";
    if (valeur.trim().length < 3) return "Name must contain at least 3 characters.";
    return "";
}

function verifierEmail(valeur) {
    if (valeur.trim() === "") return "Email is required.";
    const format = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!format.test(valeur.trim())) return "Invalid format (example: name@domain.com).";
    return "";
}

function verifierTelephone(valeur) {
    if (valeur.trim() === "") return "Phone number is required.";
    // numero tunisien : 8 chiffres, avec ou sans +216
    const format = /^(\+216|00216)?\s?\d{2}\s?\d{3}\s?\d{3}$/;
    if (!format.test(valeur.trim())) return "Invalid number (8 digits, e.g. 22 345 678).";
    return "";
}

function verifierDate(valeur) {
    if (valeur === "") return "Date is required.";
    if (valeur < aujourdhui()) return "The date cannot be in the past.";
    return "";
}

function verifierHeure(heure, date) {
    if (heure === "") return "Time is required.";

    // horaires du restaurant : dimanche 12:00-22:00, autres jours 11:00-23:00
    let ouverture = "11:00";
    let fermeture = "23:00";
    if (date !== "") {
        const p = date.split("-");
        const jourSemaine = new Date(p[0], p[1] - 1, p[2]).getDay();   // 0 = dimanche
        if (jourSemaine === 0) {
            ouverture = "12:00";
            fermeture = "22:00";
        }
    }
    if (heure < ouverture || heure > fermeture) {
        return "We are open from " + ouverture + " to " + fermeture + " on this day.";
    }
    return "";
}

function verifierPersonnes(valeur) {
    if (valeur === "") return "Please choose the number of people.";
    return "";
}

/* ---------- Soumission du formulaire ---------- */
form.addEventListener("submit", function (event) {
    event.preventDefault();          // on bloque l'envoi pour verifier d'abord
    confirmation.textContent = "";

    const nom = document.getElementById("nom").value;
    const email = document.getElementById("email").value;
    const telephone = document.getElementById("telephone").value;
    const date = document.getElementById("date").value;
    const heure = document.getElementById("heure").value;
    const personnes = document.getElementById("personnes").value;

    // tableau : [id du champ, message d'erreur]
    const controles = [
        ["nom", verifierNom(nom)],
        ["email", verifierEmail(email)],
        ["telephone", verifierTelephone(telephone)],
        ["date", verifierDate(date)],
        ["heure", verifierHeure(heure, date)],
        ["personnes", verifierPersonnes(personnes)]
    ];

    let premierInvalide = null;

    controles.forEach(function (controle) {
        const id = controle[0];
        const message = controle[1];
        if (message !== "") {
            afficherErreur(id, message);
            if (premierInvalide === null) premierInvalide = id;
        } else {
            effacerErreur(id);
        }
    });

    // s'il y a une erreur : on met le curseur sur le premier champ faux
    if (premierInvalide !== null) {
        document.getElementById(premierInvalide).focus();
        return;
    }

    // tout est correct
    confirmation.textContent =
        "Thank you " + nom.trim() + "! Your table for " + personnes +
        " is booked on " + date + " at " + heure + ".";
    form.reset();
});

// l'erreur disparait des que l'utilisateur corrige le champ
["nom", "email", "telephone", "date", "heure", "personnes"].forEach(function (id) {
    document.getElementById(id).addEventListener("input", function () {
        effacerErreur(id);
    });
});