
let form = document.getElementById("reservationForm");
let confirmation = document.getElementById("confirmation");

function afficherErreur(id, message) {
    document.getElementById(id).classList.add("invalide");
    document.getElementById("erreur-" + id).textContent = message;
}

function effacerErreur(id) {
    document.getElementById(id).classList.remove("invalide");
    document.getElementById("erreur-" + id).textContent = "";
}

function aujourdhui() {
    let d = new Date();
    let mois = d.getMonth() + 1;
    let jour = d.getDate();

    if (mois < 10) mois = "0" + mois;
    if (jour < 10) jour = "0" + jour;

    return d.getFullYear() + "-" + mois + "-" + jour;
}

document.getElementById("date").min = aujourdhui();

function verifierNom(valeur) {
    if (valeur.trim() == "") return "Full name is required.";
    if (valeur.trim().length < 3) return "Name must contain at least 3 characters.";
    return "";
}

function verifierEmail(valeur) {
    if (valeur.trim() == "") return "Email is required.";

    let arobase = valeur.indexOf("@");
    let point = valeur.indexOf(".");

    if (arobase == -1 || point == -1 || point < arobase) {
        return "Invalid email format.";
    }

    return "";
}

function verifierTelephone(valeur) {
    if (valeur == "") return "Phone number is required.";

    if (valeur.substring(0, 4) == "+216") {
        valeur = valeur.substring(4);
    }

    if (valeur.length != 8 || isNaN(valeur)) {
        return "Invalid number (8 digits, exemple 12 345 678).";
    }

    return "";
}

function verifierDate(valeur) {
    if (valeur == "") return "Date is required.";
    if (valeur < aujourdhui()) return "The date cannot be in the past.";
    return "";
}

function verifierHeure(heure, date) {
    if (heure == "") return "Time is required.";

    let ouverture = "11:00";
    let fermeture = "23:00";

    if (date != "") {
        let p = date.split("-");
        let jourSemaine = new Date(p[0], p[1] - 1, p[2]).getDay();

        if (jourSemaine == 0) {
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
    if (valeur == "") return "Please choose the number of people.";
    return "";
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    confirmation.textContent = "";

    let nom = document.getElementById("nom").value;
    let email = document.getElementById("email").value;
    let telephone = document.getElementById("telephone").value;
    let date = document.getElementById("date").value;
    let heure = document.getElementById("heure").value;
    let personnes = document.getElementById("personnes").value;

    let premierInvalide = "";

    let erreur = verifierNom(nom);
    if (erreur != "") {
        afficherErreur("nom", erreur);
        premierInvalide = "nom";
    } else {
        effacerErreur("nom");
    }

    erreur = verifierEmail(email);
    if (erreur != "") {
        afficherErreur("email", erreur);
        if (premierInvalide == "") premierInvalide = "email";
    } else {
        effacerErreur("email");
    }

    erreur = verifierTelephone(telephone);
    if (erreur != "") {
        afficherErreur("telephone", erreur);
        if (premierInvalide == "") premierInvalide = "telephone";
    } else {
        effacerErreur("telephone");
    }

    erreur = verifierDate(date);
    if (erreur != "") {
        afficherErreur("date", erreur);
        if (premierInvalide == "") premierInvalide = "date";
    } else {
        effacerErreur("date");
    }

    erreur = verifierHeure(heure, date);
    if (erreur != "") {
        afficherErreur("heure", erreur);
        if (premierInvalide == "") premierInvalide = "heure";
    } else {
        effacerErreur("heure");
    }

    erreur = verifierPersonnes(personnes);
    if (erreur != "") {
        afficherErreur("personnes", erreur);
        if (premierInvalide == "") premierInvalide = "personnes";
    } else {
        effacerErreur("personnes");
    }

    if (premierInvalide != "") {
        document.getElementById(premierInvalide).focus();
        return;
    }

    confirmation.textContent = "Thank you " + nom + "! Your table for " + personnes + " is booked on " + date + " at " + heure + ".";

    form.reset();
});

let champs = ["nom", "email", "telephone", "date", "heure", "personnes"];

champs.forEach(function(id) {
    document.getElementById(id).addEventListener("input", function() {
        effacerErreur(id);
    });
});
