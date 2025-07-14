// Highlight nav link based on scroll position
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

newFunction();

function newFunction() {
    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 80;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });
}
