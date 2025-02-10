const themes = ["dark", "light", "colorful"];
let currentTheme = localStorage.getItem("theme") || "dark";

function setTheme(theme) 
{
    document.body.className = `theme-${theme}`;
    localStorage.setItem("theme", theme);
    currentTheme = theme;

    document.querySelectorAll(".theme-btn").forEach((button) => {
        button.classList.toggle("active", button.dataset.theme === theme);
    });
}

setTheme(currentTheme);

const observer = new IntersectionObserver((entries) => 
{
    entries.forEach((entry) => 
    {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("fade-in");
    });
}, 
{ threshold: 0.1 });

document.querySelectorAll(".skill-card, .timeline-item, .project-card").forEach((element) => {
    observer.observe(element);
});

document.querySelectorAll("nav a").forEach((anchor) => 
{
    anchor.addEventListener("click", function (event)
    {
        event.preventDefault();
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        window.scrollTo(
        {
            top: targetElement.offsetTop - 80,
            behavior: "smooth"
        });
    });
});

document.querySelectorAll(".skill-card").forEach((card) => 
{
    card.addEventListener("mouseover", () => {
        card.style.transform = "translateY(-10px)";
    });

    card.addEventListener("mouseout", () => {
        card.style.transform = "translateY(0)";
    });
});

document.addEventListener("mousemove", (event) => 
{
    const heroContent = document.querySelector(".hero-content");
    const xAxis = event.clientX / window.innerWidth - 0.5;
    const yAxis = event.clientY / window.innerHeight - 0.5;
    heroContent.style.transform = `
        perspective(1000px)
        rotateY(${5 * xAxis}deg)
        rotateX(${5 * -yAxis}deg)
        translateZ(50px)
    `;
});

document.querySelector(".hero").addEventListener("mouseleave", () => {
    document.querySelector(".hero-content").style.transform = "none";
});

const scrollProgress = document.createElement("div");
scrollProgress.className = "scroll-progress";
scrollProgress.innerHTML = `
  <svg viewBox="0 0 36 36">
    <circle class="bg" cx="18" cy="18" r="16"></circle>
    <circle class="progress" cx="18" cy="18" r="16"></circle>
  </svg>
  <svg class="arrow" viewBox="0 0 24 24">
    <path d="M12 3l-8 8h5v10h6V11h5z"/>
  </svg>
`;
document.body.appendChild(scrollProgress);

const progressCircle = scrollProgress.querySelector(".progress");
const circumference = 2 * Math.PI * 16;

function updateScrollProgress() 
{
    const scrollTop = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = circumference - scrollTop / documentHeight * circumference;
    progressCircle.style.strokeDashoffset = progress;

    if (scrollTop > 300) {
        scrollProgress.classList.add("visible");
    } else {
        scrollProgress.classList.remove("visible");
    }
}

progressCircle.style.strokeDasharray = circumference;
progressCircle.style.strokeDashoffset = circumference;
window.addEventListener("scroll", updateScrollProgress);

scrollProgress.addEventListener("click", () => 
{
    window.scrollTo(
    {
        top: 0,
        behavior: "smooth"
    });
});
