burger = document.getElementById("burger");
nav = document.getElementById("nav");

if (burger != null && nav != null) {
    burger.addEventListener("click", function() {
        nav.classList.toggle("open");
    });
}


boutonTheme = document.getElementById("themeToggle");

if (boutonTheme != null) {
    boutonTheme.addEventListener("click", function() {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            boutonTheme.textContent = "Light mode";
        } else {
            boutonTheme.textContent = "Dark mode";
        }

    });
}