/**
 * Navigation.js - Gerencia Navbar e Menu Mobile
 * Mahalo Fest - Salão de Festas Premium
 *
 * @description Controla o efeito de scroll na navbar,
 * scroll spy para destacar link ativo e o menu mobile.
 */

const Navigation = (() => {
  const { $, $$, smoothScrollTo, logger } = window.Utils;

  /**
   * Alterna estilo da navbar após scroll
   */
  const initScrollEffect = () => {
    const navbar = $('#navbar');
    if (!navbar) return;

    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('navbar--scrolled');
      } else {
        navbar.classList.remove('navbar--scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  };

  /**
   * Atualiza link ativo baseado na posição do scroll
   */
  const updateActiveLink = () => {
    const sections = $$('section[id]');
    const navLinks = $$('.nav-link');

    if (!sections.length || !navLinks.length) return;

    let currentSection = '';

    sections.forEach((section) => {
      const top = section.offsetTop - 100;
      const height = section.clientHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        currentSection = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('nav-link--active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('nav-link--active');
      }
    });
  };

  /**
   * Inicializa scroll spy
   */
  const initScrollSpy = () => {
    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink();
  };

  /**
   * Inicializa smooth scroll nos links de navegação
   */
  const initSmoothScrollLinks = () => {
    const navLinks = $$('.nav-link');

    navLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
          smoothScrollTo(targetId);
        }
      });
    });
  };

  /**
   * Fecha o menu mobile
   * @param {Element} mobileMenu
   * @param {Element} button
   */
  const closeMobileMenu = (mobileMenu, button) => {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('mobile-menu--show');

    const onTransitionEnd = (e) => {
      if (e.propertyName === 'transform') {
        mobileMenu.classList.add('mobile-menu--hidden');
        mobileMenu.removeEventListener('transitionend', onTransitionEnd);
      }
    };

    mobileMenu.addEventListener('transitionend', onTransitionEnd);

    const icon = button?.querySelector('i');
    if (icon) {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  };

  /**
   * Abre o menu mobile
   * @param {Element} mobileMenu
   * @param {Element} button
   */
  const openMobileMenu = (mobileMenu, button) => {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('mobile-menu--hidden');
    requestAnimationFrame(() => mobileMenu.classList.add('mobile-menu--show'));

    const icon = button?.querySelector('i');
    if (icon) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    }
  };

  /**
   * Inicializa toggle do menu mobile
   */
  const initMobileMenu = () => {
    const button = $('.navbar__toggle');
    const mobileMenu = $('.mobile-menu');

    if (!button || !mobileMenu) return;

    button.addEventListener('click', () => {
      const willShow = !mobileMenu.classList.contains('mobile-menu--show');
      willShow
        ? openMobileMenu(mobileMenu, button)
        : closeMobileMenu(mobileMenu, button);
    });

    // Fecha menu ao clicar em link
    $$('.mobile-menu__link').forEach((link) => {
      link.addEventListener('click', () => {
        closeMobileMenu(mobileMenu, button);
      });
    });
  };

  /**
   * Inicializa todos os comportamentos de navegação
   */
  const init = () => {
    try {
      initScrollEffect();
      initScrollSpy();
      initSmoothScrollLinks();
      initMobileMenu();
      logger.info('Navigation inicializada');
    } catch (err) {
      logger.error('Erro ao inicializar Navigation:', err);
    }
  };

  return { init };
})();

window.Navigation = Navigation;
