/**
 * hero-animations.js - Animações Específicas do Hero
 * Mahalo Fest - Salão de Festas Premium
 *
 * @description Animações interativas exclusivas da hero section.
 */

const HeroAnimations = (() => {
  const { $, logger } = window.Utils;

  /**
   * Adiciona parallax suave no background do hero
   */
  const initParallaxBackground = () => {
    const hero = $('.hero');
    if (!hero) return;

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      if (scrolled < window.innerHeight) {
        const opacity = 1 - scrolled / window.innerHeight;
        const translateY = scrolled * 0.4;
        hero.style.setProperty('--parallax-y', `${translateY}px`);
        hero.style.setProperty('--hero-opacity', opacity);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  };

  /**
   * Inicializa animações do hero
   */
  const init = () => {
    try {
      initParallaxBackground();
      logger.info('HeroAnimations inicializadas');
    } catch (err) {
      logger.error('Erro ao inicializar HeroAnimations:', err);
    }
  };

  return { init };
})();

window.HeroAnimations = HeroAnimations;
