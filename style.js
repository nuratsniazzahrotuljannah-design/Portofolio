document.addEventListener('DOMContentLoaded', () => {

  // 1. TYPING EFFECT (Untuk bagian Hero)
  const textElement = document.getElementById('typing-text');
  const texts = ["An aspiring web developer.", "HTML & CSS Enthusiast.", "Creative Coder."];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      textElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      textElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  if (textElement) type();

  // 2. SCROLL REVEAL & SKILL BARS 
  const observerOptions = { threshold: 0.1 };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        if (entry.target.classList.contains('skill-card')) {
          const bar = entry.target.querySelector('.progress-bar');
          if (bar) {
            const width = bar.style.getPropertyValue('--width');
            setTimeout(() => { bar.style.width = width; }, 300);
          }
        }
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll('.about-section, .reveal-left, .reveal-right, .reveal-up, .skill-card');
  revealElements.forEach(el => observer.observe(el));

  // 3. NAVIGATION ACTIVE LINK ON SCROLL
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 200;
      if (window.pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (current && link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });

  // 4. EVENT HANDLER 
  const recountBtn = document.getElementById('recountBtn');
  if (recountBtn) {
    recountBtn.addEventListener('click', () => {
      console.log('Membuka file PDF...');
    });
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = { threshold: 0.2 };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        if (entry.target.classList.contains('skill-box')) {
          const bar = entry.target.querySelector('.progress-fill');
          if (bar) {
            const width = bar.style.getPropertyValue('--width');
            bar.style.width = width;
          }
        }
      }
    });
  }, observerOptions);

  const elementsToAnimate = document.querySelectorAll('.about-section, .skill-box, .project-card');
  elementsToAnimate.forEach(el => observer.observe(el));
});