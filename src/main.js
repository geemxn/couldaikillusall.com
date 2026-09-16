import './style.css';
import { analytics, logEvent } from './firebase.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Log page view event
  if (analytics) {
    try {
      logEvent(analytics, 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname
      });
    } catch (e) {
      console.warn(e);
    }
  }

  // 2. Track CTA clicks
  const ctaButtons = document.querySelectorAll('a[href*="gptawake.com/products/will-ai-kill-us"]');
  ctaButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (analytics) {
        try {
          logEvent(analytics, 'begin_checkout', {
            item_name: 'Will AI Kill Us Illustrated Guide',
            item_id: '15890951700766',
            destination: btn.href
          });
        } catch (e) {}
      }
    });
  });

  // 3. FAQ Accordion Interaction
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(other => other.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 4. Sticky Bottom CTA Bar Logic
  const stickyBar = document.querySelector('.sticky-cta-bar');
  const heroSection = document.querySelector('.hero-section');
  if (stickyBar && heroSection) {
    window.addEventListener('scroll', () => {
      const heroBottom = heroSection.getBoundingClientRect().bottom;
      if (heroBottom < 0) {
        stickyBar.classList.add('visible');
      } else {
        stickyBar.classList.remove('visible');
      }
    });
  }

  // 5. Image Preview Modal
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const modalClose = document.getElementById('modalClose');

  const plateCards = document.querySelectorAll('.plate-card');
  plateCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      if (img && modal && modalImg) {
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        modal.classList.add('active');
      }
    });
  });

  modalClose?.addEventListener('click', () => {
    modal?.classList.remove('active');
  });

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
});
