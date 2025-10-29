document.addEventListener('DOMContentLoaded', () => {
 const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const subject = document.getElementById('subject')?.value.trim();
    const message = document.getElementById('message')?.value.trim();
    const feedback = document.getElementById('formFeedback');

    if (!name || !email || !message) {
      if (feedback) {
        feedback.textContent = '⚠️ Please fill all required fields.';
        feedback.style.color = 'red';
      }
      return;
    }

    // Prepare data
    const formData = {
      name,
      email,
      subject,
      message
    };

    try {
      const response = await fetch('https://formspree.io/f/mqagbnja', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        if (feedback) {
          feedback.textContent = '✅ Message sent! We’ll get back to you soon.';
          feedback.style.color = 'green';
        }
        this.reset();
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      if (feedback) {
        feedback.textContent = '⚠️ Oops! Failed to send. Try again or email us directly.';
        feedback.style.color = 'red';
      }
    }
  });
}

  // ===== CAROUSEL HANDLING =====
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  const container = document.querySelector('.carousel-container');

  if (slides.length > 0 && container) {
    let currentSlide = 0;
    const totalSlides = slides.length;
    let slideInterval;

    function showSlide(index) {
      slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
      dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
      currentSlide = index;
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides;
      showSlide(currentSlide);
    }

    function startAutoSlide() {
      slideInterval = setInterval(nextSlide, 7000);
    }

    function stopAutoSlide() {
      if (slideInterval) clearInterval(slideInterval);
    }

    if (nextBtn) nextBtn.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % totalSlides;
      showSlide(currentSlide);
      stopAutoSlide(); startAutoSlide();
    });

    if (prevBtn) prevBtn.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      showSlide(currentSlide);
      stopAutoSlide(); startAutoSlide();
    });

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        showSlide(i);
        stopAutoSlide(); startAutoSlide();
      });
    });

    container.addEventListener('mouseenter', stopAutoSlide);
    container.addEventListener('mouseleave', startAutoSlide);

    showSlide(currentSlide);
    startAutoSlide();
  }
});