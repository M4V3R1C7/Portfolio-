document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     NAVIGATION
  ========================= */

  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-menu a[href^='#']");

  function closeMenu() {
    if (!menuToggle || !navMenu) return;

    menuToggle.classList.remove("open");
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");

      menuToggle.classList.toggle("open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("menu-open", isOpen);
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  window.addEventListener("scroll", () => {
    if (!header) return;

    header.classList.toggle("scrolled", window.scrollY > 20);
  });


  /* =========================
     ACTIVE NAV SECTION
  ========================= */

  const sections = document.querySelectorAll("main section[id]");
  const sectionLinks = new Map();

  navLinks.forEach((link) => {
    const id = link.getAttribute("href")?.replace("#", "");

    if (id) {
      sectionLinks.set(id, link);
    }
  });

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        sectionLinks.forEach((link) => {
          link.classList.remove("active");
        });

        const activeLink = sectionLinks.get(entry.target.id);

        if (activeLink) {
          activeLink.classList.add("active");
        }
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px"
    }
  );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });


  /* =========================
     SCROLL REVEAL
  ========================= */

  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });


  /* =========================
     COUNTERS
  ========================= */

  const counters = document.querySelectorAll(".counter");
  let countersStarted = false;

  function animateCounter(counter) {
    const target = Number(counter.dataset.target);
    const suffix = counter.dataset.suffix || "";
    const prefix = counter.dataset.prefix || "";

    const duration = 1400;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(target * easedProgress);

      counter.textContent = `${prefix}${currentValue}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    }

    requestAnimationFrame(updateCounter);
  }

  const impact = document.querySelector(".impact");

  if (impact) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        if (!entries[0].isIntersecting || countersStarted) return;

        countersStarted = true;

        counters.forEach((counter) => {
          animateCounter(counter);
        });

        observer.disconnect();
      },
      {
        threshold: 0.3
      }
    );

    counterObserver.observe(impact);
  }


  /* =========================
     SERVICE ACCORDIONS
  ========================= */

  const serviceCards = document.querySelectorAll(".service-card");

  serviceCards.forEach((card) => {
    const trigger = card.querySelector(".service-trigger");

    if (!trigger) return;

    trigger.addEventListener("click", () => {
      const isOpen = card.classList.contains("open");

      serviceCards.forEach((otherCard) => {
        otherCard.classList.remove("open");

        const otherTrigger = otherCard.querySelector(".service-trigger");

        if (otherTrigger) {
          otherTrigger.setAttribute("aria-expanded", "false");
        }
      });

      if (!isOpen) {
        card.classList.add("open");
        trigger.setAttribute("aria-expanded", "true");
      }
    });
  });


  /* =========================
     EXPERIENCE ACCORDIONS
  ========================= */

  const experienceCards = document.querySelectorAll(".experience-card");

  experienceCards.forEach((card) => {
    const trigger = card.querySelector(".experience-trigger");

    if (!trigger) return;

    trigger.addEventListener("click", () => {
      const isOpen = card.classList.contains("open");

      experienceCards.forEach((otherCard) => {
        otherCard.classList.remove("open");

        const otherTrigger =
          otherCard.querySelector(".experience-trigger");

        if (otherTrigger) {
          otherTrigger.setAttribute("aria-expanded", "false");
        }
      });

      if (!isOpen) {
        card.classList.add("open");
        trigger.setAttribute("aria-expanded", "true");
      }
    });
  });


  /* =========================
     TOOLKIT FILTER
  ========================= */

  const toolTabs = document.querySelectorAll(".tool-tab");
  const toolItems = document.querySelectorAll(".tool-item");

  function showToolkitCategory(category) {
    toolItems.forEach((item) => {
      const matches = item.dataset.category === category;

      item.classList.toggle("hidden", !matches);
    });
  }

  toolTabs.forEach((tab) => {
    tab.addEventListener("click", () => {

      toolTabs.forEach((otherTab) => {
        otherTab.classList.remove("active");
        otherTab.setAttribute("aria-selected", "false");
      });

      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");

      const category = tab.dataset.category;

      showToolkitCategory(category);
    });
  });

  /* Show the first category on load */
  const firstCategory = document.querySelector(".tool-tab.active");

  if (firstCategory) {
    showToolkitCategory(firstCategory.dataset.category);
  }


  /* =========================
     ESCAPE KEY
  ========================= */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });


  /* =========================
     CURRENT YEAR
  ========================= */

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

});
