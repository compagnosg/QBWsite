let currentLang = 'it';

function loadTranslations(lang) {
  console.log('Loading translations for:', lang);
  fetch(`translations/${lang}.json`)  // Modifica qui: percorso corretto per i file JSON
    .then(response => {
      console.log('Response:', response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Translation data:', data);
      currentLang = lang;
      document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (data[key]) {
          if (element.tagName === 'INPUT') {
            if (element.type === 'submit') {
              element.value = data[key];
            } else if (element.type === 'text' || element.type === 'email' || element.type === 'password') {
              element.placeholder = data[key];
            }
          } else {
            element.textContent = data[key];
          }
        }
      });
    })
    .catch(error => {
      console.error('Error loading translations:', error);
      console.error('Error details:', error.message);
    });
}

function updateLanguageSelector(lang) {
  document.querySelectorAll('.flag-icon').forEach(flag => {
    if (flag.parentElement.getAttribute('data-lang') === lang) {
      flag.classList.add('active');
    } else {
      flag.classList.remove('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('Translation script loaded');
  document.querySelectorAll('.flag-icon').forEach(flag => {
    flag.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = e.currentTarget.parentElement.getAttribute('data-lang');
      console.log('Flag clicked:', lang);
      loadTranslations(lang);
      updateLanguageSelector(lang);
    });
  });

  // Carica la lingua italiana di default
  loadTranslations('it');
  updateLanguageSelector('it');
});