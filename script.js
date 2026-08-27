const modal = document.querySelector('#bookingModal');
const openButtons = document.querySelectorAll('.open-booking');
const closeButton = document.querySelector('#closeBooking');
const nextButton = document.querySelector('.next-step');
const form = document.querySelector('#bookingForm');
const steps = document.querySelectorAll('.form-step');
const formHeading = document.querySelector('.form-heading');
const success = document.querySelector('#formSuccess');
const doneButton = document.querySelector('#doneBooking');
const dateInput = form.querySelector('[name="date"]');

dateInput.min = new Date().toISOString().split('T')[0];
document.querySelector('#year').textContent = new Date().getFullYear();

function openBooking(plan) {
  form.reset();
  steps.forEach((step) => step.classList.remove('active'));
  steps[0].classList.add('active');
  formHeading.style.display = 'block';
  success.classList.remove('show');
  document.querySelector('#stepNumber').textContent = '1';
  if (plan) {
    const option = form.querySelector(`[name="plan"][value="${plan}"]`);
    if (option) option.checked = true;
  }
  const timePills = form.querySelectorAll('.time-pill');
  const timeInput = form.querySelector('input[name="time"]');
  if (timePills.length && timeInput) {
    timePills.forEach((pill, i) => pill.classList.toggle('active', i === 0));
    timeInput.value = timePills[0].dataset.value;
  }
  updateCustomPlanVisibility();
  form.querySelectorAll('.custom-tag').forEach((tag) => tag.classList.remove('active'));
  const customTypeInput = form.querySelector('input[name="custom-type"]');
  if (customTypeInput) customTypeInput.value = '';
  modal.showModal();
}

// Champ "Personnaliser" : affiche la description seulement si ce forfait est choisi.
const customPlanNote = document.querySelector('#customPlanNote');
const customPlanTextarea = customPlanNote.querySelector('textarea');
function updateCustomPlanVisibility() {
  const isCustom = form.querySelector('#planCustom').checked;
  customPlanNote.style.display = isCustom ? 'flex' : 'none';
  customPlanTextarea.required = isCustom;
}
form.querySelectorAll('input[name="plan"]').forEach((radio) => {
  radio.addEventListener('change', updateCustomPlanVisibility);
});

// Étiquettes de type de personnalisation (sélection multiple)
const customTags = customPlanNote.querySelectorAll('.custom-tag');
const customTypeInput = customPlanNote.querySelector('input[name="custom-type"]');
customTags.forEach((tag) => {
  tag.addEventListener('click', () => {
    tag.classList.toggle('active');
    customTypeInput.value = Array.from(customTags)
      .filter((t) => t.classList.contains('active'))
      .map((t) => t.dataset.value)
      .join(', ');
  });
});

openButtons.forEach((button) => button.addEventListener('click', () => openBooking(button.dataset.plan)));
closeButton.addEventListener('click', () => modal.close());
doneButton.addEventListener('click', () => modal.close());
modal.addEventListener('click', (event) => { if (event.target === modal) modal.close(); });

nextButton.addEventListener('click', () => {
  steps[0].classList.remove('active');
  steps[1].classList.add('active');
  document.querySelector('#stepNumber').textContent = '2';
  document.querySelector('#bookingTitle').textContent = 'Vos coordonnées';
});

function encodeFormData(data) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
}

function buildMailtoFallback(data) {
  const message = [
    'Bonjour Gabriel,',
    '',
    'Je souhaite réserver un entretien avec Washers3R.',
    '',
    `Forfait : ${data.plan}`,
    `Nom : ${data.name}`,
    `Téléphone : ${data.phone}`,
    `Adresse : ${data.address}`,
    `Date souhaitée : ${data.date}`,
    `Moment préféré : ${data.time}`,
    `Détails : ${data.note || 'Aucun détail supplémentaire'}`,
  ].join('\n');
  return `mailto:Washers3R@gmail.com?subject=${encodeURIComponent('Demande de rendez-vous — Washers3R')}&body=${encodeURIComponent(message)}`;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.checkValidity()) { form.reportValidity(); return; }
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  // Identifiant unique pour éviter que Netlify ne fusionne/rejette deux demandes très similaires.
  data['submission-id'] = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const submitButton = form.querySelector('button[type="submit"]');
  if (submitButton) submitButton.disabled = true;

  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: encodeFormData(data),
  })
    .then((response) => {
      if (!response.ok) throw new Error('Network response was not ok');
      steps.forEach((step) => step.classList.remove('active'));
      formHeading.style.display = 'none';
      success.classList.add('show');
    })
    .catch(() => {
      // Solution de secours si l'envoi au serveur échoue : ouvrir le client courriel.
      window.location.href = buildMailtoFallback(data);
      steps.forEach((step) => step.classList.remove('active'));
      formHeading.style.display = 'none';
      success.classList.add('show');
    })
    .finally(() => {
      if (submitButton) submitButton.disabled = false;
    });
});

// Sélecteur de créneau visuel (pastilles)
const timePills = document.querySelectorAll('.time-pill');
const timeInput = form.querySelector('input[name="time"]');
timePills.forEach((pill) => {
  pill.addEventListener('click', () => {
    timePills.forEach((p) => p.classList.remove('active'));
    pill.classList.add('active');
    timeInput.value = pill.dataset.value;
  });
});

// Modal entreprises / événements
const corporateModal = document.querySelector('#corporateModal');
const openCorporateButtons = document.querySelectorAll('.open-corporate');
const closeCorporateButton = document.querySelector('#closeCorporate');
const corporateForm = document.querySelector('#corporateForm');
const corporateSuccess = document.querySelector('#corporateFormSuccess');
const corporateFormHeading = corporateForm.querySelector('.form-heading');
const corporateStep = corporateForm.querySelector('.form-step');
const doneCorporateButton = document.querySelector('#doneCorporate');
const corporateDateInput = corporateForm.querySelector('[name="date"]');
corporateDateInput.min = new Date().toISOString().split('T')[0];

function openCorporate() {
  corporateForm.reset();
  corporateFormHeading.style.display = 'block';
  corporateStep.style.display = 'block';
  corporateSuccess.classList.remove('show');
  corporateModal.showModal();
}

openCorporateButtons.forEach((button) => button.addEventListener('click', openCorporate));
closeCorporateButton.addEventListener('click', () => corporateModal.close());
doneCorporateButton.addEventListener('click', () => corporateModal.close());
corporateModal.addEventListener('click', (event) => { if (event.target === corporateModal) corporateModal.close(); });

function buildCorporateMailtoFallback(data) {
  const message = [
    'Bonjour Gabriel,',
    '',
    'Nous souhaitons une soumission pour un entretien de vélos en entreprise / événement.',
    '',
    `Entreprise : ${data.company}`,
    `Contact : ${data.name}`,
    `Courriel : ${data.email}`,
    `Téléphone : ${data.phone}`,
    `Adresse / lieu : ${data.address}`,
    `Nombre de vélos : ${data['bike-count']}`,
    `Date souhaitée : ${data.date}`,
    `Détails : ${data.note || 'Aucun détail supplémentaire'}`,
  ].join('\n');
  return `mailto:Washers3R@gmail.com?subject=${encodeURIComponent('Demande de soumission entreprise — Washers3R')}&body=${encodeURIComponent(message)}`;
}

corporateForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!corporateForm.checkValidity()) { corporateForm.reportValidity(); return; }
  const formData = new FormData(corporateForm);
  const data = Object.fromEntries(formData.entries());
  data['submission-id'] = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const submitButton = corporateForm.querySelector('button[type="submit"]');
  if (submitButton) submitButton.disabled = true;

  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: encodeFormData(data),
  })
    .then((response) => {
      if (!response.ok) throw new Error('Network response was not ok');
      corporateStep.style.display = 'none';
      corporateFormHeading.style.display = 'none';
      corporateSuccess.classList.add('show');
    })
    .catch(() => {
      window.location.href = buildCorporateMailtoFallback(data);
      corporateStep.style.display = 'none';
      corporateFormHeading.style.display = 'none';
      corporateSuccess.classList.add('show');
    })
    .finally(() => {
      if (submitButton) submitButton.disabled = false;
    });
});

// Animations au défilement
const revealItems = document.querySelectorAll('.reveal');
if (revealItems.length && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('in-view'));
}

// Compteurs animés
function animateCount(el) {
  const target = parseFloat(el.dataset.target);
  const decimals = parseInt(el.dataset.decimals || '0', 10);
  const duration = 1400;
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = (target * eased).toFixed(decimals);
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const statNumbers = document.querySelectorAll('.stat-number');
if (statNumbers.length && 'IntersectionObserver' in window) {
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  statNumbers.forEach((el) => statObserver.observe(el));
}

// Carrousel de témoignages
const track = document.querySelector('#testimonialTrack');
if (track) {
  const cards = track.querySelectorAll('.testimonial-card');
  const dotsWrap = document.querySelector('#carouselDots');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  let index = 0;
  let autoplay;

  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Témoignage ${i + 1}`);
    dot.addEventListener('click', () => { goTo(i); stopAutoplay(); startAutoplay(); });
    dotsWrap.appendChild(dot);
  });
  const dots = dotsWrap.querySelectorAll('button');

  function goTo(i) {
    index = (i + cards.length) % cards.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, di) => dot.classList.toggle('active', di === index));
  }
  function startAutoplay() {
    autoplay = setInterval(() => goTo(index + 1), 6000);
  }
  function stopAutoplay() {
    clearInterval(autoplay);
  }

  prevBtn.addEventListener('click', () => { goTo(index - 1); stopAutoplay(); startAutoplay(); });
  nextBtn.addEventListener('click', () => { goTo(index + 1); stopAutoplay(); startAutoplay(); });
  const carouselWrap = track.closest('.testimonial-carousel');
  carouselWrap.addEventListener('mouseenter', stopAutoplay);
  carouselWrap.addEventListener('mouseleave', startAutoplay);

  goTo(0);
  startAutoplay();
}

// Carrousel de photos (réalisations)
const galleryTrack = document.querySelector('#galleryTrack');
let stopGalleryAutoplay = () => {};
if (galleryTrack) {
  const galleryDotsWrap = document.querySelector('#galleryDots');
  const galleryPrevBtn = document.querySelector('#galleryPrev');
  const galleryNextBtn = document.querySelector('#galleryNext');
  let galleryIndex = 0;
  let galleryAutoplay;

  function initGalleryCarousel() {
    const slides = galleryTrack.querySelectorAll('.gallery-slide');
    galleryDotsWrap.innerHTML = '';
    galleryIndex = 0;

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Photo ${i + 1}`);
      dot.addEventListener('click', () => { galleryGoTo(i); stopGalleryAutoplay(); startGalleryAutoplay(); });
      galleryDotsWrap.appendChild(dot);
    });

    function galleryGoTo(i) {
      const dots = galleryDotsWrap.querySelectorAll('button');
      galleryIndex = (i + slides.length) % slides.length;
      slides.forEach((slide, si) => slide.classList.toggle('active', si === galleryIndex));
      dots.forEach((dot, di) => dot.classList.toggle('active', di === galleryIndex));
    }
    function startGalleryAutoplay() {
      clearInterval(galleryAutoplay);
      if (slides.length > 1) galleryAutoplay = setInterval(() => galleryGoTo(galleryIndex + 1), 5000);
    }
    stopGalleryAutoplay = () => clearInterval(galleryAutoplay);

    galleryPrevBtn.onclick = () => { galleryGoTo(galleryIndex - 1); stopGalleryAutoplay(); startGalleryAutoplay(); };
    galleryNextBtn.onclick = () => { galleryGoTo(galleryIndex + 1); stopGalleryAutoplay(); startGalleryAutoplay(); };
    const galleryWrap = galleryTrack.closest('.gallery-carousel');
    galleryWrap.onmouseenter = stopGalleryAutoplay;
    galleryWrap.onmouseleave = startGalleryAutoplay;

    galleryGoTo(0);
    startGalleryAutoplay();
  }

  function renderGallerySlides(items) {
    if (!items || !items.length) return;
    galleryTrack.innerHTML = items
      .map((item) => {
        const src = item.type === 'blob' ? `/.netlify/functions/photo?key=${encodeURIComponent(item.key)}` : item.src;
        return `<div class="gallery-slide"><img src="${src}" alt="Entretien de vélo par Washers3R" loading="lazy" /></div>`;
      })
      .join('');
    initGalleryCarousel();
  }

  window.renderGallerySlides = renderGallerySlides;
  initGalleryCarousel();
}

// Contenu editable (prix, promos, galerie) charge depuis l'admin
const MPV_META = {
  1: 'Mise au point essentielle',
  2: 'Entretien transmission',
  3: 'Inspection approfondie',
  4: 'Entretien complet',
  5: 'Remise à neuf',
};

function applySiteContent(content) {
  if (content && content.mpv) {
    Object.keys(MPV_META).forEach((n) => {
      const entry = content.mpv['mpv' + n];
      if (!entry || !entry.price) return;
      const planLabel = `MPV ${n} — ${MPV_META[n]} (${entry.price})`;

      const priceEl = document.getElementById(`mpv${n}-price`);
      if (priceEl) priceEl.textContent = entry.price;

      const promoEl = document.getElementById(`mpv${n}-promo`);
      if (promoEl) {
        promoEl.textContent = entry.promo || '';
        promoEl.style.display = entry.promo ? 'block' : 'none';
      }

      document.querySelectorAll(`[data-mpv="${n}"]`).forEach((el) => {
        if (el.tagName === 'BUTTON') el.dataset.plan = planLabel;
        if (el.tagName === 'INPUT') el.value = planLabel;
      });

      const smallEl = document.querySelector(`small[data-mpv-price="${n}"]`);
      if (smallEl) smallEl.textContent = entry.price;
    });
  }
  if (content && content.gallery && window.renderGallerySlides) {
    window.renderGallerySlides(content.gallery);
  }
}

fetch('/.netlify/functions/get-content')
  .then((res) => (res.ok ? res.json() : null))
  .then((data) => { if (data) applySiteContent(data); })
  .catch(() => {});
