import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Apply fade-in animation to elements as they enter the viewport
 * @param {string} selector - CSS selector for target elements
 * @param {object} options - Animation options
 */
export const fadeInOnScroll = (selector, options = {}) => {
  const defaults = {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: selector,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  };

  const config = { ...defaults, ...options };
  
  return gsap.from(selector, config);
};

/**
 * Apply staggered fade-in animation to a group of elements as they enter the viewport
 * @param {string} containerSelector - CSS selector for the container
 * @param {string} itemSelector - CSS selector for the items within the container
 * @param {object} options - Animation options
 */
export const staggeredFadeIn = (containerSelector, itemSelector, options = {}) => {
  const defaults = {
    y: 20,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: containerSelector,
      start: 'top 75%',
      toggleActions: 'play none none none',
    },
  };

  const config = { ...defaults, ...options };
  
  return gsap.from(`${containerSelector} ${itemSelector}`, config);
};

/**
 * Create a parallax scroll effect for background elements
 * @param {string} selector - CSS selector for target elements
 * @param {object} options - Animation options
 */
export const parallaxScroll = (selector, options = {}) => {
  const defaults = {
    y: (i, el) => -parseFloat(el.getAttribute('data-speed') || 100),
    ease: 'none',
    scrollTrigger: {
      trigger: selector,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  };

  const config = { ...defaults, ...options };
  
  return gsap.to(selector, config);
};

/**
 * Create a zoom effect for elements as they enter the viewport
 * @param {string} selector - CSS selector for target elements
 * @param {object} options - Animation options
 */
export const zoomInOnScroll = (selector, options = {}) => {
  const defaults = {
    scale: 0.8,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: selector,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  };

  const config = { ...defaults, ...options };
  
  return gsap.from(selector, config);
};

/**
 * Create a horizontal scroll animation for a gallery or carousel
 * @param {string} selector - CSS selector for the container
 * @param {object} options - Animation options
 */
export const horizontalScroll = (selector, options = {}) => {
  const container = document.querySelector(selector);
  if (!container) return;
  
  const items = container.querySelectorAll('[data-scroll-item]');
  const width = Array.from(items).reduce((acc, item) => acc + item.offsetWidth, 0);
  
  const defaults = {
    x: () => -(width - window.innerWidth),
    ease: 'none',
    scrollTrigger: {
      trigger: selector,
      pin: true,
      start: 'top top',
      end: `+=${width}`,
      scrub: 1,
    },
  };

  const config = { ...defaults, ...options };
  
  return gsap.to(items, config);
};

/**
 * Create a text reveal animation
 * @param {string} selector - CSS selector for text elements
 * @param {object} options - Animation options
 */
export const revealText = (selector, options = {}) => {
  const elements = document.querySelectorAll(selector);
  
  elements.forEach(element => {
    // Wrap each word in a span
    const content = element.textContent;
    const words = content.split(' ');
    element.innerHTML = '';
    
    words.forEach((word, i) => {
      const wordSpan = document.createElement('span');
      wordSpan.style.display = 'inline-block';
      wordSpan.style.overflow = 'hidden';
      
      const innerSpan = document.createElement('span');
      innerSpan.style.display = 'inline-block';
      innerSpan.style.transform = 'translateY(100%)';
      innerSpan.textContent = word + (i < words.length - 1 ? ' ' : '');
      
      wordSpan.appendChild(innerSpan);
      element.appendChild(wordSpan);
    });
  });
  
  const defaults = {
    y: 0,
    duration: 0.8,
    stagger: 0.02,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: selector,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  };

  const config = { ...defaults, ...options };
  
  return gsap.to(`${selector} span span`, config);
};

/**
 * Initialize all animations on a page
 */
export const initPageAnimations = () => {
  // Fade in header elements
  fadeInOnScroll('.hero-title', { delay: 0.2 });
  fadeInOnScroll('.hero-subtitle', { delay: 0.4 });
  fadeInOnScroll('.hero-button', { delay: 0.6 });
  
  // Staggered fade in for category links
  staggeredFadeIn('.category-links', '.category-link');
  
  // Parallax for collection images
  parallaxScroll('.collection-image[data-speed]');
  
  // Zoom in effect for product cards
  zoomInOnScroll('.product-card');
  
  // Text reveal for section titles
  revealText('.section-title');
  
  // Add scroll trigger for navbar change on scroll
  ScrollTrigger.create({
    start: 'top -80',
    end: 99999,
    toggleClass: { className: 'scrolled', targets: 'header' }
  });
};

export default {
  fadeInOnScroll,
  staggeredFadeIn,
  parallaxScroll,
  zoomInOnScroll,
  horizontalScroll,
  revealText,
  initPageAnimations,
}; 