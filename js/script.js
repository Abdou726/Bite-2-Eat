/* ==========================================================
   script.js - commun a toutes les pages
   1) Menu burger (mobile)
   2) Mode sombre (memorise avec localStorage)
   ========================================================== */

/* ---------- 1) Menu burger ---------- */
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");

if (burger && nav) {
    burger.addEventListener("click", function () {
        // ajoute ou enleve la classe "open" sur le menu
        const ouvert = nav.classList.toggle("open");
        // informe les lecteurs d'ecran de l'etat du menu
        burger.setAttribute("aria-expanded", ouvert);
    });
}

/* ---------- 2) Mode sombre ---------- */
const boutonTheme = document.getElementById("themeToggle");

// lire le choix enregistre (try/catch au cas ou le stockage est bloque)
function lireTheme() {
    try {
        return localStorage.getItem("theme");
    } catch (e) {
        return null;
    }
}

function ecrireTheme(valeur) {
    try {
        localStorage.setItem("theme", valeur);
    } catch (e) {
        /* on ignore : le mode sombre marchera juste pour cette page */
    }
}

function appliquerTheme(sombre) {
    document.body.classList.toggle("dark", sombre);
    if (boutonTheme) {
        boutonTheme.setAttribute("aria-pressed", sombre);
        boutonTheme.textContent = sombre ? "Light mode" : "Dark mode";
    }
}

// au chargement : on applique le theme choisi precedemment
appliquerTheme(lireTheme() === "dark");

if (boutonTheme) {
    boutonTheme.addEventListener("click", function () {
        const sombre = !document.body.classList.contains("dark");
        appliquerTheme(sombre);
        ecrireTheme(sombre ? "dark" : "light");
    });
}