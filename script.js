// Navigation & Mobile Menu Logic
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const navbar = document.getElementById("navbar");
const body = document.body;

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = body.classList.contains("menu-open");

    if (isOpen) {
      // Close Menu
      body.classList.remove("menu-open");
      mobileMenu.classList.add("opacity-0", "pointer-events-none");
      // Reset hamburger bars
      document.getElementById("bar1").style.transform = "none";
      document.getElementById("bar2").style.transform = "none";
    } else {
      // Open Menu
      body.classList.add("menu-open");
      mobileMenu.classList.remove("opacity-0", "pointer-events-none");
      // Animate to "X"
      document.getElementById("bar1").style.transform =
        "translateY(4px) rotate(45deg)";
      document.getElementById("bar2").style.transform =
        "translateY(-4px) rotate(-45deg)";
    }
  });

  // Close menu when clicking a link
  const mobileLinks = mobileMenu.querySelectorAll("a");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      body.classList.remove("menu-open");
      mobileMenu.classList.add("opacity-0", "pointer-events-none");
      document.getElementById("bar1").style.transform = "none";
      document.getElementById("bar2").style.transform = "none";
    });
  });
}

// Navbar Scroll & Reveal Effects
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("glassmorphic");
  } else {
    // Keep glassmorphic if menu is open, otherwise remove
    if (!body.classList.contains("menu-open")) {
      navbar.classList.remove("glassmorphic");
    }
  }
  handleScrollReveal();
});

const handleScrollReveal = () => {
  const elements = document.querySelectorAll(".reveal");
  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      el.classList.add("visible");
    }
  });
};

// Run on load
handleScrollReveal();

// Formspree Success State
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.onsubmit = async (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById("submit-btn");
    const formData = new FormData(contactForm);

    submitBtn.innerText = "Sending...";
    submitBtn.disabled = true;

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        submitBtn.innerText = "Sent Successfully";
        submitBtn.style.backgroundColor = "#F2F2F2";
        submitBtn.style.color = "#000000";
        contactForm.reset();
      } else {
        throw new Error();
      }
    } catch (error) {
      submitBtn.innerText = "Error - Try Again";
      submitBtn.disabled = false;
    }
  };
}
