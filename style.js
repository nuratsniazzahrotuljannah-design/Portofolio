document.addEventListener('DOMContentLoaded', () => {

  // 1. TYPING EFFECT //
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

  // 2. SCROLL REVEAL & SKILL BARS //
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        const bar = entry.target.querySelector('.progress-fill');
        if (bar) {
          const width = bar.style.getPropertyValue('--width');
          setTimeout(() => { bar.style.width = width; }, 300);
        }
      }
    });
  }, { threshold: 0.1 });

  const revealElements = document.querySelectorAll('.about-section, .skill-box, .project-card');
  revealElements.forEach(el => observer.observe(el));

  // 3. NAVIGATION ACTIVE LINK ON SCROLL //
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-item');

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
});
