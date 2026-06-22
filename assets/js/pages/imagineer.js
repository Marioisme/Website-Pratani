document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for hero "Lihat Layanan" anchor
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navTotal = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-total') || '100'
      );
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navTotal - 24, behavior: 'smooth' });
    });
  });

  // Hero card entrance stagger
  document.querySelectorAll('.im-hero__card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(16px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 600 + i * 120);
  });
});
