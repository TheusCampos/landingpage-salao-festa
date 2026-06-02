/**
 * Utils.js - Funções Utilitárias Compartilhadas
 * Mahalo Fest - Salão de Festas Premium
 *
 * @description Funções reutilizáveis de debounce, throttle,
 * validações e helpers genéricos.
 */

const Utils = (() => {
  /**
   * Debounce - Atrasa a execução até que pare de ser chamada
   * @param {Function} func - Função a ser executada
   * @param {number} wait - Tempo de espera em ms
   * @returns {Function}
   */
  const debounce = (func, wait = 250) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func.apply(this, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  /**
   * Throttle - Limita a frequência de execução
   * @param {Function} func - Função a ser executada
   * @param {number} limit - Intervalo mínimo em ms
   * @returns {Function}
   */
  const throttle = (func, limit = 16) => {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  };

  /**
   * Regex de validação de e-mail
   * @type {RegExp}
   */
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /**
   * Regex de validação de telefone (BR e internacional)
   * @type {RegExp}
   */
  const PHONE_REGEX = /^[\d\s()+\-]{10,}$/;

  /**
   * Valida formato de e-mail
   * @param {string} email
   * @returns {boolean}
   */
  const isValidEmail = (email) => EMAIL_REGEX.test(email);

  /**
   * Valida formato de telefone
   * @param {string} phone
   * @returns {boolean}
   */
  const isValidPhone = (phone) => PHONE_REGEX.test(phone);

  /**
   * Seleciona elemento do DOM
   * @param {string} selector
   * @param {Element} [context=document]
   * @returns {Element|null}
   */
  const $ = (selector, context = document) => context.querySelector(selector);

  /**
   * Seleciona múltiplos elementos do DOM
   * @param {string} selector
   * @param {Element} [context=document]
   * @returns {NodeList}
   */
  const $$ = (selector, context = document) =>
    Array.from(context.querySelectorAll(selector));

  /**
   * Scroll suave para um elemento
   * @param {string|Element} target - Seletor ou elemento
   * @param {number} [offset=80] - Offset para compensar navbar fixa
   */
  const smoothScrollTo = (target, offset = 80) => {
    const element =
      typeof target === 'string' ? document.querySelector(target) : target;
    if (!element) return;
    const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  /**
   * Logger padronizado com prefixo
   */
  const logger = {
    info: (msg, ...args) => console.info(`[MahaloFest] ${msg}`, ...args),
    warn: (msg, ...args) => console.warn(`[MahaloFest] ${msg}`, ...args),
    error: (msg, ...args) => console.error(`[MahaloFest] ${msg}`, ...args),
  };

  return {
    debounce,
    throttle,
    isValidEmail,
    isValidPhone,
    $,
    $$,
    smoothScrollTo,
    logger,
  };
})();

// Exporta para uso em outros módulos
window.Utils = Utils;
