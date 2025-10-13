// Navbar Component JavaScript

// Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

// Navbar scroll effect
const navbar = document.getElementById("navbar");
let lastScroll = 0;

if (navbar) {
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    const navbarContainer = navbar.querySelector(".navbar-container");
    if (navbarContainer) {
      if (currentScroll > 50) {
        navbarContainer.classList.add("shadow-2xl");
      } else {
        navbarContainer.classList.remove("shadow-2xl");
      }
    }

    lastScroll = currentScroll;
  });
}

// Close mobile menu when clicking on links
if (mobileMenu) {
  const mobileLinks = mobileMenu.querySelectorAll("a");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });
}
