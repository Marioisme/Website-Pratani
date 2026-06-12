(function () {
  const btns  = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.porto-card');
  const empty = document.getElementById('porto-empty');

  const brandColors = {
    kolektiva: 'active--kolektiva',
    dikopi:    'active--dikopi',
    imagineer: 'active--imagineer',
  };

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      btns.forEach(b => {
        b.classList.remove('active', 'active--kolektiva', 'active--dikopi', 'active--imagineer');
      });
      btn.classList.add('active');
      if (filter !== 'all') btn.classList.add(brandColors[filter]);

      let visible = 0;
      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.brand === filter;
        card.classList.toggle('hidden', !match);
        if (match) visible++;
      });

      empty.classList.toggle('visible', visible === 0);
    });
  });
})();
