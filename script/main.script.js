// Dark Mode Detection
const html = document.querySelector('html');
let mediaQueryObj; // Declare mediaQueryObj in the global scope

function handleDarkModeChange(e) {
  if (e.matches) {
    html.classList.add('dark');
    saveDarkModePreference(true);
  } else {
    html.classList.remove('dark');
    saveDarkModePreference(false);
  }
}

function checkDarkModeOnScroll() {
  const scrollPosition = window.scrollY;
  if (scrollPosition === 0) {
    handleDarkModeChange(mediaQueryObj);
  }
}

function saveDarkModePreference(isDarkMode) {
  localStorage.setItem('darkMode', isDarkMode);
}

function loadDarkModePreference() {
  const darkModePreference = localStorage.getItem('darkMode');
  if (darkModePreference === 'true') {
    html.classList.add('dark');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  mediaQueryObj = window.matchMedia('(prefers-color-scheme: dark)');

  mediaQueryObj.addEventListener('change', handleDarkModeChange);
  window.addEventListener('scroll', checkDarkModeOnScroll);
  loadDarkModePreference(); // Load dark mode preference on page load
});

// Header Overlay
const header = document.querySelector('header');
const largeNav = document.querySelector('#large-nav')
const navOverlay = document.querySelector('#nav-overlay');
const navBg = document.querySelector('#overlay-bg');

const smallNav = document.querySelector('.small-nav');
const firstBar = document.querySelector('#bar-1');
const thirdBar = document.querySelector('#bar-3');

largeNav.addEventListener('mouseover', () => {
  header.classList.add('overlay-active');
});

largeNav.addEventListener('mouseout', () => {
  header.classList.remove('overlay-active');
});

smallNav.addEventListener('click', () => {
  header.classList.toggle('small-overlay-active');
  firstBar.classList.toggle('bar-hide');
  thirdBar.classList.toggle('bar-hide');
});

navBg.addEventListener('click', () => {
  header.classList.remove('small-overlay-active');
  firstBar.classList.toggle('bar-hide');
  thirdBar.classList.toggle('bar-hide');
});

navOverlay.addEventListener('mouseover', () => {
  header.classList.add('overlay-active');
});

navOverlay.addEventListener('mouseout', () => {
  header.classList.remove('overlay-active');
});

//Reduced Motion
const marquee = document.querySelectorAll('.verse-marquee');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduced)').matches;

console.log('prefersReducedMotion:', prefersReducedMotion);

if (!prefersReducedMotion) {
  addAnimation();
}

// if (!window.matchMedia('(prefers-reduced-motion: reduced)').matches) {
//   addAnimation();
// }

function addAnimation() {
  marquee.forEach(marquee => {
    marquee.setAttribute('data-animated', true);

    const scrollerInner = marquee.querySelector('.marquee-content');
    const scrollerContent = Array.from(scrollerInner.children);

    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute('aria-hidden', true);
      scrollerInner.appendChild(duplicatedItem);
    });

    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute('aria-hidden', true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}

// Reference Elements
document.addEventListener('DOMContentLoaded', function() {
  function toggleRef() {
    var middleOfScreenY = window.innerHeight / 2 + window.scrollY;

    var purpose = document.getElementById('purpose');
    var purposeTop = purpose.offsetTop;

    var acceptance = document.getElementById('acceptance');
    var acceptanceTop = acceptance.offsetTop;

    var values = document.getElementById('values');
    var valuesTop = values.offsetTop;

    var purposeRef = document.getElementById('purpose-ref');
    var acceptanceRef = document.getElementById('acceptance-ref');
    var valuesRef = document.getElementById('values-ref');

    console.log('purposeTop:', purposeTop);
    console.log('acceptanceTop:', acceptanceTop);
    console.log('valuesTop:', valuesTop);
    console.log(middleOfScreenY)

    if (middleOfScreenY >= purpose.offsetTop && middleOfScreenY < acceptance.offsetTop) {
      purposeRef.classList.add('active');
      acceptanceRef.classList.remove('active');
      valuesRef.classList.remove('active');
    } else if (middleOfScreenY >= acceptance.offsetTop && middleOfScreenY < values.offsetTop) {
      acceptanceRef.classList.add('active');
      purposeRef.classList.remove('active');
      valuesRef.classList.remove('active');
    } else if (middleOfScreenY >= values.offsetTop) {
      valuesRef.classList.add('active');
      purposeRef.classList.remove('active');
      acceptanceRef.classList.remove('active');
    } else {
      // No section is in the middle of the screen
      purposeRef.classList.remove('active');
      acceptanceRef.classList.remove('active');
      valuesRef.classList.remove('active');
    }


  }

  window.addEventListener('scroll', toggleRef);

  toggleRef();
});