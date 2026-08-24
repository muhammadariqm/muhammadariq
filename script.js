document.addEventListener("DOMContentLoaded", function () {
	const reduceMotion = window.matchMedia(
		"(prefers-reduced-motion: reduce)",
	).matches;

	/* ================= TYPING EFFECT ================= */
	const typingElement = document.querySelector(".typing");

	if (typingElement && !reduceMotion) {
		const textArray = ["Web Developer", "Cybersecurity Enthusiast"];
		let count = 0;
		let index = 0;

		(function type() {
			if (count === textArray.length) count = 0;

			const currentText = textArray[count];
			const letter = currentText.slice(0, ++index);
			typingElement.textContent = letter;

			if (letter.length === currentText.length) {
				count++;
				index = 0;
				setTimeout(type, 1400);
				return;
			}

			setTimeout(type, 90);
		})();
	} else if (typingElement) {
		typingElement.textContent = "Web Developer";
	}

	/* ================= HAMBURGER MENU ================= */
	const hamburger = document.querySelector(".hamburger");
	const navLinks = document.querySelector(".nav-links");
	const links = document.querySelectorAll(".nav-links a");

	if (hamburger && navLinks) {
		hamburger.addEventListener("click", () => {
			navLinks.classList.toggle("active");
			hamburger.classList.toggle("open");
		});

		links.forEach((link) => {
			link.addEventListener("click", () => {
				navLinks.classList.remove("active");
				hamburger.classList.remove("open");
			});
		});
	}

	/* ================= NAVBAR SCROLL + ACTIVE LINK ================= */
	const navbar = document.querySelector(".navbar");
	const sections = document.querySelectorAll("section[id], header[id]");

	if (navbar) {
		let ticking = false;
		window.addEventListener(
			"scroll",
			() => {
				if (!ticking) {
					requestAnimationFrame(() => {
						navbar.classList.toggle("scrolled", window.scrollY > 40);
						ticking = false;
					});
					ticking = true;
				}
			},
			{ passive: true },
		);
	}

	if (sections.length && links.length) {
		const navObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						links.forEach((link) => {
							link.classList.toggle(
								"active",
								link.getAttribute("href") === `#${entry.target.id}`,
							);
						});
					}
				});
			},
			{ rootMargin: "-45% 0px -50% 0px" },
		);

		sections.forEach((section) => navObserver.observe(section));
	}

	/* ================= SCROLL REVEAL (IntersectionObserver) ================= */
	const reveals = document.querySelectorAll(".reveal");

	if (reveals.length) {
		const revealObserver = new IntersectionObserver(
			(entries, observer) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("active");
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.12 },
		);

		reveals.forEach((el) => revealObserver.observe(el));
	}

	/* ================= STAGGERED CARD ENTRANCE ================= */
	const staggerGroups = [
		document.querySelectorAll(".skill-card"),
		document.querySelectorAll(".card"),
		document.querySelectorAll(".gallery-card"),
	];

	const staggerObserver = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("in-view");
					observer.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.15 },
	);

	staggerGroups.forEach((group) => {
		group.forEach((el, i) => {
			el.style.setProperty("--i", i % 12);
			staggerObserver.observe(el);
		});
	});

	/* ================= BACK TO TOP ================= */
	const backToTop = document.getElementById("backToTop");

	if (backToTop) {
		let ticking = false;
		window.addEventListener(
			"scroll",
			() => {
				if (!ticking) {
					requestAnimationFrame(() => {
						backToTop.classList.toggle("show", window.scrollY > 500);
						ticking = false;
					});
					ticking = true;
				}
			},
			{ passive: true },
		);

		backToTop.addEventListener("click", () => {
			window.scrollTo({ top: 0, behavior: "smooth" });
		});
	}

	/* ================= CUSTOM CURSOR GLOW ================= */
	const cursor = document.querySelector(".cursor");

	if (cursor && !reduceMotion && window.matchMedia("(hover: hover)").matches) {
		let mouseX = 0;
		let mouseY = 0;
		let shown = false;

		window.addEventListener(
			"mousemove",
			(e) => {
				mouseX = e.clientX;
				mouseY = e.clientY;
				if (!shown) {
					cursor.classList.add("is-visible");
					shown = true;
				}
				cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
			},
			{ passive: true },
		);

		const hoverTargets = document.querySelectorAll(
			"a, button, .card, .skill-card, .gallery-card",
		);
		hoverTargets.forEach((el) => {
			el.addEventListener("mouseenter", () =>
				cursor.classList.add("is-active"),
			);
			el.addEventListener("mouseleave", () =>
				cursor.classList.remove("is-active"),
			);
		});
	} else if (cursor) {
		cursor.style.display = "none";
	}

	/* ================= PARTICLE BACKGROUND (hero) ================= */
	const canvas = document.getElementById("particles");

	if (canvas && !reduceMotion) {
		const ctx = canvas.getContext("2d");
		let particles = [];
		let rafId = null;

		function resizeParticles() {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		}

		function buildParticles() {
			const count = window.innerWidth < 768 ? 35 : 70;
			particles = Array.from({ length: count }, () => ({
				x: Math.random() * canvas.width,
				y: Math.random() * canvas.height,
				size: Math.random() * 2,
				speedX: (Math.random() - 0.5) * 0.5,
				speedY: (Math.random() - 0.5) * 0.5,
			}));
		}

		function animateParticles() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			particles.forEach((p) => {
				p.x += p.speedX;
				p.y += p.speedY;

				ctx.beginPath();
				ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
				ctx.fillStyle = "rgba(0,255,255,0.6)";
				ctx.fill();

				if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
				if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
			});

			rafId = requestAnimationFrame(animateParticles);
		}

		resizeParticles();
		buildParticles();
		animateParticles();

		window.addEventListener(
			"resize",
			() => {
				resizeParticles();
				buildParticles();
			},
			{ passive: true },
		);

		// Pause animation when tab isn't visible to save CPU/battery
		document.addEventListener("visibilitychange", () => {
			if (document.hidden) {
				if (rafId) cancelAnimationFrame(rafId);
				rafId = null;
			} else if (!rafId) {
				animateParticles();
			}
		});
	}

	/* ================= PARTICLE BACKGROUND (gallery, optional section) ================= */
	const gCanvas = document.querySelector(".gallery-particles");

	if (gCanvas && !reduceMotion) {
		const gCtx = gCanvas.getContext("2d");
		let gParticles = [];
		let gRafId = null;

		function resizeGalleryCanvas() {
			gCanvas.width = gCanvas.offsetWidth;
			gCanvas.height = gCanvas.offsetHeight;
		}

		function buildGalleryParticles() {
			gParticles = Array.from({ length: 30 }, () => ({
				x: Math.random() * gCanvas.width,
				y: Math.random() * gCanvas.height,
				size: Math.random() * 2,
				speedX: (Math.random() - 0.5) * 0.3,
				speedY: (Math.random() - 0.5) * 0.3,
			}));
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

			gRafId = requestAnimationFrame(animateGallery);
		}

		resizeGalleryCanvas();
		buildGalleryParticles();
		animateGallery();

		window.addEventListener("resize", resizeGalleryCanvas, { passive: true });

		document.addEventListener("visibilitychange", () => {
			if (document.hidden) {
				if (gRafId) cancelAnimationFrame(gRafId);
				gRafId = null;
			} else if (!gRafId) {
				animateGallery();
			}
		});
	}
});
