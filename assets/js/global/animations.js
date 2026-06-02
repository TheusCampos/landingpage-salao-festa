/**
 * Animations.js - Animações Globais
 * Mahalo Fest - Salão de Festas Premium
 *
 * @description Coordena bibliotecas de animação (AOS),
 * contadores animados, typing effect e parallax.
 */

const Animations = (() => {
  const { $, $$, logger } = window.Utils;

  /**
   * Inicializa AOS (Animate On Scroll)
   */
  const initAOS = () => {
    if (typeof AOS === 'undefined') {
      logger.warn('AOS library não encontrada');
      return;
    }
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
    });
  };

  /**
   * Efeito de digitação no título do hero
   */
  const initTypingEffect = () => {
    const heroTitle = $('#home h1');
    if (!heroTitle) return;

    const text = heroTitle.textContent;
    heroTitle.textContent = '';

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i += 1;
        setTimeout(typeWriter, 100);
      }
    };

    setTimeout(typeWriter, 1000);
  };

  /**
   * Animação de contadores numéricos
   */
  const animateCounter = (counter) => {
    const target = parseInt(counter.dataset.target, 10);
    if (Number.isNaN(target)) return;

    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = Math.floor(current);
    }, 16);
  };

  /**
   * Observer para iniciar contadores quando visíveis
   */
  const initCounters = () => {
    const counters = $$('.counter');
    if (!counters.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    counters.forEach((counter) => observer.observe(counter));
  };

  /**
   * Animação de entrada para cards (fallback caso AOS falhe)
   */
  const initCardAnimations = () => {
    const cards = $$('.service-card, .testimonial-card');
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    cards.forEach((card) => observer.observe(card));
  };

  /**
   * Efeito parallax em elementos com classe .parallax
   */
  const initParallax = () => {
    const elements = $$('.parallax');
    if (!elements.length) return;

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      elements.forEach((element) => {
        const speed = parseFloat(element.dataset.speed) || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  };

  /**
   * Inicializa todas as animações
   */
  const init = () => {
    try {
      initAOS();
      initTypingEffect();
      initCounters();
      initCardAnimations();
      initParallax();
      logger.info('Animations inicializadas');
    } catch (err) {
      logger.error('Erro ao inicializar Animations:', err);
    }
  };

  return { init };
})();

window.Animations = Animations;
