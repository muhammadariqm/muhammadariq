document.addEventListener("DOMContentLoaded", function () {
	const typingElement = document.querySelector(".typing");

	if (typingElement) {
		const textArray = ["Web Developer", "Cybersecurity Enthusiast"];

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
		links.forEach((link) => {
			link.addEventListener("click", () => {
				navLinks.classList.remove("active");
				hamburger.classList.remove("open");
			});
		});
	}
});

const gCanvas = document.querySelector(".gallery-particles");
const gCtx = gCanvas.getContext("2d");

function resizeGalleryCanvas() {
	gCanvas.width = gCanvas.offsetWidth;
	gCanvas.height = gCanvas.offsetHeight;
}

resizeGalleryCanvas();
window.addEventListener("resize", resizeGalleryCanvas);

let gParticles = [];

for (let i = 0; i < 40; i++) {
	gParticles.push({
		x: Math.random() * gCanvas.width,
		y: Math.random() * gCanvas.height,
		size: Math.random() * 2,
		speedX: (Math.random() - 0.5) * 0.3,
		speedY: (Math.random() - 0.5) * 0.3,
	});
}

function animateGallery() {
	gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);

	gParticles.forEach((p) => {
		p.x += p.speedX;
		p.y += p.speedY;

		gCtx.beginPath();
		gCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
		gCtx.fillStyle = "rgba(0,255,255,0.7)";
		gCtx.fill();

		if (p.x < 0 || p.x > gCanvas.width) p.speedX *= -1;
		if (p.y < 0 || p.y > gCanvas.height) p.speedY *= -1;
	});

	requestAnimationFrame(animateGallery);
}

animateGallery();
