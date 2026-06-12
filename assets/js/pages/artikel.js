document.addEventListener('DOMContentLoaded', () => {
  initArtikelFilter();
});

function initArtikelFilter() {
  const filterBtns = document.querySelectorAll('.art-filter__btn');
  const cards      = [...document.querySelectorAll('.art-card')];
  const emptyState = document.getElementById('art-empty');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // 1) Re-show any previously hidden cards so they can measure layout
      cards.forEach(c => {
        if (c.style.display === 'none') {
          c.style.display  = '';
          c.style.opacity  = '0';
          c.style.transform = 'translateY(8px)';
        }
      });

      // 2) After one frame, apply fade directions
      requestAnimationFrame(() => {
        let visible = 0;

        cards.forEach(card => {
          const show = filter === 'all' || card.dataset.category === filter;
          if (show) {
            card.style.opacity   = '1';
            card.style.transform = '';
            visible++;
          } else {
            card.style.opacity   = '0';
            card.style.transform = 'translateY(8px) scale(0.97)';
          }
        });

        // 3) After transition, set display:none on hidden cards
        setTimeout(() => {
          cards.forEach(card => {
            if (card.style.opacity === '0') {
              card.style.display = 'none';
            }
          });
          if (emptyState) {
            emptyState.hidden = visible > 0;
          }
        }, 220);
      });
    });
  });
}
