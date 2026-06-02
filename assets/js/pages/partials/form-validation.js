/**
 * form-validation.js - Validação do Formulário de Contato
 * Mahalo Fest - Salão de Festas Premium
 *
 * @description Validação em tempo real, simulação de envio
 * e feedback visual para o formulário de contato.
 */

const FormValidation = (() => {
  const { $, $$, isValidEmail, isValidPhone, logger } = window.Utils;

  /** Mensagens de erro */
  const MESSAGES = {
    nameMin: 'Nome deve ter pelo menos 2 caracteres',
    emailInvalid: 'Por favor, insira um e-mail válido',
    phoneInvalid: 'Por favor, insira um telefone válido',
  };

  /**
   * Cria elemento de mensagem de erro
   * @param {string} message
   * @returns {HTMLElement}
   */
  const createErrorElement = (message) => {
    const div = document.createElement('div');
    div.className = 'form-group__error';
    div.textContent = message;
    return div;
  };

  /**
   * Exibe erro em um campo
   * @param {HTMLElement} field
   * @param {string} message
   */
  const showFieldError = (field, message) => {
    if (!field) return;
    clearFieldError(field);

    field.classList.add('form-group__input--error');
    const errorEl = createErrorElement(message);
    errorEl.classList.add(`${field.id}-error`);
    field.parentNode.appendChild(errorEl);
  };

  /**
   * Remove erro de um campo
   * @param {HTMLElement|string} fieldOrId
   */
  const clearFieldError = (fieldOrId) => {
    const field =
      typeof fieldOrId === 'string' ? document.getElementById(fieldOrId) : fieldOrId;
    if (!field) return;

    field.classList.remove('form-group__input--error');

    const existingErrors = field.parentNode.querySelectorAll('.form-group__error');
    existingErrors.forEach((el) => el.remove());
  };

  /**
   * Valida um campo individual
   * @param {HTMLElement} field
   * @returns {boolean}
   */
  const validateField = (field) => {
    const value = field.value.trim();

    switch (field.name) {
      case 'name':
        if (value.length < 2) {
          showFieldError(field, MESSAGES.nameMin);
          return false;
        }
        break;
      case 'email':
        if (!isValidEmail(value)) {
          showFieldError(field, MESSAGES.emailInvalid);
          return false;
        }
        break;
      case 'phone':
        if (value.length > 0 && !isValidPhone(value)) {
          showFieldError(field, MESSAGES.phoneInvalid);
          return false;
        }
        break;
      default:
        break;
    }

    clearFieldError(field);
    return true;
  };

  /**
   * Valida todos os campos do formulário
   * @param {Object} data
   * @returns {boolean}
   */
  const validateForm = (data) => {
    let isValid = true;

    if (!data.name || data.name.trim().length < 2) {
      const nameField = $('#name');
      showFieldError(nameField, MESSAGES.nameMin);
      isValid = false;
    }

    if (!data.email || !isValidEmail(data.email)) {
      const emailField = $('#email');
      showFieldError(emailField, MESSAGES.emailInvalid);
      isValid = false;
    }

    if (data.phone && data.phone.length > 0 && !isValidPhone(data.phone)) {
      const phoneField = $('#phone');
      showFieldError(phoneField, MESSAGES.phoneInvalid);
      isValid = false;
    }

    return isValid;
  };

  /**
   * Altera estado do botão (loading)
   * @param {boolean} loading
   */
  const setLoadingState = (loading) => {
    const submitBtn = $('#contact-form button[type="submit"]');
    if (!submitBtn) return;

    if (loading) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
      submitBtn.classList.add('loading');
    } else {
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Enviar Mensagem';
      submitBtn.classList.remove('loading');
    }
  };

  /**
   * Exibe mensagem de sucesso
   */
  const showSuccessMessage = () => {
    const form = $('#contact-form');
    if (!form) return;

    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.innerHTML =
      '<i class="fas fa-check-circle"></i> Mensagem enviada com sucesso! Entraremos em contato em breve.';

    form.parentNode.insertBefore(successDiv, form);

    setTimeout(() => {
      successDiv.remove();
    }, 5000);
  };

  /**
   * Handler de submit do formulário
   * @param {Event} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    if (!validateForm(data)) return;

    setLoadingState(true);

    // Simulação de envio
    setTimeout(() => {
      setLoadingState(false);
      showSuccessMessage();
      form.reset();
    }, 2000);
  };

  /**
   * Adiciona listeners aos campos para validação em tempo real
   */
  const attachFieldListeners = () => {
    const inputs = $$('#contact-form input, #contact-form textarea, #contact-form select');
    inputs.forEach((input) => {
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => clearFieldError(input));
    });
  };

  /**
   * Inicializa validação do formulário
   */
  const init = () => {
    const form = $('#contact-form');
    if (!form) return;

    try {
      form.addEventListener('submit', handleSubmit);
      attachFieldListeners();
      logger.info('FormValidation inicializado');
    } catch (err) {
      logger.error('Erro ao inicializar FormValidation:', err);
    }
  };

  return { init, validateForm, validateField };
})();

window.FormValidation = FormValidation;
