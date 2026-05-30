import './styles.css';
import lottie from 'lottie-web';
import { weddingConfig as config } from './config.js';

document.title = config.siteTitle;
document.documentElement.style.setProperty('--opening-floral-gold', `url("${config.images.floralGold}")`);
document.documentElement.style.setProperty('--opening-floral-wine', `url("${config.images.floralWine}")`);

const app = document.querySelector('#app');
const audio = document.querySelector('#wedding-audio');
const openingScreen = document.querySelector('#opening-screen');
const openingTitle = document.querySelector('#opening-title');
const openingDate = document.querySelector('#opening-date');
const openingMonogram = document.querySelector('#opening-monogram');
const openButton = document.querySelector('#open-invitation');
const openingEnvelopeButton = document.querySelector('#opening-envelope-button');
const petalLayer = document.querySelector('#petal-layer');

audio.src = config.music.src;
config.names.monogram = 'J \u2665 D';

openingTitle.textContent = 'Nuestra Boda';
openingDate.textContent = `${config.event.day}.${String(new Date(config.event.isoDate).getMonth() + 1).padStart(2, '0')}.${config.event.year.slice(-2)}`;
if (openingMonogram) {
  openingMonogram.textContent = config.names.initials;
}

const createWhatsappUrl = (message) =>
  `https://wa.me/${config.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;

const createWhatsappUrlFor = (phone, message) =>
  `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

const createFloralCorners = (variant = 'mixed') => {
  const pairs = {
    mixed: {
      tl: config.images.floralGold,
      tr: config.images.floralWine,
      bl: config.images.floralWine,
      br: config.images.floralGold,
    },
    gold: {
      tl: config.images.floralGold,
      tr: config.images.floralGold,
      bl: config.images.floralGold,
      br: config.images.floralGold,
    },
    wine: {
      tl: config.images.floralWine,
      tr: config.images.floralWine,
      bl: config.images.floralWine,
      br: config.images.floralWine,
    },
  };

  const selected = pairs[variant] || pairs.mixed;

  return `
    <div class="floral-frame" aria-hidden="true">
      <img class="floral-corner floral-corner--top-left" src="${selected.tl}" alt="" />
      <img class="floral-corner floral-corner--top-right" src="${selected.tr}" alt="" />
      <img class="floral-corner floral-corner--bottom-left" src="${selected.bl}" alt="" />
      <img class="floral-corner floral-corner--bottom-right" src="${selected.br}" alt="" />
    </div>
  `;
};

const createDivider = (lottiePath, loop = true) => `
  <div class="ornamental-divider reveal">
    <span class="ornamental-divider__line"></span>
    <div class="ornamental-divider__lottie" data-lottie="${lottiePath}" data-loop="${loop}"></div>
    <span class="ornamental-divider__line"></span>
  </div>
`;

const createSectionTitle = (eyebrow, title, subtitle = '') => `
  <div class="section-heading reveal">
    <span class="card-eyebrow">${eyebrow}</span>
    <h2 class="card-title">${title}</h2>
    ${subtitle ? `<p class="card-subtitle">${subtitle}</p>` : ''}
  </div>
`;

const createSectionCard = ({
  tag = 'section',
  className = '',
  eyebrow,
  title,
  subtitle = '',
  corners = 'mixed',
  divider = config.lotties.heartDivider,
  dividerLoop = true,
  body,
}) => `
  <${tag} class="section-card ${className}">
    ${createFloralCorners(corners)}
    <div class="section-card__inner">
      ${createSectionTitle(eyebrow, title, subtitle)}
      ${createDivider(divider, dividerLoop)}
      ${body}
    </div>
  </${tag}>
`;

const blessingNames = (items) => `
  <div class="family-names">
    ${items.map((item) => `<span class="family-name">${item}</span>`).join('')}
  </div>
`;

const ceremonyCards = config.ceremonies
  .map(
    (ceremony, index) => `
      <article class="mini-card ceremony-card reveal" style="--delay:${index * 0.08}s">
        <div class="ceremony-card__photo">
          <img src="${ceremony.image}" alt="${ceremony.title}" data-fallback="${config.images.couple}" />
          <div class="ceremony-card__veil"></div>
        </div>
        <div class="ceremony-card__body">
          <div class="ceremony-card__icon" data-lottie="${ceremony.lottie}" data-loop="true"></div>
          <h3 class="ceremony-card__title">${ceremony.title}</h3>
          <div class="ceremony-card__divider" aria-hidden="true">
            <span></span>
            <i>&hearts;</i>
            <span></span>
          </div>
          <div class="ceremony-card__details">
            <strong>${ceremony.place}</strong>
            <p class="ceremony-card__date">${ceremony.date}</p>
            <p class="ceremony-card__time">${ceremony.time.toUpperCase()}</p>
            <p>${ceremony.address}</p>
            ${ceremony.city ? `<p>${ceremony.city}</p>` : ''}
          </div>
          <a class="secondary-button ceremony-card__map-button" href="${ceremony.mapsUrl}" target="_blank" rel="noreferrer">
            <span class="ceremony-card__map-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 21s7-5.1 7-12a7 7 0 1 0-14 0c0 6.9 7 12 7 12z" />
                <circle cx="12" cy="9" r="2.4" />
              </svg>
            </span>
            Como llegar
          </a>
        </div>
      </article>
    `,
  )
  .join('');

const galleryItems = config.gallery
  .map(
    (image, index) => `
      <figure class="gallery-item gallery-item--${(index % 5) + 1} reveal" style="--delay:${index * 0.05}s">
        <img src="${image}" alt="Recuerdo de ${config.names.display}" data-fallback="${config.images.venue}" />
      </figure>
    `,
  )
  .join('');

const timelineNodeIcons = [
  `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M4 20h16" />
      <path d="M6 20v-8l6-4 6 4v8" />
      <path d="M10 20v-4h4v4" />
      <path d="M12 4v4" />
      <path d="M9 7h6" />
    </svg>
  `,
  `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M7.5 10.5a3.5 3.5 0 1 1 4.95 4.95L9 18.9l-3.45-3.45a3.5 3.5 0 0 1 1.95-5.95z" />
      <path d="M16.5 10.5a3.5 3.5 0 1 1 4.95 4.95L18 18.9l-3.45-3.45a3.5 3.5 0 0 1 1.95-5.95z" />
    </svg>
  `,
  `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M7 4v6a5 5 0 0 0 10 0V4" />
      <path d="M5 4h14" />
      <path d="M12 15v5" />
      <path d="M9 20h6" />
    </svg>
  `,
  `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M12 19s-6-3.9-6-9a3.5 3.5 0 0 1 6-2.3A3.5 3.5 0 0 1 18 10c0 5.1-6 9-6 9z" />
    </svg>
  `,
  `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M5 13h14" />
      <path d="M7 13a5 5 0 0 1 10 0" />
      <path d="M9 17h6" />
    </svg>
  `,
  `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M10 18V7l8-2v11" />
      <path d="M10 11l8-2" />
      <circle cx="8" cy="18" r="2" />
      <circle cx="16" cy="16" r="2" />
    </svg>
  `,
];

const timelineHeaderIcon = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="4" y="5.5" width="16" height="14" rx="2.8" />
    <path d="M8 3.8v3.3" />
    <path d="M16 3.8v3.3" />
    <path d="M4 9.5h16" />
    <path d="M8.6 13.2h.01" />
    <path d="M12 13.2h.01" />
    <path d="M15.4 13.2h.01" />
  </svg>
`;

const timelineEvents = config.timeline.map((item, index) => ({
  ...item,
  side: index % 2 === 0 ? 'left' : 'right',
  sprig: index % 2 === 0 ? config.images.floralGold : config.images.floralWine,
  icon: timelineNodeIcons[index % timelineNodeIcons.length],
}));

const timelineItems = timelineEvents
  .map((item, index) => {
    return `
      <article class="timeline-item timeline-mobile-item timeline-item--${item.side} reveal" style="--delay:${index * 0.08}s">
        <div class="timeline-marker timeline-node" aria-hidden="true">
          <span class="timeline-node__halo"></span>
          <span class="timeline-node__icon">${item.icon}</span>
        </div>
        <div class="timeline-card timeline-mobile-card">
          <img class="timeline-card__sprig" src="${item.sprig}" alt="" aria-hidden="true" />
          <span class="badge-time timeline-card__time">${item.time}</span>
          <h3 class="timeline-card__title">${item.label}</h3>
        </div>
      </article>
    `;
  })
  .join('');

const desktopTimelineRows = timelineEvents
  .map(
    (row, index) => `
      <article class="timeline-row timeline-row--${row.side} reveal" style="--delay:${index * 0.1}s">
        ${
          row.side === 'left'
            ? `
              <div class="timeline-premium-card">
                <span class="timeline-premium-card__time">${row.time}</span>
                <h3 class="timeline-premium-card__title">${row.label}</h3>
              </div>
            `
            : '<div></div>'
        }
        <div class="timeline-node">
          <span class="timeline-node__icon">${row.icon}</span>
        </div>
        ${
          row.side === 'right'
            ? `
              <div class="timeline-premium-card">
                <span class="timeline-premium-card__time">${row.time}</span>
                <h3 class="timeline-premium-card__title">${row.label}</h3>
              </div>
            `
            : '<div></div>'
        }
      </article>
    `,
  )
  .join('');

app.innerHTML = `
  <div class="page-backdrop"></div>

  <section class="cover-hero" id="inicio" style="--cover-image:url('${config.images.cover}')">
    <div class="cover-overlay"></div>

    <div class="cover-content">
      <p class="cover-eyebrow">${config.cover.eyebrow}</p>

      <h1 class="cover-names">
        <span>${config.cover.primaryName}</span>
        <small>&</small>
        <span>${config.cover.secondaryName}</span>
      </h1>

      <div class="cover-divider" aria-hidden="true">
        <span></span>
        <i>&hearts;</i>
        <span></span>
      </div>

      <p class="cover-date">${config.cover.dateLabel}</p>
    </div>

    <a href="#contenido" class="cover-scroll" aria-label="Bajar a la invitacion">↓</a>
  </section>

  <main class="invitation-layout" id="contenido">
    <section class="hero-card section-card section-card--hero">
      ${createFloralCorners('mixed')}
      <div class="section-card__inner hero-card__inner">
        <div class="hero-copy reveal">
          <span class="card-eyebrow">${config.intro.headline}</span>
          <h1 class="hero-title">${config.names.display}</h1>
          <p class="hero-date">${config.event.dateLabel}</p>
          <p class="hero-text">${config.intro.invitationText}</p>
        </div>

        <div class="hero-visual reveal" style="--delay:0.16s">
          <div class="hero-photo-shell">
            <div class="hero-photo-frame">
              <img src="${config.images.couple}" alt="${config.names.display}" data-fallback="${config.images.venue}" />
            </div>
          </div>
          <div class="hero-monogram-card">
            <span>${config.names.monogram}</span>
            <small>${config.event.day} · ${config.event.month} · ${config.event.year}</small>
          </div>
        </div>
      </div>
    </section>

    <section class="section-card family-section-card">
      ${createFloralCorners('mixed')}
      <div class="section-card__inner family-section-card__inner">
        <div class="family-inner">
          <div class="family-header reveal">
            <div class="family-eyebrow-divider">
              <span class="family-eyebrow-divider__line"></span>
              <span class="family-eyebrow">Familia</span>
              <span class="family-eyebrow-divider__line"></span>
            </div>
            <h2 class="family-title family-title--wedding">${config.blessing.title}</h2>
            <div class="family-ornamental-divider">
              <span class="family-ornamental-divider__line"></span>
              <span class="family-ornament-icon family-ornament-icon--gold">
                <img src="${config.images.separatorGold}" alt="" aria-hidden="true" />
              </span>
              <span class="family-ornamental-divider__line"></span>
            </div>
          </div>

          <div class="parents-grid">
            <article class="family-group reveal" style="--delay:0.08s">
              <span class="family-group-title">Padres de la novia</span>
              ${blessingNames(config.blessing.brideParents)}
            </article>
            <article class="family-group reveal" style="--delay:0.14s">
              <span class="family-group-title">Padres del novio</span>
              ${blessingNames(config.blessing.groomParents)}
            </article>
          </div>

          <div class="family-divider reveal" style="--delay:0.18s">
            <span class="family-divider__line"></span>
            <span class="family-ornament-icon family-ornament-icon--wine">
              <img src="${config.images.separatorWine}" alt="" aria-hidden="true" />
            </span>
            <span class="family-divider__line"></span>
          </div>

          <div class="godparents-block">
            <article class="family-group family-group--stack reveal" style="--delay:0.22s">
              <span class="family-group-title">Padrinos</span>
              ${blessingNames(config.blessing.godparents.names)}
            </article>
          </div>

          <div class="family-footer-wrap reveal" style="--delay:0.34s">
            <div class="family-footer-divider">
              <span class="family-footer-divider__line"></span>
              <span class="family-ornament-icon family-ornament-icon--wine family-ornament-icon--heart">
                <img src="${config.images.separatorWine}" alt="" aria-hidden="true" />
              </span>
              <span class="family-footer-divider__line"></span>
            </div>
            <p class="family-footer-text">${config.blessing.closingText}</p>
            <div class="family-footer-divider family-footer-divider--bottom">
              <span class="family-footer-divider__line"></span>
              <span class="family-ornament-icon family-ornament-icon--gold">
                <img src="${config.images.separatorGold}" alt="" aria-hidden="true" />
              </span>
              <span class="family-footer-divider__line"></span>
            </div>
          </div>
        </div>
      </div>
    </section>

    ${createSectionCard({
      className: 'quote-card',
      eyebrow: 'Verso',
      title: 'Una promesa para siempre',
      subtitle: 'Una frase que abraza el sentido de este dia.',
      corners: 'gold',
      divider: config.lotties.floralDivider,
      body: `
        <blockquote class="quote-block reveal">
          <p>${config.quote.text}</p>
          <cite>${config.quote.source}</cite>
        </blockquote>
      `,
    })}

    <section
      class="section-card countdown-section countdown-section--with-photo"
      style="--countdown-photo:url('${config.images.venue}')"
    >
      ${createFloralCorners('mixed')}
      <div class="section-card__inner countdown-section__inner">
        <div class="countdown-content">
          <div class="section-heading countdown-section__heading reveal">
            <span class="card-eyebrow">Celebracion</span>
            <h2 class="card-title countdown-section__title">La cuenta regresiva ha comenzado</h2>
            <p class="card-subtitle countdown-section__subtitle">${config.intro.invitationText}</p>
          </div>

          <div class="countdown-divider reveal" aria-hidden="true">
            <span class="countdown-divider__line"></span>
            <span class="countdown-divider__heart">&hearts;</span>
            <span class="countdown-divider__line"></span>
          </div>

          <div class="countdown-grid reveal" id="countdown">
            <div class="countdown-panel">
              <div class="countdown-segment">
                <span class="countdown-segment__value" id="days">00</span>
                <small class="countdown-segment__label">Dias</small>
              </div>
              <div class="countdown-segment">
                <span class="countdown-segment__value" id="hours">00</span>
                <small class="countdown-segment__label">Hrs</small>
              </div>
              <div class="countdown-segment">
                <span class="countdown-segment__value" id="minutes">00</span>
                <small class="countdown-segment__label">Min</small>
              </div>
              <div class="countdown-segment">
                <span class="countdown-segment__value" id="seconds">00</span>
                <small class="countdown-segment__label">Seg</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    ${createSectionCard({
      className: 'ceremonies-card',
      eyebrow: 'Ceremonias',
      title: 'Un día para celebrar juntos',
      subtitle: 'Acompáñanos en la ceremonia y luego celebremos este momento con alegría.',
      corners: 'wine',
      divider: config.lotties.floralDivider,
      body: `
        <div class="ceremony-grid">
          ${ceremonyCards}
        </div>
      `,
    })}

    ${createSectionCard({
      className: 'dress-card-shell',
      eyebrow: 'Estilo',
      title: config.dressCode.title,
      subtitle: 'Queremos una celebracion llena de armonia, color y elegancia.',
      corners: 'gold',
      divider: config.lotties.heartDivider,
      body: `
        <div class="dress-card reveal">
          <div class="dress-card__media">
            <img src="${config.dressCode.image}" alt="Dress code elegante" data-fallback="${config.images.separatorGold}" />
          </div>
          <div class="dress-card__copy">
            <span class="badge-time">${config.dressCode.label}</span>
            <h3>Codigo de vestimenta</h3>
            <p>${config.dressCode.note}</p>
          </div>
        </div>
      `,
    })}

    <section class="section-card timeline-section-card timeline-premium reveal" id="cronograma">
      ${createFloralCorners('mixed')}
      <img class="timeline-section-card__top-ornament" src="${config.images.separatorGold}" alt="" aria-hidden="true" />
      <img class="timeline-section-card__bottom-ornament" src="${config.images.separatorWine}" alt="" aria-hidden="true" />
      <div class="section-card__inner timeline-section-card__inner timeline-premium__frame">
        <header class="timeline-premium__header reveal">
          <div class="timeline-premium__icon" aria-hidden="true">${timelineHeaderIcon}</div>
          <div class="timeline-premium__divider" aria-hidden="true"></div>
          <p class="timeline-premium__eyebrow">Cronograma</p>
          <h2 class="timeline-premium__title">Cronograma</h2>
          <p class="timeline-premium__subtitle">El programa de nuestra celebracion</p>
        </header>

        <div class="timeline-stage" aria-label="Cronograma completo">
          ${timelineItems}
        </div>

        <div class="timeline-premium__body" aria-label="Cronograma completo en escritorio">
          <div class="timeline-premium__line" aria-hidden="true"></div>
          ${desktopTimelineRows}
        </div>

        <div class="timeline-premium__footer" aria-hidden="true">
          <span class="timeline-premium__footer-line"></span>
          <span class="timeline-premium__footer-heart">&hearts;</span>
          <span class="timeline-premium__footer-line"></span>
        </div>
      </div>
    </section>

    ${createSectionCard({
      className: 'gift-card-shell',
      eyebrow: 'Regalos',
      title: config.gifts.intro,
      subtitle: 'Si deseas tener un detalle adicional, puedes hacerlo con mucho carino por este medio.',
      corners: 'gold',
      divider: config.lotties.giftAccent,
      body: `
        <div class="yape-gift reveal">
          <p class="yape-gift__owner">${config.names.bride}</p>
          <div class="yape-gift__frame">
            <img src="${config.gifts.yapeImage}" alt="Yape de Janeth" />
          </div>
          <div class="yape-copy-card" aria-label="Numero de Yape">
            <span class="yape-copy-card__label">Yape</span>
            <strong class="yape-copy-card__number">${config.gifts.yapeNumber}</strong>
            <button class="yape-copy-card__button" type="button" data-copy="${config.gifts.yapeNumber}" aria-label="Copiar numero de Yape">
              <span class="yape-copy-card__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="8" y="8" width="11" height="11" rx="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1" />
                </svg>
              </span>
              <span class="yape-copy-card__text">Copiar</span>
            </button>
          </div>
        </div>
      `,
    })}

    ${createSectionCard({
      className: 'gallery-card-shell',
      eyebrow: 'Galeria',
      title: 'Un adelanto de nuestro gran dia',
      subtitle: 'Recuerdos, escenarios y detalles que haran de esta fecha algo inolvidable.',
      corners: 'wine',
      divider: config.lotties.galleryAccent,
      dividerLoop: false,
      body: `
        <div class="gallery-grid">
          ${galleryItems}
        </div>
      `,
    })}

    ${createSectionCard({
      className: 'rsvp-card-shell',
      eyebrow: 'Confirmacion',
      title: 'Nos encantara celebrar contigo',
      subtitle: 'Confirmamos este dia contigo, y nos encantara saber que estaras presente.',
      corners: 'mixed',
      divider: config.lotties.heartDivider,
      body: `
        <div class="mini-card rsvp-card reveal">
          <p>Confirmanos tu asistencia o comparte una cancion para la fiesta.</p>
          <div class="rsvp-actions">
            <a class="primary-button" href="${createWhatsappUrl(config.contact.confirmText)}" target="_blank" rel="noreferrer">Confirmar asistencia</a>
            <a class="secondary-button" href="${createWhatsappUrl(config.contact.songText)}" target="_blank" rel="noreferrer">Sugerir cancion</a>
          </div>
        </div>
      `,
    })}

    <section class="section-card closing-card">
      ${createFloralCorners('mixed')}
      <div class="section-card__inner closing-card__inner">
        <div class="closing-card__accent reveal" data-lottie="${config.lotties.footerAccent}" data-loop="true"></div>
        <p class="closing-monogram reveal">${config.names.monogram}</p>
        <h2 class="card-title reveal">Gracias por acompañarnos en este capítulo tan especial</h2>
        <p class="card-subtitle reveal">Te esperamos para compartir una celebración llena de amor, familia y alegría.</p>
        <p class="closing-card__footer reveal">Te esperamos</p>
      </div>
    </section>

    <footer class="signature-footer reveal" aria-label="Creditos de diseno">
      <span class="signature-footer__line"></span>
      <div class="signature-footer__actions">
        <a
          class="signature-button signature-button--kat"
          href="${createWhatsappUrlFor('51932670446', 'Hola, quiero una invitación como la de la página para mi evento.')}"
          target="_blank"
          rel="noreferrer"
          aria-label="Contactar a Kat por WhatsApp"
        >
          <small>Design by</small>
          <strong>Kat</strong>
        </a>
        <a
          class="signature-button signature-button--studio"
          href="${createWhatsappUrlFor('51931278023', 'Hola, quiero una invitación como la de la página para mi evento.')}"
          target="_blank"
          rel="noreferrer"
          aria-label="Contactar a Studio27 por WhatsApp"
        >
          <img src="${config.images.studio27}" alt="Studio27" />
        </a>
      </div>
      <span class="signature-footer__line"></span>
    </footer>
  </main>

  <button class="music-toggle music-floating-button" id="music-toggle" type="button" aria-label="Reproducir musica">
    <span class="music-icon music-icon--play" aria-hidden="true">▶</span>
    <span class="music-icon music-icon--pause" aria-hidden="true">❚❚</span>
  </button>
`;

document.querySelector('.hero-card')?.remove();
document.querySelector('.cover-scroll')?.replaceChildren(document.createTextNode('↓'));
document.querySelector('#music-toggle')?.replaceChildren(
  Object.assign(document.createElement('span'), {
    className: 'music-icon music-icon--play',
    ariaHidden: 'true',
    textContent: '▶',
  }),
  Object.assign(document.createElement('span'), {
    className: 'music-icon music-icon--pause',
    ariaHidden: 'true',
    textContent: '❚❚',
  }),
);

const fallbackMap = new Map([
  [config.images.couple, config.images.venue],
  [config.images.church, config.images.couple],
  [config.images.venue, config.images.couple],
]);

const activateFallbacks = () => {
  document.querySelectorAll('img[data-fallback]').forEach((image) => {
    image.addEventListener(
      'error',
      () => {
        const fallback = image.dataset.fallback || fallbackMap.get(image.getAttribute('src'));
        if (fallback && image.getAttribute('src') !== fallback) {
          image.src = fallback;
        }
      },
      { once: true },
    );
  });
};

const createPetals = () => {
  const petals = [config.images.petalGold, config.images.petalWine];

  Array.from({ length: 12 }, (_, index) => {
    const petal = document.createElement('span');
    petal.className = 'petal';
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.animationDelay = `${index * 1.1}s`;
    petal.style.animationDuration = `${14 + Math.random() * 6}s`;

    const img = document.createElement('img');
    img.src = petals[index % petals.length];
    img.alt = '';
    img.setAttribute('aria-hidden', 'true');
    petal.append(img);
    petalLayer.append(petal);
  });
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 },
);

const observeReveals = () => {
  document.querySelectorAll('.reveal').forEach((item) => revealObserver.observe(item));
};

const setupLotties = () => {
  document.querySelectorAll('[data-lottie]').forEach((container) => {
    lottie.loadAnimation({
      container,
      renderer: 'svg',
      loop: container.dataset.loop !== 'false',
      autoplay: true,
      path: container.dataset.lottie,
    });
  });
};

const setupCopyButtons = () => {
  document.querySelectorAll('[data-copy]').forEach((button) => {
    button.addEventListener('click', async () => {
      const value = button.dataset.copy || '';
      const label = button.querySelector('.yape-copy-card__text');
      const originalText = label?.textContent || 'Copiar';

      try {
        await navigator.clipboard.writeText(value);
        if (label) label.textContent = 'Copiado';
        button.classList.add('is-copied');
      } catch (error) {
        const fallbackInput = document.createElement('input');
        fallbackInput.value = value;
        document.body.append(fallbackInput);
        fallbackInput.select();
        document.execCommand('copy');
        fallbackInput.remove();
        if (label) label.textContent = 'Copiado';
        button.classList.add('is-copied');
      }

      window.setTimeout(() => {
        if (label) label.textContent = originalText;
        button.classList.remove('is-copied');
      }, 1800);
    });
  });
};

const formatCountdownValue = (value) => String(Math.max(0, value)).padStart(2, '0');

const countdownElements = {
  days: document.querySelector('#days'),
  hours: document.querySelector('#hours'),
  minutes: document.querySelector('#minutes'),
  seconds: document.querySelector('#seconds'),
};

const updateCountdown = () => {
  const eventDate = new Date(config.event.isoDate).getTime();
  const now = Date.now();
  const distance = eventDate - now;

  if (distance <= 0) {
    countdownElements.days.textContent = '00';
    countdownElements.hours.textContent = '00';
    countdownElements.minutes.textContent = '00';
    countdownElements.seconds.textContent = '00';
    return;
  }

  const day = 1000 * 60 * 60 * 24;
  const hour = 1000 * 60 * 60;
  const minute = 1000 * 60;

  const days = Math.floor(distance / day);
  const hours = Math.floor((distance % day) / hour);
  const minutes = Math.floor((distance % hour) / minute);
  const seconds = Math.floor((distance % minute) / 1000);

  countdownElements.days.textContent = formatCountdownValue(days);
  countdownElements.hours.textContent = formatCountdownValue(hours);
  countdownElements.minutes.textContent = formatCountdownValue(minutes);
  countdownElements.seconds.textContent = formatCountdownValue(seconds);
};

let audioUnlocked = false;

const musicButton = document.querySelector('#music-toggle');

const syncMusicButton = () => {
  if (!musicButton) return;
  musicButton.classList.toggle('is-playing', !audio.paused);
  musicButton.setAttribute('aria-label', audio.paused ? 'Reproducir musica' : 'Pausar musica');
};

const tryPlayAudio = async () => {
  try {
    await audio.play();
    audioUnlocked = true;
    syncMusicButton();
  } catch (error) {
    syncMusicButton();
  }
};

const openInvitation = async () => {
  openingScreen.classList.add('is-opened');
  app.classList.remove('is-locked');
  document.body.classList.add('invitation-opened');

  if (audio.paused) {
    await tryPlayAudio();
  }

  window.setTimeout(() => {
    openingScreen.setAttribute('hidden', 'hidden');
  }, 900);
};

openButton?.addEventListener('click', openInvitation);
openingEnvelopeButton?.addEventListener('click', openInvitation);

musicButton?.addEventListener('click', async () => {
  if (audio.paused) {
    await tryPlayAudio();
    return;
  }

  audio.pause();
  syncMusicButton();
});

audio.addEventListener('pause', syncMusicButton);
audio.addEventListener('play', syncMusicButton);
audio.addEventListener('ended', syncMusicButton);

syncMusicButton();

activateFallbacks();
createPetals();
observeReveals();
setupLotties();
setupCopyButtons();
updateCountdown();
window.setInterval(updateCountdown, 1000);
