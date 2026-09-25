const menu = document.querySelector(".menu-btn");
const links = document.querySelector(".links");

if (menu && links) {
  menu.addEventListener("click", () => {
    links.classList.toggle("open");
  });

  document.querySelectorAll(".links a").forEach(link => {
    link.addEventListener("click", () => {
      links.classList.remove("open");
    });
  });
}


// Current year
const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}


// Scroll reveal
const revealItems = document.querySelectorAll(
  ".section, .job, .skill-grid > div, .hero-card"
);

revealItems.forEach(item => {
  item.classList.add("reveal");
});

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

revealItems.forEach(item => observer.observe(item));


// Active navigation
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".links a");

const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {

        navLinks.forEach(link => {
          link.classList.remove("active");

          if (link.getAttribute("href") === `#${entry.target.id}`) {
            link.classList.add("active");
          }
        });

      }
    });
  },
  {
    rootMargin: "-35% 0px -55% 0px"
  }
);

sections.forEach(section => sectionObserver.observe(section));
