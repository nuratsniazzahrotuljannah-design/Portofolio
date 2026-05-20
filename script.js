document.addEventListener('DOMContentLoaded', () => {

  // 1. TYPING EFFECT //
  const textElement = document.getElementById('typing-text');
  const texts = ["I'm ", "An aspiring web developer.", "HTML & CSS Enthusiast.", "Creative Coder."];
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
    }

    else if (isDeleting && charIndex === 0) {
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
      const bar = entry.target.querySelector('.progress-fill');

      if (entry.isIntersecting) {
        if (bar) {

          const inlineStyle = bar.getAttribute('style');
          const widthMatch = inlineStyle.match(/\d+%/);

          if (widthMatch) {
            const finalWidth = widthMatch[0];

            setTimeout(() => {
              bar.style.width = finalWidth;
            }, 100);
          }
        }
      } else {
        if (bar) {
          bar.style.width = '0%';
        }
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.skill-box').forEach(el => observer.observe(el));

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