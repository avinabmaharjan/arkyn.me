// script.js

document.addEventListener("DOMContentLoaded", () => {
  // Unscramble headline effect
  const headline = document.querySelector(".scramble");
  const finalText = "Are You Being Overlooked?";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let iterations = 0;
  
  const scrambleInterval = setInterval(() => {
    let scrambled = "";
    for (let i = 0; i < finalText.length; i++) {
      if (i < iterations) {
        scrambled += finalText[i];
      } else if (finalText[i] === " ") {
        scrambled += " ";
      } else {
        scrambled += chars.charAt(Math.floor(Math.random() * chars.length));
      }
    }
    headline.textContent = scrambled;
    iterations++;
    if (iterations > finalText.length) clearInterval(scrambleInterval);
  }, 50);

  // Fade-in on scroll
  const faders = document.querySelectorAll('.fade-in');
  const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(el => {
    appearOnScroll.observe(el);
  });

  // Spotlight effect on cards
  const cards = document.querySelectorAll(".card.spotlight");

  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.05), #1f2833)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.background = "#1f2833";
    });
  });
});
