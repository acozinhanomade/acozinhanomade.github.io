var menuFadeInDelay = 0;
var contentFadeInDelay = 0;

window.onload = setClicks;

function clearSelectedJar() {
  let potes = document.getElementsByClassName('jar-overlay');
  for(let i=0; i<potes.length; i++) {
    potes[i].classList.remove('jar-selected');
  }
}

function setClicks() {
  let potes = document.getElementsByClassName('jar-overlay');
  for(let i=0; i<potes.length; i++) {
    let mSlug = potes[i].getAttribute('data-slug');
    potes[i].onclick = function() {
      hideAllContent();
      clearSelectedJar();
      this.classList.add('jar-selected');
      fadeNavigation();
      setTimeout(setNavigation(mSlug), menuFadeInDelay);
    };
  }
}

function setNavigation(slug) {
  return function() {
    let ingredientes = document.getElementById('jar-ingredientes');
    let receita = document.getElementById('jar-receita');
    let mapa = document.getElementById('jar-mapa');

    ingredientes.onclick = function() {
      showContent(slug, 'ingredientes');
    };
    receita.onclick = function() {
      showContent(slug, 'receita');
    };
    mapa.onclick = function() {
      showContent(slug, 'mapa');
    };

    let ingredientesImg = ingredientes.getElementsByTagName('img')[0];
    let mapaImg = mapa.getElementsByTagName('img')[0];

    let ingredientesImgUrl = ingredientesImg.getAttribute('src');
    let mapaImgUrl = mapaImg.getAttribute('src');

    ingredientesImgUrl = ingredientesImgUrl.replace(/\/[a-zA-Z0-9]+\/ingredientes/, '/'+slug+'/ingredientes');
    mapaImgUrl = mapaImgUrl.replace(/\/[a-zA-Z0-9]+\/mapa/, '/'+slug+'/mapa');

    ingredientesImg.setAttribute('src', ingredientesImgUrl);
    mapaImg.setAttribute('src', mapaImgUrl);

    document.getElementById('jar-title').innerHTML = slug;
    showNavigation();
  };
}

function showNavigation() {
  let navigation = document.getElementsByClassName('home-jar-navigation')[0];

  navigation.style.opacity = '1';
  navigation.style['max-height'] = '500px';

  setTimeout(function() {
    scrollToId('#jar-menu-anchor');
  }, 500);

  setTimeout(function() {
    navigation.style.transition = 'opacity 0.5s linear';
  }, 1000);

  menuFadeInDelay = 1000;
  setClicks();
}

function fadeNavigation() {
  let navigation = document.getElementsByClassName('home-jar-navigation')[0];
  navigation.style.opacity = '0';
}

function hideAllContent() {
  let allSlugs = document.querySelectorAll('[data-slug]');
  for(let i=0; i<allSlugs.length; i++) {
    if(allSlugs[i].classList.toString().includes('content-')) {
      allSlugs[i].style.maxHeight = '0px';
    }
  }
}

function showContent(slug, type) {
  hideAllContent();
  setTimeout(function() {
    let allSlugs = document.querySelectorAll('[data-slug="' + slug + '"]');
    for(let i=0; i<allSlugs.length; i++) {
      if(allSlugs[i].classList.contains('content-' + type)) {
        allSlugs[i].style.maxHeight = '500px';
        setTimeout(function() {
          scrollToId('#jar-submenu-anchor');
        }, 500);
      }
    }
    contentFadeInDelay = 555;
  }, contentFadeInDelay);
}
