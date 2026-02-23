document.addEventListener("DOMContentLoaded", function () {

  const typingElement = document.querySelector(".typing");

  if (typingElement) {

    const textArray = [
      "Web Developer",
      "Cybersecurity Enthusiast",
      "SOC Analyst",
    ];

    let count = 0;
    let index = 0;
    let currentText = "";
    let letter = "";

    (function type() {
      if (count === textArray.length) {
        count = 0;
      }

      currentText = textArray[count];
      letter = currentText.slice(0, ++index);
      typingElement.textContent = letter;

      if (letter.length === currentText.length) {
        count++;
        index = 0;
      }

      setTimeout(type, 120);
    })();
  }

  // Scroll Reveal
  const reveals = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    reveals.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight - 100) {
        el.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

});

document.addEventListener("DOMContentLoaded", function () {

  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const links = document.querySelectorAll(".nav-links a");

  if (hamburger && navLinks) {

    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      hamburger.classList.toggle("open");
    });

    // Auto close ketika klik link
    links.forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        hamburger.classList.remove("open");
      });
    });

  }

});