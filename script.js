document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-label", isOpen ? "Close Menu" : "Open Menu");
    });
  }

  document.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      if (!item) return;
      item.classList.toggle("active");
    });
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    if (link.getAttribute("href") === window.location.pathname.split("/").pop()) {
      link.classList.add("active");
    }
  });
});
