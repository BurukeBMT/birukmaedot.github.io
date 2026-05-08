(function () {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });



  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function (direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
      filters.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Contact Form Handler using EmailJS with Validation & Rate Limiting
   */
  (function () {
    // Initialize EmailJS with your public key
    emailjs.init('xh2SH8g1M-kxa6tGA');

    // Rate limiting configuration
    const RATE_LIMIT_MAX_ATTEMPTS = 3;
    const RATE_LIMIT_TIME_WINDOW = 3600000; // 1 hour in milliseconds
    const RATE_LIMIT_KEY = 'contactFormSubmissions';

    // Get submission attempts from localStorage
    function getSubmissionAttempts() {
      const data = localStorage.getItem(RATE_LIMIT_KEY);
      if (!data) return [];

      const attempts = JSON.parse(data);
      const now = Date.now();
      // Filter out attempts older than the time window
      return attempts.filter(timestamp => now - timestamp < RATE_LIMIT_TIME_WINDOW);
    }

    // Record a submission attempt
    function recordSubmissionAttempt() {
      const attempts = getSubmissionAttempts();
      attempts.push(Date.now());
      localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(attempts));
    }

    // Check if rate limit is exceeded
    function isRateLimited() {
      const attempts = getSubmissionAttempts();
      return attempts.length >= RATE_LIMIT_MAX_ATTEMPTS;
    }

    // Get time remaining until next submission is allowed
    function getTimeRemaining() {
      const attempts = getSubmissionAttempts();
      if (attempts.length < RATE_LIMIT_MAX_ATTEMPTS) return 0;

      const oldestAttempt = attempts[0];
      const timeRemaining = RATE_LIMIT_TIME_WINDOW - (Date.now() - oldestAttempt);
      return Math.ceil(timeRemaining / 60000); // Convert to minutes
    }

    // Validate email format
    function validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    // Validate form inputs
    function validateForm(formData) {
      const errors = [];

      // Validate name
      if (!formData.from_name || formData.from_name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
      }

      // Validate email
      if (!formData.from_email || !validateEmail(formData.from_email)) {
        errors.push('Please enter a valid email address');
      }

      // Validate subject
      if (!formData.subject || formData.subject.trim().length < 5) {
        errors.push('Subject must be at least 5 characters long');
      }

      // Validate message
      if (!formData.message || formData.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
      }

      return errors;
    }

    // Show success toast
    function showSuccessToast() {
      const toast = document.createElement('div');
      toast.className = 'alert alert-success alert-dismissible fade show';
      toast.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 9999; min-width: 300px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);';
      toast.setAttribute('role', 'alert');
      toast.innerHTML = `
        <strong>✓ Success!</strong> Your message has been sent. Thank you for reaching out!
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      `;

      document.body.appendChild(toast);

      // Auto-remove after 5 seconds
      setTimeout(() => {
        toast.remove();
      }, 5000);
    }

    // Show error toast
    function showErrorToast(message) {
      const toast = document.createElement('div');
      toast.className = 'alert alert-danger alert-dismissible fade show';
      toast.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 9999; min-width: 300px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);';
      toast.setAttribute('role', 'alert');
      toast.innerHTML = `
        <strong>✗ Error!</strong> ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      `;

      document.body.appendChild(toast);

      // Auto-remove after 6 seconds
      setTimeout(() => {
        toast.remove();
      }, 6000);
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        try {
          const submitButton = contactForm.querySelector('button[type="submit"]');
          const loadingDiv = contactForm.querySelector('.loading');
          const errorDiv = contactForm.querySelector('.error-message');

          // Check if required elements exist
          if (!submitButton || !loadingDiv || !errorDiv) {
            console.error('Required form elements not found');
            return;
          }

          // Get form data
          const formData = {
            from_name: contactForm.name.value.trim(),
            from_email: contactForm.email.value.trim(),
            subject: contactForm.subject ? contactForm.subject.value.trim() : '',
            message: contactForm.message.value.trim(),
          };

          // Validate form
          const validationErrors = validateForm(formData);
          if (validationErrors.length > 0) {
            errorDiv.innerHTML = '<strong>Please fix the following:</strong><ul>' +
              validationErrors.map(error => `<li>${error}</li>`).join('') +
              '</ul>';
            errorDiv.style.display = 'block';
            return;
          }

          // Check rate limiting
          if (isRateLimited()) {
            const timeRemaining = getTimeRemaining();
            const message = `You can only send ${RATE_LIMIT_MAX_ATTEMPTS} messages per hour. Please try again in ${timeRemaining} minute${timeRemaining !== 1 ? 's' : ''}.`;
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
            showErrorToast(message);
            return;
          }

          // Clear previous error messages
          errorDiv.style.display = 'none';
          errorDiv.innerHTML = '';

          // Show loading state
          submitButton.disabled = true;
          loadingDiv.style.display = 'block';

          // Send email using EmailJS
          emailjs
            .send('service_6zap90a', 'template_s3v2e08', formData)
            .then(function (response) {
              try {
                // Record successful submission for rate limiting
                recordSubmissionAttempt();

                // Hide loading
                loadingDiv.style.display = 'none';
                submitButton.disabled = false;

                // Show success toast
                showSuccessToast();

                // Reset form
                contactForm.reset();
              } catch (innerError) {
                console.error('Error in success handler:', innerError);
              }
            })
            .catch(function (error) {
              try {
                loadingDiv.style.display = 'none';
                submitButton.disabled = false;

                const errorMessage = error.text || 'Failed to send message. Please try again later.';
                errorDiv.textContent = '✗ ' + errorMessage;
                errorDiv.style.display = 'block';

                showErrorToast(errorMessage);
              } catch (innerError) {
                console.error('Error in error handler:', innerError);
              }
            });
        } catch (error) {
          console.error('Error in form submission:', error);
          showErrorToast('An unexpected error occurred. Please try again.');
        }
      });
    }
  })();

})();