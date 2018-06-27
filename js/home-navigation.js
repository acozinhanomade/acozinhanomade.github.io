var menuFadeInDelay = 0;
var contentFadeInDelay = 0;

window.addEventListener('load', function() {
  setContentHeights();
  setClicks();
  parseUrl();
});

function setContentHeights() {
  let allSlugs = document.querySelectorAll('[data-slug]');
  for(let i=0; i<allSlugs.length; i++) {
    if(allSlugs[i].classList.toString().includes('content-')) {
      allSlugs[i].setAttribute('data-height', allSlugs[i].offsetHeight);
      allSlugs[i].classList.add('content-measured');
    }
  }
}

function parseUrl() {
  if(location.href.includes('/#/')) {
    let myRegexp = /\/#\/([a-zA-Z]*)-?([a-zA-Z]*)/g;
    let anchors = myRegexp.exec(location.href);
    let slug = anchors[1];
    let type = anchors[2];
    let pote = document.querySelectorAll('[data-slug="' + slug + '"]')[0];
    let content = document.getElementById('jar-' + type);
    if (pote) {
      pote.click();
    }
    if(content) {
      setTimeout(function() {
        showContent(slug, type);
        location.href = location.href.replace(/-.+/, '') + '-' + type;
        updateShareUrls();
      }, 200);
    }
  }
}

function updateShareUrls() {
  let shareElement = document.getElementsByClassName('share-url');
  for(let i=0; i<shareElement.length; i++) {
    let shareUrl = shareElement[i].getAttribute('href').replace(/=.+/g, '=');
    let pageUrl = location.href;
    shareElement[i].setAttribute('href', shareUrl + pageUrl);
  }
}

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
      let url = location.href.replace(/\/#\/.+/g,'').replace(/\/$/, '');
      location.href = url + '/#/' + mSlug;
      updateShareUrls(mSlug, '');
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
      location.href = location.href.replace(/-.+/, '') + '-ingredientes';
      updateShareUrls();
    };
    receita.onclick = function() {
      showContent(slug, 'receita');
      location.href = location.href.replace(/-.+/, '') + '-receita';
      updateShareUrls();
    };
    mapa.onclick = function() {
      showContent(slug, 'mapa');
      location.href = location.href.replace(/-.+/, '') + '-mapa';
      updateShareUrls();
    };

    let ingredientesImg = ingredientes.getElementsByTagName('img')[0];
    let receitaImg = receita.getElementsByTagName('img')[0];
    let mapaImg = mapa.getElementsByTagName('img')[0];

    let ingredientesImgUrl = ingredientesImg.getAttribute('src');
    let receitaImgUrl = receitaImg.getAttribute('src');
    let mapaImgUrl = mapaImg.getAttribute('src');

    ingredientesImgUrl = ingredientesImgUrl.replace(/\/[a-zA-Z0-9]+\/ingredientes/, '/'+slug+'/ingredientes');
    receitaImgUrl = receitaImgUrl.replace(/\/[a-zA-Z0-9]+\/receita/, '/'+slug+'/receita');
    mapaImgUrl = mapaImgUrl.replace(/\/[a-zA-Z0-9]+\/mapa/, '/'+slug+'/mapa');

    ingredientesImg.setAttribute('src', ingredientesImgUrl);
    receitaImg.setAttribute('src', receitaImgUrl);
    mapaImg.setAttribute('src', mapaImgUrl);

    document.getElementById('jar-title').innerHTML = slug;
    showNavigation();
  };
}

function showNavigation() {
  let navigation = document.getElementsByClassName('home-jar-submenu')[0];

  navigation.classList.remove('submenu-hide');
  navigation.classList.add('submenu-show');

  setTimeout(function() {
    scrollToId('#jar-menu-anchor');
  }, 500);

  setTimeout(function() {
    navigation.classList.add('submenu-simplify-transition');
  }, 1000);

  menuFadeInDelay = 1000;
  setClicks();
}

function fadeNavigation() {
  let navigation = document.getElementsByClassName('home-jar-submenu')[0];
  navigation.classList.remove('submenu-show');
  navigation.classList.add('submenu-hide');
}

function hideAllContent() {
  let allSlugs = document.querySelectorAll('[data-slug]');
  for(let i=0; i<allSlugs.length; i++) {
    if(allSlugs[i].classList.toString().includes('content-')) {
      allSlugs[i].style['max-height'] = '0';
    }
  }
}

function showContent(slug, type) {
  hideAllContent();
  setTimeout(function() {
    let allSlugs = document.querySelectorAll('[data-slug="' + slug + '"]');
    for(let i=0; i<allSlugs.length; i++) {
      if(allSlugs[i].classList.contains('content-' + type)) {
        allSlugs[i].style['max-height'] = allSlugs[i].getAttribute('data-height') + 'px';

        setTimeout(function() {
          scrollToId('#jar-submenu-anchor');
        }, 500);
      }
    }
    contentFadeInDelay = 555;
  }, contentFadeInDelay);
}
