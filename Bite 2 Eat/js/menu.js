boutons = document.querySelectorAll(".filtres button");
groupes = document.querySelectorAll("tbody");

function filtrer(categorie) {
    groupes.forEach(function (groupe) {
        visible = categorie === "all" || groupe.dataset.category === categorie;
        groupe.hidden = !visible; 
    });

    boutons.forEach(function (b) {
        b.setAttribute("aria-pressed", b.dataset.filter === categorie);
    });
}

boutons.forEach(function (bouton) {
    bouton.addEventListener("click", function () {
        filtrer(bouton.dataset.filter);
    });
});