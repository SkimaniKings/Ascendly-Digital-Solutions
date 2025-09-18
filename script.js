const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

// Toggle mobile menu
hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
    mobileMenu.classList.remove("active");
  }
});

// Close when clicking a link
const menuLinks = mobileMenu.querySelectorAll("a");
menuLinks.forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
  });
});

//Services Page 
// Highlight active breadcrumb link
document.addEventListener("DOMContentLoaded", () => {
  const breadcrumbItems = document.querySelectorAll(".breadcrumb li a");
  breadcrumbItems.forEach(link => {
    if (window.location.href.includes(link.getAttribute("href"))) {
      link.style.fontWeight = "bold";
      link.style.textDecoration = "underline";
    }
  });
});

// Smooth scroll for "Back to Services" button
document.querySelector(".back-btn")?.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
