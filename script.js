/* ============================================================
   script.js
   ePortfolio — Aadarsh K.C. | CET138 Full Stack Development
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── Header scroll behaviour ─────────────────────────────── */
  const header = document.querySelector('.site-header');

  if (header && !header.classList.contains('page-header')) {
    function updateHeader() {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader(); // run on load in case page is mid-scroll
  }

  /* ── Mobile nav toggle ───────────────────────────────────── */
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav   = document.querySelector('.site-nav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('open');
      siteNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', siteNav.classList.contains('open').toString());
    });

    siteNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('open');
        siteNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── Active nav link ─────────────────────────────────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav a').forEach(function (link) {
    if (link.getAttribute('href').split('/').pop() === currentPage) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  /* ── Job application form validation ────────────────────── */
  const appForm = document.getElementById('jobAppForm');

  if (appForm) {

    function showError(fieldId, message) {
      const field = document.getElementById(fieldId);
      const err   = document.getElementById(fieldId + 'Error');
      if (field) field.classList.add('field-error');
      if (err)   { err.textContent = message; err.classList.add('show'); }
    }

    function clearError(fieldId) {
      const field = document.getElementById(fieldId);
      const err   = document.getElementById(fieldId + 'Error');
      if (field) field.classList.remove('field-error');
      if (err)   err.classList.remove('show');
    }

    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function isValidPhone(phone) {
      return /^[\d\s\-\+\(\)]{7,15}$/.test(phone);
    }

    ['fullName', 'email', 'phone', 'city', 'position', 'experience', 'portfolio', 'message'].forEach(function (id) {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input',  function () { clearError(id); });
        el.addEventListener('change', function () { clearError(id); });
      }
    });

    appForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const fullName   = document.getElementById('fullName').value.trim();
      const email      = document.getElementById('email').value.trim();
      const phone      = document.getElementById('phone').value.trim();
      const city       = document.getElementById('city').value.trim();
      const position   = document.getElementById('position').value;
      const experience = document.getElementById('experience').value.trim();
      const message    = document.getElementById('message').value.trim();

      const errorAlert   = document.getElementById('formErrorAlert');
      const successAlert = document.getElementById('formSuccessAlert');

      errorAlert.classList.remove('show');
      successAlert.classList.remove('show');
      ['fullName', 'email', 'phone', 'city', 'position', 'experience', 'portfolio', 'message'].forEach(clearError);

      let valid = true;

      if (fullName.length < 2) {
        showError('fullName', 'Full name must be at least 2 characters.');
        valid = false;
      }
      if (!isValidEmail(email)) {
        showError('email', 'Please enter a valid email address (e.g. name@example.com.np).');
        valid = false;
      }
      if (phone && !isValidPhone(phone)) {
        showError('phone', 'Please enter a valid phone number (e.g. +9779802864772).');
        valid = false;
      }
      if (!city) {
        showError('city', 'Please enter your city.');
        valid = false;
      }
      if (!position) {
        showError('position', 'Please select a position.');
        valid = false;
      }
      if (!experience || isNaN(experience) || Number(experience) < 0) {
        showError('experience', 'Please enter your years of experience.');
        valid = false;
      }
      if (message.length < 20) {
        showError('message', 'Cover note must be at least 20 characters.');
        valid = false;
      }

      if (!valid) {
        errorAlert.classList.add('show');
        errorAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      successAlert.classList.add('show');
      appForm.reset();
      successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  /* ── Smooth anchor scroll ────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.getElementById(this.getAttribute('href').slice(1));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
