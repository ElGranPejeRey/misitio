document.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById("app");

    async function loadPage(url) {
        app.classList.add("fade-out");
        setTimeout(async () => {
            try {
                const res = await fetch(url);
                const html = await res.text();

                const parser = new DOMParser();
                const doc = parser.parseFromString(html, "text/html");
                const newContent = doc.querySelector("#app");

                if (newContent) {
                    app.innerHTML = newContent.innerHTML;
                }

                app.classList.remove("fade-out");
                history.pushState(null, "", url);
            } catch (err) {
                console.error("Error cargando la página:", err);
            }
        }, 500);
    }

    document.body.addEventListener("click", e => {
        const link = e.target.closest("a");
        if (link && link.getAttribute("href") && !link.getAttribute("href").startsWith("http") && link.getAttribute("href") !== "#") {
            e.preventDefault();
            loadPage(link.getAttribute("href"));
        }
    });

    window.addEventListener("popstate", () => {
        loadPage(location.pathname);
    });
});