/**
 * scroll-effects.js - Efeitos de Scroll da Página
 * Mahalo Fest - Salão de Festas Premium
 *
 * @description Gerencia smooth scroll global e
 * refresh do AOS em redimensionamento.
 */

const ScrollEffects = (() => {
  const { $$, debounce, smoothScrollTo, logger } = window.Utils;

  /**
   * Aplica smooth scroll em todos os links âncora
   */
  const initSmoothScrolling = () => {
    const anchors = $$('a[href^="#"]');

    anchors.forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href || href === '#') return;

        e.preventDefault();
        smoothScrollTo(href);
      });
    });
  };

  /**
   * Atualiza AOS em redimensionamento
   */
  const initResizeRefresh = () => {
    const handleResize = debounce(() => {
      if (typeof AOS !== 'undefined') {
        AOS.refresh();
      }
    }, 250);

    window.addEventListener('resize', handleResize);
  };

  /**
   * Inicializa todos os efeitos de scroll
   */
  const init = () => {
    try {
      initSmoothScrolling();
      initResizeRefresh();
      logger.info('ScrollEffects inicializados');
    } catch (err) {
      logger.error('Erro ao inicializar ScrollEffects:', err);
    }
  };

  return { init };
})();

window.ScrollEffects = ScrollEffects;
