/**
 * index.js - Entry Point da Aplicação
 * Mahalo Fest - Salão de Festas Premium
 *
 * @description Inicializa todos os módulos da landing page
 * após o carregamento do DOM.
 */

(function App() {
  'use strict';

  /**
   * Inicializa todos os módulos da página
   */
  const initApp = () => {
    try {
      // Módulos globais
      window.Navigation?.init();
      window.Animations?.init();
      window.ScrollEffects?.init();

      // Módulos específicos da página
      window.HeroAnimations?.init();
      window.FormValidation?.init();

      // Log global de erros
      window.addEventListener('error', (e) => {
        console.error('[MahaloFest] JavaScript error:', e.error);
      });
    } catch (err) {
      console.error('[MahaloFest] Erro fatal na inicialização:', err);
    }
  };

  // Aguarda DOM pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
