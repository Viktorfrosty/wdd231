import { discoverItems } from '../data/discover-items.mjs';

const discoverGrid = document.querySelector('#discover-grid');
const visitMessage = document.querySelector('#visit-message');

if (discoverGrid) {
  discoverGrid.innerHTML = discoverItems
    .map((item, index) => `
      <article class="discover-card card${index + 1}">
        <h2>${item.name}</h2>
        <figure>
          <img src="${item.image}" alt="${item.alt}" width="300" height="200" loading="lazy">
        </figure>
        <address>${item.address}</address>
        <p>${item.description}</p>
        <button type="button">Learn more</button>
      </article>
    `)
    .join('');
}

if (visitMessage) {
  const storageKey = 'chamber-last-visit';
  const now = Date.now();
  const previousVisit = Number(localStorage.getItem(storageKey));

  if (!previousVisit) {
    visitMessage.textContent = 'Welcome! Let us know if you have any questions.';
  } else {
    const daysSinceVisit = Math.floor((now - previousVisit) / 86400000);
    if (daysSinceVisit < 1) {
      visitMessage.textContent = 'Back so soon! Awesome!';
    } else if (daysSinceVisit === 1) {
      visitMessage.textContent = 'You last visited 1 day ago.';
    } else {
      visitMessage.textContent = `You last visited ${daysSinceVisit} days ago.`;
    }
  }

  localStorage.setItem(storageKey, now);
}
