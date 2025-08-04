// Enhanced functionality for ARKYN site

document.addEventListener("DOMContentLoaded", () => {
  // Unscramble headline effect
  const headline = document.querySelector(".scramble");
  const finalText = "Are You Being Overlooked?";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let iterations = 0;

  if (headline) {
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
  }

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
      card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(233,180,76,0.07), var(--card-bg))`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.background = "";
    });
  });

  // Smooth scroll for nav links
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').replace('#', '');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        window.scrollTo({
          top: targetEl.offsetTop - 60,
          behavior: 'smooth'
        });
        // Add active class to nav
        document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });

  // Dark/Light mode toggle
  const themeBtn = document.querySelector('.theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      themeBtn.textContent = document.body.classList.contains('light-mode') ? '🌙' : '☀️';
      localStorage.setItem('arkyn-theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
    });

    // Persist theme
    if (localStorage.getItem('arkyn-theme') === 'light') {
      document.body.classList.add('light-mode');
      themeBtn.textContent = '🌙';
    }
  }

  // Form feedback (on submit)
  const contactForm = document.querySelector("form[name='contact']");
  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();
      contactForm.innerHTML = "<h3>Thank you!</h3><p>We'll be in touch soon.</p>";
    });
  }
});
